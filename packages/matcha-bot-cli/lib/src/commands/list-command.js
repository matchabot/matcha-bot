"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommands = void 0;
const commands_util_1 = require("./commands-util");
/**
 *
 * Display all commands
 *
 * @param commands
 */
const listCommands = (commands) => {
    const listCommands = commands_util_1.getCommands(commands);
    listCommands.map((command, index) => {
        console.log(`[${index + 1}/${listCommands.length}]: 👉 ${command.name} ${command.description ? ": " + command.description : ""}`);
    });
};
exports.listCommands = listCommands;
