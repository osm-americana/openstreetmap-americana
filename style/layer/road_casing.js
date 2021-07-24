var layerMotorwayCasing = {
  id: "road_motorway_casing",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [4, `hsl(${hueMotorway}, 10%, 85%)`],
        [6, `hsl(${hueMotorway}, 71%, 40%)`],
      ],
    },
    "line-width": {
      base: 1.2,
      stops: [
        [4, 1.5],
        [7, 3],
        [20, 22],
      ],
    },
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
  minzoom: 4,
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
