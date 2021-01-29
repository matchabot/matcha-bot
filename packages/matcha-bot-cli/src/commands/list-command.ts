import { getCommands } from "./commands-util"
import { Commands } from "../model"

/**
 *
 * Display all commands
 *
 * @param commands
 */
export const listCommands = (commands: Commands) => {
  const listCommands = getCommands(commands)

  const dir = process.cwd()

  const simplifyPath = (path?: string) => {
    if (!path) return ""
    if (path.startsWith(dir)) {
      return path.substring(dir.length)
    }
    return path
  }

  const commandTable = listCommands.map((command, index) => ({
    name: command.name,
    description: command.description ?? "",
    version: command.version ?? "",
    location: simplifyPath(command.templateDir)
  }))

  console.table(commandTable)
}
