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

    this.fillWidth = [
      [8, 0.4],
      [12, 1.2],
      [20, 5],
    ];
    this.dashWidth = [
      [8, 1.6],
      [12, 4.8],
      [20, 20],
    ];

    this.dashArray = [0.2, 4];

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

    this.fillWidth = [
      [8, 0.2],
      [12, 0.6],
      [20, 2.5],
    ];

    this.dashArray = [0.1, 4];

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
 * narrow_gauge
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

export const rail = new Rail();
export const railBridge = new RailBridge();
export const railTunnel = new RailTunnel();

export const railService = new RailService();
export const railServiceBridge = new RailServiceBridge();
export const railServiceTunnel = new RailServiceTunnel();
