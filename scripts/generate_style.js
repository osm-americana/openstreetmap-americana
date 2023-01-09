import * as Style from "../src/js/style.js";
import config from "../src/config.js";
import * as fs from "fs";
import { Command } from "commander";

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

if (opts.outfile == "-") {
  console.log("%j", style);
} else {
  fs.writeFileSync(opts.outfile, JSON.stringify(style));
}
