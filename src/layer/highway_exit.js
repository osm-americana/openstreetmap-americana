"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color";

export const exits = {
  id: "highway-exit",
  type: "symbol",
  filter: [
    "all",
    ["==", ["get", "subclass"], "junction"],
    ["!=", ["get", "ref"], ""],
  ],
  source: "openmaptiles",
  "source-layer": "transportation_name",
  minzoom: 14,
  layout: {
    "text-field": Label.listValuesExpression(["get", "ref"], "\n"),
    "text-font": ["Americana-Bold"],
    "text-size": 9,
    "text-line-height": 1,
  },
  paint: {
    "text-color": Color.highwayExitText,
    "text-halo-color": Color.highwayExitHalo,
    "text-halo-width": 0.75,
  },
};

export const legendEntries = [
  {
    description: "Freeway or expressway exit",
    layers: [exits.id],
  },
];
