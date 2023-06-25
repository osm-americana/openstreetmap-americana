import { calcStatsJSON } from "./stats_json.js";
import { readFileSync } from "fs";

const style = JSON.parse(readFileSync(process.argv[2], "utf8"));
process.stdout.write(JSON.stringify(calcStatsJSON(style)));
