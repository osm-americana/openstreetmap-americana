"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const labelPaintProperties = {
  "text-halo-color": Color.backgroundFill,
  "text-color": Color.ridgeLabel,
  "text-halo-width": 0.75,
  "text-halo-blur": 0.25,
};

const labelLayoutProperties = {
  "symbol-placement": "line",
  "text-field": Label.localizedNameInline,
  "text-font": ["Americana-Italic"],
  "text-max-angle": 55,
};

export const ridgeLabel = {
  id: "ridge_label",
  type: "symbol",
  filter: ["==", ["get", "class"], "ridge"],
  source: "openmaptiles",
  "source-layer": "mountain_peak",
  layout: {
    ...labelLayoutProperties,
    "text-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      3,
      6,
      12,
      12,
      20,
      36,
    ],
    "text-letter-spacing": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      12,
      0.2,
      20,
      4,
    ],
    visibility: "none",
  },
  paint: labelPaintProperties,
};

export const legendEntries = [];
