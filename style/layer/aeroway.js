"use strict";

import * as Color from "../constants/color.js";

const name_en = [
  "coalesce",
  ["get", "name:en"],
  ["get", "name:latin"],
  ["get", "name"],
];

const minorAirport = [
  "any",
  ["!", ["has", "iata"]],
  ["!", ["has", "icao"]],
  ["in", ["get", "class"], ["literal", ["private"]]],
];

const iconLayout = {
  "icon-image": [
    "match",
    ["get", "class"],
    "military",
    "military_airport",
    "airport",
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
  filter: ["==", "class", "aerodrome"],
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
  filter: ["==", "class", "aerodrome"],
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
  filter: ["all", ["==", "class", "runway"], ["==", "$type", "LineString"]],
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
  filter: ["all", ["==", "class", "runway"], ["==", "$type", "Polygon"]],
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
  filter: ["all", ["==", "class", "taxiway"], ["==", "$type", "LineString"]],
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
  filter: ["all", ["==", "class", "taxiway"], ["==", "$type", "Polygon"]],
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
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
    ...iconLayout,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aerodrome_label",
};

export const minorAirportRefLabel = {
  id: "minor_airport_ref_label",
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
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
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
    "text-field": name_en,
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
    ...iconLayout,
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aerodrome_label",
};

export const minorAirportLabel = {
  id: "minor_airport_label",
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
    "text-field": name_en,
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aerodrome_label",
};

export const airportGate = {
  id: "airport_gate_label",
  type: "symbol",
  filter: ["==", "class", "gate"],
  minzoom: 15,
  paint: {
    "text-color": Color.airportLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": "{ref}",
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "aeroway",
};
