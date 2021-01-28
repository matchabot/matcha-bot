"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = exports.executeTemplate = void 0;
const tslib_1 = require("tslib");
const handlebars_1 = tslib_1.__importDefault(require("handlebars"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const register_handlebars_helper_1 = require("./register-handlebars-helper");
const inquirer_1 = require("inquirer");
register_handlebars_helper_1.registerHandlebarsHelper();
/**
 *
 * @param templateSpec
 * @param data
 */
const executeTemplate = (templateSpec, data) => {
    const template = handlebars_1.default.compile(templateSpec);
    const output = template(data);
    return output;
};
exports.executeTemplate = executeTemplate;
/**
 *
 * @param actions
 * @param data
 * @param templatePath
 */
const generate = async (actions, data, templatePath) => {
    const outFilesToWrite = await Promise.all(actions.map((action) => {
        return prepareFiles(action, templatePath, data);
    }));
    const outFilesToWriteNoExisting = outFilesToWrite.filter((f) => !f.fileExists);
    const outFilesToWriteExisting = outFilesToWrite.filter((f) => f.fileExists);
    const overWriteFileAnswers = outFilesToWriteExisting.map((f, index) => ({
        type: "confirm",
        name: `q${index}`,
        message: `Overwrite the file ${f.outputFilePath}`,
        default: true
    }));
    const answers = await inquirer_1.prompt(overWriteFileAnswers);
    const overWriteFileResult = outFilesToWriteExisting
        .map((f, index) => (Object.assign(Object.assign({}, f), { overwrite: answers[`q${index}`] })))
        .filter((f) => f.overwrite)
        .map((_a) => {
        var { overwrite } = _a, other = tslib_1.__rest(_a, ["overwrite"]);
        return (Object.assign({}, other));
    });
    const finalFilesToWrite = [
        ...outFilesToWriteNoExisting,
        ...overWriteFileResult
    ];
    console.log(`\r\nGenerating files:\r\n`);
    finalFilesToWrite.map((file) => {
        console.log(` ✅ ${file.outputFilePath}`);
        writeFile(file.outputFilePath, file.outFileContent);
    });
    console.log("\r\n");
};
exports.generate = generate;
const prepareFiles = async (action, templatePath, data) => {
    // We evaluate the templat with variables in data
    const sourceTemplate = exports.executeTemplate(action.sourceTemplate, data);
    const destTemplate = exports.executeTemplate(action.outFile, data);
    // Normalize directory path
    const sourceTemplateFilePath = path_1.default.join(templatePath, sourceTemplate);
    const outputFilePath = path_1.default.join(process.cwd(), destTemplate);
    // Read source template
    const templateContent = fs_extra_1.default.readFileSync(sourceTemplateFilePath, {
        encoding: "utf8",
        flag: "r"
    });
    // Execute template
    const outFileContent = exports.executeTemplate(templateContent, data);
    // Check if destination outputFilePath exists
    const fileExists = fs_extra_1.default.pathExistsSync(outputFilePath);
    return {
        outputFilePath: outputFilePath,
        outFileContent: outFileContent,
        fileExists: fileExists
    };
};
/**
 *
 * @param filePath path of the file
 * @param content content to write
 */
const writeFile = (filePath, content) => {
    const dirPath = path_1.default.dirname(filePath);
    fs_extra_1.default.ensureDirSync(dirPath);
    fs_extra_1.default.writeFileSync(filePath, content);
    return true;
};
