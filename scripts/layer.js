import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-loc, --locales <locale1 locale2...>", "language codes", ["mul"])
  .option("-pp, --pretty", "pretty-print JSON output")
  .option("-pl, --print-layer <layer id>", "print the JSON of a layer");
program.parse(process.argv);

let opts = program.opts();

if (Object.keys(opts).length === 1 || !opts.printLayer) {
  program.help();
  process.exit();
}

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  "https://osm-americana.github.io/fontstack66/{fontstack}/{range}.pbf",
  opts.locales
);

const layers = style.layers;
const layerMap = new Map();

for (let i = 0; i < layers.length; i++) {
  let layer = layers[i];
  layerMap.set(layer.id, layers[i]);
}

if(!layerMap.has(opts.printLayer)) {
  console.log({});
  process.exit();
}

if (opts.pretty) {
  process.stdout.write(JSON.stringify(layerMap.get(opts.printLayer), null, 2));
} else {
  process.stdout.write(JSON.stringify(layerMap.get(opts.printLayer)));
}
