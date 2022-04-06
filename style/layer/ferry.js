"use strict";

// Filter properties in this layer should be updated to reflect consensus once
// https://github.com/openmaptiles/openmaptiles/issues/1373 is closed

export const ferry = {
  id: "ferry",
  type: "line",
  paint: {
    "line-color": "hsl(211, 30%, 38%)",
    "line-dasharray": [7, 5],
    "line-width": 1.5,
  },
  filter: ["any", ["==", "class", "ferry"], ["==", "subclass", "ferry"]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};

export const ferryLabel = {
  id: "ferry_label",
  type: "symbol",
  filter: ["any", ["==", "class", "ferry"], ["==", "subclass", "ferry"]],
  paint: {
    "text-color": "hsl(211, 53%, 15%)",
    "text-halo-color": "hsl(211, 70%, 90%)",
    "text-halo-blur": 0.5,
    "text-halo-width": 1.5,
  },
  layout: {
    "text-field": "{name:latin} {name:nonlatin}",
    "text-font": ["Metropolis Regular Italic"],
    "text-max-angle": 20,
    "symbol-placement": "line",
    "symbol-spacing": 500,
    "text-size": 12,
    "text-anchor": "bottom",
  },
  source: "openmaptiles",
  "source-layer": "transportation_name",
};
