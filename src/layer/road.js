"use strict";

import * as Util from "../js/util.js";

//At this zoom, render switches from unified to differentiated bridge/tunnel rendering
const minzoomBrunnel = 11;

const minZoomAllRoads = 4;
const minZoomMotorwayTrunk = 5;
const minZoomPrimary = 7;
const minZoomSecondary = 9;
const minZoomTertiary = 11;
const minZoomMinor = 12;
const minZoomService = 13;
const minZoomSmallService = 15;

//Exponent base for inter-zoom interpolation
const roadExp = 1.2;

const roadHue = 0;
const tollRoadHue = 48;

//Tunnel casing dash pattern
const tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

const getBrunnel = ["get", "brunnel"];
const getClass = ["get", "class"];
const getExpressway = ["coalesce", ["get", "expressway"], 0];
const getRamp = ["coalesce", ["get", "ramp"], 0];
const getToll = ["coalesce", ["get", "toll"], 0];

// Common filter expressions
const classSelector = ["match", getClass];
const tollSelector = ["match", getToll, 1];
const isToll = ["==", getToll, 1];
const isNotToll = ["!=", getToll, 1];
const isLink = ["==", getRamp, 1];
const isNotLink = ["!=", getRamp, 1];
const linkSelector = ["match", getRamp, 1];
const isExpressway = ["==", getExpressway, 1];
const isNotExpressway = ["!=", getExpressway, 1];
const expresswaySelector = ["match", getExpressway, 1];
const smallServiceSelector = [
  "match",
  ["get", "service"],
  ["parking_aisle", "driveway"],
];

function combineConstraints(constraint1, constraint2) {
  if (constraint1 == null) {
    if (constraint2 == null) {
      return null;
    }
    return constraint2;
  }
  if (constraint2 == null) {
    return constraint1;
  }
  return ["all", constraint1, constraint2];
}

const opacity = [
  "step",
  ["zoom"],
  [...linkSelector, 0, ["match", ["get", "network"], "us-interstate", 1, 0]],
  minZoomMotorwayTrunk,
  [...linkSelector, 0, [...classSelector, ["motorway", "trunk"], 1, 0]],
  minZoomPrimary,
  [...classSelector, ["motorway", "trunk", "primary"], 1, 0],
  minZoomSecondary,
  [...classSelector, ["motorway", "trunk", "primary", "secondary"], 1, 0],
  minZoomTertiary,
  [
    ...classSelector,
    ["motorway", "trunk", "primary", "secondary", "tertiary"],
    1,
    0,
  ],
  minZoomMinor,
  [...classSelector, "service", 0, 1],
  minZoomService,
  [...classSelector, "service", [...smallServiceSelector, 0, 1], 1],
  minZoomSmallService,
  1,
];

const layerSortKey = [
  "+",
  ["*", -28, getRamp],
  [
    "*",
    4,
    [
      ...classSelector,
      "motorway",
      6,
      "trunk",
      5,
      "primary",
      4,
      "secondary",
      3,
      "tertiary",
      2,
      "minor",
      1,
      0,
    ],
  ],
  ["*", 2, getExpressway],
  getToll,
];

//Helper function to create a "filter" block for a particular road class.
function filterRoad(brunnel, constraints) {
  var baseFilter = [
    "in",
    getClass,
    [
      "literal",
      [
        "motorway",
        "trunk",
        "primary",
        "secondary",
        "tertiary",
        "minor",
        "service",
      ],
    ],
  ];
  baseFilter = combineConstraints(baseFilter, constraints);
  if (brunnel == null) {
    return baseFilter;
  }
  let brunnelFilter =
    brunnel === "surface"
      ? ["!", ["in", getBrunnel, ["literal", ["bridge", "tunnel"]]]]
      : ["==", getBrunnel, brunnel];
  return combineConstraints(baseFilter, brunnelFilter);
}

//Base definition that applies to all roads (fill and casing).
var defRoad = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
};

