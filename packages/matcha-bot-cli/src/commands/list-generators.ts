import { recordToArray } from "./commands-util"
import { MatchaGenerators } from "../model"
import { configDir } from "../config/config-reader"
import Table from "cli-table"

import c from "chalk"

const log = console.log

/**
 *
 * Display all available generators on the console
 *
 * @param commands
 */
export const listGenerators = (generators: MatchaGenerators) => {
  const listGenerators = recordToArray(generators)
  const dir = process.cwd()

  const generatorTable = listGenerators
    .map((generator) => ({
      name: generator.name,
      description: generator.description ?? "",
      version: generator.version ?? ""
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const displayTableArray = generatorTable.reduce((acc, entry) => {
    const { description, name, version } = entry
    const row: Array<string> = [name, description, version]
    acc.push(row)
    return acc
  }, new Table({ head: ["name", "description", "version"], style: { head: ["green"] }, colWidths: [20, 120, 10], colAligns: ["left", "left", "left"] }))

  if (generatorTable.length === 0) {
    log("\r\n")
    log("🍵 No generator available")
    log("\r\n")
    log("Try:")
    log("----")
    log(c.green("$ matchabot init"))
    log("\r\n")
    log(`👉 to create a template directory '${configDir}}'`)
    log("\r\n")
  } else {
    log(c.greenBright("Availables generators"))
    log(c.greenBright("---------------------"))
    log("")
    log(displayTableArray.toString())
    log("")
  }
}
