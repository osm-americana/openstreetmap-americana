"use strict";

export const road = {
  id: "road_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
    ["!=", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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

export const tunnel = {
  id: "tunnel_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["==", ["get", "brunnel"], "tunnel"],
    ["!=", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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

export const bridge = {
  id: "bridge_oneway",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["==", ["get", "brunnel"], "bridge"],
    ["!=", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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

export const link = {
  id: "road_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["!", ["in", ["get", "brunnel"], ["literal", ["bridge", "tunnel"]]]],
    ["==", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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

export const tunnelLink = {
  id: "tunnel_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["==", ["get", "brunnel"], "tunnel"],
    ["==", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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

export const bridgeLink = {
  id: "bridge_oneway_link",
  type: "symbol",
  paint: {
    "icon-opacity": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "oneway"], 1],
    ["==", ["get", "brunnel"], "bridge"],
    ["==", ["get", "ramp"], 1],
    [
      "in",
      ["get", "class"],
      [
        "literal",
        [
          "motorway",
          //      "trunk",
          //      "primary",
          //      "secondary",
          //      "tertiary",
          //      "minor",
          //      "service",
        ],
      ],
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
