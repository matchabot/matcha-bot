import { ActionGenerate } from "./model";
export declare const generator: (templateSpec: string, data: Record<string, unknown>) => string;
export declare const generate: (actions: ActionGenerate[], data: Record<string, unknown>, templatePath: string) => Promise<void[]>;
