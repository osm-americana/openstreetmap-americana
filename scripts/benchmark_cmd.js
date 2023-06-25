import { calcBenchmarkJSON } from "./benchmark_json.js";
import { readFileSync } from "fs";

const style = JSON.parse(readFileSync(process.argv[2], "utf8"));
process.stdout.write(JSON.stringify(await calcBenchmarkJSON(style)));
