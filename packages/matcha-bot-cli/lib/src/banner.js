"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBanner = void 0;
const tslib_1 = require("tslib");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const gradient_string_1 = tslib_1.__importDefault(require("gradient-string"));
const version_1 = require("./version");
const printBanner = (banner) => {
    console.log(gradient_string_1.default.rainbow(figlet_1.default.textSync(banner, {
        font: "Small"
    })));
    console.log(`Version: ${version_1.version} 🍵\r\n`);
};
exports.printBanner = printBanner;
