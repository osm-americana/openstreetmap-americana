"use strict";

export const namedRouteNetworks = [
  "US:KY:Parkway",
  "US:NY:Parkway",
  "US:TX:Fort_Bend:FBCTRA",
  "US:TX:Harris:HCTRA",
];

export function getImageNameExpression(routeIndex) {
  return [
    "concat",
    "shield\n",
    ["get", "route_" + routeIndex],
    [
      "match",
      ["get", "route_" + routeIndex],
      namedRouteNetworks.map((n) => n + "="),
      ["concat", "\n", ["get", "name"]],
      "",
    ],
  ];
}

function routeConcurrency(routeIndex) {
  return [
    "case",
    ["!=", ["get", "route_" + routeIndex], null],
    ["image", getImageNameExpression(routeIndex)],
    ["literal", ""],
  ];
}

/**
 * Returns a structured representation of the given image name.
 *
 * @param name An image name in the format returned by `routeConcurrency`.
 */
export function parseImageName(imageName) {
  let lines = imageName.split("\n");
  let [, network, ref] = lines[1].match(/^(.*?)=(.*)/) || [];
  let name = lines[2];
  return { imageName, network, ref, name };
}

let shieldTextField = ["format"];
for (var i = 1; i <= 6; i++) {
  shieldTextField.push(routeConcurrency(i));
}

let shieldLayout = {
  "text-rotation-alignment": "viewport-glyph",
  "text-font": ["OpenHistorical"],
  "text-field": shieldTextField,
  "text-anchor": "center",
  "text-letter-spacing": 0.7,
  "symbol-placement": "line",
  "text-max-angle": 180,
  "text-pitch-alignment": "viewport",
  "symbol-sort-key": [
    "match",
    ["get", "class"],
    "motorway",
    0,
    "trunk",
    1,
    "primary",
    2,
    "secondary",
    3,
    "tertiary",
    4,
    5,
  ],
};

export const shield = {
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation_name",
  id: "highway-shield",
  layout: shieldLayout,
  paint: {
    "text-opacity": [
      "step",
      ["zoom"],
      ["match", ["get", "class"], "motorway", 1, 0],
      8,
      ["match", ["get", "class"], ["motorway", "trunk"], 1, 0],
      10,
      ["match", ["get", "class"], ["motorway", "trunk", "primary"], 1, 0],
      11,
      [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary"],
        1,
        0,
      ],
      12,
      [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary", "tertiary"],
        1,
        0,
      ],
      14,
      1,
    ],
  },
  filter: [
    "any",
    ["has", "route_1"],
    ["has", "route_2"],
    ["has", "route_3"],
    ["has", "route_4"],
    ["has", "route_5"],
    ["has", "route_6"],
  ],
};
