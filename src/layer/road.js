"use strict";

import * as Util from "../js/util.js";

//At this zoom, render switches from unified to differentiated bridge/tunnel rendering
let minzoomBrunnel = 11;

//Exponent base for inter-zoom interpolation
let roadExp = 1.2;

let roadHue = 0;
let tollRoadHue = 48;

//Tunnel casing dash pattern
let tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

let layerSortKey = ["coalesce", ["get", "toll"], 0];

//Join styles for fill and casing
let layoutRoadFill = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
  "line-sort-key": layerSortKey,
};
let layoutRoadCase = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
  "line-sort-key": layerSortKey,
};
let layoutBridgeCase = {
  "line-cap": "butt",
  "line-join": "bevel",
  visibility: "visible",
  "line-sort-key": layerSortKey,
};
let layoutRoadSurface = {
  "line-cap": "butt",
  "line-join": "round",
  visibility: "visible",
  "line-sort-key": layerSortKey,
};

let tollRoadSelector = ["match", ["get", "toll"], 1];

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
  let brunnelFilter =
    brunnel === "ignore"
      ? []
      : brunnel === "surface"
      ? [["!in", "brunnel", "bridge", "tunnel"]]
      : [["==", "brunnel", brunnel]];
  return [
    "all",
    ...brunnelFilter,
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
function uniqueLayerID(hwyClass, link, part, brunnel, constraints) {
  var layerID = [hwyClass, link ? "link" : "road", part, brunnel].join("_");
  if (constraints != null) {
    layerID +=
      "_" + constraints.join("_").replaceAll("=", "").replaceAll("-", "_");
  }
  return layerID;
}

function baseRoadLayer(
  highwayClass,
  id,
  brunnel,
  minzoom,
  maxzoom,
  link,
  constraints
) {
  var layer = Util.layerClone(
    defRoad,
    uniqueLayerID(highwayClass, link, id, brunnel, constraints)
  );
  layer.filter = filterRoad(highwayClass, link, brunnel);
  layer.minzoom = minzoom;
  if (maxzoom) {
    layer.maxzoom = maxzoom;
  }
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
      this.maxZoomFill,
      this.link,
      this.constraints
    );
    layer.layout = layoutRoadFill;
    layer.paint = roadPaint(this.fillColor, this.fillWidth);
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  casing = function () {
    var layer = baseRoadLayer(
      this.highwayClass,
      "casing",
      this.brunnel,
      this.minZoomCasing,
      this.maxZoomCasing,
      this.link,
      this.constraints
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
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    return layer;
  };
  surface = function () {
    var layer = baseRoadLayer(
      this.highwayClass,
      "surface",
      this.brunnel,
      Math.min(this.minZoomCasing, this.minZoomFill),
      Math.max(this.maxZoomCasing, this.maxZoomFill),
      this.link,
      this.constraints
    );
    layer.filter.push(["==", "surface", "unpaved"]);
    if (this.constraints != null) {
      layer.filter.push(this.constraints);
    }
    layer.layout = layoutRoadSurface;
    layer.paint = roadSurfacePaint(this.surfaceColor, this.fillWidth);
    return layer;
  };
}

//Highway class styles
function motorwayCasingColor(tollHue, hue) {
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    4,
    [...tollRoadSelector, `hsl(${tollHue}, 10%, 85%)`, `hsl(${hue}, 10%, 85%)`],
    6,
    [...tollRoadSelector, `hsl(${tollHue}, 60%, 50%)`, `hsl(${hue}, 60%, 50%)`],
    minzoomBrunnel - 0.5,
    [...tollRoadSelector, `hsl(${tollHue}, 71%, 40%)`, `hsl(${hue}, 71%, 40%)`],
    14,
    [...tollRoadSelector, `hsl(${tollHue}, 51%, 9%)`, `hsl(${hue}, 51%, 9%)`],
  ];
}

