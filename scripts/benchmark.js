"use strict";

import Benchmark from "benchmark";
import { expression } from "@maplibre/maplibre-gl-style-spec";

import { build } from "../src/layer/index.js";
import { VectorTile } from "@mapbox/vector-tile";
import Pbf from "pbf";

const layers = build(["en"])
  .filter((layer) => layer["source-layer"] === "transportation" && layer.filter)
  .map((layer) => expression.createExpression(layer.filter).value.expression);
const tile = await (
  await fetch(`https://d1zqyi8v6vm8p9.cloudfront.net/planet/12/1207/1539.mvt`)
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

let num = 0;
new Benchmark.Suite()
  .add("evaluate expressions", () => {
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
  })
  .on("error", (event) => console.log(event.target.error))
  .on("cycle", (event) => {
    const time = 1_000 / event.target.hz;
    console.log(`${time.toPrecision(4)}ms ${event.target}`);
  })
  .on("complete", () => console.log(`total ${num}`))
  .run();
