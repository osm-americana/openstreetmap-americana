import Benchmark from "benchmark";
import { expression } from "@maplibre/maplibre-gl-style-spec";

import { build } from "../src/layer/index.js";
import { VectorTile } from "@mapbox/vector-tile";
import Pbf from "pbf";

const layers = build(["en"])
  .filter((layer) => layer["source-layer"] === "transportation" && layer.filter)
  .map((layer) => expression.createExpression(layer.filter).value.expression);

const suite = new Benchmark.Suite();

async function addTest(name, z, x, y) {
  const tile = await (
    await fetch(
      `https://d1zqyi8v6vm8p9.cloudfront.net/planet/${z}/${x}/${y}.mvt`
    )
  ).arrayBuffer();

  const transportation = new VectorTile(new Pbf(tile)).layers["transportation"];
  const features = [];

  for (let i = 0; i < transportation.length; i++) {
    const feature = transportation.feature(i);
    features.push({
      type: feature.type,
      properties: feature.properties,
      geometry: [],
    });
  }
  suite.add(`evaluate expressions ${name}`, () => {
    let num = 0;
    const context = {
      properties: () => context.feature.properties,
      geometryType: () => context.feature.type,
    };
    for (const layer of layers) {
      for (const feature of features) {
        context.feature = feature;
        if (layer.evaluate(context)) {
          num++;
        }
      }
    }
  });
}

await addTest("nyc z12", 12, 1207, 1539);
await addTest("boston z12", 12, 1239, 1514);
await addTest("kansas z14", 14, 3707, 6302);

suite
  .on("error", (event) => console.log(event.target.error))
  .on("cycle", (event) => {
    const time = 1_000 / event.target.hz;
    console.log(`${time.toPrecision(4)}ms ${event.target}`);
  })
  .run();
