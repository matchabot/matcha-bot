import { recordToArray } from "./commands-util"
import { localPath } from "../utils/file-utils"
import { Commands, MatchaGenerator } from "../model"
import c from "chalk"

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

  if (commandTable.length === 0) {
    log("\r\n")
    log(`🍵 No command available for generator ${generator.name}`)
    log("\r\n")
  } else {
    table(commandTable)
  }
}
