import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command, Option } from "commander";
import { calcStatsJSON } from "./stats_json.js";

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

if (opts.layerCount) {
  const layerCount = layers.length;
  console.log(layerCount);
  process.exit();
}

if (opts.layerSize) {
  const styleSize = JSON.stringify(layers).length;
  console.log(styleSize);
  process.exit();
}

let stats = calcStatsJSON(style);

if (opts.allJson) {
  process.stdout.write(JSON.stringify(stats, null, opts.pretty ? 2 : null));
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
