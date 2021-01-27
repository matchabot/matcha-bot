import Handlebars from "handlebars"
import { ActionGenerate } from "./model"
import fs from "fs-extra"
import path from "path"
import { registerHelper } from "./register-helper"
import { prompt } from "inquirer"

registerHelper()

/**
 * 
 * @param templateSpec 
 * @param data 
 */
export const generator = (
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
  templatePath: string
) => {
  const outFilesToWrite = (
    await Promise.all(
      actions.map((action) => {
        return doGenerate(action, templatePath, data)
      })
    )
  ).filter((obj) => obj.canWriteOutfile)

  outFilesToWrite.map((file) => {
    writeFile(file.outputFilePath, file.outFileContent)
  })
}

const doGenerate = async (
  action: ActionGenerate,
  templatePath: string,
  data: Record<string, unknown>
) => {
  const sourceTemplateFilePath = path.join(templatePath, action.sourceTemplate)
  const destTemplate = generator(action.outFile, data)
  const outputFilePath = path.join(process.cwd(), destTemplate)
  const templateContent = fs.readFileSync(sourceTemplateFilePath, {
    encoding: "utf8",
    flag: "r"
  })

  const outFileContent = generator(templateContent, data)
  const fileExists = fs.pathExistsSync(outputFilePath)

  const question = {
    type: "confirm",
    name: "overwrite",
    message: `Overwrite the file ${outputFilePath}`,
    default: true
  }

  let canWriteOutfile = !fileExists
  if (fileExists) {
    const response: { overwrite: true } = await prompt([question])
    if (response.overwrite) {
      canWriteOutfile = true
    }
  }

  return {
    outputFilePath: outputFilePath,
    outFileContent: outFileContent,
    canWriteOutfile: canWriteOutfile
  }
}

/**
 * 
 * @param filePath path of the file
 * @param content content to write
 */
const writeFile = (filePath: string, content: string) => {
  const dirPath = path.dirname(filePath)
  fs.ensureDirSync(dirPath)
  fs.writeFileSync(filePath, content)
  return true
}
