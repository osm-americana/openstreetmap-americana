"use strict";

import { localizedNameWithLocalGloss } from "@americana/diplomat";
import * as Color from "../constants/color.js";

export const fill = {
  id: "military_fill",
  type: "fill",
  filter: ["==", ["get", "class"], "military"],
  paint: {
    "fill-color": Color.militaryFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landuse",
};

export const outline = {
  id: "military_outline",
  type: "line",
  filter: ["==", ["get", "class"], "military"],
  paint: {
    "line-color": Color.militaryOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landuse",
};

export const label = {
  id: "military_label",
  type: "symbol",
  filter: ["==", ["get", "class"], "military"],
  paint: {
    "text-color": Color.militaryLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.militaryLabelHalo,
    "text-halo-width": 1.5,
  },
  layout: {
    "text-field": localizedNameWithLocalGloss,
    "text-font": ["Americana-Regular"],
    "text-size": {
      base: 10,
      stops: [
        [6, 11],
        [10, 12],
        [12, 15],
        [14, 18],
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
    description: "Military base",
    layers: [fill.id, outline.id],
  },
];
