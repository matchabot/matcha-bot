#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const commander_1 = require("commander");
const version_1 = require("./version");
const banner_1 = require("./banner");
const config_reader_1 = require("./config-reader");
const commands_1 = require("./commands");
const init_command_1 = require("./init-command");
const run = async () => {
    // print banner
    banner_1.printBanner("Matcha Bot");
    // read configuration
    const config = await config_reader_1.getConfiguration();
    // Register commands based on available configuration
    commands_1.registerCommands(config.commands);
    // Program definition
    commander_1.program
        .version(version_1.version, "-v,--version", "output the current version")
        // Register a command that lists all availables commands
        .command("list")
        .action(() => commands_1.listCommands(config.commands))
        // Register init command => copy a starter directory called .matchabot
        .command("init")
        .action(init_command_1.initCommand);
    commander_1.program.parse(process.argv);
};
exports.run = run;
