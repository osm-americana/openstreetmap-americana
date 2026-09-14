"use strict";

import * as Color from "../constants/color.js";

export const urbanizedArea = {
  id: "urbanized-area",
  type: "fill",
  minzoom: 4,
  paint: {
    "fill-color": [
      "interpolate-lab",
      ["linear"],
      ["zoom"],
      4,
      "hsl(41, 90%, 85%)",
      5,
      "hsl(41, 90%, 80%)",
      5.5,
      "hsl(41, 90%, 80%)",
      10,
      "hsla(41, 90%, 80%, 0.3)",
    ],
  },
  source: "ua",
  "source-layer": "ua",
};

export const legendEntries = [
  {
    description: "Urban area",
    layers: [urbanizedArea.id],
  },
];
