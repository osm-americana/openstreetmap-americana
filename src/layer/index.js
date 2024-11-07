"use strict";

import * as Label from "../constants/label.js";

import * as lyrAerialway from "./aerialway.js";
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
    lyrBoundary.regionCasing,
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
    lyrBoundary.region,
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

    lyrRoad.roadTunnel,

    lyrOneway.tunnel,

    lyrFerry.ferry,

    lyrAeroway.runway,
    lyrAeroway.runwayArea,
    lyrAeroway.taxiway,
    lyrAeroway.taxiwayArea,

    lyrRoad.roadBridgeCasing,
    lyrRoad.road,

    lyrRail.rail.dashes(),
    lyrRail.railService.dashes(),

    lyrRail.narrowGauge.dashes(),
    lyrRail.narrowGaugeService.dashes(),

    lyrRail.lightRailTram.dashes(),
    lyrRail.lightRailTramService.dashes(),

    lyrRail.funicular.dashes(),

    lyrRail.railway.fill(),

    lyrOneway.surface,

    lyrAerialway.dragLift
  );

  layers.push(lyrBuilding.building);

  var bridgeLayers = [
    lyrRail.bridgeCasing,

    lyrRoad.roadBridgeKnockout,
    lyrRoad.road,

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

  layers.push(...lyrRail.getLayerSeparatedBridgeLayers(bridgeLayers));

  layers.push(
    //The labels at the end of the list draw on top of the layers at the beginning.
    lyrAerialway.liftCasing,
    lyrAerialway.lift,

    lyrBoundary.countryLabelLeft,
    lyrBoundary.countryLabelRight,
    lyrWater.waterwayLabel,

    lyrTransportationLabel.bridgeSpacer,
    lyrTransportationLabel.label,

    lyrPark.label,
    lyrPark.parkLabel,

    lyrWater.waterLabel,
    lyrWater.waterPointLabel,
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