class Motorway extends Road {
  constructor() {
    super();
    this.highwayClass = "motorway";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 5;
    this.minZoomCasing = 5;

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

    this.fillColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      [
        ...tollRoadSelector,
        `hsl(${tollRoadHue}, 70%, 76%)`,
        `hsl(${roadHue}, 70%, 76%)`,
      ],
      6,
      [
        ...tollRoadSelector,
        `hsl(${tollRoadHue}, 70%, 66%)`,
        `hsl(${roadHue}, 70%, 66%)`,
      ],
      minzoomBrunnel - 0.5,
      [
        ...tollRoadSelector,
        `hsl(${tollRoadHue}, 70%, 60%)`,
        `hsl(${roadHue}, 70%, 60%)`,
      ],
      14,
      [
        ...tollRoadSelector,
        `hsl(${tollRoadHue}, 71%, 45%)`,
        `hsl(${roadHue}, 71%, 35%)`,
      ],
    ];
    this.casingColor = motorwayCasingColor(tollRoadHue, roadHue);
    this.surfaceColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 50%, 70%)`,
      `hsl(${roadHue}, 50%, 70%)`,
    ];
  }
}

class InterstateMotorway extends Motorway {
  constructor() {
    super();
    this.brunnel = "ignore";

    this.minZoomFill = 4;
    this.minZoomCasing = 4;
    this.maxZoomFill = 5;
    this.maxZoomCasing = 5;

    this.constraints = ["==", "network", "us-interstate"];
  }
}

let trunkFillWidth = [
  [4, 0.5],
  [9, 1],
  [12, 4],
  [20, 18],
];
let trunkCasingWidth = [
  [4, 0.5],
  [9, 1.2],
  [12, 5],
  [20, 22],
];
function trunkCasingColor(tollHue, hue) {
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    5,
    [...tollRoadSelector, `hsl(${tollHue}, 77%, 50%)`, `hsl(${hue}, 77%, 50%)`],
    9,
    [...tollRoadSelector, `hsl(${tollHue}, 77%, 50%)`, `hsl(${hue}, 77%, 50%)`],
    15,
    [...tollRoadSelector, `hsl(${tollHue}, 70%, 18%)`, `hsl(${hue}, 70%, 18%)`],
  ];
}

class Trunk extends Road {
  constructor() {
    super();
    this.highwayClass = "trunk";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 5;
    this.minZoomCasing = 5;

    this.fillWidth = trunkFillWidth;
    this.casingWidth = trunkCasingWidth;

    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 77%, 50%)`,
      `hsl(${roadHue}, 77%, 50%)`,
    ];
    this.casingColor = trunkCasingColor(tollRoadHue, roadHue);
    this.surfaceColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 95%, 80%)`,
      `hsl(${roadHue}, 95%, 80%)`,
    ];

    this.constraints = ["!=", "expressway", 1];
  }
}

let trunkExpresswayFillWidth = [
  [7, 0.8],
  [9, 1],
  [12, 3.5],
  [20, 16],
];
let trunkExpresswayCasingWidth = [
  [7, 1.5],
  [9, 3],
  [12, 7],
  [20, 28],
];

class TrunkExpressway extends Trunk {
  constructor() {
    super();

    this.minZoomFill = 5;
    this.minZoomCasing = 5;

    this.fillWidth = trunkExpresswayFillWidth;
    this.casingWidth = trunkExpresswayCasingWidth;

    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 95%, 95%)`,
      `hsl(${roadHue}, 95%, 95%)`,
    ];
    this.casingColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 77%, 50%)`,
      `hsl(${roadHue}, 77%, 50%)`,
    ];

    this.constraints = ["==", "expressway", 1];
  }
}

function roadFillColor(hue, minZoom, transitionZoom) {
  let transitionStop = transitionZoom
    ? [transitionZoom, `hsl(${hue}, 0%, 23%)`]
    : [];
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    minZoom,
    `hsl(${hue}, 0%, 75%)`,
    ...transitionStop,
    14.9999,
    `hsl(${hue}, 0%, 23%)`,
    15,
    `hsl(${hue}, 100%, 100%)`,
  ];
}

function tollRoadFillColor(hue, minZoom, transitionZoom) {
  let transitionStop = transitionZoom
    ? [transitionZoom, `hsl(${hue}, 100%, 40%)`]
    : [];
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    minZoom,
    `hsl(${hue}, 100%, 75%)`,
    ...transitionStop,
    14.9999,
    `hsl(${hue}, 100%, 40%)`,
    15,
    `hsl(${hue}, 100%, 75%)`,
  ];
}

function roadCasingColor(hue, minZoom) {
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    minZoom,
    `hsl(${hue}, 0%, 90%)`,
    14.9999,
    `hsl(${hue}, 0%, 90%)`,
    15,
    `hsl(${hue}, 0%, 23%)`,
  ];
}

function expresswayCasingColor(minZoom, transitionZoom) {
  return [
    "interpolate",
    ["exponential", roadExp],
    ["zoom"],
    minZoom,
    `hsl(0, 0%, 75%)`,
    transitionZoom,
    `hsl(0, 0%, 23%)`,
  ];
}

class Primary extends Road {
  constructor() {
    super();
    this.highwayClass = "primary";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 7;
    this.minZoomCasing = 7;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.9);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.9);

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(roadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${roadHue}, 0%, 80%)`;

    this.constraints = ["all", ["!=", "toll", 1], ["!=", "expressway", 1]];
  }
}

