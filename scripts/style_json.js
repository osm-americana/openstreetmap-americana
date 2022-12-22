import { copyFile, writeFile, mkdir } from "fs/promises";

import { buildLayers } from "../src/layer/layers.js";

writeFile("dist/style.json", JSON.stringify(buildLayers()));
