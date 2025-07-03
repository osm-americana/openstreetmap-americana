"use strict";

import * as Color from "../constants/color";
import { LayerSpecification } from "maplibre-gl";

/*
  Background Layer

  This is the base color of the map.
*/

let backgroundColor = Color.backgroundFill;

export const base: LayerSpecification = {
  id: "background",
  type: "background",
  paint: {
    "background-color": backgroundColor,
  },
  layout: { visibility: "visible" },
};

export const pierArea: LayerSpecification = {
  id: "pier_area",
  type: "fill",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: [
    "all",
    ["==", ["get", "class"], "pier"],
    ["==", ["geometry-type"], "Polygon"],
  ],
  paint: {
    "fill-color": backgroundColor,
  },
  layout: { visibility: "visible" },
};

export const pierLine: LayerSpecification = {
  id: "pier_line",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: [
    "all",
    ["==", ["get", "class"], "pier"],
    ["==", ["geometry-type"], "LineString"],
  ],
  paint: {
    "line-color": backgroundColor,
    "line-width": [
      "interpolate",
      ["exponential", 1.7],
      ["zoom"],
      14, 1,
      20, 20,
    ],
  },
  layout: {
    "line-cap": "butt",
    visibility: "visible",
  },
};