class PrimaryToll extends Primary {
  constructor() {
    super();
    this.constraints = ["all", ["==", "toll", 1], ["!=", "expressway", 1]];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(tollRoadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${tollRoadHue}, 0%, 80%)`;
  }
}

class PrimaryExpressway extends Primary {
  constructor() {
    super();

    this.fillWidth = Util.zoomMultiply(trunkExpresswayFillWidth, 1.0);
    this.casingWidth = Util.zoomMultiply(trunkExpresswayCasingWidth, 0.9);

    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 75%)`,
      `hsl(${roadHue}, 100%, 100%)`,
    ];
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );

    this.constraints = ["==", "expressway", 1];
  }
}

class Secondary extends Road {
  constructor() {
    super();
    this.highwayClass = "secondary";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 9;
    this.minZoomCasing = 9;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.6);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.6);

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(roadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${roadHue}, 0%, 80%)`;

    this.constraints = ["all", ["!=", "toll", 1], ["!=", "expressway", 1]];
  }
}

class SecondaryToll extends Secondary {
  constructor() {
    super();
    this.constraints = ["all", ["==", "toll", 1], ["!=", "expressway", 1]];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(tollRoadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${tollRoadHue}, 0%, 80%)`;
  }
}

class SecondaryExpressway extends Secondary {
  constructor() {
    super();

    this.fillWidth = Util.zoomMultiply(trunkExpresswayFillWidth, 0.7);
    this.casingWidth = Util.zoomMultiply(trunkExpresswayCasingWidth, 0.7);

    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 75%)`,
      `hsl(${roadHue}, 100%, 100%)`,
    ];
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );

    this.constraints = ["==", "expressway", 1];
  }
}

class Tertiary extends Road {
  constructor() {
    super();
    this.highwayClass = "tertiary";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 11;
    this.minZoomCasing = 11;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.5);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.5);

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(roadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${roadHue}, 0%, 80%)`;

    this.constraints = ["all", ["!=", "toll", 1], ["!=", "expressway", 1]];
  }
}

class TertiaryToll extends Tertiary {
  constructor() {
    super();
    this.constraints = ["all", ["==", "toll", 1], ["!=", "expressway", 1]];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
    this.casingColor = roadCasingColor(tollRoadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${tollRoadHue}, 0%, 80%)`;
  }
}

class TertiaryExpressway extends Tertiary {
  constructor() {
    super();

    this.fillWidth = Util.zoomMultiply(trunkExpresswayFillWidth, 0.5);
    this.casingWidth = Util.zoomMultiply(trunkExpresswayCasingWidth, 0.5);

    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 75%)`,
      `hsl(${roadHue}, 100%, 100%)`,
    ];
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );

    this.constraints = ["==", "expressway", 1];
  }
}

