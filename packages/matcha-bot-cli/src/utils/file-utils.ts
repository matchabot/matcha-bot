import path from "path"

import {
  existsSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  lstatSync,
  readFileSync
} from "fs"

export type CopyAction = {
  fromPath: string
  toPath: string
  sourceContent: string
  destinationContent: string
}

/**
 * Walk recursively to a directory and return a list of CopyAction objects
 * containing the sourceFilePath, destinationPath, sourceContentFile and transformed destinationContent
 * @param from source directory
 * @param to destination directory
 * @param transformAction transformation function
 * @param currentActions list of actions (must be called initialy with an empty array)
 */
export const walkFolderWithTransformAction = (
  from: string,
  to: string,
  transformAction: (source: string) => string = (s) => s, // identify function by default
  currentActions: CopyAction[] = [] // Empty array
): CopyAction[] => {
  const fileEntries = readdirSync(from)

  const res = fileEntries.reduce(
    (accumulator, currentFile) => {
      // case of a file
      if (lstatSync(path.join(from, currentFile)).isFile()) {
        const fromPath = path.join(from, currentFile)
        const destPath = path.join(to, currentFile)
        const sourceContent = readFileSync(fromPath, { encoding: "utf8" })
        const destinationContent = transformAction(sourceContent)
        const fileAction: CopyAction = {
          fromPath: fromPath,
          toPath: destPath,
          destinationContent: destinationContent,
          sourceContent: sourceContent
        }
        return [...accumulator, fileAction]
      }
      // case of a directory
      const childActions = walkFolderWithTransformAction(
        path.join(from, currentFile),
        path.join(to, currentFile),
        transformAction,
        currentActions
      )

      return [...accumulator, ...childActions]
    },

    currentActions
  )

  return res
}

/**
 * Copy a folder to a desired destination
 * @param from source directory
 * @param to destination directory
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
/**
 * Return the first existing filePath from a list of possibles filePaths
 * @param filePaths
 */
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
