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
    "icon-size": 2.0,
    "text-font": ["Open Sans Bold"],
    "text-size": 10.5,
    "text-anchor": "center",
    "text-field": "{ref}",
    "text-offset": [0, 0],
    "icon-image": "us_interstate",
    "icon-text-fit": "both",
    "icon-padding": 0,
    "icon-text-fit-padding": [2.5, 0.6, 0, 0.5],
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
