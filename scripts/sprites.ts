import fs from "node:fs/promises";
import path from "path";
import { Command, Option } from "commander";

import { glob } from "glob";
import { Sprites, SpriteSheetResult, SvgId } from "@basemaps/sprites";

const program = new Command();
program
  .name("sprites")
  .description("Generate sprite sheets from SVG icons")
  .addOption(
    new Option(
      "-i, --input <dir>",
      "input directory containing SVG icons"
    ).default("./icons")
  )
  .addOption(
    new Option(
      "-o, --output <dir>",
      "output directory for generated sprite sheets"
    ).default("./dist/sprites")
  )
  .addOption(new Option("-h, --help", "display help for command"));

program.parse(process.argv);

const opts = program.opts();

if (opts.help) {
  program.help();
}

const inputDir = opts.input;
const outputDir = opts.output;

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
