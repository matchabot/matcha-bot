#!/usr/bin/env node

import { Configuration } from "./model"
import { program } from "commander"
import { version } from "./version"

import { printBanner } from "./banner"
import { getConfiguration } from "./config-reader"

import { listCommands, registerCommands } from "./commands"
import { initCommand } from "./init-command"
import { registerPrompts } from "./register-prompts"

export const run = async () => {
  // print banner
  printBanner("Matcha Bot")

  // read configuration
  const config: Configuration = await getConfiguration()

  // Register prompt types
  registerPrompts()

  // Register commands based on available configuration
  registerCommands(config.commands)

  // Program definition
  program
    .version(version, "-v,--version", "output the current version")
    // Register a command that lists all availables commands
    .command("list")
    .action(() => listCommands(config.commands))
    // Register init command => copy a starter directory called .matchabot
    .command("init")
    .action(initCommand)

  program.parse(process.argv)
}
