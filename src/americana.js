"use strict";

import config from "./config.js";

import * as Label from "./constants/label.js";
import * as Style from "./js/style.js";

import * as Shield from "./js/shield.js";
import * as ShieldDef from "./js/shield_defs.js";
import * as CustomShields from "./js/custom_shields.js";

import * as languageLabel from "./js/language_label.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import LegendControl from "./js/legend_control.js";
import * as LegendConfig from "./js/legend_config.js";
import SampleControl from "openmapsamples-maplibre/OpenMapSamplesControl.js";
import { default as OpenMapTilesSamples } from "openmapsamples/samples/OpenMapTiles/index.js";

export function buildStyle() {
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + getUrl.pathname;
  return Style.build(
    config.OPENMAPTILES_URL,
    new URL("sprites/sprite", baseUrl).href,
    Label.getLocales()
  );
}

function upgradeLegacyHash() {
  let hash = window.location.hash.substr(1);
  if (!hash.includes("=")) {
    hash = `#map=${hash}`;
  }
  window.location.hash = hash;
}
upgradeLegacyHash();

maplibregl.setRTLTextPlugin(
  "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
  null,
  true
);

window.maplibregl = maplibregl;
export const map = (window.map = new maplibregl.Map({
  container: "map", // container id
  hash: "map",
  antialias: true,
  style: buildStyle(),
  center: [-94, 40.5], // starting position [lng, lat]
  zoom: 4, // starting zoom
  attributionControl: false,
}));

CustomShields.loadCustomShields();
ShieldDef.loadShields();

map.on("styleimagemissing", function (e) {
  Shield.missingIconHandler(map, e);
});

function hotReloadMap() {
  map.setStyle(buildStyle());
}

export function updateLanguageLabel() {
  languageLabel.displayLocales(Label.getLocales());
  legendControl.onLanguageChange();
}

let legendControl = new LegendControl();
legendControl.sections = LegendConfig.sections;
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

let attributionConfig = {
  customAttribution: "",
};

if (config.ATTRIBUTION_TEXT != undefined) {
  attributionConfig = {
    customAttribution: config.ATTRIBUTION_TEXT,
  };
}

map.addControl(new maplibregl.AttributionControl(attributionConfig));
map.addControl(languageLabel.label, "bottom-right");

if (config.ATTRIBUTION_LOGO != undefined) {
  document.getElementById("attribution-logo").innerHTML =
    config.ATTRIBUTION_LOGO;
}

map.addControl(new search.PhotonSearchControl(), "top-left");
map.addControl(new maplibregl.NavigationControl(), "top-left");

map.addControl(legendControl, "bottom-left");

// Add our sample data.
let sampleControl = new SampleControl({ permalinks: true });
OpenMapTilesSamples.forEach((sample, i) => {
  sampleControl.addSample(sample);
});
map.addControl(sampleControl, "bottom-left");

map.getCanvas().focus();

updateLanguageLabel();

if (window.LIVE_RELOAD) {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}
