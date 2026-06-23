"use strict";

import * as Color from "../constants/color.js";

export const urbanizedArea = {
  id: "urbanized-area",
  type: "fill",
  minzoom: 4,
  maxzoom: 6,
  filter: ["==", ["get", "type"], "residential"],
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
      6,
      Color.backgroundFill,
    ],
  },
  source: "ohm",
  "source-layer": "landuse_areas",
};

export const legendEntries = [
  {
    description: "Urban area",
    layers: [urbanizedArea.id],
  },
];
