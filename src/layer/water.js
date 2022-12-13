"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const bigRivers = ["river", "canal"];
const mediumRivers = ["stream"];
// drain, ditch

export const waterway = {
  id: "waterway",
  type: "line",
  source: "openmaptiles",
  "source-layer": "waterway",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  filter: ["!=", ["get", "intermittent"], 1],
  paint: {
    "line-color": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      13,
      Color.waterLine,
      14,
      [
        "case",
        ["==", ["get", "intermittent"], 1],
        Color.waterLine,
        Color.waterFill,
      ],
    ],
    "line-width": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      3,
      0.5,
      16,
      [
        "case",
        ["in", ["get", "class"], ["literal", bigRivers]],
        10,
        ["in", ["get", "class"], ["literal", mediumRivers]],
        6,
        2,
      ],
    ],
    "line-opacity": ["case", ["==", ["get", "brunnel"], "tunnel"], 0.3, 1],
  },
};

export const waterwayIntermittent = {
  ...waterway,
  id: "waterway_intermittent",
  filter: ["==", ["get", "intermittent"], 1],
  paint: {
    ...waterway.paint,
    "line-dasharray": [2, 3],
  },
};

export const water = {
  id: "water",
  type: "fill",
  paint: {
    "fill-color": Color.waterFill,
    "fill-opacity": [
      "case",
      [
        "any",
        ["==", ["get", "intermittent"], 1],
        ["==", ["get", "brunnel"], "tunnel"],
      ],
      0.3,
      1,
    ],
    "fill-outline-color": Color.waterFillTranslucent,
  },
  source: "openmaptiles",
  "source-layer": "water",
};

export const waterLine = {
  id: "water_line",
  type: "line",
  filter: [
    "match",
    ["get", "class"],
    bigRivers,
    [">=", ["zoom"], 8],
    mediumRivers,
    [">=", ["zoom"], 16],
    "lake",
    ["all", ["!=", ["get", "intermittent"], 1], [">=", ["zoom"], 8]],
    true,
  ],
  paint: {
    "line-color": Color.waterLineBold,
  },
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  source: "openmaptiles",
  "source-layer": "water",
};

export const waterLineIntermittent = {
  id: "water_line_intermittent",
  type: "line",
  minzoom: 8,
  filter: [
    "all",
    ["==", ["get", "intermittent"], 1],
    ["==", ["get", "class"], "lake"],
  ],
  paint: {
    "line-color": Color.waterLine,
    "line-dasharray": [6, 4],
  },
  layout: waterLine.layout,
  source: "openmaptiles",
  "source-layer": "water",
};

const labelPaintProperties = {
  "text-halo-color": [
    "match",
    ["get", "class"],
    ["sea", "ocean"],
    Color.waterFill,
    Color.backgroundFill,
  ],
  "text-color": Color.waterLabel,
  "text-halo-width": 0.75,
  "text-halo-blur": 0.25,
};

const labelLayoutProperties = {
  "symbol-placement": "line",
  "text-field": Label.localizedName,
  "text-font": ["OpenHistorical Italic"],
  "text-max-angle": 55,
};

export const waterwayLabel = {
  id: "waterway_label",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "waterway",
  filter: ["!=", ["get", "brunnel"], "tunnel"],
  layout: {
    ...labelLayoutProperties,
    "text-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      3,
      8,
      12,
      ["case", ["in", ["get", "class"], ["literal", bigRivers]], 14, 10],
      20,
      [
        "case",
        ["in", ["get", "class"], ["literal", bigRivers]],
        40,
        ["in", ["get", "class"], ["literal", mediumRivers]],
        20,
        15,
      ],
    ],
    "text-letter-spacing": 0.15,
  },
  paint: labelPaintProperties,
};

//Lake labels rendered as a linear feature
export const waterLabel = {
  id: "water_label",
  type: "symbol",
  filter: ["all", ["==", ["geometry-type"], "LineString"]],
  source: "openmaptiles",
  "source-layer": "water_name",
  layout: {
    ...labelLayoutProperties,
    "text-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      3,
      11,
      12,
      18,
      20,
      40,
    ],
    "text-letter-spacing": 0.25,
  },
  paint: labelPaintProperties,
};

//Lake labels rendered as a point feature
export const waterPointLabel = {
  id: "water_point_label",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "water_name",
  filter: ["all", ["==", ["geometry-type"], "Point"]],
  layout: {
    "text-field": Label.localizedName,
    "text-font": ["Open Sans Bold Italic"],
    "text-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      3,
      ["match", ["get", "class"], "ocean", 16, "sea", 12, 8],
      12,
      ["match", ["get", "class"], "ocean", 28, "sea", 21, 14],
      20,
      ["match", ["get", "class"], "ocean", 80, "sea", 60, 40],
    ],
    "text-letter-spacing": 0.25,
  },
  paint: labelPaintProperties,
};
