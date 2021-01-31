import { Configuration, Command, Commands } from "../model"
import fg from "fast-glob"
import path from "path"
import fs from "fs-extra"
import debug from "debug"
import c from "chalk"
import { localPath } from "../utils/file-utils"
const error = console.error

/**
 * The Configuration directory of MatchBot
 */
const configDir = "./.matchabot"

/**
 * Search configuration files matcha.json inside ./.matchabot/** directory
 */
export const getConfiguration = async (): Promise<Configuration> => {
  const filePath = path.join(process.cwd(), configDir)
  const searchConfigPattern = `${filePath}/**/matcha.json`
  const entries = await fg([searchConfigPattern], { dot: true })

  const debugLog = debug("getConfiguration")

  debugLog(searchConfigPattern)
  debugLog(entries)

  const commandsConfig = await entries.reduce(async (accP, entry) => {
    try {
      const acc = await accP
      const cmd = await readCommandConfigFile(entry)
      return acc.concat(cmd)
    } catch (err) {
      const filePath = localPath(entry)
      error(
        c.yellow(
          ` ⚠️ : configuration file ignored "${filePath}": ${err.message}`
        )
      )
      return accP
    }
  }, Promise.resolve<Command[]>([]))

  // transform the commands array into a record (key is the name of the command)
  const commands = commandsConfig.reduce((commands: Commands, cmd: Command) => {
    commands[cmd.name] = cmd
    return commands
  }, {})

  return {
    outputDirectory: process.cwd(),
    commands: commands
  }
}

/**
 * Read a command configuration file
 * @param filePath file path of the configuration file (example : ./matcha.json)
 */
const readCommandConfigFile = async (filePath: string) => {
  const configContent = await fs.readFile(filePath, { encoding: "utf8" })
  const cmdConfig = JSON.parse(configContent)
  const configPath = path.dirname(filePath)
  const cmd: Command = {
    name: cmdConfig.name,
    description: cmdConfig.description,
    version: cmdConfig.version,
    templateDir: configPath,
    args: cmdConfig.args,
    actions: cmdConfig.actions
  }
  return cmd
}
