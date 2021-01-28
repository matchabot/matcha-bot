"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const file_utils_1 = require("../utils/file-utils");
/**
 * Create initial .matchabot directory with example of commands
 */
const initCommand = () => {
    const templateDir = path_1.default.join(__dirname, "../init_template");
    const dest = path_1.default.join(process.cwd(), "./.matchabot");
    file_utils_1.copyFolderSync(templateDir, dest);
    console.log(`\r\n ✅ Configuration fodler ${dest} created\r\n`);
};
exports.initCommand = initCommand;
