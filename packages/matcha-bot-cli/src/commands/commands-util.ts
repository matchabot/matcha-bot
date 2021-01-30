import { Commands, Command, Argument, ArgumentType } from "../model"
import { prompt } from "inquirer"
import { executeTemplate } from "../template-generator/execute-template"
import { cpuUsage } from "process"

/**
 * Map matchabot input type to inquirer input type
 * @param inputType
 */
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

/**
 * Create a commands object from a list of commands
 * @param commands
 */
export const getCommands = (commands: Commands) => {
  return Object.keys(commands).map((k) => commands[k])
}

/**
 * Get arguments for a command
 * @param command
 */
export const getArgs = (command: Command) => {
  return command.args
}

/**
 * Returns commands names from a commands object
 * @param commands
 */
export const getCommandNames = (commands: Commands) =>
  getCommands(commands).map((c) => c.name)

/**
 * Prepare a list of questions from a list of arguments
 * @param args
 */
export const askCommandArgs = async (
  args: Argument[],
  context: Record<string, unknown>
) => {
  // generate a list of questions
  const questions = args.map((arg) => ({
    type: getInputType(arg.type),
    name: arg.name,
    message: arg.description ?? `${arg.name}`,
    default: arg.default ? executeTemplate(arg.default, context) : arg.default, // Interprete default value as an expression
    choices: arg.choices
  }))

  let responses: Record<string, unknown> = {}

  for (const question of questions) {
    const response = await prompt([question])
    responses = { ...response, ...responses }
  }

  return responses
}
