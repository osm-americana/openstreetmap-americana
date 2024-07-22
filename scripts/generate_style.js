import * as fs from "node:fs";

import { Command } from "commander";
import { validate } from "@maplibre/maplibre-gl-style-spec";

import * as Style from "../src/js/style.js";
import config from "../src/config.js";

/**
 * Requires mapbox-gl-rtl-text:
 * https://github.com/mapbox/mapbox-gl-rtl-text/
 */

const program = new Command();
program
  .option("-l, --locales <locale1 locale2...>", "language codes", ["mul"])
  .option("-m, --mode <light or dark>", "style mode")
  .option("-o, --outfile <file>", "output file", "-");
program.parse(process.argv);

let opts = program.opts();
let style;

if (opts.mode == "light") {
  style = Style.build(
    config.OPENMAPTILES_URL,
    "https://streetferret.github.io/blackpearl-map/sprites/sprite-light",
    "https://font.americanamap.org/{fontstack}/{range}.pbf",
    "light"
  );
} else {
  style = Style.build(
    config.OPENMAPTILES_URL,
    "https://streetferret.github.io/blackpearl-map/sprites/sprite-dark",
    "https://font.americanamap.org/{fontstack}/{range}.pbf",
    "dark"  
  );
}

const errors = validate(style);
if (errors.length) {
  console.error(errors.map((e) => e.message).join("\n"));
  process.exit(1);
}

if (opts.outfile == "-") {
  console.log("%j", style);
} else {
  fs.writeFileSync(opts.outfile, JSON.stringify(style));
}
