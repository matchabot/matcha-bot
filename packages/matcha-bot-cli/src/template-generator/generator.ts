import fs from "fs-extra"
import path from "path"
import Handlebars from "handlebars"
import { ActionGenerate } from "../model"
import { registerHelpers } from "./register-helper"
import { localPath } from "../utils/file-utils"
import { walkFolderWithTransformAction } from "../utils/file-utils"
import { prompt } from "inquirer"
import chalk from "chalk"
import { transform } from "lodash"

const log = console.log

registerHelpers()

/**
 *
 * @param templateSpec
 * @param data
 */
export const executeTemplate = (
  templateSpec: string,
  data: Record<string, unknown>
) => {
  const template = Handlebars.compile(templateSpec)
  const output = template(data)
  return output
}

/**
 *
 * @param actions
 * @param data
 * @param templatePath
 */
export const generate = async (
  actions: ActionGenerate[],
  data: Record<string, unknown>,
  templatePath: string,
  forceOverwriteFiles: boolean = false,
  debugMode: boolean = false
) => {
  const write = debugMode ? writeFileDebug : writeFile
  const outFilesToWrite = (
    await Promise.all(
      actions.map((action) => {
        return prepareFiles(action, templatePath, data)
      })
    )
  ).reduce((accumulator, current) => [...accumulator, ...current], [])

  // We don't ask to overwrite for debugMode and forceOverWriteFiles flag
  const finalFilesToWrite =
    forceOverwriteFiles || debugMode
      ? outFilesToWrite
      : await askFilesToOverwrite(outFilesToWrite)

  finalFilesToWrite.map((file) => {
    log(` ✅ ${file.outputFilePath}`)
    write(file.outputFilePath, file.outFileContent)
  })

  log("\r\n")
}

const prepareFiles = async (
  action: ActionGenerate,
  templatePath: string,
  data: Record<string, unknown>
) => {
  // Case 1 - copy directory action
  if (action.type === "copy-directory") {
    // We evaluate the template with variables in data
    const sourceDirectory = executeTemplate(action.sourceDirectory, data)
    const destinationDirectory = executeTemplate(
      action.destinationDirectory,
      data
    )
    // Normalize directory path
    const sourceDirectoryPath = path.join(templatePath, sourceDirectory)
    const outputFilePath = path.join(process.cwd(), destinationDirectory)

    //   const transformAction = (content : string) => (conte)

    //    walkFolderWithTransformAction(sourceDirectoryPath,,destinationDirectory,transform)

    return []
  }

  // Case 2 or 3
  // template or copy action
  // We evaluate the template with variables in data
  const sourceTemplate = executeTemplate(action.sourceTemplate, data)
  const destTemplate = executeTemplate(action.outFile, data)

  // Normalize directory path
  const sourceTemplateFilePath = path.join(templatePath, sourceTemplate)
  const outputFilePath = path.join(process.cwd(), destTemplate)

  // Read source template
  const templateContent = fs.readFileSync(sourceTemplateFilePath, {
    encoding: "utf8",
    flag: "r"
  })
  // Execute template
  const outFileContent =
    action.type === "template"
      ? executeTemplate(templateContent, data)
      : templateContent

  // Check if destination outputFilePath exists
  const fileExists = fs.pathExistsSync(outputFilePath)

  return [
    {
      outputFilePath: outputFilePath,
      outFileContent: outFileContent,
      fileExists: fileExists
    }
  ]
}

/**
 * Write file and content to a specified location.
 * @param filePath path of the file
 * @param content content to write
 */
const writeFile = (filePath: string, content: string) => {
  const dirPath = path.dirname(filePath)
  fs.ensureDirSync(dirPath)
  fs.writeFileSync(filePath, content)
  return true
}

/**
 * Write output to the console for debugging
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

/**
 *
 * Ask the user wich file to overwrite
 *
 * @param outFilesToWrite
 */
async function askFilesToOverwrite(
  outFilesToWrite: {
    outputFilePath: string
    outFileContent: string
    fileExists: boolean
  }[]
) {
  const outFilesToWriteNoExisting = outFilesToWrite.filter((f) => !f.fileExists)
  const outFilesToWriteExisting = outFilesToWrite.filter((f) => f.fileExists)

  const overWriteFileAnswers = outFilesToWriteExisting.map((f, index) => ({
    type: "confirm",
    name: `q${index}`,
    message: `Overwrite the file ${f.outputFilePath}`,
    default: true
  }))

  const answers = await prompt(overWriteFileAnswers)

  const overWriteFileResult = outFilesToWriteExisting
    .map((f, index) => ({
      ...f,
      overwrite: answers[`q${index}`]
    }))
    .filter((f) => f.overwrite)
    .map(({ overwrite, ...other }) => ({ ...other }))

  const finalFilesToWrite = [
    ...outFilesToWriteNoExisting,
    ...overWriteFileResult
  ]
  return finalFilesToWrite
}
