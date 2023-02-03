"use strict";

import * as Color from "../constants/color.js";

// Exponent base for inter-zoom interpolation
let aerialwayExp = 1.2;

export const lift = {
  id: "lift",
  type: "line",
  paint: {
    "line-color": Color.aerialwayLine,
    "line-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      0.6,
      16,
      1.2,
      20,
      2.4,
    ],
    "line-gap-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      0.5,
      16,
      1,
      20,
      16,
    ],
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
    "line-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      1.5,
      16,
      3,
      20,
      6,
    ],
    "line-dasharray": [2, 0.5],
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

export const liftCasing = {
  id: "lift_casing",
  type: "line",
  paint: {
    "line-color": Color.backgroundFill,
    "line-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      1,
      16,
      2,
      20,
      4,
    ],
    "line-gap-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      0.01,
      16,
      0.01,
      20,
      14.4,
    ],
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
