#!/usr/bin/env node

import { getCommands, askCommandArgs, getArgs } from "./utils"
import { commands } from "./tests/example"
import { program } from "commander"
import { version } from "./version"
import { generate } from "./generator"

const listCommands = () => {
  const listCommands = getCommands(commands)

  listCommands.map((command, index) => {
    console.log(`[${index + 1}/${listCommands.length}]: 👉 ${command.name}`)
  })
}

export const run = () => {
  program
    .version(version, "-v,--version", "output the current version")
    .command("list")
    .action(listCommands)

  // Register commands
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

        // generate
        const genActions = command.actions
        generate(genActions)
      })
    })
  })

  program.parse(process.argv)
}
