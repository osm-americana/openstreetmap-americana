"use strict";

// Common expressions
const highwaySelector = ["match", ["get", "class"]];
const baseFilter = [
  "all",
  ["==", ["get", "oneway"], 1],
  ["!=", ["get", "ramp"], 1],
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
        "minor",
        "service",
      ],
    ],
  ],
];

export const surface = {
  id: "oneway_surface",
  filter: [
    ...baseFilter,
    ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
  ],
  source: "openmaptiles",
  "source-layer": "transportation",
  type: "symbol",
  minzoom: 15,

  layout: {
    "icon-size": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      15,
      [...highwaySelector, ["motorway", "trunk", "primary"], 0.5, 0.3],
      19,
      [
        ...highwaySelector,
        ["motorway", "trunk", "primary"],
        1,
        "secondary",
        0.8,
        0.6,
      ],
    ],
    "icon-image": "oneway_black",
    visibility: "visible",
    "icon-padding": 2,
    "symbol-spacing": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      15,
      75,
      19,
      300,
    ],
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
    // Assumes driving on the right.
    "icon-offset": [0, 10],
  },
  paint: {
    "icon-opacity": 0.5,
  },
};

export const tunnel = {
  ...surface,
  id: "oneway_tunnel",
  filter: [...baseFilter, ["==", ["get", "brunnel"], "tunnel"]],
  paint: {
    "icon-opacity": 0.2,
  },
};

export const bridge = {
  ...surface,
  id: "oneway_bridge",
  filter: [...baseFilter, ["==", ["get", "brunnel"], "bridge"]],
};
