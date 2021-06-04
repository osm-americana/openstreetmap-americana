var layerAerodrome = {
  id: "aerodrome",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "aerodrome_label",
  filter: [
    "any",
    [
      "all",
      ["in", "class", ["literal", ["international", "public"]]],
      ["to-boolean", ["get", "icao"]],
      ["to-boolean", ["get", "iata"]],
      [">=", ["zoom"], 10],
      ["<", ["zoom"], 17],
    ],
    ["all", [">=", ["zoom"], 12], ["<", ["zoom"], 18]],
  ],
  minzoom: 10,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_5",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};

var layerBusStation = {
  id: "busStation",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "poi",
  filter: ["all", ["==", "class", "bus"], ["==", "subclass", "bus_station"]],
  minzoom: 16,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_6",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};

var layerTrainStation = {
  id: "trainStation",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "poi",
  filter: ["all", ["==", "class", "railway"], ["==", "subclass", "station"]],
  minzoom: 12,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_7",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};

var layerLibrary = {
  id: "library",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "poi",
  filter: ["==", "class", "library"],
  minzoom: 16,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_8",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};

var layerFerryTerminal = {
  id: "ferryTerminal",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "poi",
  filter: ["==", "class", "ferry_terminal"],
  minzoom: 15,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_9",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};

var layerLightRailStation = {
  id: "lightRailStation",
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "poi",
  filter: ["all", ["==", "class", "railway"], ["==", "subclass", "light_rail"]],
  minzoom: 12,
  layout: {
    "icon-size": 1.0,
    "icon-image": "MUTCD_I_12",
    "icon-rotation-alignment": "viewport",
    "text-anchor": "top",
    "text-field": "{name}",
    "text-font": ["Open Sans Bold"],
    "text-offset": [0, 1],
    "text-rotation-alignment": "viewport",
  },
  paint: {
    "text-color": "#FFFFFF",
    "text-halo-color": "#00674c",
    "text-halo-width": 1.0,
  },
};
