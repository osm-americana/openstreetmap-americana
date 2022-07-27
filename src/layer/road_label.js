"use strict";

import * as Color from "../constants/color.js";

const highwaySelector = ["match", ["get", "class"]];

const textLayout = {
  "text-font": ["Metropolis Light"],
  "text-field": "{name:latin} {name:nonlatin}",
  "text-max-angle": 20,
  "symbol-placement": "line",
  "text-size": [
    "step",
    ["zoom"],
    12,
    16,
    [...highwaySelector, ["motorway", "trunk"], 10, 12],
    17,
    [...highwaySelector, ["motorway", "trunk", "primary", "secondary"], 10, 12],
  ],
  "text-anchor": [
    "step",
    ["zoom"],
    "bottom",
    16,
    [...highwaySelector, ["motorway", "trunk"], "center", "bottom"],
    17,
    [
      ...highwaySelector,
      ["motorway", "trunk", "primary", "secondary"],
      "center",
      "bottom",
    ],
  ],
  "symbol-sort-key": [
    ...highwaySelector,
    "motorway",
    0,
    "trunk",
    1,
    "primary",
    2,
    "secondary",
    3,
    ["tertiary", "minor"],
    4,
    5,
  ],
};

const textPaint = {
  "text-color": "#333",
  "text-halo-color": Color.backgroundFill,
  "text-halo-blur": 0.5,
  "text-halo-width": 2,
  "text-opacity": [
    "step",
    ["zoom"],
    [...highwaySelector, ["motorway"], 1, 0],
    10,
    [...highwaySelector, ["motorway", "trunk"], 1, 0],
    11,
    [...highwaySelector, ["motorway", "trunk", "primary"], 1, 0],
    12,
    [...highwaySelector, ["motorway", "trunk", "primary", "secondary"], 1, 0],
    13,
    [
      ...highwaySelector,
      ["motorway", "trunk", "primary", "secondary", "tertiary", "minor"],
      1,
      0,
    ],
    14,
    [
      ...highwaySelector,
      [
        "motorway",
        "trunk",
        "primary",
        "secondary",
        "tertiary",
        "minor",
        "service",
      ],
      1,
      0,
    ],
  ],
};

export const label = {
  id: "road_label",
  type: "symbol",
  paint: textPaint,
  filter: [
    "in",
    ["get", "class"],
    [
      "literal",
      [
        "motorway",
        "trunk",
        "primary",
        "secondary",
        "tertiary",
        "minor",
        "service",
      ],
    ],
  ],
  layout: textLayout,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

// A spacer label on each bridge to push any waterway label away from the bridge.
// https://github.com/ZeLonewolf/openstreetmap-americana/issues/198
export const bridgeSpacer = {
  id: "bridge_spacer",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", ["==", "brunnel", "bridge"], ["in", "$type", "LineString"]],
  paint: {
    "icon-opacity": 0,
  },
  layout: {
    "symbol-placement": "line",
    "symbol-spacing": 2,
    "icon-image": "dot_city",
    "icon-allow-overlap": true,
    "icon-size": 0.1,
  },
};
