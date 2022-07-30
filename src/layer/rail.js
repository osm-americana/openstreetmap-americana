"use strict";

import * as Color from "../constants/color.js";
import * as Util from "../js/util.js";

// Exponent base for inter-zoom interpolation
let railExp = 1.2;

// Helper functions to create zoom interpolation expressions
function multiplyMatchExpression(value, factor) {
  if (Array.isArray(value)) {
    var result = [value[0], value[1]];
    for (let i = 2; i < value.length - 1; i++) {
      if (i % 2 == 0) {
        result.push(value[i]);
      } else {
        result.push(multiplyMatchExpression(value[i], factor));
      }
    }
    result.push(multiplyMatchExpression(value[value.length - 1], factor));
    return result;
  } else {
    return value * factor;
  }
}

function zoomInterpolate(widthZ20) {
  return [
    "interpolate",
    ["exponential", railExp],
    ["zoom"],
    8,
    multiplyMatchExpression(widthZ20, 1 / 16),
    12,
    multiplyMatchExpression(widthZ20, 1 / 4),
    20,
    widthZ20,
  ];
}

// Helper function to create a "filter" block for a particular railway class.
function filterRail(railClass, service, brunnel) {
  return [
    "all",
    brunnel === "surface"
      ? ["!in", "brunnel", "bridge", "tunnel"]
      : ["==", "brunnel", brunnel],
    ["in", "class", "rail", "transit"],
    ["==", "subclass", railClass],
    [service ? "in" : "!in", "service", "siding", "spur", "yard"],
  ];
}

// Base definition that applies to all railways
var defRail = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
};

var serviceSelector = ["match", ["get", "service"], ["siding", "spur", "yard"]];

// Bridge casing layers
export const bridgeCasing = {
  ...defRail,
  id: "railway-bridge-casing",
  filter: [
    "all",
    ["==", "brunnel", "bridge"],
    ["in", "class", "rail", "transit"],
  ],
  minzoom: 13,
  layout: {
    "line-cap": "butt",
    "line-join": "bevel",
    visibility: "visible",
  },
  paint: {
    "line-color": Color.backgroundFill,
    "line-opacity": [
      "step",
      ["zoom"],
      ["match", ["get", "subclass"], ["rail", "narrow_gauge"], 1, 0],
      14,
      1,
    ],
    "line-width": zoomInterpolate([...serviceSelector, 4, 6]),
  },
};

// Generate a unique layer ID
function uniqueLayerID(railClass, service, part, brunnel, constraints) {
  var layerID = [railClass, service ? "service" : "rail", part, brunnel].join(
    "_"
  );
  if (constraints != null) {
    layerID +=
      "_" + constraints.join("_").replaceAll("=", "").replaceAll("-", "_");
  }
  return layerID;
}

function baseRailLayer(
  railClass,
  id,
  brunnel,
  minzoom,
  maxzoom,
  service,
  constraints
) {
  var layer = Util.layerClone(
    defRail,
    uniqueLayerID(railClass, service, id, brunnel, constraints)
  );
  layer.filter = filterRail(railClass, service, brunnel);
  layer.minzoom = minzoom;
  if (maxzoom) {
    layer.maxzoom = maxzoom;
  }
  return layer;
}

// Base railway class

class Railway {
  fill = function () {
    var layer = baseRailLayer(
      this.railClass,
      "fill",
      this.brunnel,
      this.minZoom,
      null,
      this.service,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": `hsl(0, 0%, ${this.lightness}%)`,
      "line-gap-width": this.gapWidthZ20
        ? zoomInterpolate(this.gapWidthZ20)
        : 0,
      "line-width": zoomInterpolate(this.widthZ20),
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  dashes = function () {
    var layer = baseRailLayer(
      this.railClass,
      "dashes",
      this.brunnel,
      this.minZoom,
      null,
      this.service,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": `hsl(0, 0%, ${this.lightness}%)`,
      "line-width": zoomInterpolate(this.widthZ20 * this.dashWidthFactor),
      "line-dasharray": this.dashArray.map(
        (stop) => stop / 2 / this.dashWidthFactor
      ),
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    layer.filter.push(["!=", "service", "crossover"]);
    return layer;
  };
}

// Railway class styles

class Rail extends Railway {
  constructor() {
    super();
    this.railClass = "rail";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 10;
    this.dashWidthFactor = 3;
    this.dashArray = [1, 25];

    this.widthZ20 = 4;

    this.lightness = 60;
  }
}

class RailService extends Rail {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 4;
    this.dashArray = [1, 50];

    this.widthZ20 = 2;
  }
}

class NarrowGauge extends Rail {
  constructor() {
    super();
    this.railClass = "narrow_gauge";

    this.dashWidthFactor = 2;
    this.dashArray = [1, 1, 1, 15];
  }
}

class NarrowGaugeService extends NarrowGauge {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 3;
    this.dashArray = [1, 2, 1, 30];

    this.widthZ20 = 2;
  }
}

class Preserved extends Railway {
  constructor() {
    super();
    this.railClass = "preserved";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;
    this.dashWidthFactor = 4;
    this.dashArray = [1, 8];

    this.widthZ20 = 1.6;
    this.gapWidthZ20 = 1.6;

    this.lightness = 50;
  }
}

class PreservedService extends Preserved {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 6;
    this.dashArray = [1, 16];

