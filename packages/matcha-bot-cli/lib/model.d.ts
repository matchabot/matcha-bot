export declare type ArgumentType = string | number;
export declare type Argument = {
    type: ArgumentType;
    name: string;
    description?: string;
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
    args: Argument[];
    actions: (ActionGenerate | Action)[];
};
export declare type Commands = Record<string, Command>;
