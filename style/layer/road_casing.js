//TODO - consolidate into the trunk file (once the trunk file is reformatted)

var lyrTrunkCase = {
  id: "road_trunk_casing",
  type: "line",
  paint: {
    "line-color": clrTrunkCase,
    "line-width": wdTrunkCase,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["!in", "brunnel", "bridge", "tunnel"],
    ["==", "class", "trunk"],
    ["!=", "ramp", 1],
  ],
  layout: layoutRoadCase,
  source: "openmaptiles",
  minzoom: minzoomTrunkCase,
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkLinkBrgCase = {
  id: "bridge_trunk_link_casing",
  type: "line",
  paint: {
    "line-color": "hsl(${hueTrunk}, 71%, 10%)",
    "line-width": wdTrunkLinkCase,
    "line-blur": 0.5,
  },

  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "ramp", 1],
    ["==", "brunnel", "bridge"],
  ],
  minzoom: minzoomTrunkLink,
  layout: layoutRoadCase,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};

var lyrTrunkBrgCase = {
  id: "bridge_trunk_casing",
  type: "line",
  paint: {
    "line-color": clrBridgeCase,
    "line-width": wdTrunkCase,
    "line-blur": 0.5,
  },
  filter: [
    "all",
    ["==", "class", "trunk"],
    ["==", "brunnel", "bridge"],
    ["!=", "ramp", 1],
  ],
  minzoom: minzoomTrunkCase,
  layout: layoutRoadCase,
  source: "openmaptiles",
  metadata: {},
  "source-layer": "transportation",
};
