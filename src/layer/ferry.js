"use strict";

import * as Color from "../constants/color.js";

// Filter properties in this layer should be updated to reflect consensus once
// https://github.com/openmaptiles/openmaptiles/issues/1373 is closed

export const ferry = {
  id: "ferry",
  type: "line",
  paint: {
    "line-color": Color.waterLineBold,
    "line-dasharray": [7, 5],
    "line-width": 1.5,
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
    description: "Ferry line",
    layers: [ferry.id],
  },
];
