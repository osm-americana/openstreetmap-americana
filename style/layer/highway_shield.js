"use strict";

import * as Util from "../js/util.js";

function routeConcurrency(num) {
  return [
    "case",
    ["!=", ["get", "route_" + num], null],
    ["image", ["concat", "shield_", ["get", "route_" + num]]],
    ["literal", ""],
  ];
}

let shieldTextField = ["format"];
for (var i = 1; i <= 5; i++) {
  shieldTextField.push(routeConcurrency(i));
  shieldTextField.push(" ");
}
shieldTextField.push(routeConcurrency(6));

let shieldLayout = {
  "text-rotate-to-line": false,
  "text-font": ["Metropolis Light"],
  "text-field": shieldTextField,
  "text-anchor": "center",
  "symbol-placement": "line",
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
  layer.filter = ["all", ["==", "class", hwyClass], ["has", "route_1"]];
  layer.id = "highway_shield_" + hwyClass;
  return layer;
}

export const motorway = shieldLayer("motorway", 6);
export const trunk = shieldLayer("trunk", 8);
export const primary = shieldLayer("primary", 10);
export const secondary = shieldLayer("secondary", 11);
export const tertiary = shieldLayer("tertiary", 12);
