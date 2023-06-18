import { stat, copyFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import esbuild, { BuildContext, BuildOptions } from "esbuild";

const maybeLocalConfig = async (name = "local.config.js") => {
  let exists = await stat(name)
    .then((st) => st.isFile())
    .catch((err) => {
      if (err.code !== "ENOENT") throw err;
    });
  if (exists) {
    console.log("Local config in use: %o", name);
    return {
      define: {
        CONFIG_PATH: JSON.stringify("../" + name),
      },
    };
  }
};

const buildWith = async (
  key: string,
  buildOptions: BuildOptions
): Promise<BuildContext[]> => {
  await mkdir("dist", { recursive: true });

  await Promise.all(
    ["index.html", "shieldtest.html", "favicon.ico"].map((f) =>
      copyFile(`src/${f}`, `dist/${f}`)
    )
  );

  const localConfig = await maybeLocalConfig();

  const options = {
    entryPoints: ["src/americana.js", "src/shieldtest.js"],
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "dist",
    logLevel: "info",
    ...localConfig,
    ...buildOptions,
    define: {
      ...localConfig?.define,
      ...buildOptions?.define,
    },
  };

  const shieldLibOptions = {
    entryPoints: ["shieldlib/src/index.ts"],
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "shieldlib/dist",
    logLevel: "info",
    ...localConfig,
    ...buildOptions,
    define: {
      ...localConfig?.define,
      ...buildOptions?.define,
    },
  };

  // esbuild will pretty-print its own error messages;
  // suppress node.js from printing the exception.
  const suppressErrors = () => process.exit(1);

  return await Promise.all([
    esbuild[key](options).catch(suppressErrors),
    esbuild[key](shieldLibOptions).catch(suppressErrors),
  ]);
};

export const buildContext = (
  buildOptions: BuildOptions = {}
): Promise<BuildContext[]> => buildWith("context", buildOptions);

export const build = (
  buildOptions: BuildOptions = {}
): Promise<BuildContext[]> => buildWith("build", buildOptions);

await build();
