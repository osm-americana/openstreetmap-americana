"use strict";

import * as Color from "../constants/color";

export const building = {
  id: "building",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13,
      Color.buildingFillLZ,
      16,
      Color.buildingFillHZ,
    ],
    "fill-extrusion-height": 3,
    "fill-extrusion-opacity": 0.85,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "building",
};

export const legendEntries = [
  {
    description: "Building",
    layers: [building.id],
  },
];
