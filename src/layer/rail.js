"use strict";

import * as Color from "../constants/color.js";
import * as Util from "../js/util.js";

// Exponent base for inter-zoom interpolation
let railExp = 1.2;

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

function baseRailLayer(railClass, id, brunnel, minzoom, service, constraints) {
  var layer = Util.layerClone(
    defRail,
    uniqueLayerID(railClass, service, id, brunnel, constraints)
  );
  layer.filter = filterRail(railClass, service, brunnel);
  layer.minzoom = minzoom;
  return layer;
}

// Base railway class

class Railway {
  constructor() {
    this.hue = 0;
    this.minZoomBridge = 13;
  }
  bridgeCasing = function () {
    var layer = baseRailLayer(
      this.railClass,
      "bridgeCasing",
      this.brunnel,
      this.minZoomBridge,
      this.service,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": Color.backgroundFill,
      "line-width": {
        base: railExp,
        stops: Util.zoomMultiply(this.fillWidth, 1.5),
      },
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  fill = function () {
    var layer = baseRailLayer(
      this.railClass,
      "fill",
      this.brunnel,
      this.minZoom,
      this.service,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": this.fillColor,
      "line-width": {
        base: railExp,
        stops: this.fillWidth,
      },
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
      this.service,
      this.constraints
    );
    layer.layout = {
      "line-cap": "butt",
      "line-join": "bevel",
      visibility: "visible",
    };
    layer.paint = {
      "line-color": this.dashFillColor,
      "line-width": {
        base: railExp,
        stops: Util.zoomMultiply(this.fillWidth, this.dashWidthFactor),
      },
      "line-dasharray": [1 / 2 / this.dashWidthFactor, this.dashArraySpacing],
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
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
    this.dashWidthFactor = 2.5;
    this.dashArraySpacing = 4;

    this.fillWidth = [
      [8, 0.6],
      [12, 2],
      [20, 8],
    ];

    this.fillColor = this.dashFillColor = [
      "interpolate",
      ["exponential", railExp],
      ["zoom"],
      this.minZoom,
      `hsl(${this.hue}, 0%, 75%)`,
      this.minZoom + 2,
      `hsl(${this.hue}, 0%, 50%)`,
    ];
  }
}

class RailService extends Rail {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 4;

    this.fillWidth = [
      [8, 0.3],
      [12, 1],
      [20, 4],
    ];
  }
}

class NarrowGauge extends Railway {
  constructor() {
    super();
    this.railClass = "narrow_gauge";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 10;
    this.dashWidthFactor = 2.5;
    this.dashArraySpacing = 4;

    this.fillWidth = [
      [8, 0.45],
      [12, 1.5],
      [20, 6],
    ];

    this.fillColor = this.dashFillColor = [
      "interpolate",
      ["exponential", railExp],
      ["zoom"],
      this.minZoom,
      `hsl(${this.hue}, 0%, 75%)`,
      this.minZoom + 2,
      `hsl(${this.hue}, 0%, 50%)`,
    ];
  }
}

class NarrowGaugeService extends NarrowGauge {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 4;

    this.fillWidth = [
      [8, 0.25],
      [12, 0.75],
      [20, 3],
    ];
  }
}

class Subway extends Railway {
  constructor() {
    super();
    this.railClass = "subway";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;
    this.minZoomBridge = 14;

    this.fillWidth = [
      [12, 2],
      [20, 8],
    ];

    this.fillColor = `hsl(${this.hue}, 0%, 65%)`;
  }
}

class SubwayService extends Subway {
  constructor() {
    super();
    this.service = true;

    this.fillWidth = [
      [12, 1],
      [20, 4],
    ];
  }
}

/*
 * TODO:
 * light_rail
 * tram
 * monorail
 * funicular
 * preserved?
 */

// Bridges

class RailBridge extends Rail {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class RailServiceBridge extends RailService {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class NarrowGaugeBridge extends NarrowGauge {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
  }
}

class NarrowGaugeServiceBridge extends NarrowGaugeService {
  constructor() {
    super();
    // Undifferentiated
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

// Tunnels

class RailTunnel extends Rail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class RailServiceTunnel extends RailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class NarrowGaugeTunnel extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class NarrowGaugeServiceTunnel extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class SubwayTunnel extends Subway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class SubwayServiceTunnel extends SubwayService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 0%, 90%)`;
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

export const subway = new Subway();
export const subwayBridge = new SubwayBridge();
export const subwayTunnel = new SubwayTunnel();

export const subwayService = new SubwayService();
export const subwayServiceBridge = new SubwayServiceBridge();
export const subwayServiceTunnel = new SubwayServiceTunnel();
