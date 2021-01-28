import { Configuration } from "../model";
/**
 * Search configuration files matcha.json inside ./.matchabot/** directory
 */
export declare const getConfiguration: () => Promise<Configuration>;
