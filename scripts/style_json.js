import { copyFile, writeFile, mkdir } from "fs/promises";

import { buildLayers } from "../src/layer/index.js";

export function generateStyleJSON() {
  writeFile("dist/style.json", JSON.stringify(buildLayers()));
}
