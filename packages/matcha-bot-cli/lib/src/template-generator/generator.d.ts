import { ActionGenerate } from "../model";
/**
 *
 * @param templateSpec
 * @param data
 */
export declare const executeTemplate: (templateSpec: string, data: Record<string, unknown>) => string;
/**
 *
 * @param actions
 * @param data
 * @param templatePath
 */
export declare const generate: (actions: ActionGenerate[], data: Record<string, unknown>, templatePath: string) => Promise<void>;
