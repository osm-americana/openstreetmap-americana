"use strict";

import * as Color from "../constants/color.js";

// Filter properties in this layer should be updated to reflect consensus once
// https://github.com/openmaptiles/openmaptiles/issues/1373 is closed

//Exponent base for inter-zoom interpolation
const ferryExp = 1.2; // same as for roads

export const ferry = {
  id: "ferry",
  type: "line",
  paint: {
    "line-color": Color.waterLineBold,
    "line-dasharray": [7, 5],
    "line-width": [
      "interpolate",
      ["exponential", ferryExp],
      ["zoom"],
      4,
      0.55, // make slightlier thicker than roads at this scale since ferry colors are lower contrast
      12,
      1,
    ],
  },
  filter: [
    "any",
    ["==", ["get", "class"], "ferry"],
    ["==", ["get", "subclass"], "ferry"],
  ],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};

export const legendEntries = [
  {
    description: "Ferry route",
    layers: [ferry.id],
  },
];
