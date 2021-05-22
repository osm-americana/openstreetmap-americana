var layerwaterwayTunnel = {
  id: "waterway_tunnel",
  type: "line",
  paint: {
    "line-color": "#a0c8f0",
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [2, 4],
  },
  filter: ["all", ["==", "brunnel", "tunnel"]],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  minzoom: 14,
  "source-layer": "waterway",
};

var layerWaterwayRiver = {
  id: "waterway_river",
  type: "line",
  paint: {
    "line-color": "#a0c8f0",
    "line-width": {
      base: 1.2,
      stops: [
        [11, 0.5],
        [20, 6],
      ],
    },
  },
  filter: [
    "all",
    ["==", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["!=", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};
var layerWaterwayRiverIntermittent = {
  id: "waterway_river_intermittent",
  type: "line",
  paint: {
    "line-color": "#a0c8f0",
    "line-width": {
      base: 1.2,
      stops: [
        [11, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [3, 2],
  },
  filter: [
    "all",
    ["==", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["==", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};
var layerWaterwayOther = {
  id: "waterway_other",
  type: "line",
  paint: {
    "line-color": "#a0c8f0",
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
  },
  filter: [
    "all",
    ["!=", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["!=", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};

var layerWaterwayOtherIntermittent = {
  id: "waterway_other_intermittent",
  type: "line",
  paint: {
    "line-color": "#a0c8f0",
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [4, 3],
  },
  filter: [
    "all",
    ["!=", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["==", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};

var layerWaterIntermittent = {
  id: "water_intermittent",
  type: "fill",
  paint: {
    "fill-color": "rgba(172, 218, 251, 1)",
    "fill-opacity": 0.85,
  },
  filter: ["all", ["==", "intermittent", 1]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "water",
};

var layerWater = {
  id: "water",
  type: "fill",
  paint: {
    "fill-color": "rgba(134, 204, 250, 1)",
  },
  filter: ["all", ["!=", "intermittent", 1], ["!=", "brunnel", "tunnel"]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "water",
};
