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
    "line-color": {
      base: 1.2,
      stops: [
        [4, `hsl(${hueMotorway}, 70%, 76%)`],
        [6, `hsl(${hueMotorway}, 70%, 60%)`],
      ],
    },
    "line-width": {
      base: 1.2,
      stops: [
        [4, 0.5],
        [7, 1.5],
        [20, 18],
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
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: 4,
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
