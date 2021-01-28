export declare type ArgumentType = "string" | "number" | "path" | "list";
export interface IChoiceValue {
    name: string;
    value: unknown;
}
export declare type Argument = {
    type: ArgumentType;
    name: string;
    alias?: string;
    description?: string;
    default: unknown;
    choices?: (string | IChoiceValue)[];
};
/**
 * A command
 */
export declare type Action = {
    name?: string;
    description?: string;
    args?: Argument[];
};
/**
 */
export declare type ActionGenerate = Action & {
    type: "template";
    /**
     * The source file template
     */
    sourceTemplate: string;
    /**
     * The fileName of the genated file
     */
    outFile: string;
};
export declare type Command = {
    name: string;
    description?: string;
    args: Argument[];
    actions: ActionGenerate[];
    templateDir?: string;
};
export declare type Commands = Record<string, Command>;
/**
 * Matcha Configuration
 */
export declare type Configuration = {
    outputDirectory: string;
    commands: Commands;
};
