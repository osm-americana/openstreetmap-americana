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
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorderCasing - 30}, 25%, 94%)`],
        [7, `hsl(${hueBorderCasing}, 30%, 90%)`],
      ],
    },
    "line-dasharray": [1],
    "line-width": {
      base: 1.2,
      stops: [
        [3, 4],
        [12, 20],
        [16, 30],
      ],
    },
  },
  filter: ["all", ["in", "admin_level", 3, 4], ["==", "maritime", 0]],
  minzoom: 3,
  layout: {
    "line-join": "round",
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryState = {
  id: "boundary_state",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorder}, 2%, 60%)`],
        [7, `hsl(${hueBorder}, 2%, 48%)`],
      ],
    },
    "line-dasharray": {
      stops: [[3, [20, 3, 5, 3, 5, 3]]],
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
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var layerBoundaryCountryBg = {
  id: "boundary_country-bg",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorderCasing - 30}, 35%, 86%)`],
        [7, `hsl(${hueBorderCasing}, 35%, 86%)`],
      ],
    },
    "line-opacity": {
      base: 1,
      stops: [
        [0, 0.4],
        [4, 1],
      ],
    },
    "line-width": {
      base: 1.2,
      stops: [
        [2, 4],
        [12, 25],
        [16, 50],
      ],
    },
  },
  filter: [
    "all",
    ["in", "admin_level", 2],
    ["!has", "claimed_by"],
    ["==", "maritime", 0],
  ],
  minzoom: 2,
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
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorder}, 2%, 47%)`],
        [7, `hsl(${hueBorder}, 2%, 37%)`],
      ],
    },
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
    "line-dasharray": {
      stops: [[3, [10, 1, 3, 1]]],
    },
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
