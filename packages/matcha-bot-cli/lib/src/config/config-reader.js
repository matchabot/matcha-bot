"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = void 0;
const tslib_1 = require("tslib");
const fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const configDir = "./.matchabot";
/**
 * Search configuration files matcha.json inside ./.matchabot/** directory
 */
const getConfiguration = async () => {
    const filePath = path_1.default.join(process.cwd(), configDir);
    const searchConfigPattern = `${filePath}/**/matcha.json`;
    const entries = await fast_glob_1.default([searchConfigPattern], { dot: true });
    const log = debug_1.default("getConfiguration");
    log(searchConfigPattern);
    log(entries);
    const commandsConfig = await Promise.all(entries.map(async (entry) => {
        const configContent = await fs_extra_1.default.readFile(entry, { encoding: "utf8" });
        const cmdConfig = JSON.parse(configContent);
        const configPath = path_1.default.dirname(entry);
        const cmd = {
            name: cmdConfig.name,
            templateDir: configPath,
            args: cmdConfig.args,
            actions: cmdConfig.actions
        };
        return cmd;
    }));
    const commands = commandsConfig.reduce((commands, cmd) => {
        commands[cmd.name] = cmd;
        return commands;
    }, {});
    return {
        outputDirectory: process.cwd(),
        commands: commands
    };
};
exports.getConfiguration = getConfiguration;
