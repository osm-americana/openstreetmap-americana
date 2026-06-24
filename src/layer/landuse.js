"use strict";

import * as Color from "../constants/color";

export const urbanizedArea = {
  id: "urbanized-area",
  type: "fill",
  minzoom: 4,
  maxzoom: 6,
  filter: ["==", ["get", "class"], "residential"],
  paint: {
    "fill-color": [
      "interpolate-lab",
      ["linear"],
      ["zoom"],
      4,
      Color.urbanizedAreaFill,
      5,
      Color.urbanizedAreaFillFaded,
      5.5,
      Color.urbanizedAreaFillFaded,
      6,
      Color.backgroundFill,
    ],
  },
  source: "openmaptiles",
  "source-layer": "landuse",
};

export const legendEntries = [
  {
    description: "Urban area",
    layers: [urbanizedArea.id],
  },
];
