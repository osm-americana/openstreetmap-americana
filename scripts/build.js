import { copyFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import esbuild from "esbuild";

const buildWith = async (key, buildOptions) => {
  await mkdir("dist", { recursive: true });
  await Promise.all(
    ["index.html", "shieldtest.html", "favicon.ico"].map((f) =>
      copyFile(`src/${f}`, `dist/${f}`)
    )
  );
  return esbuild[key]({
    entryPoints: ["src/americana.js", "src/shieldtest.js"],
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "dist",
    logLevel: "info",
    ...buildOptions,
  });
};

export const buildContext = (buildOptions = {}) =>
  buildWith("context", buildOptions);

export const build = (buildOptions = {}) =>
  buildWith("build", buildOptions)
    // esbuild will pretty-print its own error messages;
    // suppress node.js from printing the exception.
    .catch(() => process.exit(1));

const mainModule = pathToFileURL(process.argv[1]).toString();
const isMain = import.meta.url === mainModule;

if (isMain) {
  await build({
    // defaults to undefined, but force it to get optimized out
    define: { "window.LIVE_RELOAD": "false" },
  });
}
