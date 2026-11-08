import { stat, copyFile, mkdir } from "node:fs/promises";

import esbuild, { type BuildContext, type BuildOptions } from "esbuild";

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
): Promise<BuildContext> => {
  await mkdir("dist", { recursive: true });

  await Promise.all(
    [
      "index.html",
      "bare_map.html",
      "shieldtest.html",
      "favicon.ico",
      "fonts.css",
    ].map((f) => copyFile(`src/${f}`, `dist/${f}`))
  );
  await copyFile(
    "node_modules/github-fork-ribbon-css/gh-fork-ribbon.css",
    "dist/gh-fork-ribbon.css"
  );

  const localConfig = await maybeLocalConfig();

  const options = {
    entryPoints: [
      "src/americana.js",
      "src/bare_americana.js",
      "src/shieldtest.js",
    ],
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

  // esbuild will pretty-print its own error messages;
  // suppress node.js from printing the exception.
  return esbuild[key](options).catch(() => process.exit(1));
};

export const buildContext = (
  buildOptions: BuildOptions = {}
): Promise<BuildContext> => buildWith("context", buildOptions);

export const build = (
  buildOptions: BuildOptions = {}
): Promise<BuildContext> => buildWith("build", buildOptions);

await build();
