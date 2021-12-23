"use strict";

import * as Util from "../js/util.js";

//At this zoom, render switches from unified to differentiated bridge/tunnel rendering
let minzoomBrunnel = 11;

//Exponent base for inter-zoom interpolation
let roadExp = 1.2;

//Tunnel casing dash pattern
let tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

//Join styles for fill and casing
let layoutRoadFill = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
};
let layoutRoadCase = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
};
let layoutBridgeCase = {
  "line-cap": "butt",
  "line-join": "bevel",
  visibility: "visible",
};
let layoutRoadSurface = {
  "line-cap": "butt",
  "line-join": "round",
  visibility: "visible",
};

/*
 Road style generation helper functions
*/

function roadPaint(color, width) {
  return {
    "line-color": color,
    "line-width": {
      base: roadExp,
      stops: width,
    },
    "line-blur": 0.5,
  };
}

function tunnelCasePaint(color, width) {
  return {
    "line-color": color,
    "line-width": {
      base: roadExp,
      stops: width,
    },
    "line-opacity": 1,
    "line-dasharray": tunDashArray,
  };
}

function roadSurfacePaint(color, width) {
  return {
    "line-dasharray": [4, 4],
    "line-color": color,
    "line-width": {
      base: roadExp,
      stops: width,
    },
    "line-blur": 0.5,
  };
}

//Helper function to create a "filter" block for a particular road class.
function filterRoad(roadClass, ramp, brunnel) {
  return [
    "all",
    brunnel === "surface"
      ? ["!in", "brunnel", "bridge", "tunnel"]
      : ["==", "brunnel", brunnel],
    ["==", "class", roadClass],
    [ramp ? "==" : "!=", "ramp", 1],
  ];
}

//Base definition that applies to all roads (fill and casing).
var defRoad = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
};

//Generate a unique layer ID
function uniqueLayerID(hwyClass, link, part, brunnel) {
  return [hwyClass, link ? "link" : "road", part, brunnel].join("_");
}

function baseRoadLayer(highwayClass, id, brunnel, minzoom, link) {
  var layer = Util.layerClone(
    defRoad,
    uniqueLayerID(highwayClass, link, id, brunnel)
  );
  layer.filter = filterRoad(highwayClass, link, brunnel);
  layer.minzoom = minzoom;
  return layer;
}

//Base road class
class Road {
  fill = function () {
    var layer = baseRoadLayer(
      this.highwayClass,
      "fill",
      this.brunnel,
      this.minZoomFill,
      this.link
    );
    layer.layout = layoutRoadFill;
    layer.paint = roadPaint(this.fillColor, this.fillWidth);
    return layer;
  };
  casing = function () {
    var layer = baseRoadLayer(
      this.highwayClass,
      "casing",
      this.brunnel,
      this.minZoomCasing,
      this.link
    );
    layer.layout = layoutRoadCase;
    if (this.brunnel === "bridge") {
      layer.layout = layoutBridgeCase;
    }
    if (this.brunnel === "tunnel") {
      layer.paint = tunnelCasePaint(this.casingColor, this.casingWidth);
    } else {
      layer.paint = roadPaint(this.casingColor, this.casingWidth);
    }
    return layer;
  };
  surface = function () {
    var layer = baseRoadLayer(
      this.highwayClass,
      "surface",
      this.brunnel,
      Math.min(this.minZoomCasing, this.minZoomFill),
      this.link
    );
    layer.filter.push(["==", "surface", "unpaved"]);
    layer.layout = layoutRoadSurface;
    layer.paint = roadSurfacePaint(this.surfaceColor, this.fillWidth);
    return layer;
  };
}

//Highway class styles
class Motorway extends Road {
  constructor() {
    super();
    this.highwayClass = "motorway";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 4;
    this.minZoomCasing = 4;

    this.fillWidth = [
      [4, 0.5],
      [9, 1],
      [20, 18],
    ];
    this.casingWidth = [
      [4, 1.5],
      [9, 3],
      [20, 22],
    ];

    //Unified motorway bridge/tunnel/surface rendering at low zoom
    this.colorFillLowZoom = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      `hsl(${this.hue}, 70%, 76%)`,
      6,
      `hsl(${this.hue}, 70%, 66%)`,
      minzoomBrunnel - 0.5,
      `hsl(${this.hue}, 70%, 60%)`,
    ];

    this.colorCasingLowZoom = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      `hsl(${this.hue}, 10%, 85%)`,
      6,
      `hsl(${this.hue}, 60%, 50%)`,
      minzoomBrunnel - 0.5,
      `hsl(${this.hue}, 71%, 40%)`,
    ];

    this.fillColor = [
      ...this.colorFillLowZoom,
      14,
      `hsl(${this.hue}, 71%, 35%)`,
    ];
    this.casingColor = [
      ...this.colorCasingLowZoom,
      14,
      `hsl(${this.hue}, 51%, 9%)`,
    ];

    this.surfaceColor = `hsl(${this.hue}, 50%, 70%)`;
  }
}

let trunkFillWidth = [
  [4, 0.5],
  [9, 1],
  [12, 4],
  [20, 18],
];
let trunkCasingWidth = [
  [9, 1],
  [12, 4],
  [20, 22],
];

class Trunk extends Road {
  constructor() {
    super();
    this.highwayClass = "trunk";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 7;
    this.minZoomCasing = 15;

    this.fillWidth = trunkFillWidth;
    this.casingWidth = trunkCasingWidth;

    this.fillColor = `hsl(${this.hue}, 77%, 50%)`;
    this.casingColor = `hsl(${this.hue}, 70%, 18%)`;
    this.surfaceColor = `hsl(${this.hue}, 95%, 80%)`;
  }
}

