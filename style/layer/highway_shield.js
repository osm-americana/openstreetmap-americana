var layerHighwayShieldInterstate = {
  id: "highway-shield-us-interstate",
  type: "symbol",
  paint: {
    "text-color": "rgba(255, 255, 255, 1)",
  },
  filter: [
    "all",
    ["<=", "ref_length", 6],
    ["==", "$type", "LineString"],
    ["in", "network", "us-interstate"],
  ],
  layout: {
    "icon-size": {
      stops: [
        [7, 0.5],
        [10, 0.6],
        [13, 0.7],
        [16, 0.8],
      ],
    },
    "text-font": ["Metropolis Bold"],
    "text-size": {
      stops: [
        [7, 10],
        [10, 12],
        [13, 14],
        [16, 16],
      ],
    },
    "text-anchor": "center",
    "text-offset": [0, 0.2],
    "icon-image": "{network}_{ref_length}",
    "text-field": "{ref}",
    "symbol-spacing": {
      stops: [
        [7, 150],
        [13, 300],
        [16, 800],
      ],
    },

    "symbol-placement": {
      base: 1,
      stops: [
        [7, "point"],
        [7, "line"],
        [8, "line"],
      ],
    },
    "symbol-avoid-edges": true,
    "icon-rotation-alignment": "viewport",
    "text-rotation-alignment": "viewport",
  },
  source: "openmaptiles",
  minzoom: 7,
  "source-layer": "transportation_name",
};
