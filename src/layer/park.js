"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

export const fill = {
  id: "protected-area-fill",
  type: "fill",
  paint: {
    "fill-color": Color.parkFill,
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const outline = {
  id: "protected-area-outline",
  type: "line",
  paint: {
    "line-color": Color.parkOutline,
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
    "text-halo-color": Color.parkLabelHalo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": Label.localizedName,
    "text-font": ["OpenHistorical Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const parkFill = {
  ...fill,
  id: "park-fill",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const parkOutline = {
  ...outline,
  id: "park-outline",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const parkLabel = {
  ...label,
  id: "park-label",
  filter: ["==", ["get", "class"], "park"],
  "source-layer": "poi",
};

export const legendEntries = [
  {
    description: "Park",
    properties: {},
  },
];

export const legendLayers = [fill.id, outline.id, parkFill.id, parkOutline.id];
