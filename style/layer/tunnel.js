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