//Generate a unique layer ID
function uniqueLayerID(part, brunnel, constraints) {
  var layerID = ["road", part].join("_");
  if (brunnel != null) {
    layerID += "_" + brunnel;
  }
  if (constraints != null) {
    layerID +=
      "_" + constraints.join("_").replaceAll("=", "").replaceAll("-", "_");
  }
  return layerID;
}

function baseRoadLayer(id, brunnel, minzoom, maxzoom, constraints) {
  var layer = Util.layerClone(defRoad, uniqueLayerID(id, brunnel, constraints));
  var roadFilter = filterRoad(brunnel, constraints);
  if (roadFilter != null) {
    layer.filter = roadFilter;
  }
  layer.minzoom = minzoom;
  if (maxzoom) {
    layer.maxzoom = maxzoom;
  }
  return layer;
}

const widthFactor = [
  ...classSelector,
  ["motorway", "trunk"],
  [...linkSelector, 0.5, 1],
  "primary",
  [...linkSelector, 0.45, 0.9],
  "secondary",
  [...linkSelector, 0.3, [...expresswaySelector, 0.7, 0.6]],
  "tertiary",
  [...linkSelector, 0.25, 0.5],
  "minor",
  0.3,
  "service",
  [...smallServiceSelector, 0.15, 0.2],
  0.2,
];

const roadFillWidth = [
  4,
  ["*", 0.5, widthFactor],
  9,
  widthFactor,
  12,
  [
    "*",
    [...classSelector, "motorway", 3.2, [...expresswaySelector, 3.5, 4]],
    widthFactor,
  ],
  20,
  ["*", [...expresswaySelector, 16, 18], widthFactor],
];

const roadCasingWidth = [
  4,
  ["*", [...classSelector, "motorway", 1.5, 0.5], widthFactor],
  9,
  [
    "*",
    [...classSelector, "motorway", 3, [...expresswaySelector, 3, 1.2]],
    widthFactor,
  ],
  12,
  [
    "*",
    [...classSelector, "motorway", 5, [...expresswaySelector, 7, 5]],
    widthFactor,
  ],
  20,
  ["*", [...expresswaySelector, 28, 22], widthFactor],
];

const roadCasingColorTunnel = [
  "match",
  getBrunnel,
  "tunnel",
  [
    ...classSelector,
    ["motorway", "trunk"],
    [
      ...tollSelector,
      [
        ...expresswaySelector,
        `hsl(${tollRoadHue}, 41%, 85%)`,
        `hsl(${tollRoadHue}, 41%, 80%)`,
      ],
      `hsl(${roadHue}, 41%, 80%)`,
    ],
    ["primary", "secondary", "tertiary"],
    "hsl(0, 0%, 80%)",
    "hsl(0, 0%, 90%)",
  ],
];

const roadCasingColorTrunkExpressway = [
  ...classSelector,
  "trunk",
  [
    ...tollSelector,
    `hsl(${tollRoadHue}, 77%, 50%)`,
    `hsl(${roadHue}, 77%, 50%)`,
  ],
];

const roadCasingColor = [
  "step",
  ["zoom"],
  [
    ...roadCasingColorTunnel,
    [...roadCasingColorTrunkExpressway, `hsl(0, 0%, 90%)`],
  ],
  15,
  [
    ...roadCasingColorTunnel,
    [...roadCasingColorTrunkExpressway, `hsl(0, 0%, 23%)`],
  ],
];

const roadFillColorTunnel = [
  "match",
  getBrunnel,
  "tunnel",
  [
    ...classSelector,
    "motorway",
    [
      ...tollSelector,
      `hsl(${tollRoadHue}, 71%, 90%)`,
      `hsl(${roadHue}, 71%, 90%)`,
    ],
    "trunk",
    [
      ...tollSelector,
      `hsl(${tollRoadHue}, 77%, 90%)`,
      `hsl(${roadHue}, 77%, 90%)`,
    ],
    [
      ...tollSelector,
      `hsl(${tollRoadHue}, 100%, 95%)`,
      `hsl(${roadHue}, 0%, 95%)`,
    ],
  ],
];

