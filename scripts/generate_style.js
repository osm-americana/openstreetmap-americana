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
  .option("-o, --outfile <file>", "output file", "-");
program.parse(process.argv);

let opts = program.opts();

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  opts.locales
);

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
