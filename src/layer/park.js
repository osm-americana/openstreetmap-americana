"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

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
    "text-field": Label.localizedName,
    "text-font": ["OpenHistorical Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {
    "americana:text-field-localized": true,
  },
  "source-layer": "park",
};

export const parkFill = {
  id: "park-fill",
  type: "fill",
  filter: ["==", ["get", "subclass"], "park"],
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
  filter: ["==", ["get", "subclass"], "park"],
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
  filter: ["==", ["get", "class"], "park"],
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": Label.localizedName,
    "text-font": ["OpenHistorical Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {
    "americana:text-field-localized": true,
  },
  "source-layer": "poi",
};
