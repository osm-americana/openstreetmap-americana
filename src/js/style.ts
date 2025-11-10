import { StyleSpecification } from "@maplibre/maplibre-gl-style-spec";
import * as Layers from "../layer/index.js";

// Generate style.json
export function build(
  tileURL: string,
  spriteURL: string,
  glyphURL: string,
  locales: string[]
): StyleSpecification {
  return {
    name: "Americana",
    glyphs: glyphURL,
    layers: Layers.build(locales),
    sources: {
      openmaptiles: {
        url: tileURL,
        type: "vector",
      },
      dem: {
        attribution:
          '<a target="_blank" rel="noopener" href="https://registry.opendata.aws/terrain-tiles/">Terrain Tiles</a>',
        type: "raster-dem",
        tiles: [
          "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
        ],
        encoding: "terrarium",
        tileSize: 256,
        // The actual maxzoom is 15
        maxzoom: 13,
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
