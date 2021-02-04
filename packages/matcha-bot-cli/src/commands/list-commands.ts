import { recordToArray } from "./commands-util"
import { localPath } from "../utils/file-utils"
import { Commands, MatchaGenerator } from "../model"
import c from "chalk"
import Table from "cli-table"

const log = console.log
const table = console.table

/**
 *
 * Display all commands on the console
 *
 * @param commands
 */
export const listCommands = (generator: MatchaGenerator) => {
  const listCommands = recordToArray(generator.commands)
  const dir = process.cwd()

  const commandTable = listCommands
    .map((command) => ({
      name: command.name,
      description: command.description ?? "",
      version: command.version ?? "",
      location: localPath(command.templateDir, dir)
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const displayTableArray = commandTable.reduce((acc, entry) => {
    const { description, name, version, location } = entry
    const row: Array<string> = [name, description, version, location]
    acc.push(row)
    return acc
  }, new Table({ head: ["name", "description", "version", "location"], style: { head: ["green"] }, colWidths: [30, 60, 10, 60], colAligns: ["left", "left", "left"] }))

  if (commandTable.length === 0) {
    log("\r\n")
    log(`🍵 No command available for generator "${generator.name}"`)
    log("\r\n")
  } else {
    const title = `Availables command(s) for ${generator.name}`
    const titleLine = Array(title.length + 1).join("-")
    log(c.greenBright(title))
    log(c.greenBright(titleLine))
    log("")
    log(displayTableArray.toString())
    log("")
  }
}
