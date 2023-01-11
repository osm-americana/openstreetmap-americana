import { copyFile, mkdir } from "fs/promises";

import esbuild from "esbuild";

const isMain =
  import.meta.url === new URL(`file://${process.argv[1]}`).toString();

export async function build(updateHook, buildOptions = {}) {
  const watch = updateHook && {
    onRebuild(error, result) {
      if (error) {
        return;
      }
      updateHook();
    },
  };

  await mkdir("dist", { recursive: true });
  return await Promise.all([
    esbuild.build({
      entryPoints: ["src/americana.js", "src/shieldtest.js"],
      format: "esm",
      bundle: true,
      minify: true,
      sourcemap: true,
      outdir: "dist",
      watch,
      logLevel: "info",
      ...buildOptions,
    }),
    copyFile("src/index.html", "dist/index.html"),
    copyFile("src/shieldtest.html", "dist/shieldtest.html"),
  ]);
}

if (isMain) {
  await build().catch(() => process.exit(1));
}
