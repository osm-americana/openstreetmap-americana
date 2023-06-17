import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const labelHaloColor = [
  "interpolate",
  ["linear"],
  ["zoom"],
  4,
  Color.backgroundFillTranslucent,
  5,
  Color.backgroundFill,
];

const labelHaloBlur = ["interpolate", ["linear"], ["zoom"], 4, 0.5, 5, 0];

const cityLabelPaint = {
  "text-color": "#444",
  "text-halo-color": labelHaloColor,
  "text-halo-width": 2,
  "text-halo-blur": labelHaloBlur,
};

const cityIcon = [
  "match",
  ["get", "capital"],
  2,
  "star_nation_capital",
  3,
  "star_state_capital",
  4,
  "star_state_capital",
  "dot_city",
];

export const village = {
  id: "place_village",
  type: "symbol",
  paint: cityLabelPaint,
  filter: [
    "all",
    ["==", ["get", "class"], "village"],
    [
      "step",
      ["zoom"],
      ["<=", ["get", "rank"], 2],
      6,
      ["<=", ["get", "rank"], 4],
      7,
      ["<=", ["get", "rank"], 5],
      8,
      ["<=", ["get", "rank"], 9],
      10,
      [">=", ["get", "rank"], 1],
    ],
  ],
  layout: {
    "text-font": ["Americana-Bold"],
    "text-size": {
      base: 1.0,
      stops: [
        [5, 8],
        [8, 10],
        [12, 12],
      ],
    },
    "icon-image": cityIcon,
    "icon-size": {
      base: 1.0,
      stops: [
        [4, 0.12],
        [7, 0.25],
        [11, 0.5],
      ],
    },
    "text-field": Label.localizedName,
    "text-anchor": "bottom",
    "text-variable-anchor": [
      "bottom",
      "bottom-right",
      "bottom-left",
      "right",
      "left",
    ],
    "text-justify": "auto",
    "text-radial-offset": 0.5,
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 0,
    "text-padding": 1,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  minzoom: 11,
  maxzoom: 14,
  "source-layer": "place",
};

export const town = {
  id: "place_town",
  type: "symbol",
  paint: cityLabelPaint,
  filter: [
    "all",
    ["==", ["get", "class"], "town"],
    [
      "step",
      ["zoom"],
      ["<=", ["get", "rank"], 2],
      6,
      ["<=", ["get", "rank"], 4],
      7,
      ["<=", ["get", "rank"], 5],
      8,
      ["<=", ["get", "rank"], 9],
      10,
      [">=", ["get", "rank"], 1],
    ],
  ],
  layout: {
    "text-font": ["Americana-Bold"],
    "text-size": {
      base: 1.2,
      stops: [
        [5, 8],
        [8, 10],
        [12, 18],
      ],
    },
    "icon-image": cityIcon,
    "icon-size": {
      base: 1.2,
      stops: [
        [4, 0.25],
        [7, 0.35],
        [11, 0.7],
      ],
    },
    "text-field": Label.localizedNameWithLocalGloss,
    "text-anchor": "bottom",
    "text-variable-anchor": [
      "bottom",
      "bottom-right",
      "bottom-left",
      "right",
      "left",
    ],
    "text-justify": "auto",
    "text-radial-offset": 0.5,
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 0,
    "text-padding": 1,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  minzoom: 4,
  maxzoom: 13,
  "source-layer": "place",
};

export const city = {
  id: "place_city",
  type: "symbol",
  paint: cityLabelPaint,
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
    "text-font": ["Americana-Bold"],
    "text-size": {
      base: 1.2,
      stops: [
        [4, 11],
        [7, 14],
        [11, 24],
      ],
    },
    "icon-image": cityIcon,
    "icon-size": {
      base: 1.2,
      stops: [
        [4, 0.4],
        [7, 0.5],
        [11, 0.9],
      ],
    },
    "text-field": Label.localizedNameWithLocalGloss,
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
  maxzoom: 12,
  "source-layer": "place",
  metadata: {},
};

export const state = {
  id: "place_state",
  type: "symbol",
  paint: {
    "text-color": "hsl(45, 6%, 10%)",
    "text-halo-color": labelHaloColor,
    "text-halo-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      3,
      1.5,
      6,
      2.5,
    ],
    "text-halo-blur": labelHaloBlur,
  },
  filter: ["==", ["get", "class"], "state"],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": {
      base: 1.2,
      stops: [
        [3, 8],
        [6, 14],
      ],
    },
    "text-field": Label.localizedName,
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
export const countryOther = {
  id: "place_country-other",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 0.5,
    "text-halo-color": labelHaloColor,
    "text-halo-width": ["interpolate", ["linear"], ["zoom"], 3, 1.5, 7, 2.5],
  },
  filter: [
    "all",
    ["==", ["get", "class"], "country"],
    ["!", ["has", "iso_a2"]],
  ],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": {
      stops: [
        [3, 9],
        [7, 15],
      ],
    },
    "text-field": Label.localizedName,
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
export const country3 = {
  id: "place_country-3",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": labelHaloBlur,
    "text-halo-color": labelHaloColor,
    "text-halo-width": ["interpolate", ["linear"], ["zoom"], 3, 1.5, 7, 2.5],
  },
  filter: [
    "all",
    [">=", ["get", "rank"], 3],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": {
      stops: [
        [3, 11],
        [7, 17],
      ],
    },
    "text-field": Label.localizedName,
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
export const country2 = {
  id: "place_country-2",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": labelHaloBlur,
    "text-halo-color": labelHaloColor,
    "text-halo-width": ["interpolate", ["linear"], ["zoom"], 1, 1, 5, 2.4],
  },
  filter: [
    "all",
    ["==", ["get", "rank"], 2],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": {
      stops: [
        [2, 11],
        [5, 17],
      ],
    },
    "text-field": Label.localizedName,
    "text-max-width": 6.25,
    "text-transform": "none",
  },
  source: "openmaptiles",
  "source-layer": "place",
};
export const country1 = {
  id: "place_country-1",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": labelHaloBlur,
    "text-halo-color": labelHaloColor,
    "text-halo-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      1,
      1,
      4,
      2.5,
      6,
      3,
    ],
  },
  filter: [
    "all",
    ["==", ["get", "rank"], 1],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": {
      stops: [
        [1, 11],
        [4, 22],
        [6, 19],
      ],
    },
    "text-field": Label.localizedName,
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
export const continent = {
  id: "place_continent",
  type: "symbol",
  paint: {
    "text-color": "#633",
    "text-halo-color": labelHaloColor,
    "text-halo-blur": labelHaloBlur,
    "text-halo-width": 1,
  },
  filter: ["==", ["get", "class"], "continent"],
  layout: {
    "text-font": ["Americana-Regular"],
    "text-size": 13,
    "text-field": Label.localizedName,
    "text-justify": "center",
    "text-transform": "uppercase",
  },
  source: "openmaptiles",
  maxzoom: 1,
  "source-layer": "place",
};

const populatedPlaceLayers = [village.id, town.id, city.id];
const nonCapitalFilter = ["!", ["has", "capital"]];

export const legendEntries = [
  {
    description: "Continent",
    layers: [continent.id],
  },
  {
    description: "Country or dependency",
    layers: [countryOther.id, country3.id, country2.id, country1.id],
  },
  {
    description: "State or province",
    layers: [state.id],
  },
  {
    description: "Large city",
    layers: [city.id],
    filter: nonCapitalFilter,
  },
  { description: "Town", layers: [town.id], filter: nonCapitalFilter },
  {
    description: "Small village",
    layers: [village.id],
    filter: nonCapitalFilter,
  },
  {
    description: "National capital",
    layers: populatedPlaceLayers,
    filter: ["==", ["get", "capital"], 2],
  },
  {
    description: "Regional capital",
    layers: populatedPlaceLayers,
    filter: ["==", ["get", "capital"], 3],
  },
  {
    description: "State or provincial capital",
    layers: populatedPlaceLayers,
    filter: ["==", ["get", "capital"], 4],
  },
];
