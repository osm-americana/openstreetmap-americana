"use strict";

import config from "./config.js";

import * as Label from "./constants/label.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import { createMap, buildStyle } from "./js/map_builder.js";

function upgradeLegacyHash() {
  let hash = window.location.hash.substr(1);
  if (!hash.includes("=")) {
    hash = `#map=${hash}`;
  }
  window.location.hash = hash;
}
upgradeLegacyHash();

export const map = createMap(window, {
  container: "map", // container id
  hash: "map",
  antialias: true,
  style: buildStyle(),
  center: [-94, 40.5],
  zoom: 4,
  attributionControl: false,
});

let options = {};

if (config.SHIELD_TEXT_HALO_COLOR_OVERRIDE) {
  options["SHIELD_TEXT_HALO_COLOR_OVERRIDE"] =
    config.SHIELD_TEXT_HALO_COLOR_OVERRIDE;
}

let attributionConfig = {
  customAttribution: "",
};

if (config.ATTRIBUTION_TEXT != undefined) {
  attributionConfig = {
    customAttribution: config.ATTRIBUTION_TEXT,
  };
}

if (config.ATTRIBUTION_LOGO != undefined) {
  document.getElementById("attribution-logo").innerHTML =
    config.ATTRIBUTION_LOGO;
}
