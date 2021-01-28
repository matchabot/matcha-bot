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
  const outFilesToWrite = await Promise.all(
    actions.map((action) => {
      return prepareFiles(action, templatePath, data)
    })
  )

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

  console.log(`\r\nGenerating files:\r\n`)
  finalFilesToWrite.map((file) => {
    console.log(` ✅ ${file.outputFilePath}`)
    writeFile(file.outputFilePath, file.outFileContent)
  })

  console.log("\r\n")
}

const prepareFiles = async (
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

  return {
    outputFilePath: outputFilePath,
    outFileContent: outFileContent,
    fileExists: fileExists
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
