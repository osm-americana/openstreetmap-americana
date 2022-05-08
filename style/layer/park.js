"use strict";

import * as Color from "../constants/color.js";

// Name fields in order of preference
const name_en = [
  "coalesce",
  ["get", "name:en"],
  ["get", "name:latin"],
  ["get", "name"],
];

export const fill = {
  id: "protected-area-fill",
  type: "fill",
  paint: {
    "fill-color": Color.parkFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

export const outline = {
  id: "protected-area-outline",
  type: "line",
  paint: {
    "line-color": Color.parkOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

export const label = {
  id: "protected-area-label",
  type: "symbol",
  filter: ["has", "rank"],
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": name_en,
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

export const parkFill = {
  id: "park-fill",
  type: "fill",
  filter: ["==", "subclass", "park"],
  paint: {
    "fill-color": Color.parkFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landcover",
};

export const parkOutline = {
  id: "park-outline",
  type: "line",
  filter: ["==", "subclass", "park"],
  paint: {
    "line-color": Color.parkOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landcover",
};

export const parkLabel = {
  id: "park-label",
  type: "symbol",
  filter: ["==", "class", "park"],
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": name_en,
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "poi",
};
