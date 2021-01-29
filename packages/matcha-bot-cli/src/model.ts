export type ArgumentType = "string" | "number" | "path" | "list"

export interface IChoiceValue {
  name: string
  value: unknown
}

export type Argument = {
  type: ArgumentType
  name: string
  alias?: string
  description?: string
  default: unknown
  choices?: (string | IChoiceValue)[]
}

/**
 * A command
 */
export type Action = {
  name?: string
  description?: string
  args?: Argument[]
}

export type ActionTemplate = {
  type: "template"
  /**
   * The source file template
   */
  sourceTemplate: string
  /**
   * The fileName of the genated file
   */
  outFile: string
}

export type ActionCopy = {
  type: "copy"
  /**
   * The source file template
   */
  sourceTemplate: string
  /**
   * The fileName of the genated file
   */
  outFile: string
}

/**
 */
export type ActionGenerate = ActionTemplate | ActionCopy

export type Command = {
  name: string
  description?: string
  version?: string
  args: Argument[]
  actions: ActionGenerate[]
  templateDir?: string
}

export type Commands = Record<string, Command>

/**
 * Matcha Configuration
 */
export type Configuration = {
  outputDirectory: string
  commands: Commands
}
