import { generate } from "./generator"
import { getCommands, askCommandArgs, getArgs } from "./commands-util"
import { Commands } from "./model"
import { program } from "commander"
import path from "path"

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

/**
 * Register a list of commands
 * @param commands
 */
export const registerCommands = (commands: Commands) =>
  getCommands(commands).map((command) => {
    const cmd = program.command(command.name)
    command.args.map((args) => {
      const optionName = args.name
      const optionFlag = args.name.slice(0, 1)
      const option = `-${optionFlag}, --${optionName} <${optionName}>`
      cmd.option(option, args.description)
      cmd.action(async function () {
        // find args not in command line
        const args = getArgs(command)
        const opts: Record<string, unknown> = cmd.opts()
        const undefindedArgs = args.filter(
          (arg) => !Object.keys(opts).includes(arg.name)
        )
        // ask missing args
        const resAskArgs = await askCommandArgs(undefindedArgs)
        // All commands arguments are completed
        const argValues = { ...opts, ...resAskArgs }

        // generate files
        const genActions = command.actions
        const templateDir =
          command.templateDir ?? path.join(process.cwd(), "./templates")

        console.log("\r\n🍵 Generate files:\r\n")
        await generate(genActions, argValues, templateDir)
      })
      return cmd
    })
  })
