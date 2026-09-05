"use strict";

import { localizedName } from "@americana/diplomat";
import * as Color from "../constants/color.js";

const parkStepFilter = [
  "step",
  ["zoom"],
  [">=", ["get", "area"], 1000000000], //Only rank 2 (dynamic) to z10
  10,
  true, //Show all past z10
];

const parkFilter = [
  "match",
  ["get", "type"],
  ["nature_reserve", "park"],
  true,
  false,
];

export const fill = {
  id: "protected-area_fill",
  type: "fill",
  filter: parkFilter,
  paint: {
    "fill-color": Color.parkFill,
  },
  source: "ohm",
  "source-layer": "landuse_areas",
};

export const outline = {
  id: "protected-area_outline",
  type: "line",
  filter: parkFilter,
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
  filter: ["all", parkFilter, parkStepFilter],
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
  "source-layer": "landuse_points_centroids",
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

export const pitchFill = {
  id: "pitch-fill",
  type: "fill",
  filter: ["==", "type", "pitch"],
  paint: {
    "fill-color": Color.pitchFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm",
  metadata: {},
  "source-layer": "landuse",
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

export const pitchOutline = {
  id: "pitch-outline",
  type: "line",
  filter: ["==", "type", "pitch"],
  paint: {
    "line-color": Color.pitchOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm",
  metadata: {},
  "source-layer": "landuse",
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
  { description: "Sports field", layers: [pitchFill.id, pitchOutline.id] },
];
