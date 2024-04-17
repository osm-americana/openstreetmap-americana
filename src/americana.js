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


function shieldDefLoad(shields) {
  legendControl = new LegendControl(shields);
  legendControl.sections = LegendConfig.sections;
  map.addControl(legendControl, "bottom-left");
  map.addControl(sampleControl, "bottom-left");

  if (window.top === window.self) {
    // if not embedded in an iframe, autofocus canvas to enable keyboard shortcuts
    map.getCanvas().focus();
  }

  map.addControl(new maplibregl.AttributionControl(attributionConfig));

  map.addControl(new search.PhotonSearchControl(), "top-left");
  map.addControl(new maplibregl.NavigationControl(), "top-left");

  window.addEventListener("languagechange", (event) => {
    console.log(`Changed to ${navigator.languages}`);
    hotReloadMap();
    updateLanguageLabel();
  });

  window.addEventListener("hashchange", (event) => {
    upgradeLegacyHash();
    let oldLanguage = Label.getLanguageFromURL(new URL(event.oldURL));
    let newLanguage = Label.getLanguageFromURL(new URL(event.newURL));
    if (oldLanguage !== newLanguage) {
      console.log(`Changed to ${newLanguage}`);
      hotReloadMap();
    }
  });

  if (window.LIVE_RELOAD) {
    new EventSource("/esbuild").addEventListener("change", () =>
      location.reload()
    );
  }
}

function hotReloadMap() {
  map.setStyle(buildStyle());
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
