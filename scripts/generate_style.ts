import * as fs from "node:fs";

import { Command, OptionValues } from "commander";
import { validateStyleMin as validate } from "@maplibre/maplibre-gl-style-spec";
import type { StyleSpecification } from "maplibre-gl";

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

const opts: OptionValues = program.opts();

const style: StyleSpecification = Style.build(
  config.OPENMAPTILES_URL,
  "https://americanamap.org/sprites/sprite",
  "https://font.americanamap.org/{fontstack}/{range}.pbf",
  opts.locales
);

const errors = validate(style);
if (errors.length) {
  console.error(errors.map((e) => e.message).join("\n"));
  process.exit(1);
}

if (opts.outfile === "-") {
  console.log("%j", style);
} else {
  fs.writeFileSync(opts.outfile, JSON.stringify(style));
}
