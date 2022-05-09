"use strict";

import config from "./config.js";

import * as Util from "./js/util.js";
import * as Shield from "./js/shield.js";
import * as ShieldDef from "./js/shield_defs.js";

import * as lyrAeroway from "./layer/aeroway.js";
import * as lyrBackground from "./layer/background.js";
import * as lyrBoundary from "./layer/boundary.js";
import * as lyrHighwayShield from "./layer/highway_shield.js";
import * as lyrOneway from "./layer/oneway.js";
import * as lyrPark from "./layer/park.js";
import * as lyrPlace from "./layer/place.js";
import * as lyrRoad from "./layer/road.js";
import * as lyrRoadLabel from "./layer/road_label.js";
import * as lyrWater from "./layer/water.js";
import * as lyrBuilding from "./layer/building.js";
import * as lyrHighwayExit from "./layer/highway_exit.js";
import * as lyrFerry from "./layer/ferry.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import SampleControl from "openmapsamples-maplibre/OpenMapSamplesControl";
import { default as OpenMapTilesSamples } from "openmapsamples/samples/OpenMapTiles";

/*
 This is a list of the layers in the Americana style, from bottom to top.
*/
var americanaLayers = [];

americanaLayers.push(
  lyrBackground.base,
  lyrPark.fill,
  lyrAeroway.fill,
  lyrPark.parkFill,

  lyrBoundary.countyCasing,
  lyrBoundary.stateCasing,
  lyrBoundary.countryCasing,

  lyrWater.water,
  lyrWater.waterway,
  lyrWater.waterwayIntermittent,

  lyrPark.outline,
  lyrAeroway.outline,
  lyrPark.parkOutline,

  lyrBoundary.city,
  lyrBoundary.county,
  lyrBoundary.state,
  lyrBoundary.country,

  lyrFerry.ferry,
  lyrFerry.ferryLabel,

  lyrWater.waterwayLabel,
  lyrWater.waterLabel,
  lyrWater.waterPointLabel,

  lyrAeroway.runway,
  lyrAeroway.runwayArea,
  lyrAeroway.taxiway,

  lyrRoad.motorwayTunnel.casing(),
  lyrRoad.trunkExpresswayTunnel.casing(),
  lyrRoad.trunkTunnel.casing(),
  lyrRoad.primaryExpresswayTunnel.casing(),
  lyrRoad.primaryTunnel.casing(),
  lyrRoad.secondaryExpresswayTunnel.casing(),
  lyrRoad.secondaryTunnel.casing(),
  lyrRoad.tertiaryExpresswayTunnel.casing(),
  lyrRoad.tertiaryTunnel.casing(),
  lyrRoad.minorTunnel.casing(),
  lyrRoad.serviceTunnel.casing(),
  lyrRoad.smallServiceTunnel.casing(),

  lyrRoad.motorwayLinkTunnel.casing(),
  lyrRoad.trunkLinkTunnel.casing(),
  lyrRoad.primaryLinkTunnel.casing(),
  lyrRoad.secondaryLinkTunnel.casing(),
  lyrRoad.tertiaryLinkTunnel.casing(),

  lyrRoad.motorwayTunnel.fill(),
  lyrRoad.trunkExpresswayTunnel.fill(),
  lyrRoad.trunkTunnel.fill(),
  lyrRoad.primaryExpresswayTunnel.fill(),
  lyrRoad.primaryTunnel.fill(),
  lyrRoad.secondaryExpresswayTunnel.fill(),
  lyrRoad.secondaryTunnel.fill(),
  lyrRoad.tertiaryExpresswayTunnel.fill(),
  lyrRoad.tertiaryTunnel.fill(),
  lyrRoad.minorTunnel.fill(),
  lyrRoad.serviceTunnel.fill(),
  lyrRoad.smallServiceTunnel.fill(),
  lyrRoad.motorwayLinkTunnel.fill(),
  lyrRoad.trunkLinkTunnel.fill(),
  lyrRoad.primaryLinkTunnel.fill(),

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
  lyrRoad.minor.casing(),
  lyrRoad.service.casing(),
  lyrRoad.smallService.casing(),

  lyrRoad.motorwayLink.casing(),
  lyrRoad.trunkLink.casing(),
  lyrRoad.primaryLink.casing(),
  lyrRoad.secondaryLink.casing(),
  lyrRoad.tertiaryLink.casing(),

  lyrRoad.motorwayLink.fill(),
  lyrRoad.trunkLink.fill(),
  lyrRoad.primaryLink.fill(),
  lyrRoad.secondaryLink.fill(),
  lyrRoad.tertiaryLink.fill(),

  lyrRoad.smallService.fill(),
  lyrRoad.service.fill(),
  lyrRoad.minor.fill(),
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
  lyrRoad.primaryLink.surface(),
  lyrRoad.secondaryLink.surface(),
  lyrRoad.tertiaryLink.surface(),

  lyrRoad.smallService.surface(),
  lyrRoad.service.surface(),
  lyrRoad.minor.surface(),
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

americanaLayers.push(lyrBuilding.building);

var bridgeLayers = [
  lyrRoad.smallServiceBridge.casing(),
  lyrRoad.smallServiceBridge.fill(),

  lyrRoad.serviceBridge.casing(),
  lyrRoad.serviceBridge.fill(),

  lyrRoad.minorBridge.casing(),
  lyrRoad.minorBridge.fill(),

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

  lyrRoadLabel.bridgeSpacer,

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
  lyrRoadLabel.secondary,
  lyrRoadLabel.tertiary,
  lyrRoadLabel.minor,
  lyrRoadLabel.service,
  lyrRoadLabel.smallService,

  lyrPark.label,
  lyrPark.parkLabel,
  /* The ref label shows up at lower zoom levels and when the long name doesn't fit */
  lyrAeroway.airportRefLabel,
  lyrAeroway.airportLabel,
  lyrAeroway.airportGate,

  lyrHighwayShield.motorway,
  lyrHighwayShield.trunk,
  lyrHighwayShield.primary,
  lyrHighwayShield.secondary,
  lyrHighwayShield.tertiary,
  lyrHighwayShield.minor,

  lyrHighwayExit.exits,

  lyrPlace.state,
  lyrPlace.village,
  lyrPlace.town,
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
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  layers: americanaLayers,
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
  Shield.missingIconHandler(map, e);
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
