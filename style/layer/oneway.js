var layerRoadOneway = {
  id: "road_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["!in", "brunnel", "bridge", "tunnel"],
    ["!=", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.5],
        [19, 1],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 15,
  "source-layer": "transportation",
};

var layerTunOneway = {
  id: "tunnel_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.5],
        [19, 1],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    //"icon-rotate": 90,
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 15,
  "source-layer": "transportation",
};

var layerBrgOneway = {
  id: "bridge_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.5],
        [19, 1],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 15,
  "source-layer": "transportation",
};

var layerRoadOnewayLink = {
  id: "road_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.3],
        [19, 0.8],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 16,
  "source-layer": "transportation",
};

var layerTunOnewayLink = {
  id: "tunnel_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["==", "brunnel", "tunnel"],
    ["==", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.3],
        [19, 0.8],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    //"icon-rotate": 90,
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 16,
  "source-layer": "transportation",
};

var layerBrgOnewayLink = {
  id: "bridge_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", "oneway", 1],
    ["==", "brunnel", "bridge"],
    ["==", "ramp", 1],
    [
      "in",
      "class",
      "motorway",
      //      "trunk",
      //      "primary",
      //      "secondary",
      //      "tertiary",
      //      "minor",
      //      "service",
    ],
  ],
  layout: {
    "icon-size": {
      stops: [
        [15, 0.3],
        [19, 0.8],
      ],
    },
    "icon-image": "oneway",
    visibility: "visible",
    "icon-padding": 2,
    "symbol-spacing": 75,
    "symbol-placement": "line",
    "icon-rotation-alignment": "map",
  },
  source: "openmaptiles",
  minzoom: 16,
  "source-layer": "transportation",
};
