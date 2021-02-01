import path from "path"
import fs from "fs-extra"
import { ActionCopy, ActionGenerate, ActionTemplate } from "../model"
import { executeTemplate } from "../template-generator/execute-template"
import { prompt } from "inquirer"
import chalk from "chalk"
import FileType from "file-type"
import {
  localPath,
  walkFolderAndPrepareTransformActions
} from "../utils/file-utils"
import { Console } from "console"

const log = console.log

export type ResultAction = {
  inFile: string
  outFile: string
  skipped: boolean
}

/**
 * Execute a list of actions
 * @param actions array of actions to execute
 * @param data  a directory of variables
 * @param templatePath
 * @param forceOverwriteFiles
 * @param debugMode
 */
export const executeCommands = (
  actions: ActionGenerate[],
  data: Record<string, unknown>,
  templatePath: string,
  forceOverwriteFiles: boolean = false,
  debugMode: boolean = false
): Promise<ResultAction[]> => {
  // synchronous execution of each action
  const res = actions.reduce(async (accP, action) => {
    const acc = await accP
    switch (action.type) {
      case "template":
      case "copy": {
        const actionRes = await executeActionTemplate(
          action,
          data,
          templatePath,
          forceOverwriteFiles,
          debugMode
        )
        return [...acc, actionRes]
      }
      case "copy-directory":
      case "template-directory": {
        const actionType = "copy-directory" ? "copy" : "template"
        // Interpret variable on source and target path definition
        const sourcePath = executeTemplate(action.source, data)
        const targetPath = executeTemplate(action.target, data)
        // Normalize directory path
        const fullSourcePath = path.join(templatePath, sourcePath)
        const fullTargetPath = path.join(process.cwd(), targetPath)
        const copyFolderActions = walkFolderAndPrepareTransformActions(
          fullSourcePath,
          fullTargetPath
        ).map((action): ActionCopy | ActionTemplate => ({
          type: actionType,
          ...action
        }))

        const res = await executeCommands(
          copyFolderActions,
          data,
          templatePath,
          forceOverwriteFiles,
          debugMode
        )
        return acc.concat(res)
      }
      default:
        return acc
    }
  }, Promise.resolve<ResultAction[]>([]))
  return res
}

/**
 * Write output to the console for debugging
 *
 * @param filePath
 * @param content
 */
const writeFileDebug = (filePath: string, content: string) => {
  const file = localPath(filePath)
  log("\r\n")
  log(chalk.green(`--- Begin file : "${file}" ---`))
  log(content)
  log(chalk.green(`--- End file   : "${file}" ---`))
  log("\r\n")
}

const canOverwriteFile = async (filePath: string) => {
  const question = {
    type: "confirm",
    name: "confirm",
    message: `Overwrite the file ${filePath}`,
    default: true
  }
  const res = await prompt([question])
  return res["confirm"]
}

const executeActionTemplate = async (
  action: ActionTemplate | ActionCopy,
  data: Record<string, unknown>,
  templatePath: string,
  forceOverwrite: boolean,
  debugMode: boolean = false
): Promise<ResultAction> => {
  // Interpret variable on source and target path definition
  const sourcePath = executeTemplate(action.source, data)
  const targetPath = executeTemplate(action.target, data)

  // Normalize directory path
  const fullSourcePath = path.join(templatePath, sourcePath)
  const fullTargetPath = path.join(process.cwd(), targetPath)

  let skipFile = false

  if (!debugMode) {
    const targetPathExists = await fs.pathExists(fullTargetPath)
    if (targetPathExists) {
      skipFile = !(await canOverwriteFile(fullTargetPath))
    }
  }

  const canExecute = skipFile === false || forceOverwrite || debugMode

  if (canExecute) {
    // detect file type
    const fileType = (await FileType.fromFile(fullSourcePath)) ?? "utf8"

    console.log(`${fullSourcePath} fileType: ${fileType}`)

    // If it is a temlplate and the file type is compatible
    if (fileType === "utf8" && action.type === "template") {
      const fileContent = await fs.readFile(fullSourcePath, "utf8")
      const transformedContent = executeTemplate(fileContent, data)
      if (debugMode) {
        writeFileDebug(fullTargetPath, transformedContent)
      } else {
        const targetPath = path.dirname(fullTargetPath)
        await fs.ensureDir(targetPath)
        await fs.writeFile(fullTargetPath, transformedContent, "utf8")
      }
    } // Copy
    else {
      await fs.ensureDir(targetPath)
      await fs.copyFile(fullSourcePath, fullTargetPath)
      if (debugMode) {
        log(`👉 copy file ${fullSourcePath} to ${fullTargetPath}`)
      }
    }
  }

  return {
    inFile: fullSourcePath,
    outFile: fullTargetPath,
    skipped: skipFile
  }
}
