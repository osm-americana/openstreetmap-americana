// Note: esbuild has a serve mode that we're not using here, we're just
// writing files to disk and serving them. You could change this to use
// esbuild's serve mode if you have reason to think that's better.

import serve from "create-serve";
import open from "open";

import { build } from "./build.js";

const port = 1776;

await build(() => serve.update(), { minify: false }).catch(() =>
  process.exit(1)
);
serve.start({ port, root: "dist/" });
open(`http://localhost:${port}/`);
