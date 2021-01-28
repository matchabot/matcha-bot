import path from "path"
import { copyFolderSync } from "../utils/file-utils"
/**
 * Create initial .matchabot directory with example of commands
 */
export const initCommand = () => {
  const templateDir = path.join(__dirname, "../init_template")

  const dest = path.join(process.cwd(), "./.matchabot")
  copyFolderSync(templateDir, dest)

  console.log(`\r\n ✅ Configuration fodler ${dest} created\r\n`)
}
