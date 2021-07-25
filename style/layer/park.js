var layerParkFill = {
  id: "protected-area-fill",
  type: "fill",
  paint: {
    "fill-color": colorParkFill,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

var layerParkOutline = {
  id: "protected-area-outline",
  type: "line",
  paint: {
    "line-color": colorParkOutline,
  },
  layout: {
    visibility: "visible",
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};

var layerParkLabel = {
  id: "protected-area-label",
  type: "symbol",
  filter: ["has", "rank"],
  paint: {
    "text-color": colorParkLabel,
    "text-halo-blur": 1,
    "text-halo-color": "rgba(255, 255, 255, 1)",
    "text-halo-width": 1,
  },
  layout: {
    visibility: "visible",
    "text-field": "{name}",
    "text-font": ["Metropolis Bold"],
    "text-size": 10,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  metadata: {},
  "source-layer": "park",
};
