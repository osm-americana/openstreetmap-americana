import * as Layers from "../layer/index.js";

// Generate style.json
export function build(tileURL, spriteURL, locales) {
  return {
    name: "Americana",
    glyphs:
      "https://openhistoricalmap.github.io/map-styles/fonts/{fontstack}/{range}.pbf",
    layers: Layers.build(locales),
    sources: {
      openmaptiles: {
        url: tileURL,
        type: "vector",
      },
    },
    sprite: spriteURL,
    light: {
      anchor: "viewport",
      color: "white",
      intensity: 0.12,
    },
    version: 8,
  };
}
