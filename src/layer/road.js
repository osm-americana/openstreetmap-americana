"use strict";

import * as Util from "../js/util.js";

const motorwayHue = 218;
const stateHue = 40;
const tollRoadHue = 100;

// Common filter expressions
const isRoad = [
  "match",
  ["get", "class"],
  ["motorway", "trunk", "primary", "secondary", "tertiary", "minor", "service", "busway", "bus_guideway"],
  true,
  false,
];
const isRamp = ["==", ["get", "ramp"], 1];
const isNotRamp = ["!", isRamp];
const isToll = ["==", ["get", "toll"], 1];
const isNotToll = ["!=", ["get", "toll"], 1];
const isMotorway = ["all", ["==", ["get", "class"], "motorway"], isNotRamp];
const isNotMotorway = ["!=", ["get", "class"], "motorway"];
const isState = ["match", ["get", "network"], ["us-highway", "us-state"], isNotRamp, false];
const isExpressway = ["==", ["get", "expressway"], 1];
const isNotExpressway = ["!=", ["get", "expressway"], 1];
const isService = ["==", ["get", "class"], "service"];
const isNotService = ["!=", ["get", "class"], "service"];
const isMinorService = [
  "match",
  ["get", "service"],
  ["parking_aisle", "driveway"],
  true, false,
];
const isConstruction = ["in", "_construction", ["get", "class"]];
const isNotConstruction = ["!", isConstruction];

export const road = {
  id: "road",
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
  filter: [
    "step",
    ["zoom"],
    false,
    4, ["all", ["==", ["get", "network"], "us-interstate"], isNotConstruction],
    5, ["match", ["get", "class"], ["motorway", "trunk"], isNotRamp, false],
    7, ["match", ["get", "class"], ["motorway", "trunk", "primary"], isNotRamp, false],
    9, ["match", ["get", "class"], ["motorway", "trunk", "primary", "secondary"], true, false],
    11, ["all", isRoad, isNotService, isNotConstruction],
    12, ["all", isRoad, ["!", isMinorService], isNotConstruction],
    13, ["all", isRoad, isNotConstruction],
  ],
  layout: {
    "line-cap": "butt",
    "line-join": "round",
    "line-sort-key": [
      "+",
      ["to-number", isMotorway],
      ["to-number", isState],
      ["to-number", isRamp],
    ],
  },
  paint: {
    "line-color": [
      "interpolate-lab",
      ["exponential", 1.2],
      ["zoom"],
      4,
      [
        "case",
        isToll, `hsl(${tollRoadHue}, 60%, 70%)`,
        isMotorway, `hsl(${motorwayHue}, 60%, 70%)`,
        isState, `hsl(${stateHue}, 77%, 50%)`,
        "#9c9c9c",
      ],
      8,
      [
        "case",
        isToll, `hsl(${tollRoadHue}, 100%, 40%)`,
        isMotorway, `hsl(${motorwayHue}, 100%, 45%)`,
        isState, `hsl(${stateHue}, 77%, 50%)`,
        "#9c9c9c",
      ],
      14,
      [
        "case",
        isToll, `hsl(${tollRoadHue}, 100%, 35%)`,
        isMotorway, `hsl(${motorwayHue}, 100%, 35%)`,
        isState, `hsl(${stateHue}, 77%, 50%)`,
        ["all", ["==", ["get", "class"], "motorway"], isRamp], "#000",
        "#9c9c9c",
      ],
    ],
    "line-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      4,
      1,
      8,
      [
        "case",
        isMotorway, 3,
        isExpressway, 1,
        isState, 2,
        ["match", ["get", "class"], ["trunk", "primary"], isNotRamp, false], 2,
        0.25,
      ],
      18,
      [
        "case",
        isMotorway, 6,
        ["all", isState, isNotExpressway], 4,
        ["match", ["get", "class"], ["trunk", "primary", "secondary", "tertiary"], isNotRamp, false], 4,
        isService, 1,
        3,
      ],
      20,
      [
        "case",
        isMotorway, 10,
        ["all", isState, isNotExpressway], 8,
        ["match", ["get", "class"], ["trunk", "primary", "secondary", "tertiary"], isNotRamp, false], 8,
        isService, 1,
        6,
      ],
    ],
    "line-gap-width": [
      "interpolate",
      ["exponential", 1.2],
      ["zoom"],
      4,
      ["case", isExpressway, 1, 0],
      12,
      ["case", isExpressway, 3, 0],
      14,
      0,
    ],
  },
};

export const legendEntries = [
  {
    description: "Controlled-access highway",
    layers: [road.id],
    filter: ["all", isMotorway, isNotToll],
  },
  {
    description: "Limited-access highway",
    layers: [road.id],
    filter: ["all", isExpressway, isNotToll],
  },
  {
    description: "State highway",
    layers: [road.id],
    filter: ["all", isState, isNotToll, isNotExpressway],
  },
  {
    description: "Local road",
    layers: [road.id],
    filter: ["all", isNotMotorway, isNotToll, isNotExpressway, isNotRamp, isNotService],
  },
  {
    description: "Service road",
    layers: [road.id],
    filter: isService,
  },
  {
    description: "Toll road",
    layers: [road.id],
    filter: ["all", isToll, isNotRamp],
  },
  //{
  //  description: "Unpaved road",
  //  layers: [road.id],
  //  filter: isUnpaved,
  //},
];
