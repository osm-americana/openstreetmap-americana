"use strict";

import * as Color from "../constants/color.js";
import * as Util from "../js/util.js";

// Bridge areas
export const bridge = {
  type: "fill-extrusion",
  source: "openmaptiles",
  "source-layer": "transportation",
  id: "bridge",
  minzoom: 13,
  layout: {
    visibility: "visible",
  },
  paint: {
    "fill-extrusion-color": Color.bridgeFill,
    "fill-extrusion-height": ["+", 3, ["coalesce", ["get", "layer"], 0]],
    "fill-extrusion-opacity": 0.6,
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
    "line-opacity": 0.8,
    "line-width": Util.zoomInterpolate([
      "match",
      ["get", "class"],
      ["rail", "transit"],
      ["match", ["get", "service"], ["siding", "spur", "yard"], 10, 14],
      "motorway",
      ["match", ["get", "ramp"], 1, 18, 28],
      "trunk",
      [
        "match",
        ["get", "expressway"],
        1,
        34,
        ["match", ["get", "ramp"], 1, 16, 28],
      ],
      "primary",
      [
        "match",
        ["get", "expressway"],
        1,
        32,
        ["match", ["get", "ramp"], 1, 15, 24],
      ],
      "secondary",
      [
        "match",
        ["get", "expressway"],
        1,
        26,
        ["match", ["get", "ramp"], 1, 14, 20],
      ],
      ["tertiary", "busway", "bus_guideway"],
      [
        "match",
        ["get", "expressway"],
        1,
        20,
        ["match", ["get", "ramp"], 1, 13, 18],
      ],
      "minor",
      14,
      "service",
      [
        "match",
        ["get", "service"],
        ["alley", "driveway", "drive-through", "parking_aisle"],
        9,
        11,
      ],
      20,
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
