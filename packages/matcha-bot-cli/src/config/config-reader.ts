import { Configuration, Command, Commands } from "../model"
import fg from "fast-glob"
import path from "path"
import fs from "fs-extra"
import debug from "debug"

const configDir = "./.matchabot"

/**
 * Search configuration files matcha.json inside ./.matchabot/** directory
 */
export const getConfiguration = async (): Promise<Configuration> => {
  const filePath = path.join(process.cwd(), configDir)
  const searchConfigPattern = `${filePath}/**/matcha.json`
  const entries = await fg([searchConfigPattern], { dot: true })

  const log = debug("getConfiguration")

  log(searchConfigPattern)
  log(entries)

  const commandsConfig = await Promise.all(
    entries.map(async (entry) => {
      const configContent = await fs.readFile(entry, { encoding: "utf8" })
      const cmdConfig = JSON.parse(configContent)
      const configPath = path.dirname(entry)

      const cmd: Command = {
        name: cmdConfig.name,
        templateDir: configPath,
        args: cmdConfig.args,
        actions: cmdConfig.actions
      }
      return cmd
    })
  )

  const commands = commandsConfig.reduce((commands: Commands, cmd: Command) => {
    commands[cmd.name] = cmd
    return commands
  }, {})

  return {
    outputDirectory: process.cwd(),
    commands: commands
  }
}
