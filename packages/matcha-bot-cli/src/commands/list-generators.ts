import { recordToArray } from "./commands-util";
import { MatchaGenerators } from "../model";
import { configDir } from "../config/config-reader";
import Table from "cli-table";
import path from "path";
import c from "chalk";
import { localPath } from "../utils/file-utils";

const log = console.log;

/**
 *
 * Display all available generators on the console
 *
 * @param commands
 */
export const listGenerators = (generators: MatchaGenerators) => {
  const listGenerators = recordToArray(generators);
  const dir = process.cwd();

  const generatorTable = listGenerators
    .map((generator) => ({
      name: generator.name,
      description: generator.description ?? "",
      version: generator.version ?? "",
      location: localPath(path.dirname(generator.filePath)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const displayTableArray = generatorTable.reduce((acc, entry) => {
    const { description, name, version, location } = entry;
    const row: Array<string> = [name, description, version, location];
    acc.push(row);
    return acc;
  }, new Table({ head: ["name", "description", "version", "location"], style: { head: ["green"] }, colWidths: [20, 60, 10, 60], colAligns: ["left", "left", "left"] }));

  if (generatorTable.length === 0) {
    log("\r\n");
    log("🍵 No generator available");
    log("\r\n");
    log("Try:");
    log("----");
    log(c.green("$ matchabot init"));
    log("\r\n");
    log(`👉 to create a template directory '${configDir}'`);
    log("\r\n");
  } else {
    const title = `Availables generators`;
    const titleLine = Array(title.length + 1).join("-");
    log(c.greenBright(title));
    log(c.greenBright(titleLine));
    log("");
    log(displayTableArray.toString());
    log("");
  }
};
