/**
 * Possible types accept as input type
 */
export type ArgumentType = "string" | "number" | "path" | "list" | "password";

/**
 * Value in a list
 */
export interface IChoiceValue {
  name: string;
  value: unknown;
}

/**
 * Command argument
 */
export type Argument = {
  /**
   * Kind of argument (string | number | path )
   */
  type: ArgumentType;
  /**
   * Variable name
   */
  name: string;
  /**
   * Alias
   */
  alias?: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Default value, this value will be interpreted and can contain variables evaluation formula
   */
  default: string;
  /**
   * A list of possible values
   */
  choices?: (string | IChoiceValue)[];
};

/**
 * A command action step
 */
export type Action = {
  name?: string;
  description?: string;
  args?: Argument[];
};

/**
 * A template action the source file will interpreted
 */
export type ActionTemplate = {
  type: "template";
  /**
   * The source file template
   */
  source: string;
  /**
   * The fileName of the genated file
   */
  target: string;
};

/**
 * A copy action
 */
export type ActionCopy = {
  type: "copy";
  /**
   * The source file template
   */
  source: string;
  /**
   * The fileName of the generated file
   */
  target: string;
};

/**
 * A copy of the directory source to target
 */
export type ActionCopyDirectory = {
  type: "copy-directory";
  /**
   * The source file template
   */
  source: string;
  /**
   * The fileName of the generated file
   */
  target: string;
};

/**
 * An intelligent copy of a directory with template evaluation
 */
export type ActionTemplateDirectory = {
  type: "template-directory";
  /**
   * The source file template
   */
  source: string;
  /**
   * The fileName of the generated file
   */
  target: string;
};

/**
 * Possible actions
 */
export type ActionGenerate =
  | ActionTemplate
  | ActionCopy
  | ActionCopyDirectory
  | ActionTemplateDirectory;

export type Command = {
  name: string;
  description?: string;
  version?: string;
  args: Argument[];
  actions: ActionGenerate[];
  templateDir?: string;
};

/**
 * A dictionary of commands
 */
export type Commands = Record<string, Command>;

/**
 * A generator
 */

export type MatchaGenerator = {
  name: string;
  description?: string;
  version: string;
  filePath: string;
  commands: Commands;
};

/**
 * A dictionary of generators
 */
export type MatchaGenerators = Record<string, MatchaGenerator>;

/**
 * The root object for a Matcha Configuration
 */
export type Configuration = {
  outputDirectory: string;
  generators: MatchaGenerators;
};

/**
 *  Interface for question to the user
 */
export interface IQuestion {
  type: string;
  name: string;
  message: string;
  default: string;
  choices: (string | IChoiceValue)[] | undefined;
}
