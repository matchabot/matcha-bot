import path from "path"
import { copyFolderSync } from "../utils/file-utils"
import fs from "fs-extra"

/**
 * Create initial .matchabot directory with example of commands
 */
export const initCommand = () => {
  const project = path.join(__dirname, "../../tsconfig.json")
  const dev = fs.existsSync(project)

  const templateDir = path.join(
    __dirname,
    dev ? "../../init_template" : "../init_template"
  )

  const dest = path.join(process.cwd(), "./.matchabot")
  copyFolderSync(templateDir, dest)

  console.log(`\r\n ✅ Configuration fodler ${dest} created\r\n`)
}
