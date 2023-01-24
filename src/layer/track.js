"use strict";

import * as Color from "../constants/color.js";

const trackSelect = ["==", ["get", "class"], "track"];
const unpavedSelect = ["!=", ["get", "surface"], "paved"];
const pavedSelect = ["==", ["get", "surface"], "paved"];

export const track = {
  id: "highway-track",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, unpavedSelect],
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

export const pavedTrack = {
  id: "highway-track-paved",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, pavedSelect],
  minzoom: 12,
  paint: { ...track.paint },
};
pavedTrack["paint"]["line-dasharray"] = [1, 0];

export const legendEntries = [
  {
    description: "Land access track",
    layers: [track.id],
  },
  {
    description: "Paved land access track",
    layers: [pavedTrack.id],
  },
];
