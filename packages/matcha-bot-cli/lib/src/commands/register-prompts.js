"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPrompts = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const registerPrompts = () => {
    inquirer_1.default.registerPrompt("path", require("inquirer-fuzzy-path"));
};
exports.registerPrompts = registerPrompts;
