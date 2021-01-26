#!/usr/bin/env node

import { getCommandNames } from "./utils"
import { commands } from "./tests/example"
import { program } from "commander"
import { version } from "./version"

const listCommands = () => {
  const listCommands = getCommandNames(commands)

  listCommands.map((command) => {
    console.log(`👉 ${command}`)
  })
}

export const run = () => {
  program
    .version(version, "-v,--vers", "output the current version")
    .command("list")
    .action(listCommands)

  // Register commands
  getCommandNames(commands).map((command) => {
    program.command(command).action(listCommands)
  })

  program.parse(process.argv)
  const options = program.opts()

  console.log(options, { depth: null })
}
