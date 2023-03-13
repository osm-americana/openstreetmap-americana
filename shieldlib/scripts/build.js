import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import esbuild from "esbuild";

const buildWith = async (key, buildOptions) => {
  await mkdir("dist", { recursive: true });

  const options = {
    entryPoints: ["src/index.ts"],
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "dist",
    logLevel: "info",
    ...buildOptions,
    define: {
      ...buildOptions?.define,
    },
  };
  return (
    esbuild[key](options)
      // esbuild will pretty-print its own error messages;
      // suppress node.js from printing the exception.
      .catch(() => process.exit(1))
  );
};

export const buildContext = (buildOptions = {}) =>
  buildWith("context", buildOptions);

export const build = (buildOptions = {}) => buildWith("build", buildOptions);

const mainModule = pathToFileURL(process.argv[1]).toString();

await build({});
