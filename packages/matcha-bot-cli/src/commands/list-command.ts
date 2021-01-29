import { getCommands } from "./commands-util"
import { localPath } from "../utils/file-utils"
import { Commands } from "../model"

/**
 *
 * Display all commands on the console
 *
 * @param commands
 */
export const listCommands = (commands: Commands) => {
  const listCommands = getCommands(commands)
  const dir = process.cwd()

  const commandTable = listCommands.map((command, index) => ({
    name: command.name,
    description: command.description ?? "",
    version: command.version ?? "",
    location: localPath(command.templateDir, dir)
  }))

  if (commandTable.length === 0) {
    console.log(
      `\r\n🍵 No command availale. 
 
Try:\r\n
$ matchabot -init 

To create a template directory.\r\n`
    )
  } else {
    console.table(commandTable)
  }
}
