import { Commands, Command, Argument, ArgumentType } from "../model"
import { prompt } from "inquirer"

const getInputType = (inputType: ArgumentType) => {
  switch (inputType) {
    case "string":
      return "input"
    case "number":
      return "number"
    case "path":
      return "path"
    case "list":
      return "list"
    default:
      return "input"
  }
}

export const getCommands = (commands: Commands) => {
  return Object.keys(commands).map((k) => commands[k])
}

export const getArgs = (command: Command) => {
  return command.args
}

export const getCommandNames = (commands: Commands) =>
  getCommands(commands).map((c) => c.name)

export const askCommandArgs = async (args: Argument[]) => {
  // generate a list of questions
  const questions = args.map((arg) => ({
    type: getInputType(arg.type),
    name: arg.name,
    message: arg.description ?? `${arg.name}`,
    default: arg.default,
    choices: arg.choices
  }))

  const responses: Record<string, unknown> = await prompt(questions)
  return responses
}
