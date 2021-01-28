"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandlebarsHelper = void 0;
const tslib_1 = require("tslib");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const registerHandlebarsHelper = () => {
    handlebars_1.default.registerHelper("camelCase", function (s) {
        return lodash_1.default.camelCase(s);
    });
    handlebars_1.default.registerHelper("upperCamelCase", function (s) {
        return lodash_1.default.upperFirst(lodash_1.default.camelCase(s));
    });
    handlebars_1.default.registerHelper("snakeCase", function (s) {
        return lodash_1.default.snakeCase(s);
    });
    handlebars_1.default.registerHelper("kebabCase", function (s) {
        return lodash_1.default.kebabCase(s);
    });
    handlebars_1.default.registerHelper("toLowerCase", function (s) {
        return s.toLowerCase();
    });
    handlebars_1.default.registerHelper("toUpperCase", function (s) {
        return s.toUpperCase();
    });
    handlebars_1.default.registerHelper("formatDate", function (d, format) {
        return moment_1.default(d).format(format);
    });
    handlebars_1.default.registerHelper("currentDate", function () {
        return moment_1.default();
    });
};
exports.registerHandlebarsHelper = registerHandlebarsHelper;
