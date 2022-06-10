"use strict";
/*
  Background Layer

  This is the base color of the map.
*/

let backgroundColor = {
  stops: [
    [6, "rgba(253, 251, 242, 1)"],
    [10, "rgba(253, 251, 242, 1)"],
    [14, "rgba(250, 246, 242, 1)"],
    [15, "rgba(250, 246, 242, 1)"],
  ],
};

export const base = {
  id: "background",
  type: "background",
  paint: {
    "background-color": backgroundColor,
  },
  layout: { visibility: "visible" },
};

export const pierArea = {
  id: "pierArea",
  type: "fill",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", ["==", "class", "pier"], ["==", "$type", "Polygon"]],
  paint: {
    "fill-color": backgroundColor,
  },
  layout: { visibility: "visible" },
};

export const pierLine = {
  id: "pierLine",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", ["==", "class", "pier"], ["==", "$type", "LineString"]],
  paint: {
    "line-color": backgroundColor,
    "line-width": {
      base: 1.7,
      stops: [
        [14, 1],
        [20, 20],
      ],
    },
  },
  layout: {
    "line-cap": "butt",
    visibility: "visible",
  },
};
