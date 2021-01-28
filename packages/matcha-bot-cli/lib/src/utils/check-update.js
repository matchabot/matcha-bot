"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdate = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const checkUpdate = () => {
    const updateNotifier = require("update-notifier");
    const pathPackageJson = path_1.default.join(__dirname, "../../package.json");
    const pkg = require(pathPackageJson);
    // Checks for available update and returns an instance
    const notifier = updateNotifier({ pkg });
    // Notify using the built-in convenience method
    notifier.notify();
    // `notifier.update` contains some useful info about the update
    console.log(notifier.update);
};
exports.checkUpdate = checkUpdate;
