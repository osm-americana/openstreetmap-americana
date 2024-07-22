import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command, Option } from "commander";

const program = new Command();
program
  .option("-pp, --pretty", "pretty-print JSON output")
  .addOption(
    new Option(
      "-pg, --print-group <group prefix>",
      "print a list of the layers in a group"
    ).conflicts("printLayer")
  )
  .option("-pl, --print-layer <layer id>", "print the JSON of a layer")
  .option("-loc, --locales <locale1 locale2...>", "language codes", ["mul"]);
program.parse(process.argv);

const opts = program.opts();

if (Object.keys(opts).length === 1) program.help();

const style = Style.build(
  config.OPENMAPTILES_URL,
  'https://streetferret.github.io/blackpearl-map/sprites/sprite-light',
  "https://font.americanamap.org/{fontstack}/{range}.pbf",
  "light"
);

const layers = style.layers;
const layerMap = new Map();
const layerGroupMap = new Map();

for (let i = 0; i < layers.length; i++) {
  const layer = layers[i];
  layerMap.set(layer.id, layers[i]);
  const layerGroup = layer["source-layer"] || layer.source || layer.type;
  if (!layerGroupMap.has(layerGroup)) {
    layerGroupMap.set(layerGroup, [layer.id]);
  } else {
    layerGroupMap.get(layerGroup).push(layer.id);
  }
}

let outputObj;

if (opts.printGroup) {
  outputObj = layerGroupMap.get(opts.printGroup);
}

if (opts.printLayer) {
  outputObj = layerMap.get(opts.printLayer) ?? {};
}

process.stdout.write(JSON.stringify(outputObj, null, opts.pretty ? 2 : null));
