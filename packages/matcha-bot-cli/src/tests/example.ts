import { Commands } from "../model"

export const commands: Commands = {
  "create-component": {
    name: "create-component",
    actions: [
      {
        type: "template",
        name: "Generate React Component",
        outFile: "Component/${name}/index.ts",
        sourceTemplate: "component.ts"
      },
      {
        type: "template",
        name: "Generate Test",
        outFile: "Component/${name}/index.test.ts",
        sourceTemplate: "component.test.ts"
      },
      {
        type: "template",
        name: "Generate Story",
        outFile: "Component/${name}/index.stories.ts",
        sourceTemplate: "component.test.ts"
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
    name: "create-story",
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
        name: "invoice-number",
        type: "number"
      }
    ],
    actions: [
      {
        name: "geninvoice",
        outFile: "./invoide-{invoice-number}.txt",
        sourceTemplate: "./invoiceTemplate.txt"
      }
    ]
  }
}
