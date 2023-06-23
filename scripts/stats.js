import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --all-layers", "summary layer stats")
  .option("-c, --layer-count", "count number of layers")
  .option("-s, --layer-size", "size of all layers")
  .option("-loc, --locales <locale1 locale2...>", "language codes", ["mul"])
  .option("-j, --all-json", "output all stats in JSON")
  .option("-pp, --pretty", "pretty-print JSON output");

program.parse(process.argv);

const opts = program.opts();

if (Object.keys(opts).length === 1) program.help();

const locales = opts.locales[0].split(",");

const style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  "https://osm-americana.github.io/fontstack66/{fontstack}/{range}.pbf",
  locales
);

const layers = style.layers;
const layerCount = layers.length;

if (opts.layerCount) {
  console.log(layerCount);
  process.exit();
}

const styleSize = JSON.stringify(layers).length;

if (opts.layerSize) {
  console.log(styleSize);
  process.exit();
}

const layerMap = new Map();

const stats = {
  layerCount,
  styleSize,
  layerGroup: {},
};

for (let i = 0; i < layerCount; i++) {
  const layer = layers[i];
  layerMap.set(layer.id, layers[i]);
  const layerSize = JSON.stringify(layer).length;
  const layerGroup = layer["source-layer"] || layer.source || layer.type;
  if (stats.layerGroup[layerGroup]) {
    stats.layerGroup[layerGroup].size += layerSize;
    stats.layerGroup[layerGroup].count++;
  } else {
    stats.layerGroup[layerGroup] = {
      size: layerSize,
      count: 1,
    };
  }
}

if (opts.allJson) {
  process.stdout.write(JSON.stringify(stats, null, opts.pretty ? 2 : null));
  process.exit();
}

if (opts.allLayers) {
  for (const layerGroup in stats.layerGroup) {
    let layerStats = stats.layerGroup[layerGroup];
    let layerString = `${layerGroup}(${layerStats.count})`.padEnd(30, ".");
    console.log(
      `${layerString}${layerStats.size
        .toLocaleString("en-US")
        .padStart(10, ".")} bytes`
    );
  }
}
