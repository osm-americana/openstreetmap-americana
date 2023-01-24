"use strict";

import * as Color from "../constants/color.js";

const trackSelect = ["match", ["get", "class"], ["track"]];

export const track = {
  id: "highway-track",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["in", ["get", "class"], ["literal", ["track"]]],
  minzoom: 12,
  paint: {
    "line-color": "#d4b791",
    "line-opacity": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      12,
      0,
      13,
      1,
    ],
    "line-blur": 0.75,
    "line-width": 0.5,
    "line-dasharray": [12, 3],
    "line-offset": 0,
    "line-gap-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      13,
      1.5,
      20,
      4,
    ],
  },
};

export const legendEntries = [
  {
    description: "Land access track",
    layers: [track.id],
  },
];
