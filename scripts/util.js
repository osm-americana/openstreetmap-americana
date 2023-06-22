import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-pp, --pretty", "pretty-print JSON output")
  .option(
    "-pg, --print-group <group prefix>",
    "print a list of the layers in a group"
  )
  .option("-pl, --print-layer <layer id>", "print the JSON of a layer")
  .option("-loc, --locales <locale1 locale2...>", "language codes", ["mul"]);
program.parse(process.argv);

let opts = program.opts();

if (Object.keys(opts).length === 1) program.help();

let locales = opts.locales[0].split(",");

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  "https://osm-americana.github.io/fontstack66/{fontstack}/{range}.pbf",
  locales
);

const layers = style.layers;
const layerMap = new Map();
const layerGroupMap = new Map();

for (let i = 0; i < layers.length; i++) {
  let layer = layers[i];
  layerMap.set(layer.id, layers[i]);
  let layerGroup = layer["source-layer"] || layer.source || layer.type;
  if (!layerGroupMap.has(layerGroup)) {
    layerGroupMap.set(layerGroup, [layer.id]);
  } else {
    layerGroupMap.get(layerGroup).push(layer.id);
  }
}

let outputObj;

if (opts.printGroup) {
  let group = layerGroupMap.get(opts.printGroup);
  let layers = [];
  group.forEach((lyr) => layers.push(lyr));
  outputObj = layers;
}

if (opts.printLayer) {
  console.log(layerMap);
  outputObj = layerMap.get(opts.printLayer) ?? {};
}

if (opts.pretty) {
  process.stdout.write(JSON.stringify(outputObj, null, 2));
} else {
  process.stdout.write(JSON.stringify(outputObj));
}
