"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const highwaySelector = ["match", ["get", "class"]];

const motorwayToTrunk = ["motorway", "trunk"];
const motorwayToPrimary = [...motorwayToTrunk, "primary"];
const motorwayToSecondary = [...motorwayToPrimary, "secondary"];
const motorwayToMinor = [...motorwayToSecondary, "tertiary", "minor"];
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
      ...highwaySelector,
      majorConstruction,
      "maroon",
      minorConstruction,
      "slategray",
      "ferry",
      "hsl(211, 53%, 15%)",
      "#333",
    ],
    "text-halo-color": [
      ...highwaySelector,
      "ferry",
      "hsl(211, 70%, 90%)",
      Color.backgroundFill,
    ],
    "text-halo-blur": 0.5,
    "text-halo-width": 2,
    "text-opacity": [
      "step",
      ["zoom"],
      [...highwaySelector, "motorway", 1, 0],
      10,
      [...highwaySelector, motorwayToTrunk, 1, 0],
      11,
      [...highwaySelector, motorwayToPrimary, 1, "ferry", 1, 0],
      12,
      [...highwaySelector, motorwayToSecondary, 1, "ferry", 1, 0],
      13,
      [...highwaySelector, motorwayToMinor, 1, "ferry", 1, 0],
      14,
      [...highwaySelector, motorwayToService, 1, "ferry", 1, 0],
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
      ],
    ],
  ],
  layout: {
    "text-font": [
      ...highwaySelector,
      "ferry",
      ["literal", ["OpenHistorical Italic"]],
      ["literal", ["OpenHistorical"]],
    ],
    "text-field": Label.localizedName,
    "text-max-angle": 20,
    "symbol-placement": "line",
    "text-size": [
      "step",
      ["zoom"],
      12,
      16,
      [...highwaySelector, motorwayToTrunk, 10, 12],
      17,
      [...highwaySelector, motorwayToSecondary, 10, 12],
    ],
    "text-anchor": [
      "step",
      ["zoom"],
      "bottom",
      16,
      [...highwaySelector, motorwayToTrunk, "center", "bottom"],
      17,
      [...highwaySelector, motorwayToSecondary, "center", "bottom"],
    ],
    "symbol-sort-key": [
      // TODO busway
      ...highwaySelector,
      "motorway",
      0,
      "trunk",
      1,
      ["primary", "ferry"],
      2,
      "secondary",
      3,
      ["tertiary", "minor"],
      4,
      5,
    ],
  },
  source: "openmaptiles",
  "source-layer": "transportation_name",
  metadata: {
    "americana:text-field-localized": true,
  },
};

// A spacer label on each bridge to push any waterway label away from the bridge.
// https://github.com/ZeLonewolf/openstreetmap-americana/issues/198
export const bridgeSpacer = {
  id: "bridge_spacer",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: [
    "all",
    ["==", ["get", "brunnel"], "bridge"],
    ["in", ["geometry-type"], ["literal", ["LineString"]]],
  ],
  paint: {
    "icon-opacity": 0,
  },
  layout: {
    "symbol-placement": "line",
    "symbol-spacing": 2,
    "icon-image": "dot_city",
    "icon-allow-overlap": true,
    "icon-size": 0.1,
  },
};
