var layerHighwayShieldInterstate12 = {
  id: "highway-shield-us-interstate-12",
  type: "symbol",
  paint: {
    "text-color": "rgba(255, 255, 255, 1)",
  },
  filter: [
    "all",
    ["<=", "ref_length", 2],
    ["==", "$type", "LineString"],
    ["in", "network", "us-interstate"],
  ],
  layout: {
    "icon-size": 5.0,
    "text-font": ["Open Sans Bold"],
    "text-anchor": "center",
    "text-offset": [0, 0.08],
    "icon-image": "us_interstate",
    "icon-text-fit": "both",
    "icon-padding": 30,
    "icon-text-fit-padding": [3, 17.5, 0, 17.5],

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

var layerHighwayShieldInterstate3 = {
  id: "highway-shield-us-interstate-3",
  type: "symbol",
  paint: {
    "text-color": "rgba(255, 255, 255, 1)",
  },
  filter: [
    "all",
    ["==", "ref_length", 3],
    ["==", "$type", "LineString"],
    ["in", "network", "us-interstate"],
  ],
  layout: {
    "icon-size": 5.0,
    "text-font": ["Open Sans Bold"],
    "text-anchor": "center",
    "text-offset": [0, 0.08],
    "icon-image": "us_interstate",
    "icon-text-fit": "both",
    "icon-padding": 30,
    "icon-text-fit-padding": [3, 17.5, 0, 17.5],
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

var layerHighwayShieldInterstate4 = {
  id: "highway-shield-us-interstate-4",
  type: "symbol",
  paint: {
    "text-color": "rgba(255, 255, 255, 1)",
  },
  filter: [
    "all",
    ["==", "ref_length", 4],
    ["==", "$type", "LineString"],
    ["in", "network", "us-interstate"],
  ],
  layout: {
    "icon-size": 5.0,
    "text-font": ["Open Sans Semibold"],
    "text-size": 18,
    "text-anchor": "center",
    "text-offset": [0, 0.08],
    "icon-image": "us_interstate",
    "icon-text-fit": "both",
    "icon-padding": 30,
    "icon-text-fit-padding": [3, 17.5, 0, 17.5],
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
