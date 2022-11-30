import * as Label from "../constants/label.js";

const cityLabelPaint = {
  "text-color": "#444",
  "text-halo-color": "rgb(255,255,255)",
  "text-halo-width": 2,
  "text-halo-blur": 0.5,
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
    "text-font": ["OpenHistorical Bold"],
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
    "text-font": ["OpenHistorical Bold"],
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
    "text-font": ["OpenHistorical Bold"],
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
    "text-field": [
      "let",
      "localizedName",
      "",
      "localizedCollator",
      ["collator", {}],
      "diacriticInsensitiveCollator",
      ["collator", {}],
      [
        "case",
        [
          "==",
          ["var", "localizedName"],
          ["get", "name"],
          ["var", "localizedCollator"],
        ],
        ["var", "localizedName"],
        // If the name in the preferred language is the same as the name in the local language except for the omission of diacritics and/or the addition of a suffix (e.g., "City" in English), replace the common prefix with the local name.
        [
          "all",
          [
            "==",
            ["slice", ["var", "localizedName"], 0, ["length", ["get", "name"]]],
            ["get", "name"],
            ["var", "diacriticInsensitiveCollator"],
          ],
          [
            "in",
            [
              "slice",
              // "Montreal" vs. "Montréal"
              ["concat", ["var", "localizedName"], " "],
              ["length", ["get", "name"]],
              ["+", ["length", ["get", "name"]], 1],
            ],
            // "Quebec City" vs. "Québec", "Washington, D.C." vs. "Washington"
            " ,",
          ],
        ],
        [
          "concat",
          ["get", "name"],
          ["slice", ["var", "localizedName"], ["length", ["get", "name"]]],
        ],
        // If the name in the preferred language is the same as the name in the local language except for the omission of diacritics and/or the addition of a prefix (e.g., "City of" in English or "Ciudad de" in Spanish), replace the common suffix with the local name.
        [
          "all",
          [
            "==",
            [
              "slice",
              ["var", "localizedName"],
              [
                "-",
                ["length", ["var", "localizedName"]],
                ["length", ["get", "name"]],
              ],
            ],
            ["get", "name"],
            ["var", "diacriticInsensitiveCollator"],
          ],
          [
            "==",
            [
              "slice",
              ["var", "localizedName"],
              [
                "-",
                [
                  "-",
                  ["length", ["var", "localizedName"]],
                  ["length", ["get", "name"]],
                ],
                1,
              ],
              [
                "-",
                ["length", ["var", "localizedName"]],
                ["length", ["get", "name"]],
              ],
            ],
            " ",
          ],
        ],
        [
          "concat",
          [
            "slice",
            ["var", "localizedName"],
            0,
            [
              "-",
              ["length", ["var", "localizedName"]],
              ["length", ["get", "name"]],
            ],
          ],
          ["get", "name"],
        ],
        // Gloss the name in the local language if it differs from the localized name.
        [
          "format",
          ["var", "localizedName"],
          "\n",
          "(\u200B",
          { "font-scale": 0.8 },
          // GL JS lacks support for bidirectional isolating characters, so use a character from the localized name to insulate the parentheses from the embedded text's writing direction. Make it so small that GL JS doesn't bother rendering it.
          ["concat", ["slice", ["var", "localizedName"], 0, 1], " "],
          { "font-scale": 0.001 },
          ["get", "name"],
          { "font-scale": 0.8 },
          ["concat", " ", ["slice", ["var", "localizedName"], 0, 1]],
          { "font-scale": 0.001 },
          // A ZWSP prevents GL JS from combining this component with the preceding one, which would cause it to vanish along with the faux isolating character.
          "\u200B)",
          { "font-scale": 0.8 },
        ],
      ],
    ],
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
    "text-halo-color": "rgb(255,255,255)",
    "text-halo-width": 2,
    "text-halo-blur": 0.5,
  },
  filter: ["==", ["get", "class"], "state"],
  layout: {
    "text-font": ["OpenHistorical"],
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
  id: "country_other",
  type: "symbol",
  paint: {
    "text-color": "#334",
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255,255,255,0.8)",
    "text-halo-width": 2.0,
  },
  filter: [
    "all",
    ["==", ["get", "class"], "country"],
    ["!", ["has", "iso_a2"]],
  ],
  layout: {
    "text-font": ["OpenHistorical"],
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
    [">=", ["get", "rank"], 3],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["OpenHistorical"],
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
    ["==", ["get", "rank"], 2],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["OpenHistorical"],
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
    ["==", ["get", "rank"], 1],
    ["==", ["get", "class"], "country"],
    ["has", "iso_a2"],
  ],
  layout: {
    "text-font": ["OpenHistorical"],
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
  id: "continent",
  type: "symbol",
  paint: {
    "text-color": "#633",
    "text-halo-color": "rgba(255,255,255,0.7)",
    "text-halo-width": 1,
  },
  filter: ["==", ["get", "class"], "continent"],
  layout: {
    "text-font": ["OpenHistorical"],
    "text-size": 13,
    "text-field": Label.localizedName,
    "text-justify": "center",
    "text-transform": "uppercase",
  },
  source: "openmaptiles",
  maxzoom: 1,
  "source-layer": "place",
};
