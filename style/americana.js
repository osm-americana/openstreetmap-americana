"use strict";

import config from "./config.js";

import * as Util from "./js/util.js";
import * as Shield from "./js/shield.js";
import * as ShieldDef from "./js/shield_defs.js";

import * as lyrBackground from "./layer/background.js";
import * as lyrBoundary from "./layer/boundary.js";
import * as lyrHighwayShield from "./layer/highway_shield.js";
import * as lyrOneway from "./layer/oneway.js";
import * as lyrPark from "./layer/park.js";
import * as lyrPlace from "./layer/place.js";
import * as lyrRoad from "./layer/road.js";
import * as lyrRoadLabel from "./layer/road_label.js";
import * as lyrWater from "./layer/water.js";

/*
 This is a list of the layers in the Americana style, from bottom to top.
*/
var americanaLayers = [];

americanaLayers.push(
  lyrBackground.base,
  lyrPark.fill,

  lyrBoundary.countyCasing,
  lyrBoundary.stateCasing,
  lyrBoundary.countryCasing,

  lyrWater.water,

  lyrPark.outline,

  lyrBoundary.city,
  lyrBoundary.county,
  lyrBoundary.state,
  lyrBoundary.country,

  lyrRoad.motorwayTunnel.casing(),
  lyrRoad.trunkExpresswayTunnel.casing(),
  lyrRoad.trunkTunnel.casing(),

  lyrRoad.motorwayLinkTunnel.casing(),
  lyrRoad.trunkLinkTunnel.casing(),

  lyrRoad.motorwayTunnel.fill(),
  lyrRoad.trunkExpresswayTunnel.fill(),
  lyrRoad.trunkTunnel.fill(),

  lyrRoad.motorwayLinkTunnel.fill(),
  lyrRoad.trunkLinkTunnel.fill(),

  lyrOneway.tunnel,
  lyrOneway.tunnelLink,

  lyrRoad.motorway.casing(),
  lyrRoad.trunkExpressway.casing(),
  lyrRoad.trunk.casing(),
  lyrRoad.primaryExpressway.casing(),
  lyrRoad.primary.casing(),
  lyrRoad.secondaryExpressway.casing(),
  lyrRoad.secondary.casing(),
  lyrRoad.tertiaryExpressway.casing(),
  lyrRoad.tertiary.casing(),

  lyrRoad.motorwayLink.casing(),
  lyrRoad.trunkLink.casing(),

  lyrRoad.motorwayLink.fill(),
  lyrRoad.trunkLink.fill(),

  lyrRoad.tertiary.fill(),
  lyrRoad.tertiaryExpressway.fill(),
  lyrRoad.secondary.fill(),
  lyrRoad.secondaryExpressway.fill(),
  lyrRoad.primary.fill(),
  lyrRoad.primaryExpressway.fill(),
  lyrRoad.trunk.fill(),
  lyrRoad.trunkExpressway.fill(),
  lyrRoad.motorway.fill(),
  lyrRoad.interstate.fill(),

  lyrRoad.motorwayLink.surface(),
  lyrRoad.trunkLink.surface(),

  lyrRoad.tertiary.surface(),
  lyrRoad.tertiaryExpressway.surface(),
  lyrRoad.secondary.surface(),
  lyrRoad.secondaryExpressway.surface(),
  lyrRoad.primary.surface(),
  lyrRoad.primaryExpressway.surface(),
  lyrRoad.trunk.surface(),
  lyrRoad.trunkExpressway.surface(),
  lyrRoad.motorway.surface(),

  lyrOneway.road,
  lyrOneway.link
);

