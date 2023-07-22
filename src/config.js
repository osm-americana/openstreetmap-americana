// The build script injects this global variable if "local.config.js"
// exists in the project root (alongside package.json). That file is in
// gitignore and so can be modified without making changes to this file.

const importConfig = () => {
  if (typeof CONFIG_PATH !== "undefined") {
    return import(CONFIG_PATH);
  } else {
    return import("./configs/config.aws.js");
  }
};

export async function getConfig() {
  try {
    const module = await importConfig();
    return module.default;
  } catch (error) {
    console.error(error);
  }
}
