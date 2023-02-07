"use strict";

import * as Color from "../constants/color.js";

const trackSelect = ["==", ["get", "class"], "track"];
const unpavedSelect = ["!=", ["get", "surface"], "paved"];
const pavedSelect = ["==", ["get", "surface"], "paved"];
const bridgeSelect = ["==", ["get", "brunnel"], "bridge"];
const fordSelect = ["==", ["get", "brunnel"], "ford"];
const notFordSelect = ["!=", ["get", "brunnel"], "ford"];
const opacity = ["interpolate", ["exponential", 1.2], ["zoom"], 12, 0, 13, 1];
const getBrunnel = ["get", "brunnel"];

export const track = {
  id: "highway-track",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, unpavedSelect],
  minzoom: 12,
  paint: {
    "line-color": ["match", getBrunnel, "ford", Color.waterLine, "#d4b791"],
    "line-opacity": opacity,
    "line-blur": 0.75,
    "line-width": 0.5,
    "line-dasharray": [12, 3],
    "line-offset": 0,
    "line-gap-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      13,
      0.7,
      20,
      6,
    ],
  },
};

export const pavedTrack = {
  id: "highway-track-paved",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, pavedSelect],
  minzoom: 12,
  paint: { ...track.paint },
};
pavedTrack["paint"]["line-dasharray"] = [1, 0];

export const trackBridge = {
  id: "highway-track-bridge",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, unpavedSelect, bridgeSelect],
  minzoom: 12,
  paint: { ...track.paint },
};

export const pavedTrackBridge = {
  id: "highway-track-paved-bridge",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", trackSelect, pavedSelect, bridgeSelect],
  minzoom: 12,
  paint: { ...pavedTrack.paint },
};

// Bridge casing layers
export const bridgeCasing = {
  id: "track-bridge-casing",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", bridgeSelect, trackSelect],
  minzoom: 13,
  layout: {
    "line-cap": "butt",
    "line-join": "bevel",
    visibility: "visible",
  },
  paint: {
    "line-color": "black",
    "line-opacity": opacity,
    "line-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      13,
      1.1,
      20,
      11,
    ],
  },
};
// Bridge casing layers
export const bridgeFill = {
  id: "track-bridge-fill",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: ["all", bridgeSelect, trackSelect],
  minzoom: 13,
  layout: {
    "line-cap": "butt",
    "line-join": "bevel",
    visibility: "visible",
  },
  paint: {
    "line-color": Color.backgroundFill,
    "line-opacity": opacity,
    "line-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      13,
      1.0,
      20,
      10,
    ],
  },
};

export const legendEntries = [
  {
    description: "Land access track",
    layers: [track.id],
    filter: notFordSelect,
  },
  {
    description: "Land access track - ford",
    layers: [track.id],
    filter: fordSelect,
  },
  {
    description: "Paved land access track",
    layers: [pavedTrack.id],
    filter: notFordSelect,
  },
  {
    description: "Paved land access track - ford",
    layers: [pavedTrack.id],
    filter: fordSelect,
  },
];
