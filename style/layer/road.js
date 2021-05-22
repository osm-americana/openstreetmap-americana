var layerMotorwayLink = {
  id: "road_motorway_link",
  type: "line",
  paint: {
    "line-color": colorMotorway,
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
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["==", "ramp", 1],
  ],
  minzoom: 12,
  layout: layoutRoad,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var layerMotorway = {
  id: "road_motorway",
  type: "line",
  paint: {
    "line-color": colorMotorway,
    "line-width": {
      base: 1.2,
      stops: [
        [4, 0],
        [7, 1],
        [20, 18],
      ],
    },
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "motorway"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: 5,
  metadata: {},
  "source-layer": "transportation",
};
