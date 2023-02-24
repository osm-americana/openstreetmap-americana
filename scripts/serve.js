import open from "open";

import { buildContext } from "./build.js";

const port = 1776;

const context = await buildContext({
  define: { "window.LIVE_RELOAD": "true" },
});
await context.watch();
await context.serve({ servedir: "dist", host: "::", port });

open(`http://localhost:${port}/`);
