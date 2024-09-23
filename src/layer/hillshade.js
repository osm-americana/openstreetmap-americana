import * as Color from "../constants/color.js";

export const hillshading = {
  id: "hillshading",
  type: "hillshade",
  source: "dem",
  layout: {
    visibility: "none",
  },
  paint: {
    "hillshade-exaggeration": [
      "interpolate",
      ["linear"],
      ["zoom"],
      12,
      0.5,
      17,
      0.1,
    ],
    "hillshade-shadow-color": Color.hillshadeShadow,
    "hillshade-highlight-color": Color.hillshadeHighlight,
  },
};
