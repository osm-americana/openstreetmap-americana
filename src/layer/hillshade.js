import * as Color from "../constants/color";

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
      0.3,
    ],
    "hillshade-shadow-color": Color.hillshadeShadow,
    "hillshade-highlight-color": Color.hillshadeHighlight,
  },
};