class Primary extends Road {
  constructor() {
    super();
    this.highwayClass = "primary";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 14;
    this.minZoomCasing = 10;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.9);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.9);

    this.fillColor = `hsl(${this.hue}, 100%, 100%)`;
    this.casingColor = `hsl(${this.hue}, 0%, 23%)`;
    this.surfaceColor = `hsl(${this.hue}, 0%, 80%)`;
  }
}

class Secondary extends Road {
  constructor() {
    super();
    this.highwayClass = "secondary";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 15;
    this.minZoomCasing = 11;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.6);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.6);

    this.fillColor = `hsl(${this.hue}, 100%, 100%)`;
    this.casingColor = `hsl(${this.hue}, 0%, 23%)`;
    this.surfaceColor = `hsl(${this.hue}, 0%, 80%)`;
  }
}

class Tertiary extends Road {
  constructor() {
    super();
    this.highwayClass = "tertiary";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 16;
    this.minZoomCasing = 12;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.5);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.5);

    this.fillColor = `hsl(${this.hue}, 100%, 100%)`;
    this.casingColor = `hsl(${this.hue}, 0%, 23%)`;
    this.surfaceColor = `hsl(${this.hue}, 0%, 80%)`;
  }
}

class MotorwayLink extends Motorway {
  constructor() {
    super();
    this.link = true;
    this.minZoomFill = 7;
    this.minZoomCasing = 7;

    this.fillWidth = [
      [7, 1],
      [13, 1.5],
      [14, 2.5],
      [20, 11.5],
    ];
    this.casingWidth = [
      [7, 2],
      [13, 3],
      [14, 4],
      [20, 15],
    ];
  }
}

class TrunkLink extends Trunk {
  constructor() {
    super();
    this.link = true;
    this.minZoomFill = 11;
    this.minZoomCasing = 15;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.5);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.5);
  }
}

class PrimaryLink extends Primary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.45);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.45);
  }
}

class SecondaryLink extends Secondary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.3);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.3);
  }
}

class TertiaryLink extends Tertiary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.25);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.25);
  }
}

//Bridges
class MotorwayBridge extends Motorway {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.casingColor = [
      ...this.colorCasingLowZoom,
      minzoomBrunnel + 0.5,
      `hsl(${this.hue}, 71%, 10%)`,
    ];
  }
}

class TrunkBridge extends Trunk {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.casingColor = `hsl(${this.hue}, 70%, 5%)`;
  }
}

class PrimaryBridge extends Primary {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class SecondaryBridge extends Secondary {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class TertiaryBridge extends Tertiary {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class MotorwayLinkBridge extends MotorwayLink {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.casingColor = `hsl(${this.hue}, 70%, 5%)`;
  }
}

class TrunkLinkBridge extends TrunkLink {
  constructor() {
    super();
    this.brunnel = "bridge";
    this.casingColor = `hsl(${this.hue}, 70%, 5%)`;
  }
}

class PrimaryLinkBridge extends PrimaryLink {
  constructor() {
    super();
    //Undifferentiated
    this.brunnel = "bridge";
  }
}

class SecondaryLinkBridge extends SecondaryLink {
  constructor() {
    super();
    //Undifferentiated
    this.brunnel = "bridge";
  }
}

class TertiaryLinkBridge extends TertiaryLink {
  constructor() {
    //Undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

//Tunnels
class MotorwayTunnel extends Motorway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...this.colorCasingLowZoom,
      minzoomBrunnel + 0.5,
      `hsl(${this.hue}, 71%, 75%)`,
    ];
    this.fillColor = [
      ...this.colorFillLowZoom,
      minzoomBrunnel + 0.5,
      `hsl(${this.hue}, 71%, 90%)`,
    ];
  }
}

class TrunkTunnel extends Trunk {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 41%, 90%)`;
  }
}

class MotorwayLinkTunnel extends MotorwayLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...this.colorCasingLowZoom,
      minzoomBrunnel + 0.5,
      `hsl(${this.hue}, 71%, 75%)`,
    ];
    this.fillColor = [
      ...this.colorFillLowZoom,
      minzoomBrunnel + 0.5,
      `hsl(${this.hue}, 71%, 90%)`,
    ];
  }
}

class TrunkLinkTunnel extends TrunkLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.fillColor = `hsl(${this.hue}, 41%, 90%)`;
  }
}

export const motorway = new Motorway();
export const trunk = new Trunk();
export const primary = new Primary();
export const secondary = new Secondary();
export const tertiary = new Tertiary();

export const motorwayBridge = new MotorwayBridge();
export const trunkBridge = new TrunkBridge();
export const primaryBridge = new PrimaryBridge();
export const secondaryBridge = new SecondaryBridge();
export const tertiaryBridge = new TertiaryBridge();

export const motorwayTunnel = new MotorwayTunnel();
export const trunkTunnel = new TrunkTunnel();

export const motorwayLink = new MotorwayLink();
export const trunkLink = new TrunkLink();

export const motorwayLinkBridge = new MotorwayLinkBridge();
export const trunkLinkBridge = new TrunkLinkBridge();
export const primaryLinkBridge = new PrimaryLinkBridge();
export const secondaryLinkBridge = new SecondaryLinkBridge();
export const tertiaryLinkBridge = new TertiaryLinkBridge();

export const motorwayLinkTunnel = new MotorwayLinkTunnel();
export const trunkLinkTunnel = new TrunkLinkTunnel();
