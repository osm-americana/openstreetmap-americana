"use strict";

import { listValuesExpression } from "@americana/diplomat";

export const exits = {
  id: "highway-exit",
  type: "symbol",
  filter: [
    "all",
    ["==", ["get", "type"], "motorway_junction"],
    ["!=", ["get", "ref"], ""],
  ],
  source: "ohm",
  "source-layer": "transport_lines_centroids",
  minzoom: 14,
  layout: {
    "text-field": listValuesExpression(["get", "ref"], "\n"),
    "text-font": ["Americana-Bold"],
    "text-size": 9,
    "text-line-height": 1,
  },
  paint: {
    "text-color": "hsla(60, 100%, 50%, 1)",
    "text-halo-color": "#000000",
    "text-halo-width": 0.75,
  },
};

export const legendEntries = [
  {
    description: "Freeway or expressway exit",
    layers: [exits.id],
  },
];
