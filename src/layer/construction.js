import * as Color from "../constants/color.js";

const majorConstruction = [
  "match",
  ["get", "class"],
  ["motorway_construction", "trunk_construction"],
];

const constructionColor = [
  "interpolate-lab",
  ["exponential", 2],
  ["zoom"],
  10,
  [...majorConstruction, "lightcoral", "lightslategray"],
  13,
  [...majorConstruction, "maroon", "lightslategray"],
  15,
  [...majorConstruction, "maroon", "slategray"],
];

const constructionFilter = [
  "in",
  ["get", "class"],
  [
    "literal",
    [
      "motorway_construction",
      "trunk_construction",
      "primary_construction",
      "secondary_construction",
      "tertiary_construction",
      "minor_construction",
      "service_construction",
    ],
  ],
];

export const road = {
  id: "highway-construction",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: constructionFilter,
  minzoom: 9,
  paint: {
    "line-color": constructionColor,
    "line-opacity": ["interpolate", ["exponential", 2], ["zoom"], 10, 0, 11, 1],
    "line-blur": 0.75,
    "line-width": 1,
    "line-dasharray": [2.5, 1.25],
    "line-offset": 0,
    "line-gap-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      11,
      0,
      20,
      2,
    ],
  },
};

export const label = {
  id: "highway-construction-name",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation_name",
  filter: constructionFilter,
  minzoom: 15,
  layout: {
    "symbol-placement": "line",
    "text-font": ["Metropolis Light"],
    "text-size": 12,
    "text-field": "{name}",
    "text-anchor": "bottom",
  },
  paint: {
    "text-color": constructionColor,
    "text-halo-color": Color.backgroundFill,
    "text-halo-width": 2,
    "text-halo-blur": 0.5,
  },
};
