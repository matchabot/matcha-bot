#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("./utils");
const commander_1 = require("commander");
const version_1 = require("./version");
const generator_1 = require("./generator");
const banner_1 = require("./banner");
const config_reader_1 = require("./config-reader");
const path_1 = tslib_1.__importDefault(require("path"));
const listCommands = (commands) => {
    const listCommands = utils_1.getCommands(commands);
    listCommands.map((command, index) => {
        console.log(`[${index + 1}/${listCommands.length}]: 👉 ${command.name} ${command.description ? ": " + command.description : ""}`);
    });
};
const registerCommands = (commands) => utils_1.getCommands(commands).map((command) => {
    const cmd = commander_1.program.command(command.name);
    command.args.map((args) => {
        const optionName = args.name;
        const optionFlag = args.name.slice(0, 1);
        const option = `-${optionFlag}, --${optionName} <${optionName}>`;
        cmd.option(option, args.description);
        cmd.action(async function () {
            var _a;
            // find args not in command line
            const args = utils_1.getArgs(command);
            const opts = cmd.opts();
            const undefindedArgs = args.filter((arg) => !Object.keys(opts).includes(arg.name));
            // ask missing args
            const resAskArgs = await utils_1.askCommandArgs(undefindedArgs);
            // All commands arguments are completed
            const argValues = Object.assign(Object.assign({}, opts), resAskArgs);
            // generate files
            const genActions = command.actions;
            const templateDir = (_a = command.templateDir) !== null && _a !== void 0 ? _a : path_1.default.join(process.cwd(), "./templates");
            await generator_1.generate(genActions, argValues, templateDir);
        });
        return cmd;
    });
});
const run = async () => {
    // print banner
    banner_1.printBanner("Matcha Bot");
    // read configuration
    const config = await config_reader_1.getConfiguration();
    // Register commands
    registerCommands(config.commands);
    // Program definition
    commander_1.program
        .version(version_1.version, "-v,--version", "output the current version")
        .command("list")
        .action(() => listCommands(config.commands));
    commander_1.program.parse(process.argv);
};
exports.run = run;
