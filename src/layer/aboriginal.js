"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

export const fill = {
  id: "aboriginal_fill",
  type: "fill",
  filter: ["==", ["get", "class"], "aboriginal_lands"],
  paint: {
    "fill-color": Color.aboriginalFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "boundary",
};

export const outline = {
  id: "aboriginal_outline",
  type: "line",
  filter: ["==", ["get", "class"], "aboriginal_lands"],
  paint: {
    "line-color": Color.aboriginalOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "boundary",
};

export const label = {
  id: "aboriginal_label",
  type: "symbol",
  filter: ["==", ["get", "class"], "aboriginal_lands"],
  paint: {
    "text-color": Color.aboriginalLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.aboriginalLabelHalo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": Label.localizedName,
    "text-font": ["Americana-Regular"],
    "text-size": {
      base: 10,
      stops: [
        [6, 11],
        [10, 12],
      ],
    },
    "text-padding": 1,
    "text-transform": "uppercase",
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "place",
};

export const legendEntries = [
  {
    description: "Native lands",
    layers: [fill.id, outline.id],
  },
];
