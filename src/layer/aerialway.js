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
      20,
      2.4,
    ],
    "line-gap-width": [
      "interpolate",
      ["exponential", aerialwayExp],
      ["zoom"],
      12,
      0.5,
      20,
      2,
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
      2.5,
      20,
      10,
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
