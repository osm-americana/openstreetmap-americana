import fs from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";
import { Sprites } from "@basemaps/sprites";
import { Command } from "commander";

const program = new Command();
program
  .option("-i, --icons <path>", "path to icons directory", "./icons")
  .option("-o, --output <path>", "output directory for sprites", "./dist/sprites")
  .parse(process.argv);

const opts = program.opts();

await fs.mkdir(opts.output, { recursive: true });

const sprites = await Promise.all(
  (
    await glob(`${opts.icons}/*.svg`)
  ).map(async (spritePath) => {
    const id = path.parse(spritePath).name;
    const buffer = await fs.readFile(spritePath);
    return { id, buffer };
  })
);

console.log(`Building ${sprites.length} sprites from ${opts.icons}`);

const generated = await Sprites.generate(sprites, [1, 2, 3]);

for (const result of generated) {
  const scaleText = result.pixelRatio === 1 ? "" : `@${result.pixelRatio}x`;
  const outputPng = `${opts.output}/sprite${scaleText}.png`;
  const outputJson = `${opts.output}/sprite${scaleText}.json`;

  await fs.writeFile(outputPng, result.buffer);
  await fs.writeFile(outputJson, JSON.stringify(result.layout, null, 2));
  const kb = (result.buffer.length / 1024).toFixed(1);
  console.log(`Wrote ${kb}KiB to ${outputPng}`);
}
