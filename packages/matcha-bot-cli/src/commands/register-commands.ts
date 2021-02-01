import { getCommands, askCommandArgs, getArgs } from "./commands-util"
import { Commands } from "../model"
import { program } from "commander"
import { getSystemVariables } from "../template-generator/add-system-variables"
import path from "path"
import { executeCommands } from "./commands-execute"
import c from "chalk"
const log = console.log

/**
 * Register a list of commands
 * @param commands
 */
export const registerCommands = (commands: Commands) =>
  getCommands(commands).map((command) => {
    const cmd = program.command(command.name)

    // Force option
    cmd.option("--force", "force overwrite file if file already exists")
    // Debug mode
    cmd.option(
      "--debug",
      "execute the command in debug mode (no file generated)"
    )

    command.args.map((args) => {
      const optionName = args.name
      const optionFlag = args.alias ?? args.name.toLocaleLowerCase().slice(0, 1)
      const option = `-${optionFlag}, --${optionName} <${optionName}>`
      cmd.option(option, args.description)
      cmd.action(async function () {
        // Find args not in command line
        const args = getArgs(command)
        const opts: Record<string, unknown> = cmd.opts()
        const undefinedArgs = args.filter(
          (arg) => !Object.keys(opts).includes(arg.name)
        )

        // Create an evaluation context with all the variables already known and the environment variables
        const context: Record<string, unknown> = {
          ...opts,
          ...getSystemVariables()
        }
        // Ask missing args to the user
        const resAskArgs = await askCommandArgs(undefinedArgs, context)
        // All commands arguments are completed
        const argValues = { ...context, ...resAskArgs }

        // force and debug flags
        const force = argValues.force === true
        const debugMode = argValues.debug === true

        // generating files
        const genActions = command.actions
        const templateDir =
          command.templateDir ?? path.join(process.cwd(), "./templates")

        const data = { ...argValues }

        log("\r\n🍵 Generating files ...\r\n")
        const res = await executeCommands(
          genActions,
          data,
          templateDir,
          force,
          debugMode
        )

        const displayMessage = debugMode
          ? "\r\n👉 Result files (Debug Mode)\r\n"
          : "\r\n👉 Created files \r\n"

        log(displayMessage)
        res.reduce((acc, result) => {
          const symbol = result.skipped ? "❌" : "✅"
          log(`${acc + 1} - ${symbol}  ${result.outFile}`)
          return acc + 1
        }, 0)
      })
      return cmd
    })
  })
