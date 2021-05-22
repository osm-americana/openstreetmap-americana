var layerBridgeMotorwayLinkCasing = {
  id: "bridge_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": "hsla(354, 71%, 10%, 1)",
    "line-width": {
      base: 1.2,
      stops: [
        [12, 1],
        [13, 3],
        [14, 4],
        [20, 15],
      ],
    },
    "line-opacity": 1,
  },

  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  minzoom: 12,
  layout: {
    "line-join": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeMotorwayCasing = {
  id: "bridge_motorway_casing",
  type: "line",
  paint: {
    "line-color": "hsla(354, 71%, 10%, 1)",
    "line-width": {
      base: 1.2,
      stops: [
        [5, 0.4],
        [6, 1.2],
        [7, 1.75],
        [20, 22],
      ],
    },
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  minzoom: 5,
  layout: {
    "line-join": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeMotorwayLink = {
  id: "bridge_motorway_link",
  type: "line",
  paint: {
    "line-color": "hsla(354, 71%, 40%, 1)",
    "line-width": {
      base: 1.2,
      stops: [
        [12.5, 0],
        [13, 1.5],
        [14, 2.5],
        [20, 11.5],
      ],
    },
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  layout: {
    "line-join": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeMotorway = {
  id: "bridge_motorway",
  type: "line",
  paint: {
    "line-color": "hsla(354, 71%, 40%, 1)",
    "line-width": {
      base: 1.2,
      stops: [
        [5, 0],
        [7, 1],
        [20, 18],
      ],
    },
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
