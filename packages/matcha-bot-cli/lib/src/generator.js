"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.generator = void 0;
const tslib_1 = require("tslib");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const register_helper_1 = require("./register-helper");
const enquirer_1 = tslib_1.__importDefault(require("enquirer"));
register_helper_1.registerHelper();
const generator = (templateSpec, data) => {
    const template = handlebars_1.default.compile(templateSpec);
    const output = template(data);
    return output;
};
exports.generator = generator;
const generate = async (actions, data, templatePath) => {
    return await Promise.all(actions.map(async (action) => {
        const sourceTemplateFilePath = path_1.default.join(templatePath, action.sourceTemplate);
        const destTemplate = exports.generator(action.outFile, data);
        const outputFilePath = path_1.default.join(process.cwd(), destTemplate);
        const templateContent = fs_extra_1.default.readFileSync(sourceTemplateFilePath, {
            encoding: "utf8",
            flag: "r"
        });
        const outFileContent = exports.generator(templateContent, data);
        const fileExists = fs_extra_1.default.pathExistsSync(outputFilePath);
        const question = {
            type: "confirm",
            name: "overwrite",
            message: `Overwrite the file ${outputFilePath}`,
            default: true
        };
        let canWriteOutfile = !fileExists;
        if (fileExists) {
            //console.log(`File ${outputFilePath} exists !`)
            const response = await enquirer_1.default.prompt([question]);
            //console.dir(response, { depth: null })
            if (response.overwrite) {
                canWriteOutfile = true;
            }
        }
        if (canWriteOutfile) {
            console.log(`writing file ${outputFilePath}`);
            const dirPath = path_1.default.dirname(outputFilePath);
            await fs_extra_1.default.ensureDir(dirPath);
            await fs_extra_1.default.writeFile(outputFilePath, outFileContent);
        }
        else {
            //console.log(`Skipping file ${outputFilePath}`)
        }
    }));
};
exports.generate = generate;
