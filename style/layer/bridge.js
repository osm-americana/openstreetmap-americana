var layerBridgeMotorwayLinkCasing = {
  id: "bridge_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayCasingLowZoom.concat(
      minzoomBrunnel + 3,
      `hsl(${hueMotorway}, 71%, 10%)`
    ),
    "line-width": widthMotorwayLinkCasing,
    "line-blur": 0.5,
  },

  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  minzoom: minzoomMotorwayLink,
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
    "line-color": colorMotorwayBridgeCasing,
    "line-width": widthMotorwayCasing,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  minzoom: minzoomMotorway,
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
