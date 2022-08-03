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
import * as lyrTransportationLabel from "./layer/transportation_label.js";
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

  lyrBackground.pierArea,
  lyrBackground.pierLine,

  lyrRail.railTunnel.dashes(),
  lyrRail.railServiceTunnel.dashes(),

  lyrRail.narrowGaugeTunnel.dashes(),
  lyrRail.narrowGaugeServiceTunnel.dashes(),

  lyrRail.lightRailTramTunnel.dashes(),
  lyrRail.lightRailTramServiceTunnel.dashes(),

  lyrRail.funicularTunnel.dashes(),

  lyrRail.railwayTunnel.fill(),

  lyrConstruction.road,

  lyrRoad.roadTunnel.casing(),

  lyrRoad.roadTunnel.fill(),

  lyrOneway.tunnel,

  lyrFerry.ferry,

  lyrAeroway.runway,
  lyrAeroway.runwayArea,
  lyrAeroway.taxiway,
  lyrAeroway.taxiwayArea,

  lyrRoad.motorwayLink.casing(),
  lyrRoad.trunkLink.casing(),

  lyrRoad.roadLinkSimpleCasing.casing(),

  lyrRoad.motorway.casing(),
  lyrRoad.trunk.casing(),
  lyrRoad.primaryExpressway.casing(),
  lyrRoad.secondaryExpressway.casing(),
  lyrRoad.tertiaryExpressway.casing(),

  lyrRoad.roadSimpleCasing.casing(),

  lyrRoad.motorwayLink.fill(),
  lyrRoad.roadLinkSimpleFill.fill(),
  lyrRoad.primaryLink.fill(),
  lyrRoad.primaryLinkToll.fill(),
  lyrRoad.secondaryLink.fill(),
  lyrRoad.secondaryLinkToll.fill(),
  lyrRoad.tertiaryLink.fill(),
  lyrRoad.tertiaryLinkToll.fill(),

  lyrRoad.minor.fill(),
  lyrRoad.minorToll.fill(),
  lyrRoad.tertiary.fill(),
  lyrRoad.tertiaryToll.fill(),
  lyrRoad.secondary.fill(),
  lyrRoad.secondaryToll.fill(),
  lyrRoad.primary.fill(),
  lyrRoad.primaryToll.fill(),
  lyrRoad.roadSimpleFill.fill(),
  lyrRoad.motorway.fill(),

  lyrRoad.road.surface(),

  lyrRail.rail.dashes(),
  lyrRail.railService.dashes(),

  lyrRail.narrowGauge.dashes(),
  lyrRail.narrowGaugeService.dashes(),

  lyrRail.lightRailTram.dashes(),
  lyrRail.lightRailTramService.dashes(),

  lyrRail.funicular.dashes(),

  lyrRail.railway.fill(),

  lyrOneway.surface
);

americanaLayers.push(lyrBuilding.building);

var bridgeLayers = [
  lyrRail.bridgeCasing,

  lyrRoad.trunkLinkBridge.casing(),
  lyrRoad.motorwayLinkBridge.casing(),

  lyrRoad.roadLinkSimpleCasingBridge.casing(),

  lyrRoad.tertiaryExpresswayBridge.casing(),
  lyrRoad.secondaryExpresswayBridge.casing(),
  lyrRoad.primaryExpresswayBridge.casing(),
  lyrRoad.trunkBridge.casing(),
  lyrRoad.motorwayBridge.casing(),

  lyrRoad.roadSimpleCasingBridge.casing(),

  lyrRoad.tertiaryLinkBridge.fill(),
  lyrRoad.tertiaryLinkTollBridge.fill(),
  lyrRoad.secondaryLinkBridge.fill(),
  lyrRoad.secondaryLinkTollBridge.fill(),
  lyrRoad.primaryLinkBridge.fill(),
  lyrRoad.primaryLinkTollBridge.fill(),
  lyrRoad.roadLinkSimpleFillBridge.fill(),
  lyrRoad.motorwayLinkBridge.fill(),

  lyrRoad.minorBridge.fill(),
  lyrRoad.minorTollBridge.fill(),
  lyrRoad.tertiaryBridge.fill(),
  lyrRoad.tertiaryTollBridge.fill(),
  lyrRoad.secondaryBridge.fill(),
  lyrRoad.secondaryTollBridge.fill(),
  lyrRoad.primaryBridge.fill(),
  lyrRoad.primaryTollBridge.fill(),
  lyrRoad.roadSimpleFillBridge.fill(),
  lyrRoad.motorwayBridge.fill(),

  lyrRoad.roadBridge.surface(),

  lyrRail.railBridge.dashes(),
  lyrRail.railServiceBridge.dashes(),

  lyrRail.narrowGaugeBridge.dashes(),
  lyrRail.narrowGaugeServiceBridge.dashes(),

  lyrRail.lightRailTramBridge.dashes(),
  lyrRail.lightRailTramServiceBridge.dashes(),

  lyrRail.funicularBridge.dashes(),

  lyrRail.railwayBridge.fill(),

  lyrOneway.bridge,
];

//Render bridge without layer on the lowest bridge layer
bridgeLayers.forEach((layer) =>
  americanaLayers.push(
    Util.filteredClone(layer, ["!", ["has", "layer"]], "_layer_bottom")
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
    Util.filteredClone(
      layer,
      [">=", ["coalesce", ["get", "layer"], 0], 5],
      "_layer_top"
    )
  )
);

americanaLayers.push(
  //The labels at the end of the list draw on top of the layers at the beginning.
  lyrWater.waterwayLabel,
  lyrWater.waterLabel,
  lyrWater.waterPointLabel,

  lyrTransportationLabel.bridgeSpacer,
  lyrTransportationLabel.label,

  lyrPark.label,
  lyrPark.parkLabel,
  /* The ref label shows up at lower zoom levels and when the long name doesn't fit */
  lyrAeroway.airportRefLabel,
  lyrAeroway.minorAirportRefLabel,
  lyrAeroway.airportLabel,
  lyrAeroway.minorAirportLabel,
  lyrAeroway.airportGate,

  lyrHighwayShield.shield,

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

console.debug(`Loaded ${americanaLayers.length} layers`);

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
