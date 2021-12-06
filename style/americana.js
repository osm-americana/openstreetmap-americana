"use strict";

import * as Util from "./js/util.js";

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
  lyrRoad.trunkTunnel.casing(),

  lyrRoad.motorwayLinkTunnel.casing(),
  lyrRoad.trunkLinkTunnel.casing(),

  lyrRoad.motorwayTunnel.fill(),
  lyrRoad.trunkTunnel.fill(),

  lyrRoad.motorwayLinkTunnel.fill(),
  lyrRoad.trunkLinkTunnel.fill(),

  lyrOneway.tunnel,
  lyrOneway.tunnelLink,

  lyrRoad.motorway.casing(),
  lyrRoad.trunk.casing(),

  lyrRoad.motorwayLink.casing(),
  lyrRoad.trunkLink.casing(),

  lyrRoad.motorway.fill(),
  lyrRoad.trunk.fill(),

  lyrRoad.motorwayLink.fill(),
  lyrRoad.trunkLink.fill(),

  lyrOneway.road,
  lyrOneway.link
);

var bridgeLayers = [
  lyrRoad.motorwayBridge.casing(),
  lyrRoad.motorwayLinkBridge.casing(),
  lyrRoad.motorwayBridge.fill(),
  lyrRoad.motorwayLinkBridge.fill(),

  lyrRoad.trunkBridge.casing(),
  lyrRoad.trunkLinkBridge.casing(),
  lyrRoad.trunkBridge.fill(),
  lyrRoad.trunkLinkBridge.fill(),

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
  //The labels at the end of the list have the highest priority.
  lyrRoadLabel.motorway,

  lyrPark.label,

  lyrHighwayShield.interstate,

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
      url: "https://api.maptiler.com/tiles/v3/tiles.json?key=" + mapTilerKey,
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

var map = new maplibregl.Map({
  container: "map", // container id
  hash: true,
  antialias: true,
  style: style,
  center: [-94, 40.5], // starting position [lng, lat]
  zoom: 4, // starting zoom
  attributionControl: false,
});
map.addControl(
  new maplibregl.AttributionControl({
    customAttribution:
      '<a href="https://openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  })
);
map.addControl(new maplibregl.NavigationControl(), "top-left");
