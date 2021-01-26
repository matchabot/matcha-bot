import Handlebars from "handlebars"
import { ActionGenerate } from "./model"
import { readFileSync } from "fs-extra"
import path from "path"

export const generator = (
  templateSpec: string,
  data: Record<string, unknown>
) => {
  const template = Handlebars.compile(templateSpec)

  const output = template(data)

  return output
}

export const generate = (actions: ActionGenerate[]) => {
  actions.map((action, index) => {
    const sourceTemplateFile = path.join(`${process.cwd()}/templates`, action.sourceTemplate)
    const destTemplate = action.outFile

    const templateContent = readFileSync(sourceTemplateFile, {
      encoding: "utf8",
      flag: "r"
    })

    console.log(`(${index + 1}/${actions.length}) - generate ${destTemplate}`)

    console.log(templateContent)
  })
}
