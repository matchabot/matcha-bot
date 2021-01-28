import Handlebars from "handlebars"
import { ActionGenerate } from "./model"
import fs from "fs-extra"
import path from "path"
import { registerHandlebarsHelper } from "./register-handlebars-helper"
import { prompt } from "inquirer"

registerHandlebarsHelper()

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
  // We evaluate the templat with variables in data
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
  const outFileContent = executeTemplate(templateContent, data)

  // Check if destination outputFilePath exists
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
