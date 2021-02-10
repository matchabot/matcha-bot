import updateNotifier from "update-notifier-webpack";
import Package from "../../package.json";

export const checkUpdate = () => {
  // Checks for available update and returns an instance

  const updateArgs = {
    pkg: { name: Package.name, version: Package.version },
    updateCheckInterval: 0, //1000 * 60 * 30 // 30 minutes
  };

  const notifier = updateNotifier(updateArgs);

  notifier.check();

  // Notify using the built-in convenience method
  notifier.notify({
    message: "New version available `{updateCommand}` to update.",
  });
};
