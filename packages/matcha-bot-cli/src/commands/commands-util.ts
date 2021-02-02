import { Commands, Command, Argument, ArgumentType } from "../model"
import { prompt } from "inquirer"
import { executeTemplate } from "../template-generator/execute-template"

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
    case "password":
      return "password"
    default:
      return "input"
  }
}

export const recordToArray = <T>(dic: Record<string, T>) => {
  return Object.keys(dic).map((k) => dic[k])
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
  recordToArray(commands).map((c) => c.name)

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
    default: arg.default ? executeTemplate(arg.default, context) : arg.default, // Interpret default value as an expression
    choices: arg.choices
  }))

  let responses: Record<string, unknown> = {}

  for (const question of questions) {
    const response = await prompt([question])
    responses = { ...response, ...responses }
  }

  return responses
}
