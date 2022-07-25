"use strict";

// Common expressions
const highwaySelector = ["match", ["get", "class"]];

const linkSelector = ["match", ["get", "ramp"], 1];

export const surface = {
  id: "road_oneway",
  filter: ["all", ["==", "oneway", 1], ["!in", "brunnel", "bridge", "tunnel"]],

  source: "openmaptiles",
  "source-layer": "transportation",
  type: "symbol",

  minzoom: 15,
  maxzoom: 20, // Removing this may affect performance

  layout: {
    "icon-size": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      15,
      [
        ...highwaySelector,
        "motorway",
        [...linkSelector, 0.3, 0.5],
        ["trunk", "primary"],
        [...linkSelector, 0.2, 0.5],
        "secondary",
        [...linkSelector, 0.2, 0.3],
        0.2,
      ],
      19,
      [
        ...highwaySelector,
        "motorway",
        [...linkSelector, 0.8, 1],
        ["trunk", "primary"],
        [...linkSelector, 0.6, 1],
        "secondary",
        [...linkSelector, 0.4, 0.8],
        "tertiary",
        [...linkSelector, 0.3, 0.6],
        0.3,
      ],
    ],
    "icon-image": "oneway",
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
  id: "tunnel_oneway",
  filter: ["all", ["==", "oneway", 1], ["==", "brunnel", "tunnel"]],
  paint: {
    "icon-opacity": 0.2,
  },
};

export const bridge = {
  ...surface,
  id: "bridge_oneway",
  filter: ["all", ["==", "oneway", 1], ["==", "brunnel", "bridge"]],
};
