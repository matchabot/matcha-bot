import updateNotifier from "update-notifier"
import Package from "../../package.json"

export const checkUpdate = () => {
  // Checks for available update and returns an instance
  const notifier = updateNotifier({ pkg: Package })

  // Notify using the built-in convenience method
  notifier.notify()

  // `notifier.update` contains some useful info about the update
  console.log(notifier.update)
}
