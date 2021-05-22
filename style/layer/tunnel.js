var layerTunnelMotorwayLinkCasing = {
  id: "tunnel_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnelCasing,
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
    "line-dasharray": [0.5, 0.25],
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorwayCasing = {
  id: "tunnel_motorway_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnelCasing,
    "line-width": {
      base: 1.2,
      stops: [
        [5, 0.4],
        [6, 0.7],
        [7, 1.75],
        [20, 22],
      ],
    },
    "line-dasharray": [0.5, 0.25],
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorwayLink = {
  id: "tunnel_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
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
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorway = {
  id: "tunnel_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
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
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
