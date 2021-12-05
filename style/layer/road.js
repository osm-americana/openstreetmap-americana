"use strict";
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
  var layer = layerClone(
    defRoad,
    uniqueLayerID(highwayClass, link, id, brunnel)
  );
  layer.filter = filterRoad(highwayClass, link, brunnel);
  layer.minzoom = minzoom;
  return layer;
}

//Base road class
class Road {
  fill = function() {
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
  }
  casing = function() {
    var layer = baseRoadLayer(
      this.highwayClass,
      "casing",
      this.brunnel,
      this.minZoomCasing,
      this.link
    );
    layer.layout = layoutRoadCase;
    if (this.brunnel === "tunnel") {
      layer.paint = tunnelCasePaint(this.casingColor, this.casingWidth);
    } else {
      layer.paint = roadPaint(this.casingColor, this.casingWidth);
    }
    return layer;
  }
};


//Highway class styles
class Motorway extends Road {
  constructor() {
    super();
    this.highwayClass = "motorway";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 354;

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
      `hsl(${this.hue}, 71%, 45%)`,
    ];
    this.casingColor = [
      ...this.colorCasingLowZoom,
      14,
      `hsl(${this.hue}, 71%, 23%)`,
    ];
  }
}

class Trunk extends Road {
  constructor() {
    super();
    this.highwayClass = "trunk";
    this.brunnel = "surface";
    this.link = false;
    this.hue = 0;

    this.minZoomFill = 8;
    this.minZoomCasing = 10;

    this.fillWidth = [
      [4, 0.5],
      [9, 1],
      [12, 4],
      [20, 18],
    ];

    this.casingWidth = [
      [9, 1],
      [12, 4],
      [20, 22],
    ];

    this.fillColor = `hsl(${this.hue}, 70%, 28%)`;
    this.casingColor = `hsl(${this.hue}, 70%, 18%)`;
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
    this.minZoomCasing = 11;

    this.fillWidth = [
      [7, 1],
      [13, 1.5],
      [14, 2.5],
      [20, 11.5],
    ];
    this.casingWidth = [
      [7, 2],
      [13, 3],
      [14, 4.0],
      [20, 15],
    ];
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

//Object.setPrototypeOf(Motorway.prototype, Road);
Object.setPrototypeOf(Trunk.prototype, Road);

Object.setPrototypeOf(MotorwayBridge.prototype, Road);
Object.setPrototypeOf(TrunkBridge.prototype, Road);

Object.setPrototypeOf(MotorwayTunnel.prototype, Road);
Object.setPrototypeOf(TrunkTunnel.prototype, Road);

Object.setPrototypeOf(MotorwayLink.prototype, Road);
Object.setPrototypeOf(TrunkLink.prototype, Road);

Object.setPrototypeOf(MotorwayLinkBridge.prototype, Road);
Object.setPrototypeOf(TrunkLinkBridge.prototype, Road);

Object.setPrototypeOf(MotorwayLinkTunnel.prototype, Road);
Object.setPrototypeOf(TrunkLinkTunnel.prototype, Road);

var roadMotorway = new Motorway();
var roadTrunk = new Trunk();

var roadMotorwayBridge = new MotorwayBridge();
var roadTrunkBridge = new TrunkBridge();

var roadMotorwayTunnel = new MotorwayTunnel();
var roadTrunkTunnel = new TrunkTunnel();

var roadMotorwayLink = new MotorwayLink();
var roadTrunkLink = new TrunkLink();

var roadMotorwayLinkBridge = new MotorwayLinkBridge();
var roadTrunkLinkBridge = new TrunkLinkBridge();

var roadMotorwayLinkTunnel = new MotorwayLinkTunnel();
var roadTrunkLinkTunnel = new TrunkLinkTunnel();
