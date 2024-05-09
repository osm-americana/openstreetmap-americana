"use strict";

const orderedRouteAttributes = ["network", "ref", "name", "color"];

export function getImageNameExpression(routeIndex) {
  let concat = ["concat", "shield"];
  for (let attr of orderedRouteAttributes) {
    concat.push("\n");
    concat.push(["coalesce", ["get", `route_${routeIndex}_${attr}`], ""]);
  }
  return concat;
}

function routeConcurrency(routeIndex) {
  return [
    "case",
    [
      "any",
      ...orderedRouteAttributes.map((a) => ["has", `route_${routeIndex}_${a}`]),
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
for (var i = 1; i <= 6; i++) {
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
    ...orderedRouteAttributes.map((a) => ["has", `route_1_${a}`]),
  ],
};