const highwayFillColor = [
  ...roadFillColorTunnel,
  [
    ...classSelector,
    "trunk",
    [
      ...expresswaySelector,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 95%, 95%)`,
        `hsl(${roadHue}, 95%, 95%)`,
      ],
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 77%, 50%)`,
        `hsl(${roadHue}, 77%, 50%)`,
      ],
    ],
    [
      ...tollSelector,
      `hsl(${tollRoadHue}, 100%, 75%)`,
      `hsl(${roadHue}, 100%, 100%)`,
    ],
  ],
];

const roadSurfaceColor = [
  ...classSelector,
  "motorway",
  [
    ...tollSelector,
    `hsl(${tollRoadHue}, 50%, 70%)`,
    `hsl(${roadHue}, 50%, 70%)`,
  ],
  "trunk",
  [
    ...tollSelector,
    `hsl(${tollRoadHue}, 95%, 80%)`,
    `hsl(${roadHue}, 95%, 80%)`,
  ],
  [
    ...tollSelector,
    `hsl(${tollRoadHue}, 100%, 40%)`,
    `hsl(${roadHue}, 0%, 80%)`,
  ],
];

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

//Base road class
class Road {
  constructor() {
    this.brunnel = "surface";
    this.minZoomFill = 4;
    this.minZoomCasing = 4;
    this.casingColor = roadCasingColor;
    this.fillColor = highwayFillColor;
  }
  fill = function () {
    var layer = baseRoadLayer(
      "fill",
      this.brunnel,
      this.minZoomFill,
      this.maxZoomFill,
      this.constraints
    );
    layer.layout = {
      "line-cap": "round",
      "line-join": "round",
      visibility: "visible",
      "line-sort-key": layerSortKey,
    };
    layer.paint = {
      "line-opacity": opacity,
      "line-color": this.fillColor,
      "line-width": [
        "interpolate",
        ["exponential", roadExp],
        ["zoom"],
        ...roadFillWidth,
      ],
      "line-blur": 0.5,
    };
    return layer;
  };
  casing = function () {
    var layer = baseRoadLayer(
      "casing",
      this.brunnel,
      this.minZoomCasing,
      this.maxZoomCasing,
      this.constraints
    );
    layer.layout = {
      "line-cap": this.brunnel === "bridge" ? "butt" : "round",
      "line-join": this.brunnel === "bridge" ? "bevel" : "round",
      visibility: "visible",
      "line-sort-key": layerSortKey,
    };
    layer.paint = {
      "line-opacity": opacity,
      "line-color": this.casingColor,
      "line-width": [
        "interpolate",
        ["exponential", roadExp],
        ["zoom"],
        ...roadCasingWidth,
      ],
    };
    if (this.brunnel === "tunnel") {
      layer.paint["line-dasharray"] = tunDashArray;
    } else {
      layer.paint["line-blur"] = 0.5;
    }
    return layer;
  };
  surface = function () {
    var layer = baseRoadLayer(
      "surface",
      this.brunnel,
      Math.min(this.minZoomCasing, this.minZoomFill),
      Math.max(this.maxZoomCasing, this.maxZoomFill),
      this.constraints
    );
    layer.filter = combineConstraints(layer.filter, [
      "==",
      ["get", "surface"],
      "unpaved",
    ]);
    layer.layout = {
      "line-cap": "butt",
      "line-join": "round",
      visibility: "visible",
      "line-sort-key": layerSortKey,
    };
    layer.paint = {
      "line-opacity": opacity,
      "line-dasharray": [4, 4],
      "line-color": roadSurfaceColor,
      "line-width": [
        "interpolate",
        ["exponential", roadExp],
        ["zoom"],
        ...roadFillWidth,
      ],
      "line-blur": 0.5,
    };
    return layer;
  };
}

