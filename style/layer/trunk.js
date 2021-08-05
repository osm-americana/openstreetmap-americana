var lyrTrunkLink = {
  id: "road_trunk_link",
  type: "line",
  paint: roadPaint(clrTrunk, wdTrunkLink),
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
  ],
  minzoom: 12,
  layout: layoutRoad,
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunk = {
  id: "road_trunk",
  type: "line",
  paint: roadPaint(clrTrunk, wdTrunk),
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "trunk"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoad,
  source: "openmaptiles",
  minzoom: minzoomTrunk,
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkLabel = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": "#333",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.5,
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "trunk"]],
  layout: {
    "text-font": ["Metropolis Light"],
    "text-size": 12,
    "text-field": "{name:latin} {name:nonlatin}",
    "text-anchor": "bottom",
    "text-offset": [0, 0.2],
    "symbol-placement": "line",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation_name",
};
var lyrTrunkLinkTunCase = {
  id: "tunnel_trunk_link_casing",
  type: "line",
  paint: tunCasePaint(clrTrunkTunCase, wdTrunkLinkCase),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkTunCase = {
  id: "tunnel_trunk_casing",
  type: "line",
  paint: roadPaint(clrTrunkTunCase, wdTrunkCase),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkLinkTun = {
  id: "tunnel_trunk_link",
  type: "line",
  paint: roadPaint(clrTrunkTun, wdTrunkLink),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "tunnel"],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkTun = {
  id: "tunnel_trunk",
  type: "line",
  paint: roadPaint(clrTrunkTun, wdTrunk),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "tunnel"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkLinkBrg = {
  id: "bridge_trunk_link",
  type: "line",
  paint: roadPaint(clrTrunk, wdTrunkLink),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  layout: {
    "line-join": "round",
  },
  minzoom: minzoomTrunkLink,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkBrg = {
  id: "bridge_trunk",
  type: "line",
  paint: roadPaint(clrTrunk, wdTrunk),
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  layout: {
    "line-join": "round",
  },
  minzoom: minzoomTrunk,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
