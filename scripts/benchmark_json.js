import Benchmark from "benchmark";
import { expression } from "@maplibre/maplibre-gl-style-spec";
import { VectorTile } from "@mapbox/vector-tile";
import Pbf from "pbf";
import perfLocations from "./performance.json" assert { type: "json" };

function getStyleLayerExpressions(layers, layerName) {
  let expressions = layers
    .filter((layer) => layer["source-layer"] === layerName && layer.filter)
    .map((layer) => expression.createExpression(layer.filter).value.expression);
  if (expressions) {
    return expressions;
  } else {
    return [];
  }
}

async function addTest(suite, style, name, z, x, y) {
  const tile = await (
    await fetch(
      `https://d1zqyi8v6vm8p9.cloudfront.net/planet/${z}/${x}/${y}.mvt`
    )
  ).arrayBuffer();

  const vtile = new VectorTile(new Pbf(tile));

  for (const layerName in vtile.layers) {
    const thisLayer = vtile.layers[layerName];
    const features = [];
    const layers = getStyleLayerExpressions(style.layers, layerName);

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
        globals: {
          zoom: z,
        },
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

export async function calcBenchmarkJSON(style) {
  const suite = new Benchmark.Suite();

  for (let i in perfLocations) {
    let test = perfLocations[i];
    await addTest(suite, style, test.name, test.z, test.x, test.y);
  }

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

  return performanceTest;
}
