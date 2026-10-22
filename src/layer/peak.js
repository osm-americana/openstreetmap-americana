import {
  localizedName,
  localizedNameWithLocalGloss,
  getLocales,
} from "@americana/diplomat";
import * as Color from "../constants/color.js";

const peakStepFilter = [
  "step",
  ["zoom"],
  ["<=", ["get", "rank"], 1], //Only rank 1 (dynamic) to z13
  13,
  ["<=", ["get", "rank"], 2], //Start showing rank 1+2 at z13
  14,
  [">=", ["get", "rank"], 1], //Show all past z14
];

export function getEleUnits(unitlocale = getLocales()[0]) {
  return [
    "case",
    ["==", ["get", "customary_ft"], 1], //customary_ft variable is essentially whether the object is in the US or not
    ["number-format", ["get", "ele_ft"], { unit: "foot", locale: unitlocale }], //If customary_ft, return ele in ft
    ["number-format", ["get", "ele"], { unit: "meter", locale: unitlocale }], //Otherwise return it in m
  ];
}

var peakTextExpression = [
  "let",
  "eleUnits",
  getEleUnits(),
  [
    "case",
    ["all", ["has", "name"], ["has", "ele"]], //If name and ele present, use name with ele on next line
    ["concat", localizedNameWithLocalGloss, "\n", ["var", "eleUnits"]],
    ["has", "name"], //If name but no ele, just return the name
    localizedNameWithLocalGloss,
    ["has", "ele"], //If ele but no name, just return the ele
    ["var", "eleUnits"],
    ["literal", ""], //Fallback: return nothing
  ],
];

export const peak = {
  id: "peak",
  type: "symbol",
  paint: {
    "text-halo-color": Color.backgroundFill,
    "text-halo-width": 1.5,
    "icon-halo-width": 0.4,
    "text-halo-blur": 1,
    "icon-halo-blur": 0.2,
    "text-color": Color.palette.black,
  },
  filter: [
    "all",
    ["in", ["get", "class"], ["literal", ["peak", "volcano"]]],
    peakStepFilter,
  ],
  layout: {
    "text-font": ["Americana-Italic"],
    "text-size": 9,
    "icon-image": "peak",
    "icon-size": 1.0,
    "text-field": peakTextExpression,
    "text-anchor": "bottom",
    "text-variable-anchor": ["left", "right"],
    "text-justify": "auto",
    "text-radial-offset": 0.7,
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 1,
    "text-padding": 1,
    "icon-allow-overlap": false,
    "symbol-sort-key": ["*", -1, ["get", "ele"]], //Highest elevations take priority
  },
  minzoom: 8,
  source: "openmaptiles",
  "source-layer": "mountain_peak",
};

export const legendEntries = [
  {
    description: "Peak",
    layers: [peak.id],
  },
];
