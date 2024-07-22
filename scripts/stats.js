import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import { Command, Option } from "commander";

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

const style = Style.build(
  config.OPENMAPTILES_URL,
  "https://font.americanamap.org/{fontstack}/{range}.pbf",
  "light"
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
    stats.layerGroup[layerGroup].layerCount++;
  } else {
    stats.layerGroup[layerGroup] = {
      size: layerSize,
      layerCount: 1,
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
    let layerString = `${layerGroup}(${layerStats.layerCount})`.padEnd(30, ".");
    console.log(
      `${layerString}${layerStats.size
        .toLocaleString("en-US")
        .padStart(10, ".")} bytes`
    );
  }
}
