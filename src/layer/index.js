"use strict";

import * as Label from "../constants/label.js";

import * as lyrAeroway from "./aeroway.js";
import * as lyrBackground from "./background.js";
import * as lyrBoundary from "./boundary.js";
import * as lyrConstruction from "./construction.js";
import * as lyrHighwayShield from "./highway_shield.js";
import * as lyrLanduse from "./landuse.js";
import * as lyrOneway from "./oneway.js";
import * as lyrPark from "./park.js";
import * as lyrPlace from "./place.js";
import * as lyrPoi from "./poi.js";
import * as lyrRail from "./rail.js";
import * as lyrRoad from "./road.js";
import * as lyrTransportationLabel from "./transportation_label.js";
import * as lyrWater from "./water.js";
import * as lyrBuilding from "./building.js";
import * as lyrHighwayExit from "./highway_exit.js";
import * as lyrFerry from "./ferry.js";

/**
 * Builds the Americana layers property.
 * See: https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/
 */
export function build(locales) {
  // Layers from bottom to top
  let layers = [];

  layers.push(
    lyrBackground.base,
    lyrLanduse.urbanizedArea,
    lyrPark.fill,
    lyrAeroway.fill,
    lyrPark.parkFill,

    lyrBoundary.countyCasing,
    lyrBoundary.stateCasing,
    lyrBoundary.countryCasing,

    lyrWater.waterLine,
    lyrWater.waterLineIntermittent,
    lyrWater.waterway,
    lyrWater.waterwayIntermittent,
    lyrWater.water,

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
    lyrOneway.tunnelLink,

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

    lyrOneway.road,
    lyrOneway.link
  );

  layers.push(lyrBuilding.building);

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
    lyrOneway.bridgeLink,
  ];

  layers.push(...lyrRail.getLayerSeparatedBridgeLayers(bridgeLayers));

  layers.push(
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

    lyrPoi.poi,

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

  Label.localizeLayers(layers, locales);

  return layers;
}
