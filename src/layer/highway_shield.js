"use strict";

import { orderedRouteAttributes } from "../js/shield_format.ts";
import featureAzCnIr from "../features/az-cn-ir.json" with { type: "json" };
import featureId from "../features/id.json" with { type: "json" };
import featureIn from "../features/in.json" with { type: "json" };
import featureJpKr from "../features/jp-kr.json" with { type: "json" };

const maxConcurrencyCardinality = 8;

export function getImageNameExpression(routeIndex) {
  let concat = ["concat", "shield"];
  for (let attr of orderedRouteAttributes) {
    concat.push("\n");
    if (attr === "name") {
      concat.push([
        "match",
        ["get", `route_${routeIndex}_network`],
        ["AsianHighway", "AH"],
        [
          "case",
          // Azerbaijan, China, Iran
          ["within", featureAzCnIr || nullIsland],
          "green",
          // Japan, South Korea
          ["within", featureJpKr || nullIsland],
          "white",
          // Indonesia
          ["within", featureId || nullIsland],
          "white_id",
          // India
          ["within", featureIn || nullIsland],
          "green_in",
          // Armenia, Cambodia, Malaysia, Myanmar, Philippines, Russia, Thailand, Vietnam
          "blue",
        ],
        ["coalesce", ["get", `route_${routeIndex}_${attr}`], ""],
      ]);
    } else {
      concat.push(["coalesce", ["get", `route_${routeIndex}_${attr}`], ""]);
    }
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
