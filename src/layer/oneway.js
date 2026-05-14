"use strict";

// Common expressions
const highwaySelector = ["match", ["get", "highway"]];
const baseFilter = [
  "all",
  ["==", ["get", "oneway"], 1],
  [
    "in",
    ["get", "highway"],
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
const getBridge = ["coalesce", ["get", "bridge"], 0];
const isBridge = ["!=", getBridge, 0];
const getTunnel = ["coalesce", ["get", "tunnel"], 0];
const isTunnel = ["!=", getTunnel, 0];

export const surface = {
  id: "oneway_surface",
  filter: [...baseFilter, ["==", 0, ["+", getBridge, getTunnel]]],
  source: "ohm",
  "source-layer": "transport_lines",
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
    "icon-image": [
      "case",
      isTunnel,
      "oneway_black",
      [
        "match",
        ["get", "toll"],
        1,
        "oneway_black",
        [...highwaySelector, "motorway", "oneway_white", "oneway_black"],
      ],
    ],
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
  },
  paint: {
    "icon-opacity": 0.5,
  },
};

export const tunnel = {
  ...surface,
  id: "oneway_tunnel",
  filter: [...baseFilter, isTunnel],
  paint: {
    "icon-opacity": 0.2,
  },
};

export const bridge = {
  ...surface,
  id: "oneway_bridge",
  filter: [...baseFilter, isBridge],
};
