import * as L from "../constants/label.js";

const cityLabelPaint = {
  "text-color": "#444",
  "text-halo-color": "rgb(255,255,255)",
  "text-halo-width": 2,
  "text-halo-blur": 0.5,
};

const cityIcon = [
  "match",
  ["get", "capital"],
  2,
  "star_nation_capital",
  4,
  "star_state_capital",
  "dot_city",
];

function rankRange(min, max) {
  let lowerBound = [">=", ["get", "rank"], min];
  let upperBound = ["<=", ["get", "rank"], max];
  return ["all", lowerBound, upperBound];
}

/**
 *
 * @param {*} placeClass - class of place tag (city, town etc)
 * @param {*} stops - pairs of [rank,zoom] stops
 * @returns - filter for drawing that place class
 */
function zoomRankFilter(placeClass, stops) {
  rankStops = ["step", ["zoom"]];
  for (var i = 0; i < stops.length; i++) {
    rankStops.push(["<=", ["get", "rank"], stops[i][0]]);
    rankStops.push(stops[i][1]);
  }
  //Catch-all to show everything at higher zooms
  rankStops.push([">=", ["get", "rank"], 1]);

  return ["all", ["==", ["get", "class"], placeClass], rankStops];
}

export const town = {
  id: "place_town",
  type: "symbol",
  paint: cityLabelPaint,
  filter: zoomRankFilter("town", [
    [2, 6],
    [4, 7],
    [5, 8],
    [9, 10],
  ]),
  layout: {
    "text-font": ["Metropolis Bold"],
    "text-size": {
      base: 1.2,
      stops: [
        [5, 8],
        [8, 10],
        [12, 18],
      ],
    },
    "icon-image": cityIcon,
    "icon-size": {
      base: 1.2,
      stops: [
        [4, 0.25],
        [7, 0.35],
        [11, 0.7],
      ],
    },
    "text-field": L.name_en,
    "text-anchor": "bottom",
    "text-variable-anchor": [
      "bottom",
      "bottom-right",
      "bottom-left",
      "right",
      "left",
    ],
    "text-justify": "auto",
    "text-radial-offset": 0.5,
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 0,
    "text-padding": 1,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  minzoom: 4,
  maxzoom: 13,
  "source-layer": "place",
};

export const city = {
  id: "place_city",
  type: "symbol",
  paint: cityLabelPaint,
  filter: zoomRankFilter("city", [
    [2, 5],
    [4, 6],
  ]),
  layout: {
    "text-font": ["Metropolis Bold"],
    "text-size": {
      base: 1.2,
      stops: [
        [4, 11],
        [7, 14],
        [11, 24],
      ],
    },
    "icon-image": cityIcon,
    "icon-size": {
      base: 1.2,
      stops: [
        [4, 0.4],
        [7, 0.5],
        [11, 0.9],
      ],
    },
    "text-field": L.name_en,
    "text-anchor": "bottom",
    "text-variable-anchor": [
      "bottom",
      "bottom-right",
      "bottom-left",
      "right",
      "left",
    ],
    "text-justify": "auto",
    "text-radial-offset": ["match", ["get", "capital"], 2, 0.7, 0.5],
    "icon-optional": false,
    "text-max-width": 8,
    "icon-padding": 0,
    "text-padding": 1,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  minzoom: 4,
  maxzoom: 12,
  "source-layer": "place",
};
