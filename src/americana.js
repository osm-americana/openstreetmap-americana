"use strict";

import config from "./config.js";

import * as Util from "./js/util.js";
import * as Shield from "./js/shield.js";
import * as ShieldDef from "./js/shield_defs.js";

import * as lyrAeroway from "./layer/aeroway.js";
import * as lyrBackground from "./layer/background.js";
import * as lyrBoundary from "./layer/boundary.js";
import * as lyrConstruction from "./layer/construction.js";
import * as lyrHighwayShield from "./layer/highway_shield.js";
import * as lyrOneway from "./layer/oneway.js";
import * as lyrPark from "./layer/park.js";
import * as lyrPlace from "./layer/place.js";
import * as lyrRail from "./layer/rail.js";
import * as lyrRoad from "./layer/road.js";
import * as lyrRoadLabel from "./layer/road_label.js";
import * as lyrWater from "./layer/water.js";
import * as lyrBuilding from "./layer/building.js";
import * as lyrHighwayExit from "./layer/highway_exit.js";
import * as lyrFerry from "./layer/ferry.js";

import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as search from "./search.js";

import SampleControl from "openmapsamples-maplibre/OpenMapSamplesControl.js";
import { default as OpenMapTilesSamples } from "openmapsamples/samples/OpenMapTiles/index.js";

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

  lyrBackground.pierArea,
  lyrBackground.pierLine,

  lyrConstruction.road,

  lyrRoad.motorwayLinkTunnel.casing(),
  lyrRoad.trunkLinkTunnel.casing(),
  lyrRoad.primaryLinkTunnel.casing(),
  lyrRoad.secondaryLinkTunnel.casing(),
  lyrRoad.tertiaryLinkTunnel.casing(),

  lyrRoad.motorwayLinkTollTunnel.casing(),
  lyrRoad.trunkLinkTollTunnel.casing(),
  lyrRoad.primaryLinkTollTunnel.casing(),
  lyrRoad.secondaryLinkTollTunnel.casing(),
  lyrRoad.tertiaryLinkTollTunnel.casing(),

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

  lyrRoad.motorwayTollTunnel.casing(),
  lyrRoad.trunkExpresswayTollTunnel.casing(),
  lyrRoad.trunkTollTunnel.casing(),
  lyrRoad.primaryExpresswayTollTunnel.casing(),
  lyrRoad.primaryTollTunnel.casing(),
  lyrRoad.secondaryExpresswayTollTunnel.casing(),
  lyrRoad.secondaryTollTunnel.casing(),
  lyrRoad.tertiaryExpresswayTollTunnel.casing(),
  lyrRoad.tertiaryTollTunnel.casing(),
  lyrRoad.minorTollTunnel.casing(),
  lyrRoad.serviceTollTunnel.casing(),
  lyrRoad.smallServiceTollTunnel.casing(),

  lyrRoad.motorwayLinkTunnel.fill(),
  lyrRoad.trunkLinkTunnel.fill(),
  lyrRoad.primaryLinkTunnel.fill(),
  lyrRoad.secondaryLinkTunnel.fill(),
  lyrRoad.tertiaryLinkTunnel.fill(),

  lyrRoad.motorwayLinkTollTunnel.fill(),
  lyrRoad.trunkLinkTollTunnel.fill(),
  lyrRoad.primaryLinkTollTunnel.fill(),
  lyrRoad.secondaryLinkTollTunnel.fill(),
  lyrRoad.tertiaryLinkTollTunnel.fill(),

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

  lyrRoad.motorwayTollTunnel.fill(),
  lyrRoad.trunkExpresswayTollTunnel.fill(),
  lyrRoad.trunkTollTunnel.fill(),
  lyrRoad.primaryExpresswayTollTunnel.fill(),
  lyrRoad.primaryTollTunnel.fill(),
  lyrRoad.secondaryExpresswayTollTunnel.fill(),
  lyrRoad.secondaryTollTunnel.fill(),
  lyrRoad.tertiaryExpresswayTollTunnel.fill(),
  lyrRoad.tertiaryTollTunnel.fill(),
  lyrRoad.minorTollTunnel.fill(),
  lyrRoad.serviceTollTunnel.fill(),
  lyrRoad.smallServiceTollTunnel.fill(),

  lyrRail.railTunnel.fill(),
  lyrRail.railTunnel.dashes(),
  lyrRail.railServiceTunnel.fill(),
  lyrRail.railServiceTunnel.dashes(),

  lyrRail.narrowGaugeTunnel.fill(),
  lyrRail.narrowGaugeTunnel.dashes(),
  lyrRail.narrowGaugeServiceTunnel.fill(),
  lyrRail.narrowGaugeServiceTunnel.dashes(),

  lyrRail.subwayTunnel.fill(),
  lyrRail.subwayServiceTunnel.fill(),

  lyrRail.lightRailTunnel.fill(),
  lyrRail.lightRailTunnel.dashes(),
  lyrRail.lightRailServiceTunnel.fill(),
  lyrRail.lightRailServiceTunnel.dashes(),

  lyrRail.tramTunnel.fill(),
  lyrRail.tramTunnel.dashes(),
  lyrRail.tramServiceTunnel.fill(),
  lyrRail.tramServiceTunnel.dashes(),

  lyrRail.funicularTunnel.fill(),
  lyrRail.funicularTunnel.dashes(),
  lyrRail.funicularServiceTunnel.fill(),
  lyrRail.funicularServiceTunnel.dashes(),

  lyrOneway.tunnel,
  lyrOneway.tunnelLink,

  lyrAeroway.runway,
  lyrAeroway.runwayArea,
  lyrAeroway.taxiway,
  lyrAeroway.taxiwayArea,

  lyrRoad.motorwayLink.casing(),
  lyrRoad.trunkLink.casing(),
  lyrRoad.primaryLink.casing(),
  lyrRoad.secondaryLink.casing(),
  lyrRoad.tertiaryLink.casing(),

  lyrRoad.motorwayLinkToll.casing(),
  lyrRoad.trunkLinkToll.casing(),
  lyrRoad.primaryLinkToll.casing(),
  lyrRoad.secondaryLinkToll.casing(),
  lyrRoad.tertiaryLinkToll.casing(),

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

  lyrRoad.motorwayToll.casing(),
  lyrRoad.trunkExpresswayToll.casing(),
  lyrRoad.trunkToll.casing(),
  lyrRoad.primaryExpresswayToll.casing(),
  lyrRoad.primaryToll.casing(),
  lyrRoad.secondaryExpresswayToll.casing(),
  lyrRoad.secondaryToll.casing(),
  lyrRoad.tertiaryExpresswayToll.casing(),
  lyrRoad.tertiaryToll.casing(),
  lyrRoad.minorToll.casing(),
  lyrRoad.serviceToll.casing(),
  lyrRoad.smallServiceToll.casing(),

  lyrRoad.motorwayLink.fill(),
  lyrRoad.trunkLink.fill(),
  lyrRoad.primaryLink.fill(),
  lyrRoad.secondaryLink.fill(),
  lyrRoad.tertiaryLink.fill(),

  lyrRoad.motorwayLinkToll.fill(),
  lyrRoad.trunkLinkToll.fill(),
  lyrRoad.primaryLinkToll.fill(),
  lyrRoad.secondaryLinkToll.fill(),
  lyrRoad.tertiaryLinkToll.fill(),

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

  lyrRoad.smallServiceToll.fill(),
  lyrRoad.serviceToll.fill(),
  lyrRoad.minorToll.fill(),
  lyrRoad.tertiaryToll.fill(),
  lyrRoad.tertiaryExpresswayToll.fill(),
  lyrRoad.secondaryToll.fill(),
  lyrRoad.secondaryExpresswayToll.fill(),
  lyrRoad.primaryToll.fill(),
  lyrRoad.primaryExpresswayToll.fill(),
  lyrRoad.trunkToll.fill(),
  lyrRoad.trunkExpresswayToll.fill(),
  lyrRoad.motorwayToll.fill(),

  lyrRoad.motorwayLink.surface(),
  lyrRoad.trunkLink.surface(),
  lyrRoad.primaryLink.surface(),
  lyrRoad.secondaryLink.surface(),
  lyrRoad.tertiaryLink.surface(),

  lyrRoad.motorwayLinkToll.surface(),
  lyrRoad.trunkLinkToll.surface(),
  lyrRoad.primaryLinkToll.surface(),
  lyrRoad.secondaryLinkToll.surface(),
  lyrRoad.tertiaryLinkToll.surface(),

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

  lyrRoad.smallServiceToll.surface(),
  lyrRoad.serviceToll.surface(),
  lyrRoad.minorToll.surface(),
  lyrRoad.tertiaryExpresswayToll.surface(),
  lyrRoad.secondaryExpresswayToll.surface(),
  lyrRoad.primaryExpresswayToll.surface(),
  lyrRoad.trunkToll.surface(),
  lyrRoad.trunkExpresswayToll.surface(),
  lyrRoad.motorwayToll.surface(),

  lyrRail.rail.fill(),
  lyrRail.rail.dashes(),
  lyrRail.railService.fill(),
  lyrRail.railService.dashes(),

  lyrRail.narrowGauge.fill(),
  lyrRail.narrowGauge.dashes(),
  lyrRail.narrowGaugeService.fill(),
  lyrRail.narrowGaugeService.dashes(),

  lyrRail.subway.fill(),
  lyrRail.subwayService.fill(),

  lyrRail.lightRail.fill(),
  lyrRail.lightRail.dashes(),
  lyrRail.lightRailService.fill(),
  lyrRail.lightRailService.dashes(),

  lyrRail.tram.fill(),
  lyrRail.tram.dashes(),
  lyrRail.tramService.fill(),
  lyrRail.tramService.dashes(),

  lyrRail.funicular.fill(),
  lyrRail.funicular.dashes(),
  lyrRail.funicularService.fill(),
  lyrRail.funicularService.dashes(),

  lyrOneway.road,
  lyrOneway.link
);

