import serve from "create-serve";
import open from "open";

import { build } from "./build.js";

const port = 1776;

await build(() => serve.update(), { minify: false }).catch(() =>
  process.exit(1)
);
serve.start({ port, root: "dist/" });
open(`http://localhost:${port}/`);
