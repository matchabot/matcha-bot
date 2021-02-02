import {
  Configuration,
  Command,
  Commands,
  MatchaGenerator,
  MatchaGenerators
} from "../model"
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
export const configDir = "./_matchabot"
/**
 * Name of a generator config file
 */
export const configGeneratorName = "matchabot.json"

/**
 * Name of command config file
 */
export const configCommandName = "matchabot.cmd.json"

/**
 * Search configuration files matchabot.json inside ./.matchabot/** directory
 */
export const getConfiguration = async (): Promise<Configuration> => {
  const filePath = path.join(process.cwd(), configDir)
  const searchConfigPattern = `${filePath}/**/${configGeneratorName}`
  const entries = await fg([searchConfigPattern], { dot: true })

  const debugLog = debug("getConfiguration")

  debugLog(searchConfigPattern)
  debugLog(entries)

  // Find and read configuration of all generator
  const generatorsConfig = await entries.reduce(async (accP, entry) => {
    try {
      const acc = await accP
      const gen = await readGeneratorConfigFile(entry)
      const dirPath = path.dirname(gen.filePath)
      gen.commands = await readCommandsFile(dirPath)
      return acc.concat(gen)
    } catch (err) {
      const filePath = localPath(entry)
      error(
        c.yellow(
          ` ⚠️ : Error, configuration file ignored "${filePath}": ${err.message}`
        )
      )
      return accP
    }
  }, Promise.resolve<MatchaGenerator[]>([]))

  // transform the commands array into a record (key is the name of the generator)
  const generators = generatorsConfig.reduce(
    (generators: MatchaGenerators, gen) => {
      generators[gen.name] = gen
      return generators
    },
    {}
  )
  //console.dir(generators, { depth: null })
  return {
    outputDirectory: process.cwd(),
    generators: generators
  }
}

const readCommandsFile = async (filePath: string) => {
  const searchCommandPattern = `${filePath}/**/${configCommandName}`
  const entries = await fg([searchCommandPattern], { dot: true })

  // Find and read configuration of all command
  const commandsConfig = await entries.reduce(async (accP, entry) => {
    try {
      const acc = await accP
      const cmd = await readCommandConfigFile(entry)
      return acc.concat(cmd)
    } catch (err) {
      const filePath = localPath(entry)
      error(
        c.yellow(
          ` ⚠️ : Error, configuration file ignored "${filePath}": ${err.message}`
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
  return commands
}

const readGeneratorConfigFile = async (filePath: string) => {
  const configContent = await fs.readFile(filePath, { encoding: "utf8" })
  const genConfig = JSON.parse(configContent)
  const dirName = path.dirname(filePath)
  const dirNameParts = dirName.split(path.sep)
  const name = dirNameParts[dirNameParts.length - 1]
  const generator: MatchaGenerator = {
    name: genConfig.name ?? name,
    version: genConfig.version ?? "",
    filePath: filePath,
    description: genConfig.description,
    commands: {}
  }
  return generator
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
