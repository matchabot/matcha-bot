"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;
const tslib_1 = require("tslib");
const generator_1 = require("../template-generator/generator");
const commands_util_1 = require("./commands-util");
const commander_1 = require("commander");
const path_1 = tslib_1.__importDefault(require("path"));
/**
 * Register a list of commands
 * @param commands
 */
const registerCommands = (commands) => commands_util_1.getCommands(commands).map((command) => {
    const cmd = commander_1.program.command(command.name);
    command.args.map((args) => {
        var _a;
        const optionName = args.name;
        const optionFlag = (_a = args.alias) !== null && _a !== void 0 ? _a : args.name.toLocaleLowerCase().slice(0, 1);
        const option = `-${optionFlag}, --${optionName} <${optionName}>`;
        cmd.option(option, args.description);
        cmd.action(async function () {
            var _a;
            // Find args not in command line
            const args = commands_util_1.getArgs(command);
            const opts = cmd.opts();
            const undefindedArgs = args.filter((arg) => !Object.keys(opts).includes(arg.name));
            // Ask missing args
            const resAskArgs = await commands_util_1.askCommandArgs(undefindedArgs);
            // All commands arguments are completed
            const argValues = Object.assign(Object.assign({}, opts), resAskArgs);
            // generating files
            const genActions = command.actions;
            const templateDir = (_a = command.templateDir) !== null && _a !== void 0 ? _a : path_1.default.join(process.cwd(), "./templates");
            console.log("\r\n🍵 Generating files:\r\n");
            await generator_1.generate(genActions, argValues, templateDir);
        });
        return cmd;
    });
});
exports.registerCommands = registerCommands;
