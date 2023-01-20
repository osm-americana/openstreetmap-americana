"use strict";

import * as Color from "../constants/color.js";

const trackSelect = ["match", ["get", "class"], ["track"]];

export const track = {
  id: "highway-track",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["in", ["get", "class"], ["literal", ["track"]]],
  minzoom: 9,
  paint: {
    "line-color": "tan",
    "line-opacity": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      13,
      0,
      15,
      1,
    ],
    "line-blur": 0.75,
    "line-width": 0.5,
    "line-dasharray": [7, 5],
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
