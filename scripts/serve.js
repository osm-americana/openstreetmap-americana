import serve from "create-serve";

import { build } from "./build.js";

await build(() => serve.update(), { minify: false });
serve.start({ port: 1776, root: "dist/" });
