"use strict";

import * as Color from "../constants/color.js";
import * as Util from "../js/util.js";

// Bridge areas
export const bridge = {
  type: "fill",
  source: "openmaptiles",
  "source-layer": "transportation",
  id: "bridge",
  minzoom: 13,
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-color": Color.bridgeFill,
    "fill-outline-color": Color.bridgeBackgroundFill,
    "fill-opacity": ["interpolate", ["linear"], ["zoom"], 16, 1, 19, 0.8],
  },
  filter: ["all", ["==", ["get", "class"], "bridge"]],
};

// Bridge casing for highways and railways
export const bridgeCasing = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  id: "bridge_casing",
  minzoom: 13,
  layout: {
    "line-cap": "butt",
    "line-join": "bevel",
    visibility: "visible",
  },
  paint: {
    "line-color": Color.bridgeFill,
    "line-width": Util.zoomInterpolate([
      "match",
      ["get", "class"],
      ["rail", "transit"],
      ["match", ["get", "service"], ["siding", "spur", "yard"], 12, 16],
      "motorway",
      ["match", ["get", "ramp"], 1, 19, 29],
      "trunk",
      [
        "match",
        ["get", "expressway"],
        1,
        35,
        ["match", ["get", "ramp"], 1, 17, 29],
      ],
      "primary",
      [
        "match",
        ["get", "expressway"],
        1,
        33,
        ["match", ["get", "ramp"], 1, 16, 26],
      ],
      "secondary",
      [
        "match",
        ["get", "expressway"],
        1,
        27,
        ["match", ["get", "ramp"], 1, 15, 21],
      ],
      ["tertiary", "busway", "bus_guideway"],
      [
        "match",
        ["get", "expressway"],
        1,
        21,
        ["match", ["get", "ramp"], 1, 14, 19],
      ],
      "minor",
      15,
      "service",
      [
        "match",
        ["get", "service"],
        ["alley", "driveway", "drive-through", "parking_aisle"],
        10,
        12,
      ],
      0,
    ]),
  },
  filter: [
    "all",
    ["==", ["get", "brunnel"], "bridge"],
    [
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
          "busway",
          "bus_guideway",
          "minor",
          "service",
          "rail",
          "transit",
        ],
      ],
    ],
  ],
};

export const bridgeCasingBackground = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  id: "bridge_casing-background",
  minzoom: 13,
  layout: {
    "line-cap": "butt",
    "line-join": "bevel",
    visibility: "visible",
  },
  paint: {
    "line-color": Color.bridgeBackgroundFill,
    "line-opacity": ["interpolate", ["linear"], ["zoom"], 16, 1, 19, 0.4],
    "line-width": Util.zoomInterpolate([
      "match",
      ["get", "class"],
      ["rail", "transit"],
      ["match", ["get", "service"], ["siding", "spur", "yard"], 14, 18],
      "motorway",
      ["match", ["get", "ramp"], 1, 21, 31],
      "trunk",
      [
        "match",
        ["get", "expressway"],
        1,
        37,
        ["match", ["get", "ramp"], 1, 19, 31],
      ],
      "primary",
      [
        "match",
        ["get", "expressway"],
        1,
        35,
        ["match", ["get", "ramp"], 1, 18, 28],
      ],
      "secondary",
      [
        "match",
        ["get", "expressway"],
        1,
        29,
        ["match", ["get", "ramp"], 1, 17, 23],
      ],
      ["tertiary", "busway", "bus_guideway"],
      [
        "match",
        ["get", "expressway"],
        1,
        23,
        ["match", ["get", "ramp"], 1, 16, 21],
      ],
      "minor",
      17,
      "service",
      [
        "match",
        ["get", "service"],
        ["alley", "driveway", "drive-through", "parking_aisle"],
        12,
        14,
      ],
      2,
    ]),
  },
  filter: [
    "all",
    ["==", ["get", "brunnel"], "bridge"],
    [
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
          "busway",
          "bus_guideway",
          "minor",
          "service",
          "rail",
          "transit",
        ],
      ],
    ],
  ],
};

export const legendEntries = [
  {
    description: "Bridge",
    layers: [bridge.id],
    filter: ["==", ["get", "class"], "bridge"],
  },
];
