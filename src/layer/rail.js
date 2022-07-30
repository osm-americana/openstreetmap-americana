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
function filterRail(brunnel) {
  return [
    "all",
    brunnel === "surface"
      ? ["!in", "brunnel", "bridge", "tunnel"]
      : ["==", "brunnel", brunnel],
    ["in", "class", "rail", "transit"],
  ];
}

// Base definition that applies to all railways
var defRail = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
};

var serviceSelector = ["match", ["get", "service"], ["siding", "spur", "yard"]];
var isService = ["in", "service", "siding", "spur", "yard"];
var isNotService = ["!in", "service", "siding", "spur", "yard"];

var lineColor = [
  "match",
  ["get", "brunnel"],
  "tunnel",
  "hsl(0, 0%, 90%)",
  [
    "match",
    ["get", "subclass"],
    ["preserved", "subway", "light_rail", "monorail", "funicular"],
    "hsl(0, 0%, 50%)",
    "hsl(0, 0%, 60%)",
  ],
];

var lineWidth = [
  "match",
  ["get", "subclass"],
  ["rail", "narrow_gauge", "subway"],
  [...serviceSelector, 2, 4],
  "monorail",
  [...serviceSelector, 1.6, 3.2],
  "preserved",
  [...serviceSelector, 0.8, 1.6],
  [...serviceSelector, 1.25, 2.5],
];

var lineGapWidth = ["match", ["get", "subclass"], "preserved", 1.6, 0];

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
function uniqueLayerID(part, brunnel, constraints) {
  var layerID = ["rail", part, brunnel].join("_");
  if (constraints != null) {
    layerID +=
      "_" + constraints.join("_").replaceAll("=", "").replaceAll("-", "_");
  }
  return layerID;
}

function baseRailLayer(id, brunnel, minzoom, maxzoom, constraints) {
  var layer = Util.layerClone(defRail, uniqueLayerID(id, brunnel, constraints));
  layer.filter = filterRail(brunnel);
  layer.minzoom = minzoom;
  if (maxzoom) {
    layer.maxzoom = maxzoom;
  }
  return layer;
}

// Base railway class

class Railway {
  constructor() {
    this.brunnel = "surface";
    this.minZoom = 10;
  }
  fill = function () {
    var layer = baseRailLayer(
      "fill",
      this.brunnel,
      this.minZoom,
      null,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": lineColor,
      "line-gap-width": zoomInterpolate(lineGapWidth),
      "line-width": zoomInterpolate(lineWidth),
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  dashes = function () {
    var layer = baseRailLayer(
      "dashes",
      this.brunnel,
      this.minZoom,
      null,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": lineColor,
      "line-width": zoomInterpolate(
        multiplyMatchExpression(lineWidth, this.dashWidthFactor)
      ),
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

class RailwayBridge extends Railway {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RailwayTunnel extends Railway {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

// Railway class styles

class Rail extends Railway {
  constructor() {
    super();
    this.constraints = ["all", ["==", "subclass", "rail"], isNotService];
    this.brunnel = "surface";

    this.dashWidthFactor = 3;
    this.dashArray = [1, 25];
  }
}

class RailService extends Rail {
  constructor() {
    super();
    this.constraints = ["all", ["==", "subclass", "rail"], isService];

    this.dashWidthFactor = 4;
    this.dashArray = [1, 50];
  }
}

class NarrowGauge extends Rail {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", "subclass", "narrow_gauge"],
      isNotService,
    ];

    this.dashWidthFactor = 2;
    this.dashArray = [1, 1, 1, 15];
  }
}

class NarrowGaugeService extends NarrowGauge {
  constructor() {
    super();
    this.constraints = ["all", ["==", "subclass", "narrow_gauge"], isService];

    this.dashWidthFactor = 3;
    this.dashArray = [1, 2, 1, 30];
  }
}

class Preserved extends Railway {
  constructor() {
    super();
    this.constraints = ["all", ["==", "subclass", "preserved"], isNotService];
    this.brunnel = "surface";

    this.minZoom = 14;
    this.dashWidthFactor = 4;
    this.dashArray = [1, 8];
  }
}

class PreservedService extends Preserved {
  constructor() {
    super();
    this.constraints = ["all", ["==", "subclass", "preserved"], isService];

    this.dashWidthFactor = 6;
    this.dashArray = [1, 16];
  }
}

class LightRailTram extends Railway {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["in", "subclass", "light_rail", "tram"],
      isNotService,
    ];
    this.brunnel = "surface";

    this.minZoom = 14;
    this.dashWidthFactor = 2;
    this.dashArray = [1, 6];
  }
}

class LightRailTramService extends LightRailTram {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["in", "subclass", "light_rail", "tram"],
      isService,
    ];

    this.dashWidthFactor = 3;
    this.dashArray = [1, 12];
  }
}

class Funicular extends Railway {
  constructor() {
    super();
    this.constraints = ["==", "subclass", "funicular"];
    this.brunnel = "surface";

    this.minZoom = 14;
    this.dashWidthFactor = 2.3;
    this.dashArray = [1, 2];
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

class FunicularBridge extends Funicular {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class LightRailTramBridge extends LightRailTram {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class LightRailTramServiceBridge extends LightRailTramService {
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
  }
}

class RailServiceTunnel extends RailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class NarrowGaugeTunnel extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class NarrowGaugeServiceTunnel extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class PreservedTunnel extends Preserved {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class PreservedServiceTunnel extends PreservedService {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class FunicularTunnel extends Funicular {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class LightRailTramTunnel extends LightRailTram {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

class LightRailTramServiceTunnel extends LightRailTramService {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

export const railway = new Railway();
export const railwayBridge = new RailwayBridge();
export const railwayTunnel = new RailwayTunnel();

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

export const lightRailTram = new LightRailTram();
export const lightRailTramBridge = new LightRailTramBridge();
export const lightRailTramTunnel = new LightRailTramTunnel();

export const lightRailTramService = new LightRailTramService();
export const lightRailTramServiceBridge = new LightRailTramServiceBridge();
export const lightRailTramServiceTunnel = new LightRailTramServiceTunnel();

export const funicular = new Funicular();
export const funicularBridge = new FunicularBridge();
export const funicularTunnel = new FunicularTunnel();
