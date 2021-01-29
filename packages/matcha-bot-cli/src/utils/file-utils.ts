import path from "path"
import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from "fs"

/*
  Copy folder from to a destination
 */
export const copyFolderSync = (from: string, to: string) => {
  if (!existsSync(to)) {
    mkdirSync(to)
  }
  readdirSync(from).forEach((element) => {
    if (lstatSync(path.join(from, element)).isFile()) {
      copyFileSync(path.join(from, element), path.join(to, element))
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element))
    }
  })
}

export const findFirstExisting = (filePaths: ReadonlyArray<string>) => {
  const resultFile = filePaths.find((filePath) => existsSync(filePath))

  return resultFile
}

/**
 *
 * Return the localPath from a full Path
 *
 * @param fullPath a fullPath
 * @param currentDir the current directory
 */
export const localPath = (fullPath?: string, currentDir?: string) => {
  const dir = currentDir ?? process.cwd()
  if (!fullPath) return ""
  if (fullPath.startsWith(dir)) {
    return `.${fullPath.substring(dir.length)}`
  }
  return fullPath
}
