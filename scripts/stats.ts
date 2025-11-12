import { Command, Option, OptionValues } from "commander";
import fs from "node:fs";
import zlib from "node:zlib";
import type { LayerSpecification } from "@maplibre/maplibre-gl-style-spec";

interface Stats {
  layerCount: number;
  styleSize: number;
  gzipStyleSize: number;
  layerGroup: {
    [key: string]: {
      size: number;
      layerCount: number;
    };
  };
  spriteSheet1xSize: number;
  spriteSheet2xSize: number;
  shieldJSONSize: number;
  gzipShieldJSONSize: number;
}

const program = new Command();
program
  .addOption(
    new Option("-a, --all-layers", "summary layer stats")
      .conflicts("layerCount")
      .conflicts("layerSize")
      .conflicts("allJson")
  )
  .addOption(
    new Option("-c, --layer-count", "count number of layers")
      .conflicts("layerSize")
      .conflicts("allJson")
  )
  .addOption(
    new Option("-s, --layer-size", "size of all layers").conflicts("allJson")
  )
  .addOption(
    new Option(
      "-ss1, --spritesheet-1x-size",
      "size of 1x sprite sheet"
    ).conflicts("allJson")
  )
  .addOption(
    new Option(
      "-ss2, --spritesheet-2x-size",
      "size of 2x sprite sheet"
    ).conflicts("allJson")
  )
  .addOption(
    new Option("-sh, --shield-json-size", "size of ShieldJSON").conflicts(
      "allJson"
    )
  )
  .addOption(
    new Option(
      "-gsh, --gzip-shield-json-size",
      "gzip compressed size of ShieldJSON"
    ).conflicts("allJson")
  )
  .addOption(
    new Option(
      "-gs, --gzip-style-size",
      "gzip compressed size of style"
    ).conflicts("allJson")
  )
  .addOption(new Option("-j, --all-json", "output all stats in JSON"))
  .addOption(new Option("-pp, --pretty", "pretty-print JSON output"))
  .addOption(
    new Option(
      "-d, --directory <dir>",
      "specify location of Americana distribution"
    ).default("dist")
  );

program.parse(process.argv);

const opts: OptionValues = program.opts();

if (Object.keys(opts).length === 1) program.help();

const distDir = opts.directory;

// File locations
const sprite1xPNG = `${distDir}/sprites/sprite.png`;
const sprite1xJSON = `${distDir}/sprites/sprite.json`;
const sprite2xPNG = `${distDir}/sprites/sprite@2x.png`;
const sprite2xJSON = `${distDir}/sprites/sprite@2x.json`;
const shieldJSONPath = `${distDir}/shields.json`;
const styleJSONPath = `${distDir}/style.json`;

const style = JSON.parse(fs.readFileSync(styleJSONPath, "utf8"));
const layers = style.layers as LayerSpecification[];
const layerCount = layers.length;

if (opts.layerCount) {
  console.log(layerCount);
  process.exit();
}

function spriteSheetSize(distDir: string, single: boolean): number {
  const pngPath = single ? sprite1xPNG : sprite2xPNG;
  const jsonPath = single ? sprite1xJSON : sprite2xJSON;
  return fs.statSync(pngPath).size + fs.statSync(jsonPath).size;
}

function distFileSize(distDir: string, path: string): number {
  return fs.statSync(`${distDir}/${path}`).size;
}

function gzipSize(content: string): number {
  return zlib.gzipSync(content).length;
}

const spriteSheet1xSize = spriteSheetSize(distDir, true);
if (opts.spritesheet1xSize) {
  console.log(spriteSheet1xSize);
  process.exit();
}

const spriteSheet2xSize = spriteSheetSize(distDir, false);
if (opts.spritesheet2xSize) {
  console.log(spriteSheet2xSize);
  process.exit();
}

const shieldJSONSize = distFileSize(distDir, "shields.json");
if (opts.shieldJsonSize) {
  console.log(shieldJSONSize);
  process.exit();
}

const shieldJSONContent = fs.readFileSync(shieldJSONPath, "utf8");
const gzipShieldJSONSize = gzipSize(shieldJSONContent);
if (opts.gzipShieldJsonSize) {
  console.log(gzipShieldJSONSize);
  process.exit();
}

const styleContent = JSON.stringify(layers);
const styleSize = styleContent.length;
if (opts.layerSize) {
  console.log(styleSize);
  process.exit();
}

const gzipStyleSize = gzipSize(styleContent);
if (opts.gzipStyleSize) {
  console.log(gzipStyleSize);
  process.exit();
}

const layerMap = new Map<string, LayerSpecification>();

const stats: Stats = {
  layerCount,
  styleSize,
  gzipStyleSize,
  layerGroup: {},
  spriteSheet1xSize,
  spriteSheet2xSize,
  shieldJSONSize,
  gzipShieldJSONSize,
};

for (let i = 0; i < layerCount; i++) {
  const layer = layers[i];
  layerMap.set(layer.id, layers[i]);
  const layerSize = JSON.stringify(layer).length;
  const layerGroup =
    (layer as any)["source-layer"] || (layer as any).source || layer.type;
  if (stats.layerGroup[layerGroup]) {
    stats.layerGroup[layerGroup].size += layerSize;
    stats.layerGroup[layerGroup].layerCount++;
  } else {
    stats.layerGroup[layerGroup] = {
      size: layerSize,
      layerCount: 1,
    };
  }
}

if (opts.allJson) {
  process.stdout.write(
    JSON.stringify(stats, undefined, opts.pretty ? 2 : undefined)
  );
  process.exit();
}

if (opts.allLayers) {
  for (const layerGroup in stats.layerGroup) {
    let layerStats = stats.layerGroup[layerGroup];
    let layerString = `${layerGroup}(${layerStats.layerCount})`.padEnd(30, ".");
    console.log(
      `${layerString}${layerStats.size
        .toLocaleString("en-US")
        .padStart(10, ".")} bytes`
    );
  }
}
