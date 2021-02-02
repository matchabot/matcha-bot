import { recordToArray } from "./commands-util"
import { MatchaGenerators } from "../model"
import { configDir } from "../config/config-reader"

import c from "chalk"

const log = console.log
const table = console.table

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
    table(generatorTable)
  }
}
