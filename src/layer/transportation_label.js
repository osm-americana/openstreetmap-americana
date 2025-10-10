"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color";

const classSelector = ["match", ["get", "class"]];

const motorwayToTrunk = ["motorway", "trunk"];
const motorwayToPrimary = [...motorwayToTrunk, "primary"];
const motorwayToTertiary = [
  ...motorwayToPrimary,
  "secondary",
  "tertiary",
  "busway",
];
const motorwayToMinor = [...motorwayToTertiary, "minor"];
const motorwayToService = [...motorwayToMinor, "service"];

const majorConstruction = ["motorway_construction", "trunk_construction"];
const minorConstruction = [
  "primary_construction",
  "secondary_construction",
  "tertiary_construction",
  "minor_construction",
  "service_construction",
];

export const label = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": [
      ...classSelector,
      majorConstruction,
      "maroon",
      minorConstruction,
      "slategray",
      "ferry",
      Color.waterLineBold,
      "aerialway",
      Color.aerialwayLabel,
      Color.labelText,
    ],
    "text-halo-color": [
      "step",
      ["zoom"],
      [...classSelector, "ferry", Color.waterFill, Color.backgroundFill],
      16,
      [
        ...classSelector,
        "ferry",
        Color.waterFill,
        motorwayToTrunk,
        "white",
        Color.backgroundFill,
      ],
      17,
      [
        ...classSelector,
        "ferry",
        Color.waterFill,
        motorwayToTertiary,
        "white",
        Color.backgroundFill,
      ],
      18,
      [...classSelector, "ferry", Color.waterFill, "white"],
    ],
    "text-halo-blur": 0.5,
    "text-halo-width": 2,
    "text-opacity": [
      "step",
      ["zoom"],
      [...classSelector, "motorway", 1, 0],
      10,
      [...classSelector, motorwayToTrunk, 1, 0],
      11,
      [...classSelector, motorwayToPrimary, 1, "ferry", 1, 0],
      12,
      [...classSelector, motorwayToTertiary, 1, ["ferry", "aerialway"], 1, 0],
      13,
      [...classSelector, motorwayToMinor, 1, ["ferry", "aerialway"], 1, 0],
      14,
      [...classSelector, motorwayToService, 1, ["ferry", "aerialway"], 1, 0],
      15,
      1,
    ],
  },
  filter: [
    "in",
    ["get", "class"],
    [
      "literal",
      [
        ...motorwayToService,
        ...majorConstruction,
        ...minorConstruction,
        "ferry",
        "aerialway",
      ],
    ],
  ],
  layout: {
    "text-font": [
      ...classSelector,
      ["ferry", "aerialway"],
      ["literal", ["Americana-Italic"]],
      ["literal", ["Americana-Regular"]],
    ],
    "text-field": [...Label.localizedNameInline],
    "text-max-angle": 20,
    "symbol-placement": "line",
    "text-size": [
      "step",
      ["zoom"],
      12,
      16,
      [...classSelector, motorwayToTrunk, 10, 12],
      17,
      [...classSelector, ["secondary", "tertiary", "busway"], 10, 12],
      18,
      [...classSelector, ["ferry", "aerialway", ...motorwayToTertiary], 12, 10],
    ],
    "text-anchor": [
      "step",
      ["zoom"],
      [...classSelector, "aerialway", "center", "bottom"],
      16,
      [
        ...classSelector,
        "aerialway",
        "center",
        motorwayToTrunk,
        "center",
        "bottom",
      ],
      17,
      [
        ...classSelector,
        "aerialway",
        "center",
        motorwayToTertiary,
        "center",
        "bottom",
      ],
      18,
      "center",
    ],
    "text-offset": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      15,
      [
        ...classSelector,
        "aerialway",
        ["literal", [0, -0.7]],
        ["literal", [0, 0]],
      ],
      16,
      [
        ...classSelector,
        "aerialway",
        ["literal", [0, -0.9]],
        ["literal", [0, 0]],
      ],
      20,
      [
        ...classSelector,
        "aerialway",
        ["literal", [0, -1.5]],
        ["literal", [0, 0]],
      ],
    ],
    "symbol-sort-key": [
      ...classSelector,
      "aerialway",
      0,
      "motorway",
      1,
      "trunk",
      2,
      ["primary", "ferry"],
      3,
      "secondary",
      4,
      ["tertiary", "minor", "busway"],
      5,
      6,
    ],
  },
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

// A spacer label on each bridge to push any waterway label away from the bridge.
// https://github.com/osm-americana/openstreetmap-americana/issues/198
export const bridgeSpacer = {
  id: "bridge_spacer",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: [
    "all",
    ["==", ["get", "brunnel"], "bridge"],
    ["in", ["geometry-type"], ["literal", ["LineString"]]],
    ["!=", ["get", "oneway"], 1],
  ],
  paint: {
    "icon-opacity": 0,
  },
  layout: {
    "symbol-placement": "line",
    "symbol-spacing": 2,
    "icon-image": "place_dot",
    "icon-allow-overlap": true,
    "icon-size": 0.1,
  },
};
