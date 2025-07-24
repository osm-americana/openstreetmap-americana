import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import esbuild from "esbuild";

const buildWith = async (key, buildOptions) => {
  await mkdir("dist", { recursive: true });

  const options = {
    entryPoints: ["src/index.ts"],
    format: "iife",
    globalName: "mapLibreShieldGenerator",
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/maplibre-shield-generator.js",
    logLevel: "info",
    ...buildOptions,
    define: {
      ...buildOptions?.define,
    },
  };
  const cjsOptions = {
    entryPoints: ["src/index.ts"],
    format: "cjs",
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/maplibre-shield-generator-cjs.js",
    logLevel: "info",
    ...buildOptions,
    define: {
      ...buildOptions?.define,
    },
  };
  const esmOptions = {
    entryPoints: ["src/index.ts"],
    format: "esm",
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/maplibre-shield-generator-esm.js",
    logLevel: "info",
    ...buildOptions,
    define: {
      ...buildOptions?.define,
    },
  };

  // esbuild will pretty-print its own error messages;
  // suppress node.js from printing the exception.
  const suppressErrors = () => process.exit(1);

  return [
    esbuild[key](options).catch(suppressErrors),
    esbuild[key](cjsOptions).catch(suppressErrors),
    esbuild[key](esmOptions).catch(suppressErrors),
  ];
};

export const buildContext = (buildOptions = {}) =>
  buildWith("context", buildOptions);

export const build = (buildOptions = {}) => buildWith("build", buildOptions);

const mainModule = pathToFileURL(process.argv[1]).toString();

await build({});
