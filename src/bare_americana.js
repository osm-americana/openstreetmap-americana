"use strict";

import "maplibre-gl/dist/maplibre-gl.css";

import { createMap, buildStyle } from "./js/map_builder.js";

loadRTLPlugin();

export const map = createMap(window, {
  container: "map", // container id
  hash: "map",
  antialias: true,
  style: buildStyle(),
  center: [-94, 40.5],
  zoom: 4,
  fadeDuration: 0,
  attributionControl: false,
});
