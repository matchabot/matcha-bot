#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const commander_1 = require("commander");
const version_1 = require("./version");
const banner_1 = require("./banner");
const config_reader_1 = require("./config/config-reader");
const register_commands_1 = require("./commands/register-commands");
const list_command_1 = require("./commands/list-command");
const init_command_1 = require("./commands/init-command");
const register_prompts_1 = require("./commands/register-prompts");
const check_update_1 = require("./utils/check-update");
/**
 * Entry point
 */
const run = async () => {
    // print banner
    banner_1.printBanner("Matcha Bot");
    // read configuration
    const config = await config_reader_1.getConfiguration();
    // check update
    check_update_1.checkUpdate();
    // Register prompt types
    register_prompts_1.registerPrompts();
    // Register commands based on available configuration
    register_commands_1.registerCommands(config.commands);
    // Program definition
    commander_1.program
        .version(version_1.version, "-v,--version", "output the current version")
        // Register a command that lists all availables commands
        .command("list")
        .action(() => list_command_1.listCommands(config.commands));
    // Register init command => copy a starter directory called .matchabot
    commander_1.program.command("init").action(init_command_1.initCommand);
    commander_1.program.parse(process.argv);
    //  console.log("\r\n🍵 Be happy drink tea ... matcha tea ... .\r\n")
};
exports.run = run;
