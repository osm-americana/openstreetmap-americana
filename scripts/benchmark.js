import { build } from "../src/layer/index.js";
import { calcBenchmarkJSON } from "./benchmark_json.js";

const style = build(["en"]);

let benchmarks = await calcBenchmarkJSON(style);

console.log(benchmarks);
