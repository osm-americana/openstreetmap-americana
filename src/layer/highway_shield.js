"use strict";

import * as Util from "../js/util.js";

function routeConcurrency(num) {
  return [
    "case",
    ["!=", ["get", "route_" + num], null],
    [
      "image",
      [
        "concat",
        "shield\n",
        ["get", "route_" + num],
        [
          "match",
          ["get", "route_" + num],
          ["US:KY:Parkway=", "US:TX:Fort_Bend:FBCTRA=", "US:TX:Harris:HCTRA="],
          ["concat", "\n", ["get", "name"]],
          "",
        ],
      ],
    ],
    ["literal", ""],
  ];
}

let shieldTextField = ["format"];
for (var i = 1; i <= 6; i++) {
  shieldTextField.push(routeConcurrency(i));
}

let shieldLayout = {
  "text-rotation-alignment": "viewport-glyph",
  "text-font": ["Metropolis Light"],
  "text-field": shieldTextField,
  "text-anchor": "center",
  "text-letter-spacing": 0.7,
  "symbol-placement": "line",
  "text-max-angle": 180,
  "text-pitch-alignment": "viewport",
};

let baseShield = {
  type: "symbol",
  layout: shieldLayout,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation_name",
};

function shieldLayer(hwyClass, minzoom) {
  var layer = Util.cp(baseShield);
  layer.filter = [
    "all",
    ["==", "class", hwyClass],
    [
      "any",
      ["has", "route_1"],
      ["has", "route_2"],
      ["has", "route_3"],
      ["has", "route_4"],
      ["has", "route_5"],
      ["has", "route_6"],
    ],
  ];
  layer.id = "highway_shield_" + hwyClass;
  return layer;
}

export const motorway = shieldLayer("motorway", 6);
export const trunk = shieldLayer("trunk", 8);
export const primary = shieldLayer("primary", 10);
export const secondary = shieldLayer("secondary", 11);
export const tertiary = shieldLayer("tertiary", 12);
export const minor = shieldLayer("minor", 14);
