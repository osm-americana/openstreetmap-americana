"use strict";

const orderedRouteAttributes = ["network", "ref", "name", "color"];
const maxConcurrencyCardinality = 8;

export function getImageNameExpression(routeIndex) {
  let concat = ["concat", "shield"];
  for (let attr of orderedRouteAttributes) {
    concat.push("\n");
    concat.push(["coalesce", ["get", `route_road_${routeIndex}_${attr}`], ""]);
  }
  return concat;
}

function routeConcurrency(routeIndex) {
  return [
    "case",
    [
      "any",
      ...orderedRouteAttributes.map((a) => [
        "has",
        `route_road_${routeIndex}_${a}`,
      ]),
    ],
    ["image", getImageNameExpression(routeIndex)],
    ["literal", ""],
  ];
}

/**
 * Returns a structured representation of the given image name.
 *
 * @param name An image name in the format returned by `routeConcurrency`.
 * @return An object with the keys in `orderedRouteAttributes` plus the full image name in `imageName`.
 */
export function parseImageName(imageName) {
  let lines = imageName.split("\n");
  lines.shift(); // "shield"
  let parsed = Object.fromEntries(
    orderedRouteAttributes.map((a, i) => [a, lines[i]])
  );
  parsed.imageName = imageName;
  return parsed;
}

let shieldTextField = ["format"];
for (var i = 1; i <= maxConcurrencyCardinality; i++) {
  shieldTextField.push(routeConcurrency(i));
}

let shieldLayout = {
  "text-rotation-alignment": "viewport-glyph",
  "text-font": ["Americana-Regular"],
  "text-field": shieldTextField,
  "text-anchor": "center",
  "text-letter-spacing": 0.7,
  "symbol-placement": "line",
  "text-max-angle": 180,
  "text-pitch-alignment": "viewport",
  "symbol-sort-key": [
    "match",
    ["get", "class"],
    ["motorway", "motorway_link"],
    0,
    ["trunk", "trunk_link"],
    1,
    ["primary", "primary_link"],
    2,
    ["secondary", "secondary_link"],
    3,
    ["tertiary", "tertiary_link"],
    4,
    5,
  ],
};

export const shield = {
  type: "symbol",
  source: "ohm",
  "source-layer": "route_lines",
  id: "highway-shield",
  layout: shieldLayout,
  paint: {
    "text-opacity": [
      "step",
      ["zoom"],
      ["match", ["get", "class"], ["motorway", "motorway_link"], 1, 0],
      8,
      [
        "match",
        ["get", "class"],
        ["motorway", "motorway_link", "trunk", "trunk_link"],
        1,
        1, // https://github.com/OpenHistoricalMap/issues/issues/1272
      ],
      10,
      [
        "match",
        ["get", "class"],
        [
          "motorway",
          "motorway_link",
          "trunk",
          "trunk_link",
          "primary",
          "primary_link",
        ],
        1,
        1, // https://github.com/OpenHistoricalMap/issues/issues/1272
      ],
      11,
      [
        "match",
        ["get", "class"],
        [
          "motorway",
          "motorway_link",
          "trunk",
          "trunk_link",
          "primary",
          "primary_link",
          "secondary",
          "secondary_link",
        ],
        1,
        1, // https://github.com/OpenHistoricalMap/issues/issues/1272
      ],
      12,
      [
        "match",
        ["get", "class"],
        [
          "motorway",
          "motorway_link",
          "trunk",
          "trunk_link",
          "primary",
          "primary_link",
          "secondary",
          "secondary_link",
          "tertiary",
          "tertiary_link",
        ],
        1,
        1, // https://github.com/OpenHistoricalMap/issues/issues/1272
      ],
      14,
      1,
    ],
  },
  filter: [
    "any",
    ...orderedRouteAttributes.map((a) => ["has", `route_road_1_${a}`]),
  ],
};
