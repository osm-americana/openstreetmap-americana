"use strict";

import * as Color from "../constants/color.js";

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

export const countyCasing = {
  id: "boundary_county_casing",
  type: "line",
  paint: {
    "line-color": Color.borderCasing,
    "line-dasharray": [1],
    "line-width": {
      stops: [
        [11, 5],
        [12, 6],
      ],
    },
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 6],
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

export const stateCasing = {
  id: "boundary_state_casing",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorderCasing - 30}, 25%, 94%)`],
        [7, `hsl(${Color.hueBorderCasing}, 30%, 90%)`],
      ],
    },
    "line-dasharray": [1],
    "line-width": {
      base: 1.2,
      stops: [
        [3, 4],
        [12, 20],
        [16, 30],
      ],
    },
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

export const countryCasing = {
  id: "boundary_country_casing",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorderCasing - 30}, 35%, 86%)`],
        [7, `hsl(${Color.hueBorderCasing}, 35%, 86%)`],
      ],
    },
    "line-opacity": {
      base: 1,
      stops: [
        [0, 0.4],
        [4, 1],
      ],
    },
    "line-width": {
      base: 1.2,
      stops: [
        [2, 4],
        [12, 25],
        [16, 50],
      ],
    },
  },
  filter: [
    "all",
    ["==", ["get", "admin_level"], 2],
    ["==", ["get", "maritime"], 0],
  ],
  minzoom: 2,
  layout: {
    "line-cap": "round",
    "line-join": "round",
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
