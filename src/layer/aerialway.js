"use strict";

import * as Color from "../constants/color.js";

// Exponent base for inter-zoom interpolation
let aerialwayExp = 1.2;

let lineWidth = [
  "interpolate",
  ["exponential", aerialwayExp],
  ["zoom"],
  12,
  1.2,
  14.9999,
  2.4,
  15,
  1.2,
  16,
  1.2,
  20,
  2.4,
];
let lineGapWidth = [
  "interpolate",
  ["exponential", aerialwayExp],
  ["zoom"],
  12,
  0,
  15,
  0,
  16,
  1,
  20,
  16,
];

let casingLineWidth = [
  "interpolate",
  ["exponential", aerialwayExp],
  ["zoom"],
  12,
  2,
  15.9999,
  4,
  16,
  2,
  20,
  4,
];
let casingLineGapWidth = [
  "interpolate",
  ["exponential", aerialwayExp],
  ["zoom"],
  12,
  0,
  16,
  0,
  20,
  14.4,
];

export const lift = {
  id: "lift",
  type: "line",
  paint: {
    "line-color": Color.aerialwayLine,
    "line-width": lineWidth,
    "line-gap-width": lineGapWidth,
  },
  filter: [
    "all",
    ["==", ["get", "class"], "aerialway"],
    [
      "in",
      ["get", "subclass"],
      ["literal", ["chair_lift", "cable_car", "gondola", "mixed_lift"]],
    ],
  ],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};

export const liftCasing = {
  id: "lift_casing",
  type: "line",
  paint: {
    "line-color": Color.backgroundFill,
    "line-width": casingLineWidth,
    "line-gap-width": casingLineGapWidth,
  },
  filter: [
    "all",
    ["==", ["get", "class"], "aerialway"],
    [
      "in",
      ["get", "subclass"],
      ["literal", ["chair_lift", "cable_car", "gondola", "mixed_lift"]],
    ],
  ],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};

export const dragLift = {
  id: "drag_lift",
  type: "line",
  paint: {
    "line-color": Color.aerialwayLine,
    "line-width": lineWidth,
    "line-gap-width": lineGapWidth,
    "line-dasharray": [5, 1],
  },
  filter: [
    "all",
    ["==", ["get", "class"], "aerialway"],
    [
      "in",
      ["get", "subclass"],
      ["literal", ["drag_lift", "platter", "j-bar", "t-bar"]],
    ],
  ],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};

export const legendEntries = [
  {
    description: "Aerial tramway or chairlift",
    layers: [lift.id],
  },
  {
    description: "Drag lift",
    layers: [dragLift.id],
  },
];
