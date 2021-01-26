#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const utils_1 = require("./utils");
const example_1 = require("./tests/example");
const commander_1 = require("commander");
const version_1 = require("./version");
const listCommands = () => {
    const listCommands = utils_1.getCommandNames(example_1.commands);
    listCommands.map((command) => {
        console.log(`👉 ${command}`);
    });
};
const run = () => {
    commander_1.program
        .version(version_1.version)
        .option("-d, --debug", "output extra debugging")
        .option("-s, --small", "small pizza size")
        .option("-p, --pizza-type <type>", "flavour of pizza");
    commander_1.program.parse(process.argv);
    const options = commander_1.program.opts();
    console.log(options, { depth: null });
};
exports.run = run;
