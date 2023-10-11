import fs from "node:fs/promises";
import path from "node:path";

import { glob } from "glob";
import { Sprites } from "@basemaps/sprites";

await fs.mkdir("./dist/sprites/", { recursive: true });

const sprites = await Promise.all(
  (
    await glob("./icons/*.svg")
  ).map(async (spritePath) => {
    const id = path.parse(spritePath).name;
    const buffer = await fs.readFile(spritePath);
    return { id, buffer };
  })
);

console.log(`Building ${sprites.length} sprites`);

const generated = await Sprites.generate(sprites, [1, 2]);

for (const result of generated) {
  const scaleText = result.pixelRatio === 1 ? "" : `@${result.pixelRatio}x`;
  const outputPng = `./dist/sprites/sprite${scaleText}.png`;
  const outputJson = `./dist/sprites/sprite${scaleText}.json`;

  await fs.writeFile(outputPng, result.buffer);
  await fs.writeFile(outputJson, JSON.stringify(result.layout, null, 2));
  const kb = (result.buffer.length / 1024).toFixed(1);
  console.log(`Wrote ${kb}KiB to ${outputPng}`);
}
