"use strict";

import config from "./config.js";

import * as Label from "./constants/label.js";

import * as languageLabel from "./js/language_label.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import LegendControl from "./js/legend_control.js";
import * as LegendConfig from "./js/legend_config.js";
import SampleControl from "openmapsamples-maplibre/OpenMapSamplesControl.js";
import { default as OpenMapTilesSamples } from "openmapsamples/samples/OpenMapTiles/index.js";

import { createMap, loadRTLPlugin, buildStyle } from "./js/map_builder.js";
import { debugOptions } from "./debug_config.js";

function upgradeLegacyHash() {
  let hash = window.location.hash.substr(1);
  if (!hash.includes("=")) {
    hash = `#map=${hash}`;
  }
  window.location.hash = hash;
}
upgradeLegacyHash();

loadRTLPlugin();

export const map = createMap(
  window,
  (shields) => shieldDefLoad(shields),
  {
    container: "map", // container id
    hash: "map",
    antialias: true,
    style: buildStyle(),
    center: [-94, 40.5],
    zoom: 4,
    attributionControl: false,
  },
  debugOptions
);

// Add our sample data.
let sampleControl = new SampleControl({ permalinks: true });
OpenMapTilesSamples.forEach((sample, i) => {
  sampleControl.addSample(sample);
});

let legendControl;

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
  map.addControl(languageLabel.label, "bottom-right");

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
      updateLanguageLabel();
    }
  });

  updateLanguageLabel();

  if (window.LIVE_RELOAD) {
    new EventSource("/esbuild").addEventListener("change", () =>
      location.reload()
    );
  }
}

function hotReloadMap() {
  map.setStyle(buildStyle());
}

export function updateLanguageLabel() {
  languageLabel.displayLocales(Label.getLocales());
  legendControl.onLanguageChange();
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
