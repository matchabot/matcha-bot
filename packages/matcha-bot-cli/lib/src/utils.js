"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askCommandArgs = exports.getCommandNames = exports.getArgs = exports.getCommands = void 0;
const enquirer_1 = require("enquirer");
const getCommands = (commands) => {
    return Object.keys(commands).map((k) => commands[k]);
};
exports.getCommands = getCommands;
const getArgs = (command) => {
    return command.args;
};
exports.getArgs = getArgs;
const getCommandNames = (commands) => exports.getCommands(commands).map((c) => c.name);
exports.getCommandNames = getCommandNames;
const askCommandArgs = async (args) => {
    // generate a list of questions
    const questions = args.map((arg) => {
        var _a;
        return ({
            type: "input",
            name: arg.name,
            message: (_a = arg.description) !== null && _a !== void 0 ? _a : `${arg.name}`
        });
    });
    const responses = await enquirer_1.prompt(questions);
    return responses;
};
exports.askCommandArgs = askCommandArgs;
