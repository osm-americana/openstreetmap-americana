var layerTrunkLink = {
  id: "road_trunk_link",
  type: "line",
  paint: {
    "line-color": colorTrunk,
    "line-width": widthTrunkLink,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
  ],
  minzoom: 12,
  layout: layoutRoad,
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTrunk = {
  id: "road_trunk",
  type: "line",
  paint: {
    "line-color": colorTrunk,
    "line-width": widthTrunk,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "trunk"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: minzoomTrunk,
  metadata: {},
  "source-layer": "transportation",
};

var layerTrunkLabel = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": "#333",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.5,
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "trunk"]],
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
var layerTunnelTrunkLinkCasing = {
  id: "tunnel_trunk_link_casing",
  type: "line",
  paint: {
    "line-color": colorTrunkTunnelCasing,
    "line-width": widthTrunkLinkCasing,
    "line-opacity": 1,
    "line-dasharray": tunnelDashArray,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelTrunkCasing = {
  id: "tunnel_trunk_casing",
  type: "line",
  paint: {
    "line-color": colorTrunkTunnelCasing,
    "line-width": widthTrunkCasing,
    "line-dasharray": tunnelDashArray,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelTrunkLink = {
  id: "tunnel_trunk_link",
  type: "line",
  paint: {
    "line-color": colorTrunkTunnel,
    "line-width": widthTrunkLink,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerTunnelTrunk = {
  id: "tunnel_trunk",
  type: "line",
  paint: {
    "line-color": colorTrunkTunnel,
    "line-width": widthTrunk,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeTrunkLink = {
  id: "bridge_trunk_link",
  type: "line",
  paint: {
    "line-color": colorTrunk,
    "line-width": widthTrunkLink,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  layout: {
    "line-join": "round",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerBridgeTrunk = {
  id: "bridge_trunk",
  type: "line",
  paint: {
    "line-color": colorTrunk,
    "line-width": widthTrunk,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
