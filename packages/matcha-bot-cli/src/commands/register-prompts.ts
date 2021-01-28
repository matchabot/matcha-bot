import inquirer from "inquirer"

export const registerPrompts = () => {
  inquirer.registerPrompt("path", require("inquirer-fuzzy-path"))
}
