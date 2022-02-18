"use strict";

export const building = {
  id: "building",
  type: "fill-extrusion",
  paint: {
    "fill-extrusion-color": "hsl(0, 0%, 80%)",
    "fill-extrusion-base": 3,
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