var bridgeLayers = [
  lyrRoad.tertiaryBridge.casing(),
  lyrRoad.tertiaryExpresswayBridge.casing(),
  lyrRoad.tertiaryLinkBridge.casing(),
  lyrRoad.tertiaryBridge.fill(),
  lyrRoad.tertiaryExpresswayBridge.fill(),
  lyrRoad.tertiaryLinkBridge.fill(),
  lyrRoad.tertiaryBridge.surface(),
  lyrRoad.tertiaryLinkBridge.surface(),

  lyrRoad.secondaryBridge.casing(),
  lyrRoad.secondaryExpresswayBridge.casing(),
  lyrRoad.secondaryLinkBridge.casing(),
  lyrRoad.secondaryBridge.fill(),
  lyrRoad.secondaryExpresswayBridge.fill(),
  lyrRoad.secondaryLinkBridge.fill(),
  lyrRoad.secondaryBridge.surface(),
  lyrRoad.secondaryLinkBridge.surface(),

  lyrRoad.primaryBridge.casing(),
  lyrRoad.primaryExpresswayBridge.casing(),
  lyrRoad.primaryLinkBridge.casing(),
  lyrRoad.primaryBridge.fill(),
  lyrRoad.primaryExpresswayBridge.fill(),
  lyrRoad.primaryLinkBridge.fill(),
  lyrRoad.primaryBridge.surface(),
  lyrRoad.primaryLinkBridge.surface(),

  lyrRoad.trunkBridge.casing(),
  lyrRoad.trunkExpresswayBridge.casing(),
  lyrRoad.trunkLinkBridge.casing(),
  lyrRoad.trunkLinkBridge.fill(),
  lyrRoad.trunkBridge.fill(),
  lyrRoad.trunkExpresswayBridge.fill(),
  lyrRoad.trunkBridge.surface(),
  lyrRoad.trunkExpresswayBridge.surface(),
  lyrRoad.trunkLinkBridge.surface(),

  lyrRoad.motorwayBridge.casing(),
  lyrRoad.motorwayLinkBridge.casing(),
  lyrRoad.motorwayBridge.fill(),
  lyrRoad.motorwayLinkBridge.fill(),
  lyrRoad.motorwayBridge.surface(),
  lyrRoad.motorwayLinkBridge.surface(),

  lyrOneway.bridge,
  lyrOneway.bridgeLink,
];

//Render bridge without layer on the lowest bridge layer
bridgeLayers.forEach((layer) =>
  americanaLayers.push(
    Util.filteredClone(layer, ["!has", "layer"], "_layer_bottom")
  )
);

//One layer at a time to handle stacked bridges
for (let i = 1; i <= 4; i++) {
  bridgeLayers.forEach((layer) =>
    americanaLayers.push(Util.restrictLayer(layer, i))
  );
}

//If layer is more than 5, just give up and render on a single layer.
bridgeLayers.forEach((layer) =>
  americanaLayers.push(
    Util.filteredClone(layer, [">=", "layer", 5], "_layer_top")
  )
);

americanaLayers.push(
  //The labels at the end of the list draw on top of the layers at the beginning.
  lyrRoadLabel.motorway,
  lyrRoadLabel.trunk,
  lyrRoadLabel.primary,
  lyrRoadLabel.primaryHZ,
  lyrRoadLabel.secondary,
  lyrRoadLabel.secondaryHZ,
  lyrRoadLabel.tertiary,
  lyrRoadLabel.tertiaryHZ,

  lyrPark.label,

  lyrHighwayShield.motorway,
  lyrHighwayShield.trunk,
  lyrHighwayShield.primary,
  lyrHighwayShield.secondary,
  lyrHighwayShield.tertiary,

  lyrPlace.state,
  lyrPlace.city,
  lyrPlace.countryOther,
  lyrPlace.country3,
  lyrPlace.country2,
  lyrPlace.country1,
  lyrPlace.continent
);

var getUrl = window.location;
var baseUrl = getUrl.protocol + "//" + getUrl.host + getUrl.pathname;

var style = {
  id: "streets",
  name: "Americana",
  zoom: 1,
  pitch: 0,
  center: [0, 0],
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  layers: americanaLayers,
  sprite: new URL("sprites/sprite", baseUrl).href,
  bearing: 0,
  sources: {
    openmaptiles: {
      url: config.OPENMAPTILES_URL,
      type: "vector",
    },
  },
  version: 8,
  metadata: {
    "mapbox:type": "template",
    "maptiler:copyright":
      "This style was generated on MapTiler Cloud. Usage outside of MapTiler Cloud requires valid OpenMapTiles Production Package: https://openmaptiles.com/production-package/ -- please contact us.",
    "openmaptiles:version": "3.x",
  },
};

var map = (window.map = new maplibregl.Map({
  container: "map", // container id
  hash: true,
  antialias: true,
  style: style,
  center: [-94, 40.5], // starting position [lng, lat]
  zoom: 4, // starting zoom
  attributionControl: false,
}));

map.on("styledata", function () {
  ShieldDef.loadShields(map.style.imageManager.images);
});

map.on("styleimagemissing", function (e) {
  Shield.missingIconLoader(map, e);
});

map.addControl(
  new maplibregl.AttributionControl({
    customAttribution:
      '<a href="https://openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  })
);
map.addControl(new maplibregl.NavigationControl(), "top-left");
map.getCanvas().focus();
