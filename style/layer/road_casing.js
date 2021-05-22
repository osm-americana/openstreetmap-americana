var layerMotorwayCasing = {
  id: "road_motorway_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayCasing,
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
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoadCasing,
  source: "openmaptiles",
  minzoom: 6,
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorwayLinkCasing = {
  id: "road_motorway_link_casing",
  type: "line",
  paint: {
    "line-color": colorMotorwayCasing,
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
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
  ],
  layout: layoutRoadCasing,
  source: "openmaptiles",
  minzoom: 12,
  metadata: {},
  "source-layer": "transportation",
};
