import { generate } from "./generator"
import { getCommands, askCommandArgs, getArgs } from "./commands-util"
import { Commands } from "./model"
import { program } from "commander"
import path from "path"

/**
 * Register a list of commands
 * @param commands
 */
export const registerCommands = (commands: Commands) =>
  getCommands(commands).map((command) => {
    const cmd = program.command(command.name)
    command.args.map((args) => {
      const optionName = args.name
      const optionFlag = args.alias ?? args.name.toLocaleLowerCase().slice(0, 1)
      const option = `-${optionFlag}, --${optionName} <${optionName}>`
      cmd.option(option, args.description)
      cmd.action(async function () {
        // Find args not in command line
        const args = getArgs(command)
        const opts: Record<string, unknown> = cmd.opts()
        const undefindedArgs = args.filter(
          (arg) => !Object.keys(opts).includes(arg.name)
        )
        // Ask missing args
        const resAskArgs = await askCommandArgs(undefindedArgs)
        // All commands arguments are completed
        const argValues = { ...opts, ...resAskArgs }

        // generating files
        const genActions = command.actions
        const templateDir =
          command.templateDir ?? path.join(process.cwd(), "./templates")

        console.log("\r\n🍵 Generating files:\r\n")
        await generate(genActions, argValues, templateDir)
      })
      return cmd
    })
  })
