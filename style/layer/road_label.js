"use strict";

const textLayout = {
  "text-font": ["Metropolis Light"],
  "text-field": "{name:latin} {name:nonlatin}",
  "text-max-angle": 20,
  "symbol-placement": "line",
};

/**
 * Returns layout properties that differ between an offset treatment at lower
 * zoom levels versus an in-road treatment at higher zoom levels.
 *
 * @param {*} minHighZoom Lowest zoom level at which to apply the in-road
 *  treatment. Omit this parameter to always apply the offset treatment and
 *  never the in-road treatment.
 */
function zoomDependentLayout(minHighZoom) {
  return {
    "text-size":
      typeof minHighZoom === "undefined"
        ? 12
        : ["step", ["zoom"], 12, minHighZoom, 10],
    "text-anchor":
      typeof minHighZoom === "undefined"
        ? "bottom"
        : ["step", ["zoom"], "bottom", minHighZoom, "center"],
  };
}

const textPaint = {
  "text-color": "#333",
  "text-halo-color": "#fff",
  "text-halo-blur": 0.5,
  "text-halo-width": 1,
};

export const motorway = {
  id: "motorway_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "motorway"]],
  layout: Object.assign(zoomDependentLayout(), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const trunk = {
  id: "trunk_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "trunk"]],
  minzoom: 10,
  layout: Object.assign(zoomDependentLayout(), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const primary = {
  id: "primary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "primary"]],
  minzoom: 11,
  layout: Object.assign(zoomDependentLayout(16), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const secondary = {
  id: "secondary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "secondary"]],
  minzoom: 12,
  layout: Object.assign(zoomDependentLayout(16), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const tertiary = {
  id: "tertiary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "tertiary"]],
  minzoom: 13,
  layout: Object.assign(zoomDependentLayout(17), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const minor = {
  id: "minor_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "minor"]],
  minzoom: 13,
  layout: Object.assign(zoomDependentLayout(17), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const service = {
  id: "service_label",
  type: "symbol",
  paint: textPaint,
  filter: [
    "all",
    ["==", "class", "service"],
    ["!in", "service", "parking_aisle", "driveway"],
  ],
  minzoom: 14,
  layout: Object.assign(zoomDependentLayout(17), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const smallService = {
  id: "small_service_label",
  type: "symbol",
  paint: textPaint,
  filter: [
    "all",
    ["==", "class", "service"],
    ["in", "service", "parking_aisle", "driveway"],
  ],
  minzoom: 15,
  layout: Object.assign(zoomDependentLayout(), textLayout),
  source: "openmaptiles",
  "source-layer": "transportation_name",
};
