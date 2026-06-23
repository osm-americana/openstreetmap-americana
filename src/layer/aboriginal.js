"use strict";

import { localizedNameWithLocalGloss } from "@americana/diplomat";
import * as Color from "../constants/color.js";

export const fill = {
  id: "aboriginal_fill",
  type: "fill",
  filter: ["==", ["get", "type"], "aboriginal_lands"],
  paint: {
    "fill-color": Color.aboriginalFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm_other_boundaries",
  metadata: {},
  "source-layer": "non_admin_boundaries_areas",
};

export const outline = {
  id: "aboriginal_outline",
  type: "line",
  filter: ["==", ["get", "type"], "aboriginal_lands"],
  paint: {
    "line-color": Color.aboriginalOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "ohm_other_boundaries",
  metadata: {},
  "source-layer": "non_admin_boundaries_areas",
};

export const label = {
  id: "aboriginal_label",
  type: "symbol",
  filter: ["==", ["get", "type"], "aboriginal_lands"],
  paint: {
    "text-color": Color.aboriginalLabel,
    "text-halo-blur": 1,
    "text-halo-color": Color.aboriginalLabelHalo,
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
  source: "ohm_other_boundaries",
  "source-layer": "non_admin_boundaries_centroids",
};

export const edgeLabel = {
  id: "aboriginal_edge_label",
  type: "symbol",
  filter: ["==", ["get", "type"], "aboriginal_lands"],
  paint: label.paint,
  layout: {
    "symbol-placement": "line",
    "text-font": ["Americana-Regular"],
    "text-size": {
      stops: [
        [3, 6],
        [7, 10],
      ],
    },
    "text-field": localizedNameWithLocalGloss,
    "text-offset": [0, 1],
    "text-max-angle": 30,
    "text-letter-spacing": 0.1,
    "text-ignore-placement": true,
    "text-transform": "uppercase",
  },
  maxzoom: 24,
  source: "ohm_other_boundaries",
  "source-layer": "non_admin_boundaries_areas",
};

export const legendEntries = [
  {
    description: "Tribal reservation or other native land",
    layers: [fill.id, outline.id],
  },
];
