import path from "path"
import { existsSync, mkdirSync, copyFileSync, readdirSync, lstatSync } from "fs"

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
