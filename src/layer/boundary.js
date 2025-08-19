"use strict";

import * as Color from "../constants/color.js";
import * as Label from "../constants/label.js";

export const boundaryCasing = {
  id: "boundary_casing",
  type: "line",
  paint: {
    "line-color": [
      "match",
      ["get", "admin_level"],
      2,
      `hsl(${Color.hueBorderCasing}, 35%, 86%)`,
      [3, 4],
      `hsl(${Color.hueBorderCasing}, 30%, 90%)`,
      5,
      Color.borderCasing,
      6,
      Color.borderCasing,
      Color.borderCasing,
    ],
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      2,
      ["match", ["get", "admin_level"], 2, 4, [3, 4], 4, 5, 5, 6, 5, 1],
      12,
      ["match", ["get", "admin_level"], 2, 25, [3, 4], 20, 5, 6, 6, 6, 1],
      16,
      ["match", ["get", "admin_level"], 2, 50, [3, 4], 30, 1],
    ],
  },
  filter: [
    "all",
    ["in", ["get", "admin_level"], ["literal", [2, 3, 4, 5, 6]]],
    ["==", ["get", "disputed"], 0],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 2,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const city = {
  id: "boundary_city",
  type: "line",
  paint: {
    "line-color": Color.border,
    "line-dasharray": [2, 4],
    "line-width": 1,
    "line-offset": 0,
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 8],
    ["==", ["get", "disputed"], 0],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 11,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const county = {
  id: "boundary_county",
  type: "line",
  paint: {
    "line-color": Color.border,
    "line-dasharray": [3, 3],
    "line-width": 1,
    "line-offset": 0,
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 6],
    ["==", ["get", "disputed"], 0],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 9,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const region = {
  id: "boundary_region",
  type: "line",
  paint: {
    "line-color": Color.border,
    "line-dasharray": [5, 4],
    "line-width": 1,
    "line-offset": 0,
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 5],
    ["==", ["get", "disputed"], 0],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 6,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const state = {
  id: "boundary_state",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorder}, 2%, 60%)`],
        [7, `hsl(${Color.hueBorder}, 2%, 48%)`],
      ],
    },
    "line-dasharray": {
      stops: [
        [3, [4, 4, 4, 4, 12, 4]],
        [6, [3.5, 3, 3.5, 3, 20, 3]],
        [8, [2.5, 2.5, 2.5, 2.5, 20, 2.5]],
        [10, [2, 2.5, 2, 2.5, 12, 2.5]],
      ],
    },
    "line-width": {
      stops: [
        [3, 0.5],
        [10, 1.5],
      ],
    },
    "line-offset": 0,
  },
  filter: [
    "all",
    ["in", ["get", "admin_level"], ["literal", [3, 4]]],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 3,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const country = {
  id: "boundary_country",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorder}, 2%, 47%)`],
        [7, `hsl(${Color.hueBorder}, 2%, 37%)`],
      ],
    },
    "line-opacity": {
      base: 1,
      stops: [
        [0, 0.4],
        [4, 1],
        [5, 0.8],
      ],
    },
    "line-width": {
      stops: [
        [2, 1],
        [4, 1.5],
        [10, 2.25],
      ],
    },
    "line-dasharray": {
      stops: [[3, [10, 1, 3, 1]]],
    },
    "line-blur": 0,
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 2],
    ["==", ["get", "disputed"], 0],
    ["==", ["get", "maritime"], 0],
  ],
  maxzoom: 24,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

/**
 * Returns an expression that converts the given country code to a
 * human-readable name in the user's preferred language.
 *
 * @param code An expression that evaluates to an ISO 3166-1 alpha-3 country
 *  code.
 */
function getCountryName(code) {
  return [
    "let",
    "code",
    code,
    "countryNamesByCode",
    ["literal", Label.countryNamesByCode],
    [
      "coalesce",
      ["get", ["var", "code"], ["var", "countryNamesByCode"]],
      // Fall back to the country code in parentheses.
      ["concat", "(", ["var", "code"], ")"],
    ],
  ];
}

export const countryLabelLeft = {
  id: "boundary_country_label_left",
  type: "symbol",
  paint: {
    "text-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorder}, 2%, 24%)`],
        [7, `hsl(${Color.hueBorder}, 2%, 18%)`],
      ],
    },
  },
  layout: {
    "symbol-placement": "line",
    "text-font": ["Americana-Bold"],
    "text-size": {
      stops: [
        [3, 6],
        [7, 10],
      ],
    },
    "text-field": getCountryName(["get", "adm0_l"]),
    "text-offset": [0, -1],
    "text-max-angle": 30,
    "text-letter-spacing": 0.1,
    "text-ignore-placement": true,
  },
  filter: ["==", ["get", "maritime"], 0],
  maxzoom: 24,
  source: "openmaptiles",
  "source-layer": "boundary",
};

export const countryLabelRight = {
  ...countryLabelLeft,
  id: "boundary_country_label_right",
  layout: {
    ...countryLabelLeft.layout,
    "text-field": getCountryName(["get", "adm0_r"]),
    "text-offset": [0, 1],
  },
};

export const legendEntries = [
  {
    description: "Country or dependency",
    layers: [boundaryCasing.id],
    filter: ["==", ["get", "admin_level"], 2],
  },
  {
    description: "State or province",
    layers: [boundaryCasing.id],
    filter: ["==", ["get", "admin_level"], 4],
  },
  {
    description: "Region",
    layers: [boundaryCasing.id],
    filter: ["==", ["get", "admin_level"], 5],
  },
  {
    description: "County or county-equivalent",
    layers: [boundaryCasing.id],
    filter: ["==", ["get", "admin_level"], 6],
  },
  {
    description: "City, town, or village",
    layers: [boundaryCasing.id],
    filter: ["in", ["get", "admin_level"], ["literal", [7, 8, 9]]],
  },
  {
    description: "Disputed border",
    layers: [boundaryCasing.id],
    filter: ["==", ["get", "disputed"], 1],
  },
];
