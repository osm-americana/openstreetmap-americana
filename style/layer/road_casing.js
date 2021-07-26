var layerMotorwayCasing = {
  id: "road_motorway_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayCasing,
    "line-width": widthMotorwayCasing,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoadCasing,
  source: "openmaptiles",
  minzoom: minzoomMotorway,
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorwayLinkCasing = {
  id: "road_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayCasing,
    "line-width": widthMotorwayLinkCasing,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
  ],
  layout: layoutRoadCasing,
  source: "openmaptiles",
  minzoom: minzoomMotorwayLink,
  metadata: {},
  "source-layer": "transportation",
};
