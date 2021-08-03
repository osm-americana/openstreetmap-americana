var layerMotorwayLink = {
  id: "road_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": widthMotorwayLink,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
  ],
  minzoom: 12,
  layout: layoutRoad,
  minzoom: minzoomMotorwayLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorway = {
  id: "road_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": widthMotorway,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: minzoomMotorway,
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorwayLabel = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": "#333",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.5,
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "motorway"]],
  layout: {
    "text-font": ["Metropolis Light"],
    "text-size": 12,
    "text-field": "{name:latin} {name:nonlatin}",
    "text-anchor": "bottom",
    "text-offset": [0, 0.2],
    "symbol-placement": "line",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation_name",
};
var layerTunnelMotorwayLinkCasing = {
  id: "tunnel_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnelCasing,
    "line-width": widthMotorwayLinkCasing,
    "line-opacity": 1,
    "line-dasharray": tunnelDashArray,
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
  minzoom: minzoomMotorwayLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorwayCasing = {
  id: "tunnel_motorway_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnelCasing,
    "line-width": widthMotorwayCasing,
    "line-dasharray": tunnelDashArray,
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
  minzoom: minzoomMotorway,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorwayLink = {
  id: "tunnel_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
    "line-width": widthMotorwayLink,
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
  minzoom: minzoomMotorwayLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorway = {
  id: "tunnel_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
    "line-width": widthMotorway,
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
  minzoom: minzoomMotorway,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorwayLink = {
  id: "tunnel_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
    "line-width": widthMotorwayLink,
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
  minzoom: minzoomMotorwayLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelMotorway = {
  id: "tunnel_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorwayTunnel,
    "line-width": widthMotorway,
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
  minzoom: minzoomMotorway,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeMotorwayLink = {
  id: "bridge_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": widthMotorwayLink,
    "line-blur": 0.5,
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
  minzoom: minzoomMotorwayLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeMotorway = {
  id: "bridge_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": widthMotorway,
    "line-blur": 0.5,
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
  minzoom: minzoomMotorway,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
