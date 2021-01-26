import { Commands, Command, Argument } from "./model";
export declare const getCommands: (commands: Commands) => Command[];
export declare const getArgs: (command: Command) => Argument[];
export declare const getCommandNames: (commands: Commands) => string[];
export declare const askCommandArgs: (args: Argument[]) => Promise<Record<string, unknown>>;
