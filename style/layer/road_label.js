"use strict";

var offsetLabelStyle = {
  "text-font": ["Metropolis Light"],
  "text-size": 12,
  "text-field": "{name:latin} {name:nonlatin}",
  "text-anchor": "bottom",
  "text-max-angle": 20,
  "symbol-placement": "line",
};

var centerLabelStyle = {
  "text-font": ["Metropolis Light"],
  "text-size": 10,
  "text-field": "{name:latin} {name:nonlatin}",
  "text-anchor": "center",
  "text-max-angle": 20,
  "symbol-placement": "line",
};

var textPaint = {
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
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const trunk = {
  id: "trunk_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "trunk"]],
  minzoom: 10,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const primary = {
  id: "primary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "primary"]],
  minzoom: 11,
  maxzoom: 16,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const primaryHZ = {
  id: "primary_label_hz",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "primary"]],
  minzoom: 16,
  layout: centerLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const secondary = {
  id: "secondary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "secondary"]],
  minzoom: 12,
  maxzoom: 16,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const secondaryHZ = {
  id: "secondary_label_hz",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "secondary"]],
  minzoom: 16,
  layout: centerLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const tertiary = {
  id: "tertiary_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "tertiary"]],
  minzoom: 13,
  maxzoom: 17,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const tertiaryHZ = {
  id: "tertiary_label_hz",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "tertiary"]],
  minzoom: 17,
  layout: centerLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const minor = {
  id: "minor_label",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "minor"]],
  minzoom: 13,
  maxzoom: 17,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const minorHZ = {
  id: "minor_label_hz",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "minor"]],
  minzoom: 17,
  layout: centerLabelStyle,
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
  maxzoom: 17,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};

export const serviceHZ = {
  id: "service_label_hz",
  type: "symbol",
  paint: textPaint,
  filter: ["all", ["==", "class", "service"]],
  minzoom: 17,
  layout: centerLabelStyle,
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
  maxzoom: 17,
  layout: offsetLabelStyle,
  source: "openmaptiles",
  "source-layer": "transportation_name",
};
