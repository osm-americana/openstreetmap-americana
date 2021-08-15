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

//Highway class styles
class Motorway {
  constructor(link) {
    this.highwayClass = "motorway";
    this.link = link;

    let hue = 354;

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
    let colorFillLowZoom = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      `hsl(${hue}, 70%, 76%)`,
      6,
      `hsl(${hue}, 70%, 66%)`,
      minzoomBrunnel - 0.5,
      `hsl(${hue}, 70%, 60%)`,
    ];

    let colorCasingLowZoom = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      `hsl(${hue}, 10%, 85%)`,
      6,
      `hsl(${hue}, 60%, 50%)`,
      minzoomBrunnel - 0.5,
      `hsl(${hue}, 71%, 40%)`,
    ];

    this.tunnelFillColor = colorFillLowZoom.concat(
      minzoomBrunnel + 0.5,
      `hsl(${hue}, 71%, 90%)`
    );

    this.roadFillColor = colorFillLowZoom.concat(14, `hsl(${hue}, 71%, 45%)`);

    this.surfaceCasingColor = colorCasingLowZoom.concat(
      14,
      `hsl(${hue}, 71%, 23%)`
    );

    this.bridgeCasingColor = colorCasingLowZoom.concat(
      minzoomBrunnel + 0.5,
      `hsl(${hue}, 71%, 10%)`
    );

    this.tunnelCasingColor = colorCasingLowZoom.concat(
      minzoomBrunnel + 0.5,
      `hsl(${hue}, 71%, 75%)`
    );
  }
}

class Trunk {
  constructor(link) {
    this.highwayClass = "trunk";
    this.link = link;

    let hue = 0;

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

    this.tunnelFillColor = `hsl(${hue}, 41%, 90%)`;
    this.roadFillColor = `hsl(${hue}, 70%, 28%)`;
    this.surfaceCasingColor = `hsl(${hue}, 70%, 18%)`;
    this.bridgeCasingColor = `hsl(${hue}, 70%, 5%)`;
    this.tunnelCasingColor = this.surfaceCasingColor;
  }
}

class MotorwayLink extends Motorway {
  constructor() {
    super(true);

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
    super(true);

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

const Road = {
  fill: function (brunnel) {
    var layer = baseRoadLayer(
      this.highwayClass,
      "fill",
      brunnel,
      this.minZoomFill,
      this.link
    );
    layer.layout = layoutRoadFill;
    layer.paint = roadPaint(
      brunnel === "tunnel" ? this.tunnelFillColor : this.roadFillColor,
      this.fillWidth
    );
    return layer;
  },
  casing: function (brunnel) {
    var layer = baseRoadLayer(
      this.highwayClass,
      "casing",
      brunnel,
      this.minZoomCasing,
      this.link
    );
    layer.layout = layoutRoadCase;
    if (brunnel === "tunnel") {
      layer.paint = tunnelCasePaint(this.tunnelCasingColor, this.casingWidth);
    } else if (brunnel == "bridge") {
      layer.paint = roadPaint(this.bridgeCasingColor, this.casingWidth);
    } else {
      layer.paint = roadPaint(this.surfaceCasingColor, this.casingWidth);
    }
    return layer;
  },
};

Object.setPrototypeOf(Motorway.prototype, Road);
Object.setPrototypeOf(Trunk.prototype, Road);

Object.setPrototypeOf(MotorwayLink.prototype, Road);
Object.setPrototypeOf(TrunkLink.prototype, Road);

var roadMotorway = new Motorway(false);
var roadTrunk = new Trunk(false);

var roadMotorwayLink = new MotorwayLink();
var roadTrunkLink = new TrunkLink();
