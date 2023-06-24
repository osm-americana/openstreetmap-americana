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

  const vtile = new VectorTile(new Pbf(tile));

  for (const layerName in vtile.layers) {
    const thisLayer = vtile.layers[layerName];
    const features = [];

    for (let i = 0; i < thisLayer.length; i++) {
      const feature = thisLayer.feature(i);
      features.push({
        type: feature.type,
        properties: feature.properties,
        geometry: [],
      });
    }
    suite.add(`${name}#${layerName}#${thisLayer.length}`, () => {
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
}

await addTest("world z0", 0, 0, 0);
// await addTest("nyc z12", 12, 1207, 1539);
// await addTest("boston z12", 12, 1239, 1514);
await addTest("kansas z14", 14, 3707, 6302);

const performanceTest = {};

suite
  .on("error", (event) => console.log(event.target.error))
  .on("cycle", (event) => {
    const time = 1_000 / event.target.hz;
    const targetParts = event.target.name.split("#");
    const suiteName = targetParts[0];
    const sourceLayer = targetParts[1];
    const featureCount = targetParts[2];
    if (!performanceTest[suiteName]) {
      performanceTest[suiteName] = {};
    }
    const perfResult = {
      featureCount,
      time,
    };
    performanceTest[suiteName][sourceLayer] = perfResult;
  })
  .run();

process.stdout.write(JSON.stringify(performanceTest));
