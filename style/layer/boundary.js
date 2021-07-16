var layerBoundaryCity = {
  id: "boundary_city",
  type: "line",
  paint: {
    "line-color": colorBorder,
    "line-dasharray": [2, 4],
    "line-width": 1,
    "line-offset": 0,
  },
  filter: [
    "all",
    ["==", "admin_level", 8],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  minzoom: 11,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryCountyBg = {
  id: "boundary_county-bg",
  type: "line",
  paint: {
    "line-color": colorBorderCasing,
    "line-dasharray": [1],
    "line-width": {
      stops: [
        [11, 5],
        [12, 6],
      ],
    },
  },
  filter: [
    "all",
    ["==", "admin_level", 6],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  minzoom: 11,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryCounty = {
  id: "boundary_county",
  type: "line",
  paint: {
    "line-color": colorBorder,
    "line-dasharray": [3, 3],
    "line-width": 1,
    "line-offset": 0,
  },
  filter: [
    "all",
    ["==", "admin_level", 6],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  minzoom: 9,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryStateBg = {
  id: "boundary_state-bg",
  type: "line",
  paint: {
    "line-color": colorBorderCasing,
    "line-dasharray": [1],
    "line-width": {
      stops: [
        [7, 3],
        [10, 6],
        [12, 8],
        [16, 12],
      ],
    },
  },
  filter: ["all", ["in", "admin_level", 3, 4], ["==", "maritime", 0]],
  minzoom: 7,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryState = {
  id: "boundary_state",
  type: "line",
  paint: {
    "line-color": colorBorder,
    "line-dasharray": {
      stops: [
        [3, [1]],
        [7, [3, 2, 1, 2]],
      ],
    },
    "line-width": {
      stops: [
        [3, 0.5],
        [10, 1.5],
      ],
    },
    "line-offset": 0,
  },
  filter: ["all", ["in", "admin_level", 3, 4], ["==", "maritime", 0]],
  minzoom: 3,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryCountryBg = {
  id: "boundary_country-bg",
  type: "line",
  paint: {
    "line-color": colorBorderCasing,
    "line-opacity": {
      base: 1,
      stops: [
        [0, 0.4],
        [4, 1],
      ],
    },
    "line-width": {
      stops: [
        [7, 8],
        [10, 10],
        [12, 20],
        [16, 25],
      ],
    },
    "line-dasharray": [1],
  },
  filter: [
    "all",
    ["in", "admin_level", 2],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  minzoom: 7,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryCountry = {
  id: "boundary_country",
  type: "line",
  paint: {
    "line-color": colorBorder,
    "line-opacity": {
      base: 1,
      stops: [
        [0, 0.4],
        [4, 1],
        [5, 0.8],
      ],
    },
    "line-width": {
      stops: [
        [2, 1],
        [4, 1.5],
        [10, 2.25],
      ],
    },
    "line-dasharray": [1],
    "line-blur": 0,
  },
  filter: [
    "all",
    ["in", "admin_level", 2],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  maxzoom: 24,
  layout: {
    "line-join": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};
