import { getCommands, askCommandArgs, getArgs } from "./commands-util"
import { Commands } from "../model"

/**
 *
 * Display all commands
 *
 * @param commands
 */
export const listCommands = (commands: Commands) => {
  const listCommands = getCommands(commands)

  listCommands.map((command, index) => {
    console.log(
      `[${index + 1}/${listCommands.length}]: 👉 ${command.name} ${
        command.description ? ": " + command.description : ""
      }`
    )
  })
}
