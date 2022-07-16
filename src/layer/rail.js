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
    ["==", "class", "rail"],
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
    this.hue = 35;
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
      "line-color": "hsl(0, 0%, 50%)",
      "line-width": {
        base: railExp,
        stops: this.bridgeCasingWidth,
      },
    };
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  bridgeFill = function () {
    var layer = baseRailLayer(
      this.railClass,
      "bridgeFill",
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
      "line-color": "white",
      "line-width": {
        base: railExp,
        stops: this.bridgeFillWidth,
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
      "line-color": this.fillColor,
      "line-width": {
        base: railExp,
        stops: this.dashWidth,
      },
      "line-dasharray": this.dashArray,
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
    this.minZoomBridge = 13;
    this.lineWeight = 0.4;

    this.dashWidth = [
      [8, 1.6],
      [12, 4.8],
      [20, 20],
    ];
    this.fillWidth = Util.zoomMultiply(this.dashWidth, this.lineWeight);
    this.bridgeFillWidth = Util.zoomMultiply(this.dashWidth, 1.1);
    this.bridgeCasingWidth = Util.zoomMultiply(this.dashWidth, 1.3);

    this.dashArray = [this.lineWeight / 2, 4];

    this.fillColor = [
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

    this.lineWeight = 0.2;

    this.fillWidth = Util.zoomMultiply(this.dashWidth, this.lineWeight);

    this.dashArray = [this.lineWeight / 2, 4];

    this.constraints = null;
  }
}

class NarrowGauge extends Railway {
  constructor() {
    super();
    this.railClass = "narrow_gauge";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 10;
    this.minZoomBridge = 13;
    this.lineWeight = 0.4;

    this.dashWidth = [
      [8, 1.2],
      [12, 3.6],
      [20, 15],
    ];
    this.fillWidth = Util.zoomMultiply(this.dashWidth, this.lineWeight);
    this.bridgeFillWidth = Util.zoomMultiply(this.dashWidth, 1.1);
    this.bridgeCasingWidth = Util.zoomMultiply(this.dashWidth, 1.3);

    this.dashArray = [this.lineWeight / 2, 4];

    this.fillColor = [
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

    this.lineWeight = 0.2;

    this.fillWidth = Util.zoomMultiply(this.dashWidth, this.lineWeight);

    this.dashArray = [this.lineWeight / 2, 4];

    this.constraints = null;
  }
}

/*
 * TODO:
 * subway
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

// Tunnels

class RailTunnel extends Rail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class RailServiceTunnel extends RailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class NarrowGaugeTunnel extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 0%, 90%)`;
  }
}

class NarrowGaugeServiceTunnel extends NarrowGaugeService {
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
