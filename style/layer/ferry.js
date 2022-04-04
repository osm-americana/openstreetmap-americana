"use strict";

import { waterLabel } from "../constants/color";

export const ferry = {
  id: "ferry",
  type: "line",
  paint: {
    "line-color": waterLabel,
    "line-dasharray": [7, 5],
    "line-width": 1.5,
  },
  filter: ["all", ["==", "class", "ferry"]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "transportation",
};
