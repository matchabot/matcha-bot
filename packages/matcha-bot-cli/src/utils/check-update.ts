import updateNotifier from "update-notifier-webpack"
import Package from "../../package.json"

export const checkUpdate = () => {
  // Checks for available update and returns an instance
  const notifier = updateNotifier({
    pkg: Package,
    updateCheckInterval: 1000 * 60 * 30 // 30 minutes
  })

  // Notify using the built-in convenience method
  notifier.notify()

  // `notifier.update` contains some useful info about the update
  if (notifier.update) {
    console.log(`Update available: ${notifier.update.latest}`)
  }
}
