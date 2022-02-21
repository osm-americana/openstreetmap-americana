"use strict";

export const building = {
  id: "building",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13,
      `hsl(0, 0%, 87%)`,
      16,
      `hsl(0, 0%, 80%)`,
    ],
    "fill-extrusion-height": 3,
    "fill-extrusion-opacity": 0.85,
  },
  // filter: ["all", ["!=", "intermittent", 1], ["!=", "brunnel", "tunnel"]],
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "building",
};
