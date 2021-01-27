"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
exports.commands = {
    "create-component": {
        name: "create-component",
        description: "Create a React component",
        actions: [
            {
                type: "template",
                name: "Generate React Component",
                outFile: "Component/{{name}}/index.ts",
                sourceTemplate: "component.ts"
            },
            {
                type: "template",
                name: "Generate Test",
                outFile: "Component/{{name}}/index.test.ts",
                sourceTemplate: "component.test.ts"
            },
            {
                type: "template",
                name: "Generate Story",
                outFile: "Component/{{name}}/index.stories.ts",
                sourceTemplate: "component.stories.ts"
            }
        ],
        args: [
            {
                name: "name",
                description: "Component name",
                type: "string"
            }
        ]
    },
    "generate-invoice": {
        name: "generate-invoice",
        args: [
            {
                name: "company",
                type: "string"
            },
            {
                name: "address",
                type: "string"
            },
            {
                name: "invoiceNumber",
                type: "number"
            }
        ],
        actions: [
            {
                type: "template",
                name: "geninvoice",
                outFile: "./invoide-{invoiceNumber}.txt",
                sourceTemplate: "./invoiceTemplate.txt"
            }
        ]
    }
};
