import * as ShieldDef from "../src/js/shield_defs.js";
import * as fs from "fs";
import { Command } from "commander";

const program = new Command();
program.option("-o, --outfile <file>", "output file", "-");
program.parse(process.argv);

let opts = program.opts();

let shields = ShieldDef.loadShields();

if (opts.outfile == "-") {
  console.log("%j", shields);
} else {
  fs.writeFileSync(opts.outfile, JSON.stringify(shields));
}
