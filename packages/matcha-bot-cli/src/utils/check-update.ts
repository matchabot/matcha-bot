import path from "path"

export const checkUpdate = () => {
  const updateNotifier = require("update-notifier")
  const pathPackageJson = path.join(__dirname, "../../package.json")
  const pkg = require(pathPackageJson)

  // Checks for available update and returns an instance
  const notifier = updateNotifier({ pkg })

  // Notify using the built-in convenience method
  notifier.notify()

  // `notifier.update` contains some useful info about the update
  console.log(notifier.update)
}