class Minor extends Road {
  constructor() {
    super();
    this.highwayClass = "minor";
    this.brunnel = "surface";
    this.link = false;
    this.constraints = ["!=", "toll", 1];

    this.minZoomFill = 12;
    this.minZoomCasing = 12;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.3);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.3);

    this.fillColor = roadFillColor(roadHue, this.minZoomFill);
    this.casingColor = roadCasingColor(roadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${roadHue}, 0%, 80%)`;
  }
}

class MinorToll extends Minor {
  constructor() {
    super();
    this.constraints = ["==", "toll", 1];

    this.fillColor = tollRoadFillColor(tollRoadHue, this.minZoomFill);
    this.casingColor = roadCasingColor(tollRoadHue, this.minZoomCasing);
    this.surfaceColor = `hsl(${tollRoadHue}, 0%, 80%)`;
  }
}

class Service extends Road {
  constructor() {
    super();
    this.highwayClass = "service";
    this.brunnel = "surface";
    this.link = false;

    this.minZoomFill = 13;
    this.minZoomCasing = 13;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.2);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.2);

    // Fill color gets interpolated as a fade from light to dark between this
    // level's introduction and next road-level introduction.
    // It then switches at z15 from dark to light with the casing switching as
    // well.
    this.fillColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      13,
      `hsl(${roadHue}, 0%, 65%)`,
      14.9999,
      `hsl(${roadHue}, 0%, 23%)`,
      15,
      `hsl(${roadHue}, 100%, 100%)`,
    ];
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      13,
      `hsl(${roadHue}, 0%, 90%)`,
      14.9999,
      `hsl(${roadHue}, 0%, 90%)`,
      15,
      `hsl(${roadHue}, 0%, 23%)`,
    ];

    this.surfaceColor = `hsl(${roadHue}, 0%, 80%)`;

    this.constraints = [
      "all",
      ["!=", "toll", 1],
      ["!in", "service", "parking_aisle", "driveway"],
    ];
  }
}

class ServiceToll extends Service {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", "toll", 1],
      ["!in", "service", "parking_aisle", "driveway"],
    ];

    // Fill color gets interpolated as a fade from light to dark between this
    // level's introduction and next road-level introduction.
    // It then switches at z15 from dark to light with the casing switching as
    // well.
    this.fillColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      13,
      `hsl(${tollRoadHue}, 100%, 65%)`,
      14.9999,
      `hsl(${tollRoadHue}, 100%, 40%)`,
      15,
      `hsl(${tollRoadHue}, 100%, 50%)`,
    ];
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      13,
      `hsl(${tollRoadHue}, 0%, 90%)`,
      14.9999,
      `hsl(${tollRoadHue}, 0%, 90%)`,
      15,
      `hsl(${tollRoadHue}, 0%, 23%)`,
    ];

    this.surfaceColor = `hsl(${tollRoadHue}, 0%, 80%)`;
  }
}

class SmallService extends Service {
  constructor() {
    super();

    this.minZoomFill = 15;
    this.minZoomCasing = 15;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.15);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.15);

    // Casing color gets interpolated as a fade from light to dark between this
    // level's introduction and next road-level introduction.
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      15,
      `hsl(${roadHue}, 0%, 65%)`,
      19,
      `hsl(${roadHue}, 0%, 23%)`,
    ];

    this.constraints = [
      "all",
      ["!=", "toll", 1],
      ["in", "service", "parking_aisle", "driveway"],
    ];
  }
}

class SmallServiceToll extends ServiceToll {
  constructor() {
    super();

    this.minZoomFill = 15;
    this.minZoomCasing = 15;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.15);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.15);

    // Casing color gets interpolated as a fade from light to dark between this
    // level's introduction and next road-level introduction.
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      15,
      `hsl(${tollRoadHue}, 0%, 65%)`,
      19,
      `hsl(${tollRoadHue}, 0%, 23%)`,
    ];

    this.constraints = [
      "all",
      ["==", "toll", 1],
      ["in", "service", "parking_aisle", "driveway"],
    ];
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
    this.minZoomFill = 7;
    this.minZoomCasing = 7;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.5);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.5);

    this.constraints = null;
  }
}

class PrimaryLink extends Primary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.45);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.45);

    this.constraints = ["!=", "toll", 1];
  }
}

class PrimaryLinkToll extends PrimaryToll {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.45);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.45);

    this.constraints = ["==", "toll", 1];
  }
}

class SecondaryLink extends Secondary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.3);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.3);

    this.constraints = ["!=", "toll", 1];
  }
}

class SecondaryLinkToll extends SecondaryToll {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.3);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.3);

    this.constraints = ["==", "toll", 1];
  }
}

class TertiaryLink extends Tertiary {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.25);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.25);

    this.constraints = ["!=", "toll", 1];
  }
}

class TertiaryLinkToll extends TertiaryToll {
  constructor() {
    super();
    this.link = true;

    this.fillWidth = Util.zoomMultiply(trunkFillWidth, 0.25);
    this.casingWidth = Util.zoomMultiply(trunkCasingWidth, 0.25);

    this.constraints = ["==", "toll", 1];
  }
}

//Bridges
class MotorwayBridge extends Motorway {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class TrunkBridge extends Trunk {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class TrunkExpresswayBridge extends TrunkExpressway {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class PrimaryBridge extends Primary {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class PrimaryTollBridge extends PrimaryToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class PrimaryExpresswayBridge extends PrimaryExpressway {
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

class SecondaryTollBridge extends SecondaryToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class SecondaryExpresswayBridge extends SecondaryExpressway {
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

class TertiaryTollBridge extends TertiaryToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class TertiaryExpresswayBridge extends TertiaryExpressway {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class MinorBridge extends Minor {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class MinorTollBridge extends MinorToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class ServiceBridge extends Service {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class ServiceTollBridge extends ServiceToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class SmallServiceBridge extends SmallService {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class SmallServiceTollBridge extends SmallServiceToll {
  constructor() {
    //undifferentiated
    super();
    this.brunnel = "bridge";
  }
}

class MotorwayLinkBridge extends MotorwayLink {
  constructor() {
    super();
    //Undifferentiated
    this.brunnel = "bridge";
  }
}

class TrunkLinkBridge extends TrunkLink {
  constructor() {
    super();
    //Undifferentiated
    this.brunnel = "bridge";
  }
}

class PrimaryLinkBridge extends PrimaryLink {
  constructor() {
    super();
    //Undifferentiated
    this.brunnel = "bridge";
  }
}

class PrimaryLinkTollBridge extends PrimaryLinkToll {
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

class SecondaryLinkTollBridge extends SecondaryLinkToll {
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

class TertiaryLinkTollBridge extends TertiaryLinkToll {
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
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 41%, 80%)`,
      `hsl(${roadHue}, 41%, 80%)`,
    ];
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 71%, 90%)`,
      `hsl(${roadHue}, 71%, 90%)`,
    ];
  }
}

class TrunkTunnel extends Trunk {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 41%, 80%)`,
      `hsl(${roadHue}, 41%, 80%)`,
    ];
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 77%, 90%)`,
      `hsl(${roadHue}, 77%, 90%)`,
    ];
  }
}

class TrunkExpresswayTunnel extends TrunkExpressway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 41%, 85%)`,
      `hsl(${roadHue}, 41%, 85%)`,
    ];
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 77%, 90%)`,
      `hsl(${roadHue}, 77%, 90%)`,
    ];
  }
}

class PrimaryTunnel extends Primary {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class PrimaryTollTunnel extends PrimaryToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class PrimaryExpresswayTunnel extends PrimaryExpressway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(0, 0%, 80%)`;
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 95%)`,
      `hsl(${roadHue}, 0%, 95%)`,
    ];
  }
}

class SecondaryTunnel extends Secondary {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class SecondaryTollTunnel extends SecondaryToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class SecondaryExpresswayTunnel extends SecondaryExpressway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(0, 0%, 80%)`;
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 95%)`,
      `hsl(${roadHue}, 0%, 95%)`,
    ];
  }
}

class TertiaryTunnel extends Tertiary {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class TertiaryTollTunnel extends TertiaryToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class TertiaryExpresswayTunnel extends TertiaryExpressway {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(0, 0%, 80%)`;
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 100%, 95%)`,
      `hsl(${roadHue}, 0%, 95%)`,
    ];
  }
}

class MinorTunnel extends Minor {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class MinorTollTunnel extends MinorToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class ServiceTunnel extends Service {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class ServiceTollTunnel extends ServiceToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class SmallServiceTunnel extends SmallService {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class SmallServiceTollTunnel extends SmallServiceToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 90%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class MotorwayLinkTunnel extends MotorwayLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 41%, 80%)`,
      `hsl(${roadHue}, 41%, 80%)`,
    ];
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 71%, 90%)`,
      `hsl(${roadHue}, 71%, 90%)`,
    ];
  }
}

class TrunkLinkTunnel extends TrunkLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 41%, 80%)`,
      `hsl(${roadHue}, 41%, 80%)`,
    ];
    this.fillColor = [
      ...tollRoadSelector,
      `hsl(${tollRoadHue}, 77%, 90%)`,
      `hsl(${roadHue}, 77%, 90%)`,
    ];
  }
}

