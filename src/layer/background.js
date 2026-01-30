"use strict";

import * as Color from "../constants/color.js";

/*
  Background Layer

  This is the base color of the map.
*/

let backgroundColor = Color.backgroundFill;

export const base = {
  id: "background",
  type: "background",
  paint: {
    "background-color": Color.waterFill,
  },
  layout: { visibility: "visible" },
};

export const land = {
  id: "land",
  type: "fill",
  source: "osm_land",
  "source-layer": "land",
  paint: {
    "fill-color": backgroundColor,
  },
};

export const landLine = {
  id: "land_line",
  type: "line",
  paint: {
    "line-color": Color.waterLineBold,
  },
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  source: "osm_land",
  "source-layer": "land",
};

export const pierArea = {
  id: "pier_area",
  type: "fill",
  source: "ohm",
  "source-layer": "other_areas",
  filter: [
    "all",
    ["==", ["get", "type"], "pier"],
    ["==", ["geometry-type"], "Polygon"],
  ],
  paint: {
    "fill-color": backgroundColor,
  },
  layout: { visibility: "visible" },
};

export const pierLine = {
  id: "pier_line",
  type: "line",
  source: "ohm",
  "source-layer": "other_lines",
  filter: [
    "all",
    ["==", ["get", "type"], "pier"],
    ["==", ["geometry-type"], "LineString"],
  ],
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
