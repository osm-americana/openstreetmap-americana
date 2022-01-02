var layerMotorwayExit = {
  id: "highway-exit",
  type: "symbol",
  paint: {
    "text-color": "rgba(30, 30, 30, 1)",
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 2,
    "text-halo-blur": 1.0,
  },
  filter: [
    "all",
    ["==", "class", "motorway"],
    ["==", "subclass", "junction"],
    ["<=", "ref_length", 6],
  ],
  layout: {
    "icon-size": 1.0,
    "text-font": ["Open Sans Bold"],
    "text-size": 10.5,
    "text-anchor": "bottom-left",
    "text-field": "Exit {ref}",
    "text-offset": [0.5, -0.2],
    "icon-image": "diamond",
    "symbol-spacing": {
      stops: [
        [7, 150],
        [13, 300],
        [16, 800],
      ],
    },
  },
  source: "openmaptiles_test",
  minzoom: 7,
  "source-layer": "transportation_name",
};

var layerTrunkExit = {
  id: "trunk-highway-exit",
  type: "symbol",
  filter: ["all", ["==", "class", "trunk"], ["==", "subclass", "junction"]],
  layout: {
    "icon-size": 0.5,
    "icon-image": "diamond",
    "symbol-spacing": {
      stops: [
        [7, 150],
        [13, 300],
        [16, 800],
      ],
    },
  },
  source: "openmaptiles_test",
  minzoom: 7,
  "source-layer": "transportation_name",
};
