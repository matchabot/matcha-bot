import { Commands } from "./model"

export const getCommandNames = (commands: Commands) => {
  const commandNames = Object.entries(commands).map(([_, c]) => c.name)
  return commandNames
}
