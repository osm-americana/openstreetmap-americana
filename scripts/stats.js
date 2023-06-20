import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --all-layers", "summary layer stats")
  .option("-c, --layer-count", "count number of layers")
  .option("-s, --layer-size", "size of all layers")
  .option("-l, --layer <layer id>", "stats about one layer")
  .option("-loc, --locales <locale1 locale2...>", "language codes", ["mul"])
  .option("-pp, --pretty", "pretty-print JSON output")
  .option(
    "-pg, --print-group <group prefix>",
    "print a list of the layers in a group"
  )
  .option("-pl, --print-layer <layer id>", "print the JSON of a layer");
program.parse(process.argv);

let opts = program.opts();

if (Object.keys(opts).length === 1) program.help();

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  "https://osm-americana.github.io/fontstack66/{fontstack}/{range}.pbf",
  opts.locales
);

const layers = style.layers;
const layerCount = layers.length;
const layerSize = JSON.stringify(layers).length;

const layerMap = new Map();
const layerGroupMap = new Map();
const layerSizeStats = new Map();
const layerGroupSizeStats = new Map();
const layerGroupCountStats = new Map();

for (let i = 0; i < layers.length; i++) {
  let layer = layers[i];
  layerMap.set(layer.id, layers[i]);
  let layerSize = JSON.stringify(layer).length;
  let layerGroup = layer.id.split("_", 1)[0];
  layerSizeStats.set(layer.id, JSON.stringify(layer).length);
  if (!layerGroupSizeStats.has(layerGroup)) {
    layerGroupSizeStats.set(layerGroup, layerSize);
    layerGroupCountStats.set(layerGroup, 1);
    layerGroupMap.set(layerGroup, [layer.id]);
  } else {
    layerGroupSizeStats.set(
      layerGroup,
      layerGroupSizeStats.get(layerGroup) + layerSize
    );
    layerGroupCountStats.set(
      layerGroup,
      layerGroupCountStats.get(layerGroup) + 1
    );
    layerGroupMap.get(layerGroup).push(layer.id);
  }
}

if (opts.layerCount) {
  console.log(`${layerCount} layers`);
}

if (opts.layerSize) {
  console.log(`Total layer size ${layerSize.toLocaleString("en-US")} bytes`);
}

if (opts.allLayers) {
  console.log(`${layerCount} layers, grouped as follows:`);
  layerGroupSizeStats.forEach((v, k) => {
    let layerCount = layerGroupCountStats.get(k);
    let layerString = `${k}(${layerCount})`.padEnd(30, ".");
    console.log(
      `${layerString}${v.toLocaleString("en-US").padStart(10, ".")} bytes`
    );
  });
}

if (opts.printGroup) {
  layerGroupMap.get(opts.printGroup).forEach((lyr) => console.log(lyr));
}

if (opts.printLayer) {
  if (opts.pretty) {
    console.log(JSON.stringify(layerMap.get(opts.printLayer), null, 2));
  } else {
    console.log(JSON.stringify(layerMap.get(opts.printLayer)));
  }
}
