import fs from "node:fs/promises";
import path from "path";

import { glob } from "glob";
import { Sprites, SpriteSheetResult, SvgId } from "@basemaps/sprites";

const args = process.argv.slice(2);
let inputDir = "./icons";
let outputDir = "./dist/sprites";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "-i" && i + 1 < args.length) {
    inputDir = args[i + 1];
    i++;
  } else if (args[i] === "-o" && i + 1 < args.length) {
    outputDir = args[i + 1];
    i++;
  }
}

console.log(`Input directory: ${inputDir}`);
console.log(`Output directory: ${outputDir}`);

await fs.mkdir(outputDir, { recursive: true });

const sprites: SvgId[] = await Promise.all(
  (
    await glob(`${inputDir}/*.svg`)
  ).map(async (spritePath: string): Promise<SvgId> => {
    const id = path.parse(spritePath).name;
    const buffer = await fs.readFile(spritePath);
    return { id, buffer };
  })
);

console.log(`Building ${sprites.length} sprites`);

const generated: SpriteSheetResult[] = await Sprites.generate(
  sprites,
  [1, 2, 3]
);

for (const result of generated) {
  const scaleText: string =
    result.pixelRatio === 1 ? "" : `@${result.pixelRatio}x`;
  const outputPng: string = `${outputDir}/sprite${scaleText}.png`;
  const outputJson: string = `${outputDir}/sprite${scaleText}.json`;

  await fs.writeFile(outputPng, result.buffer);
  await fs.writeFile(outputJson, JSON.stringify(result.layout, null, 2));
  const kb: string = (result.buffer.length / 1024).toFixed(1);
  console.log(`Wrote ${kb}KiB to ${outputPng}`);
}
