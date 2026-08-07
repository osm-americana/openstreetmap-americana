"use strict";

import { localizedNameWithLocalGloss } from "@americana/diplomat";
import * as Color from "../constants/color.js";

export const casing = {
  id: "timezone_casing",
  type: "line",
  filter: ["==", ["get", "type"], "timezone"],
  minzoom: 9,
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${Color.hueBorderCasing - 30}, 0%, 94%)`],
        [7, `hsl(${Color.hueBorderCasing}, 0%, 90%)`],
      ],
    },
    "line-width": {
      base: 1.2,
      stops: [
        [3, 4],
        [12, 20],
        [16, 30],
      ],
    },
  },
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "ohm_other_boundaries",
  "source-layer": "non_admin_boundaries_areas",
};

export const label = {
  id: "timezone_edge_label",
  type: "symbol",
  filter: ["==", ["get", "type"], "timezone"],
  minzoom: 9,
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
    "symbol-spacing": 500,
    "text-font": ["Americana-Bold"],
    "text-size": {
      stops: [
        [3, 6],
        [7, 10],
      ],
    },
    "text-field": localizedNameWithLocalGloss,
    "text-offset": [0, 1],
    "text-max-angle": 30,
    "text-letter-spacing": 0.1,
    "text-ignore-placement": true,
    "text-transform": "uppercase",
  },
  maxzoom: 24,
  source: "ohm_other_boundaries",
  "source-layer": "non_admin_boundaries_areas",
};

export const legendEntries = [
  {
    description: "Time zone",
    layers: [casing.id],
  },
];
