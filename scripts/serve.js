import serve from "create-serve";

import { build } from "./build.js";

await build(() => serve.update(), { minify: false }).catch(() =>
  process.exit(1)
);
serve.start({ port: 1776, root: "dist/" });
