"use strict";

import config from "./config.js";

import * as Label from "./constants/label.js";

import * as Util from "./js/util.js";
import * as Shield from "./js/shield.js";
import * as ShieldDef from "./js/shield_defs.js";

import * as lyrAeroway from "./layer/aeroway.js";
import * as lyrBackground from "./layer/background.js";
import * as lyrBoundary from "./layer/boundary.js";
import * as lyrConstruction from "./layer/construction.js";
import * as lyrHighwayShield from "./layer/highway_shield.js";
import * as lyrLanduse from "./layer/landuse.js";
import * as lyrOneway from "./layer/oneway.js";
import * as lyrPark from "./layer/park.js";
import * as lyrPlace from "./layer/place.js";
import * as lyrRail from "./layer/rail.js";
import * as lyrRoad from "./layer/road.js";
import * as lyrTransportationLabel from "./layer/transportation_label.js";
import * as lyrWater from "./layer/water.js";
import * as lyrBuilding from "./layer/building.js";
import * as lyrHighwayExit from "./layer/highway_exit.js";
import * as lyrFerry from "./layer/ferry.js";

import * as languageLabel from "./js/language_label.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import SampleControl from "openmapsamples-maplibre/OpenMapSamplesControl.js";
import { default as OpenMapTilesSamples } from "openmapsamples/samples/OpenMapTiles/index.js";
import { buildLayers } from "./layer/layers.js";

export function buildStyle() {
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + "//" + getUrl.host + getUrl.pathname;

  var styleLayers = buildLayers();
  Label.localizeLayers(styleLayers, Label.getLocales());

  return {
    id: "streets",
    name: "Americana",
    glyphs:
      "https://openhistoricalmap.github.io/map-styles/fonts/{fontstack}/{range}.pbf",
    layers: styleLayers,
    sources: {
      openmaptiles: {
        url: config.OPENMAPTILES_URL,
        type: "vector",
      },
    },
    sprite: new URL("sprites/sprite", baseUrl).href,
    light: {
      anchor: "viewport",
      color: "white",
      intensity: 0.12,
    },
    version: 8,
  };
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

map.on("styledata", function (event) {
  ShieldDef.loadShields(map.style.imageManager.images);
});

map.on("styleimagemissing", function (e) {
  Shield.missingIconHandler(map, e);
});

export function hotReloadMap() {
  map.setStyle(buildStyle());
}

export function updateLanguageLabel() {
  languageLabel.displayLocales(Label.getLocales());
}

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

// Add our sample data.
let sampleControl = new SampleControl({ permalinks: true });
OpenMapTilesSamples.forEach((sample, i) => {
  sampleControl.addSample(sample);
});
map.addControl(sampleControl, "bottom-left");

map.getCanvas().focus();

updateLanguageLabel();
