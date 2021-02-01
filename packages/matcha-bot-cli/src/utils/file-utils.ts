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
  toPathExists: boolean
}

/**
 * Walk recursively to a directory and return a list of CopyAction objects
 * containing the sourceFilePath, destinationPath, sourceContentFile and transformed destinationContent
 * @param from source directory
 * @param to destination directory
 * @param currentActions list of actions (must be called initialy with an empty array)
 */
export const walkFolderAndPrepareTransformActions = (
  from: string,
  to: string,
  currentActions: CopyAction[] = [] // Empty array
): CopyAction[] => {
  const fileEntries = readdirSync(from)

  const res = fileEntries.reduce(
    (accumulator, currentFile) => {
      // case of a file
      if (lstatSync(path.join(from, currentFile)).isFile()) {
        const fromPath = path.join(from, currentFile)
        const destPath = path.join(to, currentFile)
        const destPathExists = existsSync(destPath)
        const fileAction: CopyAction = {
          fromPath: fromPath,
          toPath: destPath,
          toPathExists: destPathExists
        }
        return [...accumulator, fileAction]
      }
      // case of a directory
      const childActions = walkFolderAndPrepareTransformActions(
        path.join(from, currentFile),
        path.join(to, currentFile),
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
export const copyFolderSync = (
  from: string,
  to: string,
  confirmWriteExistingFile: (filePath: string) => boolean = (filePath) => true
) => {
  if (!existsSync(to)) {
    mkdirSync(to)
  }
  readdirSync(from).forEach((element) => {
    if (lstatSync(path.join(from, element)).isFile()) {
      copyFileSync(path.join(from, element), path.join(to, element))
    } else {
      copyFolderSync(
        path.join(from, element),
        path.join(to, element),
        confirmWriteExistingFile
      )
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
