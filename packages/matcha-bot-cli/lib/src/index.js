#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const utils_1 = require("./utils");
const example_1 = require("./tests/example");
const commander_1 = require("commander");
const version_1 = require("./version");
const listCommands = () => {
    const listCommands = utils_1.getCommands(example_1.commands);
    listCommands.map((command) => {
        console.log(`👉 ${command.name}`);
    });
};
const run = () => {
    commander_1.program
        .version(version_1.version, "-v,--version", "output the current version")
        .command("list")
        .action(listCommands);
    // Register commands
    utils_1.getCommands(example_1.commands).map((command) => {
        const cmd = commander_1.program.command(command.name);
        command.args.map((args) => {
            const optionName = args.name;
            const optionFlag = args.name.slice(0, 1);
            const option = `-${optionFlag}, --${optionName} <${optionName}>`;
            cmd.option(option, args.description);
            cmd.action(async function () {
                console.dir(cmd.opts(), { depth: null });
                // find args not in command line
                const args = utils_1.getArgs(command);
                const opts = cmd.opts();
                const undefindedArgs = args.filter((arg) => !Object.keys(opts).includes(arg.name));
                console.dir(undefindedArgs);
                // ask missing args
                const resAskArgs = await utils_1.askCommandArgs(undefindedArgs);
                // All commands arguments are completed
                const argValues = Object.assign(Object.assign({}, opts), resAskArgs);
                console.dir(argValues, { depth: null });
            });
        });
    });
    commander_1.program.parse(process.argv);
};
exports.run = run;
