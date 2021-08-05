var lyrBoundaryCity = {
  id: "boundary_city",
  type: "line",
  paint: {
    "line-color": clrBorder,
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

var lyrBoundaryCountyBg = {
  id: "boundary_county-bg",
  type: "line",
  paint: {
    "line-color": clrBorderCase,
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

var lyrBoundaryCounty = {
  id: "boundary_county",
  type: "line",
  paint: {
    "line-color": clrBorder,
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

var lyrBoundaryStateBg = {
  id: "boundary_state-bg",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorderCase - 30}, 25%, 94%)`],
        [7, `hsl(${hueBorderCase}, 30%, 90%)`],
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

var lyrBoundaryState = {
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
      stops: [
        [3, [4, 4, 4, 4, 12, 4]],
        [6, [3.5, 3, 3.5, 3, 20, 3]],
        [8, [2.5, 2.5, 2.5, 2.5, 20, 2.5]],
        [10, [2, 2.5, 2, 2.5, 12, 2.5]],
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
    "line-cap": "round",
    visibility: "visible",
  },
  source: "openmaptiles",
  "source-layer": "boundary",
};

var lyrBoundaryCountryBg = {
  id: "boundary_country-bg",
  type: "line",
  paint: {
    "line-color": {
      base: 1.2,
      stops: [
        [3, `hsl(${hueBorderCase - 30}, 35%, 86%)`],
        [7, `hsl(${hueBorderCase}, 35%, 86%)`],
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

var lyrBoundaryCountry = {
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