    this.widthZ20 = 0.8;
  }
}

class Subway extends Railway {
  constructor() {
    super();
    this.railClass = "subway";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;

    this.widthZ20 = 4;

    this.lightness = 50;
  }
}

class SubwayService extends Subway {
  constructor() {
    super();
    this.service = true;

    this.widthZ20 = 2;
  }
}

class Monorail extends Railway {
  constructor() {
    super();
    this.railClass = "monorail";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;

    this.widthZ20 = 3.2;

    this.lightness = 50;
  }
}

class MonorailService extends Monorail {
  constructor() {
    super();
    this.service = true;

    this.widthZ20 = 1.6;
  }
}

class LightRail extends Railway {
  constructor() {
    super();
    this.railClass = "light_rail";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;
    this.dashWidthFactor = 2;
    this.dashArray = [1, 6];

    this.widthZ20 = 2.5;

    this.lightness = 50;
  }
}

class LightRailService extends LightRail {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 3;
    this.dashArray = [1, 12];

    this.widthZ20 = 1.25;
  }
}

class Tram extends Railway {
  constructor() {
    super();
    this.railClass = "tram";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;
    this.dashWidthFactor = 2;
    this.dashArray = [1, 6];

    this.widthZ20 = 2.5;

    this.lightness = 60;
  }
}

class TramService extends Tram {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 3;
    this.dashArray = [1, 12];

    this.widthZ20 = 1.25;
  }
}

class Funicular extends Railway {
  constructor() {
    super();
    this.railClass = "funicular";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;
    this.dashWidthFactor = 2.3;
    this.dashArray = [1, 2];

    this.widthZ20 = 2.5;

    this.lightness = 50;
  }
}

/*
 * TODO:
 * preserved?
 */

// Bridges

class RailBridge extends Rail {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RailServiceBridge extends RailService {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class NarrowGaugeBridge extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class NarrowGaugeServiceBridge extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class PreservedBridge extends Preserved {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class PreservedServiceBridge extends PreservedService {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class SubwayBridge extends Subway {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class SubwayServiceBridge extends SubwayService {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class MonorailBridge extends Monorail {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class MonorailServiceBridge extends MonorailService {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class LightRailBridge extends LightRail {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class LightRailServiceBridge extends LightRailService {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class FunicularBridge extends Funicular {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class TramBridge extends Tram {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class TramServiceBridge extends TramService {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

// Tunnels

class RailTunnel extends Rail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class RailServiceTunnel extends RailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class NarrowGaugeTunnel extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class NarrowGaugeServiceTunnel extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class PreservedTunnel extends Preserved {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class PreservedServiceTunnel extends PreservedService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class SubwayTunnel extends Subway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class SubwayServiceTunnel extends SubwayService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class MonorailTunnel extends Monorail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class MonorailServiceTunnel extends MonorailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class LightRailTunnel extends LightRail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class LightRailServiceTunnel extends LightRailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class FunicularTunnel extends Funicular {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class TramTunnel extends Tram {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

class TramServiceTunnel extends TramService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.lightness = 90;
  }
}

export const rail = new Rail();
export const railBridge = new RailBridge();
export const railTunnel = new RailTunnel();

export const railService = new RailService();
export const railServiceBridge = new RailServiceBridge();
export const railServiceTunnel = new RailServiceTunnel();

export const narrowGauge = new NarrowGauge();
export const narrowGaugeBridge = new NarrowGaugeBridge();
export const narrowGaugeTunnel = new NarrowGaugeTunnel();

export const narrowGaugeService = new NarrowGaugeService();
export const narrowGaugeServiceBridge = new NarrowGaugeServiceBridge();
export const narrowGaugeServiceTunnel = new NarrowGaugeServiceTunnel();

export const preserved = new Preserved();
export const preservedBridge = new PreservedBridge();
export const preservedTunnel = new PreservedTunnel();

export const preservedService = new PreservedService();
export const preservedServiceBridge = new PreservedServiceBridge();
export const preservedServiceTunnel = new PreservedServiceTunnel();

export const subway = new Subway();
export const subwayBridge = new SubwayBridge();
export const subwayTunnel = new SubwayTunnel();

export const subwayService = new SubwayService();
export const subwayServiceBridge = new SubwayServiceBridge();
export const subwayServiceTunnel = new SubwayServiceTunnel();

export const monorail = new Monorail();
export const monorailBridge = new MonorailBridge();
export const monorailTunnel = new MonorailTunnel();

export const monorailService = new MonorailService();
export const monorailServiceBridge = new MonorailServiceBridge();
export const monorailServiceTunnel = new MonorailServiceTunnel();

export const lightRail = new LightRail();
export const lightRailBridge = new LightRailBridge();
export const lightRailTunnel = new LightRailTunnel();

export const lightRailService = new LightRailService();
export const lightRailServiceBridge = new LightRailServiceBridge();
export const lightRailServiceTunnel = new LightRailServiceTunnel();

export const tram = new Tram();
export const tramBridge = new TramBridge();
export const tramTunnel = new TramTunnel();

export const tramService = new TramService();
export const tramServiceBridge = new TramServiceBridge();
export const tramServiceTunnel = new TramServiceTunnel();

export const funicular = new Funicular();
export const funicularBridge = new FunicularBridge();
export const funicularTunnel = new FunicularTunnel();
