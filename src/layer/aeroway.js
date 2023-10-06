"use strict";

import * as Label from "../constants/label.js";
import * as Color from "../constants/color.js";

const minorAirport = [
  "any",
  ["!", ["has", "iata"]],
  ["!", ["has", "icao"]],
  ["==", ["get", "class"], "private"],
];

const iconLayout = {
  "icon-image": [
    "match",
    ["get", "class"],
    "military",
    "poi\nsprite=poi_military_plane\ncolor=" + Color.poi.airport,
    "poi\nsprite=poi_plane\ncolor=" + Color.poi.airport,
  ],
  "text-anchor": "bottom",
  "text-variable-anchor": [
    "bottom",
    "bottom-right",
    "bottom-left",
    "right",
    "left",
  ],
  "text-padding": 8,
  "icon-allow-overlap": false,
};

export const fill = {
  id: "airport_fill",
  type: "fill",
  filter: ["==", ["get", "class"], "aerodrome"],
  paint: {
    "fill-color": Color.airportFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const outline = {
  id: "airport_outline",
  type: "line",
  filter: ["==", ["get", "class"], "aerodrome"],
  paint: {
    "line-color": Color.airportOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const runway = {
  id: "airport_runway",
  type: "line",
  filter: [
    "all",
    ["==", ["get", "class"], "runway"],
    ["==", ["geometry-type"], "LineString"],
  ],
  paint: {
    "line-color": Color.airportRunway,
    "line-width": {
      base: 1.7,
      stops: [
        [12, 3],
        [15, 15],
        [17, 30],
      ],
    },
  },
  layout: {
    "line-cap": "butt",
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const runwayArea = {
  id: "airport_runway_area",
  type: "fill",
  filter: [
    "all",
    ["==", ["get", "class"], "runway"],
    ["==", ["geometry-type"], "Polygon"],
  ],
  paint: {
    "fill-color": Color.airportRunway,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const taxiway = {
  id: "airport_taxiway",
  type: "line",
  filter: [
    "all",
    ["==", ["get", "class"], "taxiway"],
    ["==", ["geometry-type"], "LineString"],
  ],
  paint: {
    "line-color": Color.airportRunway,
    "line-width": {
      base: 1.7,
      stops: [
        [12, 1],
        [15, 5],
      ],
    },
  },
  layout: {
    "line-cap": "butt",
    visibility: "visible",
  },
  minzoom: 12,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const taxiwayArea = {
  id: "airport_taxiway_area",
  type: "fill",
  filter: [
    "all",
    ["==", ["get", "class"], "taxiway"],
    ["==", ["geometry-type"], "Polygon"],
  ],
  paint: {
    "fill-color": Color.airportRunway,
  },
  layout: {
    visibility: "visible",
  },
  minzoom: 12,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};

export const airportRefLabel = {
  id: "airport_ref_label",
  type: "symbol",
  maxzoom: 15,
  filter: ["!", minorAirport],
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": ["coalesce", ["get", "iata"], ["get", "icao"]],
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    ...iconLayout,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aerodrome_label",
};

export const minorAirportRefLabel = {
  id: "airport_ref_label_minor",
  type: "symbol",
  minzoom: 13,
  maxzoom: 15,
  filter: minorAirport,
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": ["coalesce", ["get", "iata"], ["get", "icao"]],
    "text-font": ["Americana-Bold"],
    "text-size": 10,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aerodrome_label",
};

export const airportLabel = {
  id: "airport_label",
  type: "symbol",
  minzoom: 11,
  maxzoom: 15,
  filter: ["!", minorAirport],
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": Label.localizedName,
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    ...iconLayout,
  },
  source: "openmaptiles",
  "source-layer": "aerodrome_label",
};

export const minorAirportLabel = {
  id: "airport_label_minor",
  type: "symbol",
  minzoom: 13,
  maxzoom: 15,
  filter: minorAirport,
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": Label.localizedName,
    "text-font": ["Americana-Bold"],
    "text-size": 10,
  },
  source: "openmaptiles",
  "source-layer": "aerodrome_label",
};

export const airportGate = {
  id: "airport_gate_label",
  type: "symbol",
  filter: ["==", ["get", "class"], "gate"],
  minzoom: 15,
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": ["get", "ref"],
    "text-font": ["Americana-Bold"],
    "text-size": 10,
  },
  source: "openmaptiles",
  "source-layer": "aeroway",
};

export const legendEntries = [
  {
    description: "Civilian airport",
    layers: [airportRefLabel.id, airportLabel.id],
    filter: ["!=", ["get", "class"], "military"],
  },
  {
    description: "Military air base",
    layers: [airportRefLabel.id, airportLabel.id],
    filter: ["==", ["get", "class"], "military"],
  },
  { description: "Runway", layers: [runway.id] },
  { description: "Taxiway", layers: [taxiway.id] },
  { description: "Gate", layers: [airportGate.id] },
];
