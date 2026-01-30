"use strict";

import { localizedName } from "@americana/diplomat";
import * as Color from "../constants/color.js";

const parkLayerFilter = ["==", ["get", "type"], "nature_reserve"];

export const fill = {
  id: "protected-area_fill",
  filter: parkLayerFilter,
  type: "fill",
  paint: {
    "fill-color": Color.parkFill,
  },
  source: "ohm",
  "source-layer": "landuse_areas",
};

export const outline = {
  id: "protected-area_outline",
  filter: parkLayerFilter,
  type: "line",
  paint: {
    "line-color": Color.parkOutline,
  },
  source: "ohm",
  metadata: {},
  "source-layer": "landuse_areas",
};

export const label = {
  id: "protected-area_label",
  type: "symbol",
  filter: parkLayerFilter,
  paint: {
    "text-color": Color.parkLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.parkLabelHalo,
    "text-halo-width": 1,
  },
  layout: {
    "text-field": localizedName,
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    "symbol-sort-key": ["*", -1, ["get", "area"]],
  },
  source: "ohm",
  "source-layer": "landuse_areas",
};

export const parkFill = {
  ...fill,
  id: "park_fill",
  filter: ["==", ["get", "type"], "park"],
  "source-layer": "landuse_areas",
};

export const cemeteryFill = {
  id: "cemetery-fill",
  type: "fill",
  filter: ["==", "type", "cemetery"],
  paint: {
    "fill-color": Color.cemeteryFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm",
  metadata: {},
  "source-layer": "landuse_areas",
};

export const parkOutline = {
  ...outline,
  id: "park_outline",
  filter: ["==", ["get", "type"], "park"],
  "source-layer": "landuse_areas",
};

export const cemeteryOutline = {
  id: "cemetery-outline",
  type: "line",
  filter: ["==", "type", "cemetery"],
  paint: {
    "line-color": Color.cemeteryOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm",
  metadata: {},
  "source-layer": "landuse_areas",
};

export const parkLabel = {
  ...label,
  id: "park_label",
  filter: ["==", ["get", "type"], "park"],
  "source-layer": "landuse_points_centroids",
};

export const legendEntries = [
  {
    description: "Park",
    layers: [fill.id, outline.id, parkFill.id, parkOutline.id],
  },
  { description: "Cemetery", layers: [cemeteryFill.id, cemeteryOutline.id] },
];