class RoadSimpleCasing extends Road {
  constructor() {
    super();
    this.constraints = [
      "any",
      [
        "all",
        ["!", ["in", getClass, ["literal", ["motorway", "trunk"]]]],
        isNotExpressway,
        isNotLink,
      ],
      ["all", ["==", getClass, "trunk"], isExpressway],
    ];
  }
}

class RoadLinkSimpleCasing extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["!", ["in", getClass, ["literal", ["motorway", "trunk"]]]],
      isNotExpressway,
      isLink,
    ];
  }
}

class RoadSimpleFill extends Road {
  constructor() {
    super();
    this.constraints = [
      "any",
      ["all", ["==", getClass, "trunk"], isNotLink],
      [
        "all",
        ["in", getClass, ["literal", ["primary", "secondary", "tertiary"]]],
        isExpressway,
      ],
    ];
  }
}

class RoadLinkSimpleFill extends Road {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "trunk"], isLink];
  }
}

class RoadBridge extends Road {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RoadSimpleCasingBridge extends RoadSimpleCasing {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RoadLinkSimpleCasingBridge extends RoadLinkSimpleCasing {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RoadSimpleFillBridge extends RoadSimpleFill {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RoadLinkSimpleFillBridge extends RoadLinkSimpleFill {
  constructor() {
    super();
    this.brunnel = "bridge";
  }
}

class RoadTunnel extends Road {
  constructor() {
    super();
    this.brunnel = "tunnel";
  }
}

//Highway class styles
class Motorway extends Road {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "motorway"], isNotLink];

    this.minZoomFill = minZoomAllRoads;
    this.minZoomCasing = minZoomAllRoads;

    this.fillColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 70%, 76%)`,
        `hsl(${roadHue}, 70%, 76%)`,
      ],
      6,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 70%, 66%)`,
        `hsl(${roadHue}, 70%, 66%)`,
      ],
      minzoomBrunnel - 0.5,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 70%, 60%)`,
        `hsl(${roadHue}, 70%, 60%)`,
      ],
      14,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 71%, 45%)`,
        `hsl(${roadHue}, 71%, 35%)`,
      ],
    ];
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      4,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 10%, 85%)`,
        `hsl(${roadHue}, 10%, 85%)`,
      ],
      6,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 60%, 50%)`,
        `hsl(${roadHue}, 60%, 50%)`,
      ],
      minzoomBrunnel - 0.5,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 71%, 40%)`,
        `hsl(${roadHue}, 71%, 40%)`,
      ],
      14,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 51%, 9%)`,
        `hsl(${roadHue}, 51%, 9%)`,
      ],
    ];
  }
}

class Trunk extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "trunk"],
      isNotLink,
      isNotExpressway,
    ];

    this.minZoomFill = minZoomAllRoads;
    this.minZoomCasing = minZoomAllRoads;

    this.fillColor = highwayFillColor;
    this.casingColor = [
      "interpolate",
      ["exponential", roadExp],
      ["zoom"],
      5,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 77%, 50%)`,
        `hsl(${roadHue}, 77%, 50%)`,
      ],
      9,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 77%, 50%)`,
        `hsl(${roadHue}, 77%, 50%)`,
      ],
      15,
      [
        ...tollSelector,
        `hsl(${tollRoadHue}, 70%, 18%)`,
        `hsl(${roadHue}, 70%, 18%)`,
      ],
    ];
  }
}

class Primary extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "primary"],
      isNotLink,
      isNotExpressway,
      isNotToll,
    ];

    this.minZoomFill = minZoomPrimary;
    this.minZoomCasing = minZoomPrimary;

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class PrimaryToll extends Primary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "primary"],
      isNotLink,
      isNotExpressway,
      isToll,
    ];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class PrimaryExpressway extends Primary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "primary"],
      isNotLink,
      isExpressway,
    ];

    this.fillColor = highwayFillColor;
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );
  }
}

