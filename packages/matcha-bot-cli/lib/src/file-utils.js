"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFirstExisting = exports.copyFolderSync = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const copyFolderSync = (from, to) => {
    if (!fs_1.existsSync(to)) {
        fs_1.mkdirSync(to);
    }
    fs_1.readdirSync(from).forEach((element) => {
        if (fs_1.lstatSync(path_1.default.join(from, element)).isFile()) {
            fs_1.copyFileSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
        else {
            exports.copyFolderSync(path_1.default.join(from, element), path_1.default.join(to, element));
        }
    });
};
exports.copyFolderSync = copyFolderSync;
const findFirstExisting = (filePaths) => {
    const resultFile = filePaths.find((filePath) => fs_1.existsSync(filePath));
    return resultFile;
};
exports.findFirstExisting = findFirstExisting;
