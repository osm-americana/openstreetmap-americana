"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const parkLayerFilter = ["!=", ["get", "class"], "aboriginal_lands"];

export const fill = {
  id: "protected-area_fill",
  filter: parkLayerFilter,
  type: "fill",
  paint: {
    "fill-color": Color.parkFill,
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const outline = {
  id: "protected-area_outline",
  filter: parkLayerFilter,
  type: "line",
  paint: {
    "line-color": Color.parkOutline,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

export const label = {
  id: "protected-area_label",
  type: "symbol",
  filter: ["all", ["has", "rank"], parkLayerFilter],
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.parkLabelHalo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": Label.localizedName,
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "park",
};

export const parkFill = {
  ...fill,
  id: "park_fill",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const cemeteryFill = {
  id: "cemetery-fill",
  type: "fill",
  filter: ["==", "class", "cemetery"],
  paint: {
    "fill-color": Color.cemeteryFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landuse",
};

export const parkOutline = {
  ...outline,
  id: "park_outline",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const cemeteryOutline = {
  id: "cemetery-outline",
  type: "line",
  filter: ["==", "class", "cemetery"],
  paint: {
    "line-color": Color.cemeteryOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "landuse",
};

export const parkLabel = {
  ...label,
  id: "park_label",
  filter: ["==", ["get", "class"], "park"],
  "source-layer": "poi",
};

export const legendEntries = [
  {
    description: "Park",
    layers: [fill.id, outline.id, parkFill.id, parkOutline.id],
  },
  { description: "Cemetery", layers: [cemeteryFill.id, cemeteryOutline.id] },
];
