import { BuildContext } from "esbuild";
import open from "open";

import { buildContext } from "./build";

const port = 1776;

const [mainContext, shieldLibContext]: BuildContext[] = await buildContext({
  define: { "window.LIVE_RELOAD": "true" },
});

await mainContext.watch();
await shieldLibContext.watch();
await mainContext.serve({ servedir: "dist", host: "::", port });

open(`http://localhost:${port}/`);
