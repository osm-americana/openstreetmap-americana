var layerPlaceCity = {
  id: "place_city",
  type: "symbol",
  paint: {
    "text-color": "#444",
    "text-halo-color": "rgb(255,255,255)",
    "text-halo-width": 2,
    "text-halo-blur": 0.5,
  },
  filter: [
    "all",
    ["==", ["get", "class"], "city"],
    [
      "step",
      ["zoom"],
      ["<=", ["get", "rank"], 2],
      5,
      ["<=", ["get", "rank"], 4],
      6,
      [">=", ["get", "rank"], 1],
    ],
  ],
  layout: {
    "text-font": ["Metropolis Bold"],
    "text-size": {
      base: 1.2,
      stops: [
        [4, 11],
        [7, 14],
        [11, 24],
      ],
    },
    "icon-image": [
      "match",
      ["get", "capital"],
      2,
      "star_nation_capital",
      4,
      "star_state_capital",
      "dot_city",
    ],
    "icon-size": {
      base: 1.2,
      stops: [
        [4, 0.4],
        [7, 0.5],
        [11, 0.9],
      ],
    },
    "text-field": "{name}",
    "text-anchor": "bottom",
    "text-variable-anchor": [
      "bottom",
      "bottom-right",
      "bottom-left",
      "right",
      "left",
    ],
    "text-justify": "auto",
    "text-radial-offset": ["match", ["get", "capital"], 2, 0.7, 0.5],
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 0,
    "text-padding": 1,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  minzoom: 4,
  "source-layer": "place",
};
var layerPlaceState = {
  id: "place_state",
  type: "symbol",
  paint: {
    "text-color": "hsl(45, 6%, 10%)",
    "text-halo-color": "rgb(255,255,255)",
    "text-halo-width": 2,
    "text-halo-blur": 0.5,
  },
  filter: ["all", ["==", "class", "state"]],
  layout: {
    "text-font": ["Metropolis Regular"],
    "text-size": {
      base: 1.2,
      stops: [
        [3, 8],
        [6, 14],
      ],
    },
    "text-field": "{name}",
    "text-padding": 1,
    "text-transform": "uppercase",
    "text-letter-spacing": 0.04,
    "text-variable-anchor": ["center", "top", "bottom"],
    "text-radial-offset": [
      "interpolate",
      ["exponential", 1.6],
      ["zoom"],
      3,
      0.5,
      7,
      3,
    ],
    "text-max-width": 6,
  },
  source: "openmaptiles",
  maxzoom: 7,
  minzoom: 3,
  "source-layer": "place",
};
var layerPlaceCountryOther = {
  id: "country_other",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255,255,255,0.8)",
    "text-halo-width": 2.0,
  },
  filter: ["all", ["==", "class", "country"], ["!has", "iso_a2"]],
  layout: {
    "text-font": ["Metropolis Regular"],
    "text-size": {
      stops: [
        [3, 9],
        [7, 15],
      ],
    },
    "text-field": "{name}",
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
var layerPlaceCountry3 = {
  id: "country_3",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255,255,255,0.8)",
    "text-halo-width": 2.0,
  },
  filter: [
    "all",
    [">=", "rank", 3],
    ["==", "class", "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Metropolis Regular"],
    "text-size": {
      stops: [
        [3, 11],
        [7, 17],
      ],
    },
    "text-field": "{name}",
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
var layerPlaceCountry2 = {
  id: "country_2",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255,255,255,1)",
    "text-halo-width": 3.0,
  },
  filter: [
    "all",
    ["==", "rank", 2],
    ["==", "class", "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Metropolis Regular"],
    "text-size": {
      stops: [
        [2, 11],
        [5, 17],
      ],
    },
    "text-field": "{name}",
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
var layerPlaceCountry1 = {
  id: "country_1",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255,255,255,1)",
    "text-halo-width": 3.0,
  },
  filter: [
    "all",
    ["==", "rank", 1],
    ["==", "class", "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Metropolis Regular"],
    "text-size": {
      stops: [
        [1, 11],
        [4, 22],
        [6, 19],
      ],
    },
    "text-field": "{name}",
    "text-max-width": ["step", ["zoom"], 6.25, 3, 12],
    "text-transform": "none",
    "text-offset": [
      "step",
      ["zoom"],
      ["literal", [0, 0]],
      3,
      ["literal", [0, 0.5]],
    ],
  },
  source: "openmaptiles",
  "source-layer": "place",
};
var layerPlaceContinent = {
  id: "continent",
  type: "symbol",
  paint: {
    "text-color": "#633",
    "text-halo-color": "rgba(255,255,255,0.7)",
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "continent"]],
  layout: {
    "text-font": ["Metropolis Light"],
    "text-size": 13,
    "text-field": "{name}",
    "text-justify": "center",
    "text-transform": "uppercase",
  },
  source: "openmaptiles",
  maxzoom: 1,
  "source-layer": "place",
};
