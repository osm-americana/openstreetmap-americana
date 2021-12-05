"use strict";

import * as Color from "/constants/color.js";

export const waterwayTunnel = {
  id: "waterway_tunnel",
  type: "line",
  paint: {
    "line-color": Color.waterLine,
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [2, 4],
  },
  filter: ["all", ["==", "brunnel", "tunnel"]],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  minzoom: 14,
  "source-layer": "waterway",
};

export const waterwayRiver = {
  id: "waterway_river",
  type: "line",
  paint: {
    "line-color": Color.waterLine,
    "line-width": {
      base: 1.2,
      stops: [
        [11, 0.5],
        [20, 6],
      ],
    },
  },
  filter: [
    "all",
    ["==", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["!=", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};
export const waterwayRiverIntermittent = {
  id: "waterway_river_intermittent",
  type: "line",
  paint: {
    "line-color": Color.waterLine,
    "line-width": {
      base: 1.2,
      stops: [
        [11, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [3, 2],
  },
  filter: [
    "all",
    ["==", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["==", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};
export const waterwayOther = {
  id: "waterway_other",
  type: "line",
  paint: {
    "line-color": Color.waterLine,
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
  },
  filter: [
    "all",
    ["!=", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["!=", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};

export const waterwayOtherIntermittent = {
  id: "waterway_other_intermittent",
  type: "line",
  paint: {
    "line-color": Color.waterLine,
    "line-width": {
      base: 1.3,
      stops: [
        [13, 0.5],
        [20, 6],
      ],
    },
    "line-dasharray": [4, 3],
  },
  filter: [
    "all",
    ["!=", "class", "river"],
    ["!=", "brunnel", "tunnel"],
    ["==", "intermittent", 1],
  ],
  layout: {
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "waterway",
};

export const waterIntermittent = {
  id: "water_intermittent",
  type: "fill",
  paint: {
    "fill-color": Color.waterIntermittent,
    "fill-opacity": 0.85,
  },
  filter: ["all", ["==", "intermittent", 1]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "water",
};

export const water = {
  id: "water",
  type: "fill",
  paint: {
    "fill-color": Color.waterFill,
  },
  filter: ["all", ["!=", "intermittent", 1], ["!=", "brunnel", "tunnel"]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "water",
};