class PrimaryLinkTunnel extends PrimaryLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class PrimaryLinkTollTunnel extends PrimaryLinkToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class SecondaryLinkTunnel extends SecondaryLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class SecondaryLinkTollTunnel extends SecondaryLinkToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

class TertiaryLinkTunnel extends TertiaryLink {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${roadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${roadHue}, 0%, 95%)`;
  }
}

class TertiaryLinkTollTunnel extends TertiaryLinkToll {
  constructor() {
    super();
    this.brunnel = "tunnel";
    this.casingColor = `hsl(${tollRoadHue}, 0%, 80%)`;
    this.fillColor = `hsl(${tollRoadHue}, 100%, 95%)`;
  }
}

export const interstate = new InterstateMotorway();
export const motorway = new Motorway();
export const trunk = new Trunk();
export const trunkExpressway = new TrunkExpressway();
export const primary = new Primary();
export const primaryToll = new PrimaryToll();
export const primaryExpressway = new PrimaryExpressway();
export const secondary = new Secondary();
export const secondaryToll = new SecondaryToll();
export const secondaryExpressway = new SecondaryExpressway();
export const tertiary = new Tertiary();
export const tertiaryToll = new TertiaryToll();
export const tertiaryExpressway = new TertiaryExpressway();
export const minor = new Minor();
export const minorToll = new MinorToll();
export const service = new Service();
export const serviceToll = new ServiceToll();
export const smallService = new SmallService();
export const smallServiceToll = new SmallServiceToll();

export const motorwayBridge = new MotorwayBridge();
export const trunkBridge = new TrunkBridge();
export const trunkExpresswayBridge = new TrunkExpresswayBridge();
export const primaryBridge = new PrimaryBridge();
export const primaryTollBridge = new PrimaryTollBridge();
export const primaryExpresswayBridge = new PrimaryExpresswayBridge();
export const secondaryBridge = new SecondaryBridge();
export const secondaryTollBridge = new SecondaryTollBridge();
export const secondaryExpresswayBridge = new SecondaryExpresswayBridge();
export const tertiaryBridge = new TertiaryBridge();
export const tertiaryTollBridge = new TertiaryTollBridge();
export const tertiaryExpresswayBridge = new TertiaryExpresswayBridge();
export const minorBridge = new MinorBridge();
export const minorTollBridge = new MinorTollBridge();
export const serviceBridge = new ServiceBridge();
export const serviceTollBridge = new ServiceTollBridge();
export const smallServiceBridge = new SmallServiceBridge();
export const smallServiceTollBridge = new SmallServiceTollBridge();

export const motorwayTunnel = new MotorwayTunnel();
export const trunkTunnel = new TrunkTunnel();
export const trunkExpresswayTunnel = new TrunkExpresswayTunnel();
export const primaryTunnel = new PrimaryTunnel();
export const primaryTollTunnel = new PrimaryTollTunnel();
export const primaryExpresswayTunnel = new PrimaryExpresswayTunnel();
export const secondaryTunnel = new SecondaryTunnel();
export const secondaryTollTunnel = new SecondaryTollTunnel();
export const secondaryExpresswayTunnel = new SecondaryExpresswayTunnel();
export const tertiaryTunnel = new TertiaryTunnel();
export const tertiaryTollTunnel = new TertiaryTollTunnel();
export const tertiaryExpresswayTunnel = new TertiaryExpresswayTunnel();
export const minorTunnel = new MinorTunnel();
export const minorTollTunnel = new MinorTollTunnel();
export const serviceTunnel = new ServiceTunnel();
export const serviceTollTunnel = new ServiceTollTunnel();
export const smallServiceTunnel = new SmallServiceTunnel();
export const smallServiceTollTunnel = new SmallServiceTollTunnel();

export const motorwayLink = new MotorwayLink();
export const trunkLink = new TrunkLink();
export const primaryLink = new PrimaryLink();
export const primaryLinkToll = new PrimaryLinkToll();
export const secondaryLink = new SecondaryLink();
export const secondaryLinkToll = new SecondaryLinkToll();
export const tertiaryLink = new TertiaryLink();
export const tertiaryLinkToll = new TertiaryLinkToll();

export const motorwayLinkBridge = new MotorwayLinkBridge();
export const trunkLinkBridge = new TrunkLinkBridge();
export const primaryLinkBridge = new PrimaryLinkBridge();
export const primaryLinkTollBridge = new PrimaryLinkTollBridge();
export const secondaryLinkBridge = new SecondaryLinkBridge();
export const secondaryLinkTollBridge = new SecondaryLinkTollBridge();
export const tertiaryLinkBridge = new TertiaryLinkBridge();
export const tertiaryLinkTollBridge = new TertiaryLinkTollBridge();

export const motorwayLinkTunnel = new MotorwayLinkTunnel();
export const trunkLinkTunnel = new TrunkLinkTunnel();
export const primaryLinkTunnel = new PrimaryLinkTunnel();
export const primaryLinkTollTunnel = new PrimaryLinkTollTunnel();
export const secondaryLinkTunnel = new SecondaryLinkTunnel();
export const secondaryLinkTollTunnel = new SecondaryLinkTollTunnel();
export const tertiaryLinkTunnel = new TertiaryLinkTunnel();
export const tertiaryLinkTollTunnel = new TertiaryLinkTollTunnel();