class Secondary extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "secondary"],
      isNotLink,
      isNotExpressway,
      isNotToll,
    ];

    this.minZoomFill = minZoomSecondary;
    this.minZoomCasing = minZoomSecondary;

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class SecondaryToll extends Secondary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "secondary"],
      isNotLink,
      isNotExpressway,
      isToll,
    ];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class SecondaryExpressway extends Secondary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "secondary"],
      isNotLink,
      isExpressway,
    ];

    this.fillColor = highwayFillColor;
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );
  }
}

class Tertiary extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "tertiary"],
      isNotLink,
      isNotExpressway,
      isNotToll,
    ];

    this.minZoomFill = minZoomTertiary;
    this.minZoomCasing = minZoomTertiary;

    this.fillColor = roadFillColor(
      roadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class TertiaryToll extends Tertiary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "tertiary"],
      isNotLink,
      isNotExpressway,
      isToll,
    ];

    this.fillColor = tollRoadFillColor(
      tollRoadHue,
      this.minZoomFill,
      this.minZoomFill + 2
    );
  }
}

class TertiaryExpressway extends Tertiary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "tertiary"],
      isNotLink,
      isExpressway,
    ];

    this.fillColor = highwayFillColor;
    this.casingColor = expresswayCasingColor(
      this.minZoomCasing,
      this.minZoomCasing + 2
    );
  }
}

class Minor extends Road {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["in", getClass, ["literal", ["minor", "service"]]],
      isNotToll,
    ];

    this.minZoomFill = minZoomMinor;
    this.minZoomCasing = minZoomMinor;

    this.fillColor = roadFillColor(roadHue, this.minZoomFill);
  }
}

class MinorToll extends Minor {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["in", getClass, ["literal", ["minor", "service"]]],
      isToll,
    ];

    this.fillColor = tollRoadFillColor(tollRoadHue, this.minZoomFill);
  }
}

class MotorwayLink extends Motorway {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "motorway"], isLink];
    this.minZoomFill = minZoomPrimary;
    this.minZoomCasing = minZoomPrimary;
  }
}

class TrunkLink extends Trunk {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "trunk"], isLink];
    this.minZoomFill = minZoomPrimary;
    this.minZoomCasing = minZoomPrimary;
  }
}

class PrimaryLink extends Primary {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "primary"], isLink, isNotToll];
  }
}

class PrimaryLinkToll extends PrimaryToll {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "primary"], isLink, isToll];
  }
}

class SecondaryLink extends Secondary {
  constructor() {
    super();
    this.constraints = [
      "all",
      ["==", getClass, "secondary"],
      isLink,
      isNotToll,
    ];
  }
}

class SecondaryLinkToll extends SecondaryToll {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "secondary"], isLink, isToll];
  }
}

class TertiaryLink extends Tertiary {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "tertiary"], isLink, isNotToll];
  }
}

class TertiaryLinkToll extends TertiaryToll {
  constructor() {
    super();
    this.constraints = ["all", ["==", getClass, "tertiary"], isLink, isToll];
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

export const road = new Road();
export const roadBridge = new RoadBridge();
export const roadTunnel = new RoadTunnel();

export const roadSimpleCasing = new RoadSimpleCasing();
export const roadLinkSimpleCasing = new RoadLinkSimpleCasing();
export const roadSimpleCasingBridge = new RoadSimpleCasingBridge();
export const roadLinkSimpleCasingBridge = new RoadLinkSimpleCasingBridge();

export const roadSimpleFill = new RoadSimpleFill();
export const roadLinkSimpleFill = new RoadLinkSimpleFill();
export const roadSimpleFillBridge = new RoadSimpleFillBridge();
export const roadLinkSimpleFillBridge = new RoadLinkSimpleFillBridge();

export const motorway = new Motorway();
export const trunk = new Trunk();
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

export const motorwayBridge = new MotorwayBridge();
export const trunkBridge = new TrunkBridge();
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