americanaLayers.push(lyrBuilding.building);

var bridgeLayers = [
  lyrRail.railBridge.bridgeCasing(),
  lyrRail.railServiceBridge.bridgeCasing(),

  lyrRail.narrowGaugeBridge.bridgeCasing(),
  lyrRail.narrowGaugeServiceBridge.bridgeCasing(),

  lyrRail.subwayBridge.bridgeCasing(),
  lyrRail.subwayServiceBridge.bridgeCasing(),

  lyrRail.lightRailBridge.bridgeCasing(),
  lyrRail.lightRailServiceBridge.bridgeCasing(),

  lyrRail.tramBridge.bridgeCasing(),
  lyrRail.tramServiceBridge.bridgeCasing(),

  lyrRail.funicularBridge.bridgeCasing(),
  lyrRail.funicularServiceBridge.bridgeCasing(),

  lyrRoad.tertiaryLinkBridge.casing(),
  lyrRoad.secondaryLinkBridge.casing(),
  lyrRoad.primaryLinkBridge.casing(),
  lyrRoad.trunkLinkBridge.casing(),
  lyrRoad.motorwayLinkBridge.casing(),

  lyrRoad.tertiaryLinkTollBridge.casing(),
  lyrRoad.secondaryLinkTollBridge.casing(),
  lyrRoad.primaryLinkTollBridge.casing(),
  lyrRoad.trunkLinkTollBridge.casing(),
  lyrRoad.motorwayLinkTollBridge.casing(),

  lyrRoad.smallServiceBridge.casing(),
  lyrRoad.serviceBridge.casing(),
  lyrRoad.minorBridge.casing(),
  lyrRoad.tertiaryBridge.casing(),
  lyrRoad.tertiaryExpresswayBridge.casing(),
  lyrRoad.secondaryBridge.casing(),
  lyrRoad.secondaryExpresswayBridge.casing(),
  lyrRoad.primaryBridge.casing(),
  lyrRoad.primaryExpresswayBridge.casing(),
  lyrRoad.trunkBridge.casing(),
  lyrRoad.trunkExpresswayBridge.casing(),
  lyrRoad.motorwayBridge.casing(),

  lyrRoad.smallServiceTollBridge.casing(),
  lyrRoad.serviceTollBridge.casing(),
  lyrRoad.minorTollBridge.casing(),
  lyrRoad.tertiaryTollBridge.casing(),
  lyrRoad.tertiaryExpresswayTollBridge.casing(),
  lyrRoad.secondaryTollBridge.casing(),
  lyrRoad.secondaryExpresswayTollBridge.casing(),
  lyrRoad.primaryTollBridge.casing(),
  lyrRoad.primaryExpresswayTollBridge.casing(),
  lyrRoad.trunkTollBridge.casing(),
  lyrRoad.trunkExpresswayTollBridge.casing(),
  lyrRoad.motorwayTollBridge.casing(),

  lyrRoad.tertiaryLinkBridge.fill(),
  lyrRoad.secondaryLinkBridge.fill(),
  lyrRoad.primaryLinkBridge.fill(),
  lyrRoad.trunkLinkBridge.fill(),
  lyrRoad.motorwayLinkBridge.fill(),

  lyrRoad.tertiaryLinkTollBridge.fill(),
  lyrRoad.secondaryLinkTollBridge.fill(),
  lyrRoad.primaryLinkTollBridge.fill(),
  lyrRoad.trunkLinkTollBridge.fill(),
  lyrRoad.motorwayLinkTollBridge.fill(),

  lyrRoad.smallServiceBridge.fill(),
  lyrRoad.serviceBridge.fill(),
  lyrRoad.minorBridge.fill(),
  lyrRoad.tertiaryBridge.fill(),
  lyrRoad.tertiaryExpresswayBridge.fill(),
  lyrRoad.secondaryBridge.fill(),
  lyrRoad.secondaryExpresswayBridge.fill(),
  lyrRoad.primaryBridge.fill(),
  lyrRoad.primaryExpresswayBridge.fill(),
  lyrRoad.trunkBridge.fill(),
  lyrRoad.trunkExpresswayBridge.fill(),
  lyrRoad.motorwayBridge.fill(),

  lyrRoad.smallServiceTollBridge.fill(),
  lyrRoad.serviceTollBridge.fill(),
  lyrRoad.minorTollBridge.fill(),
  lyrRoad.tertiaryTollBridge.fill(),
  lyrRoad.tertiaryExpresswayTollBridge.fill(),
  lyrRoad.secondaryTollBridge.fill(),
  lyrRoad.secondaryExpresswayTollBridge.fill(),
  lyrRoad.primaryTollBridge.fill(),
  lyrRoad.primaryExpresswayTollBridge.fill(),
  lyrRoad.trunkTollBridge.fill(),
  lyrRoad.trunkExpresswayTollBridge.fill(),
  lyrRoad.motorwayTollBridge.fill(),

  lyrRoad.tertiaryLinkBridge.surface(),
  lyrRoad.secondaryLinkBridge.surface(),
  lyrRoad.primaryLinkBridge.surface(),
  lyrRoad.trunkLinkBridge.surface(),
  lyrRoad.motorwayLinkBridge.surface(),

  lyrRoad.tertiaryLinkTollBridge.surface(),
  lyrRoad.secondaryLinkTollBridge.surface(),
  lyrRoad.primaryLinkTollBridge.surface(),
  lyrRoad.trunkLinkTollBridge.surface(),
  lyrRoad.motorwayLinkTollBridge.surface(),

  lyrRoad.tertiaryBridge.surface(),
  lyrRoad.secondaryBridge.surface(),
  lyrRoad.primaryBridge.surface(),
  lyrRoad.trunkBridge.surface(),
  lyrRoad.trunkExpresswayBridge.surface(),
  lyrRoad.motorwayBridge.surface(),

  lyrRoad.tertiaryTollBridge.surface(),
  lyrRoad.secondaryTollBridge.surface(),
  lyrRoad.primaryTollBridge.surface(),
  lyrRoad.trunkTollBridge.surface(),
  lyrRoad.trunkExpresswayTollBridge.surface(),
  lyrRoad.motorwayTollBridge.surface(),

  lyrRail.railBridge.fill(),
  lyrRail.railBridge.dashes(),
  lyrRail.railServiceBridge.fill(),
  lyrRail.railServiceBridge.dashes(),

  lyrRail.narrowGaugeBridge.fill(),
  lyrRail.narrowGaugeBridge.dashes(),
  lyrRail.narrowGaugeServiceBridge.fill(),
  lyrRail.narrowGaugeServiceBridge.dashes(),

  lyrRail.subwayBridge.fill(),
  lyrRail.subwayServiceBridge.fill(),

  lyrRail.lightRailBridge.fill(),
  lyrRail.lightRailBridge.dashes(),
  lyrRail.lightRailServiceBridge.fill(),
  lyrRail.lightRailServiceBridge.dashes(),

  lyrRail.tramBridge.fill(),
  lyrRail.tramBridge.dashes(),
  lyrRail.tramServiceBridge.fill(),
  lyrRail.tramServiceBridge.dashes(),

  lyrRail.funicularBridge.fill(),
  lyrRail.funicularBridge.dashes(),
  lyrRail.funicularServiceBridge.fill(),
  lyrRail.funicularServiceBridge.dashes(),

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

  lyrConstruction.label,

  lyrPark.label,
  lyrPark.parkLabel,
  /* The ref label shows up at lower zoom levels and when the long name doesn't fit */
  lyrAeroway.airportRefLabel,
  lyrAeroway.minorAirportRefLabel,
  lyrAeroway.airportLabel,
  lyrAeroway.minorAirportLabel,
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
