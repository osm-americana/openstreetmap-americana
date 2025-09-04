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

export const parkOutline = {
  ...outline,
  id: "park_outline",
  filter: ["==", ["get", "subclass"], "park"],
  "source-layer": "landcover",
};

export const parkLabel = {
  ...label,
  id: "park_label",
  filter: ["==", ["get", "class"], "park"],
  "source-layer": "poi",
};

export const attractionFill = {
  ...fill,
  id: "attraction_fill",
  filter: [
    "in",
    ["get", "class"],
    ["literal", ["theme_park", "water_park", "zoo"]],
  ],
  paint: {
    "fill-color": Color.attractionFill,
  },
  "source-layer": "landuse",
};

export const attractionOutline = {
  ...outline,
  id: "attraction_outline",
  filter: [
    "in",
    ["get", "class"],
    ["literal", ["theme_park", "water_park", "zoo"]],
  ],
  paint: {
    "line-color": Color.attractionOutline,
  },
  "source-layer": "landuse",
};

export const attractionLabel = {
  ...label,
  id: "attraction_label",
  filter: [
    "in",
    ["get", "class"],
    ["literal", ["theme_park", "water_park", "zoo"]],
  ],
  paint: {
    "text-color": Color.attractionLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.attractionLabelHalo,
    "text-halo-width": 1,
  },
  "source-layer": "poi",
};

export const legendEntries = [
  {
    description: "Park",
    layers: [fill.id, outline.id, parkFill.id, parkOutline.id],
  },
  {
    description: "Attraction",
    layers: [attractionFill.id, attractionOutline.id],
  },
];
