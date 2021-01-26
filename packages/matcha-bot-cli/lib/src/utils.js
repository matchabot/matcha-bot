"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandNames = void 0;
const getCommandNames = (commands) => {
    const commandNames = Object.entries(commands).map(([_, c]) => c.name);
    return commandNames;
};
exports.getCommandNames = getCommandNames;
