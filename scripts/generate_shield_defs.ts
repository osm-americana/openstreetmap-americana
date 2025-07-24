import * as ShieldDef from "../src/js/shield_defs.js";
import * as fs from "node:fs";
import { Command, OptionValues } from "commander";

const program = new Command();
program.option("-o, --outfile <file>", "output file", "-");
program.parse(process.argv);

const opts: OptionValues = program.opts();

//TODO: ensure this returns ShieldSpecification
const shields = ShieldDef.loadShields();

if (opts.outfile === "-") {
  console.log("%j", shields);
} else {
  fs.writeFileSync(opts.outfile, JSON.stringify(shields));
}
