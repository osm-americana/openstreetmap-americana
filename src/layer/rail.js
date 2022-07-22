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

// Bridge casing layers
export const bridgeCasing = {
  ...defRail,
  id: "railway-bridge-casing",
  filter: [
    "all",
    ["==", "brunnel", "bridge"],
    ["!in", "service", "siding", "spur", "yard"],
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
    "line-width": {
      base: railExp,
      stops: [
        [8, 1.0],
        [12, 2.5],
        [20, 8.5],
      ],
    },
    "line-blur": 0.75,
  },
};

export const serviceBridgeCasing = {
  ...defRail,
  id: "railway-service-bridge-casing",
  filter: [
    "all",
    ["==", "brunnel", "bridge"],
    ["in", "service", "siding", "spur", "yard"],
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
    "line-width": {
      base: railExp,
      stops: [
        [8, 0.8],
        [12, 2.0],
        [20, 7.8],
      ],
    },
    "line-blur": 0.75,
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
  layer.maxzoom = maxzoom ?? 24;
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
      "line-color": this.dashFillColor,
      "line-width": {
        base: railExp,
        stops: Util.zoomMultiply(this.fillWidth, this.dashWidthFactor),
      },
      "line-dasharray": this.dashArray.map(
        (stop) => stop / 2 / this.dashWidthFactor
      ),
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
    this.dashWidthFactor = 3;
    this.dashArray = [1, 25];

    this.fillWidth = [
      [8, 0.3],
      [12, 1],
      [20, 4],
    ];

    this.fillColor = this.dashFillColor = [
      "interpolate",
      ["exponential", railExp],
      ["zoom"],
      this.minZoom,
      `hsl(0, 0%, 75%)`,
      this.minZoom + 2,
      `hsl(0, 0%, 60%)`,
    ];
  }
}

class RailService extends Rail {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 4;
    this.dashArray = [1, 50];

    this.fillWidth = [
      [8, 0.15],
      [12, 0.5],
      [20, 2],
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
    this.dashWidthFactor = 3;
    this.dashArray = [1, 20];

    this.fillWidth = [
      [8, 0.25],
      [12, 0.83],
      [20, 3.33],
    ];

    this.fillColor = this.dashFillColor = [
      "interpolate",
      ["exponential", railExp],
      ["zoom"],
      this.minZoom,
      `hsl(0, 0%, 75%)`,
      this.minZoom + 2,
      `hsl(0, 0%, 60%)`,
    ];
  }
}

class NarrowGaugeService extends NarrowGauge {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 4;
    this.dashArray = [1, 40];

    this.fillWidth = [
      [8, 0.12],
      [12, 0.4],
      [20, 1.7],
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

    this.fillWidth = [
      [12, 1],
      [20, 4],
    ];

    this.fillColor = `hsl(0, 0%, 50%)`;
  }
}

class SubwayService extends Subway {
  constructor() {
    super();
    this.service = true;

    this.fillWidth = [
      [12, 0.5],
      [20, 2],
    ];
  }
}

class Monorail extends Railway {
  constructor() {
    super();
    this.railClass = "monorail";
    this.brunnel = "surface";
    this.service = false;

    this.minZoom = 14;

    this.fillWidth = [
      [12, 0.8],
      [20, 3.2],
    ];

    this.fillColor = `hsl(0, 0%, 50%)`;
  }
}

class MonorailService extends Monorail {
  constructor() {
    super();
    this.service = true;

    this.fillWidth = [
      [12, 0.4],
      [20, 1.6],
    ];
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

    this.fillWidth = [
      [12, 0.6],
      [20, 2.5],
    ];

    this.fillColor = this.dashFillColor = `hsl(0, 0%, 50%)`;
  }
}

class LightRailService extends LightRail {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 3;
    this.dashArray = [1, 12];

    this.fillWidth = [
      [12, 0.3],
      [20, 1.25],
    ];
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

    this.fillWidth = [
      [12, 0.6],
      [20, 2.5],
    ];

    this.fillColor = this.dashFillColor = `hsl(0, 0%, 60%)`;
  }
}

class TramService extends Tram {
  constructor() {
    super();
    this.service = true;

    this.dashWidthFactor = 3;
    this.dashArray = [1, 12];

    this.fillWidth = [
      [12, 0.3],
      [20, 1.25],
    ];
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

    this.fillWidth = [
      [12, 0.6],
      [20, 2.5],
    ];

    this.fillColor = this.dashFillColor = `hsl(0, 0%, 50%)`;
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
    this.minZoomBridge = 13;
  }
}

class RailServiceBridge extends RailService {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 13;
  }
}

class NarrowGaugeBridge extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 13;
  }
}

class NarrowGaugeServiceBridge extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 13;
  }
}

class SubwayBridge extends Subway {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class SubwayServiceBridge extends SubwayService {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class MonorailBridge extends Monorail {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class MonorailServiceBridge extends MonorailService {
  constructor() {
    super();
    // Undifferentiated
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class LightRailBridge extends LightRail {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class LightRailServiceBridge extends LightRailService {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class FunicularBridge extends Funicular {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class TramBridge extends Tram {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

class TramServiceBridge extends TramService {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.minZoomBridge = 14;
  }
}

// Tunnels

class RailTunnel extends Rail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class RailServiceTunnel extends RailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class NarrowGaugeTunnel extends NarrowGauge {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class NarrowGaugeServiceTunnel extends NarrowGaugeService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class SubwayTunnel extends Subway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(0, 0%, 90%)`;
  }
}

class SubwayServiceTunnel extends SubwayService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(0, 0%, 90%)`;
  }
}

class MonorailTunnel extends Monorail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(0, 0%, 90%)`;
  }
}

class MonorailServiceTunnel extends MonorailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(0, 0%, 90%)`;
  }
}

class LightRailTunnel extends LightRail {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class LightRailServiceTunnel extends LightRailService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class FunicularTunnel extends Funicular {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class TramTunnel extends Tram {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
  }
}

class TramServiceTunnel extends TramService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = this.dashFillColor = `hsl(0, 0%, 90%)`;
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
