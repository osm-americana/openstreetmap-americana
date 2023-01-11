import * as label from "../constants/label.js";
import * as Color from "../constants/color.js";

var iconDefs = {
  bar: ["bar", "beer", "pub"],
  coffee: ["cafe"],
  hospital: "hospital",
  medical: ["doctors", "clinic"],
  parking: "parking",
};

export const poi = {
  id: "poi",
  type: "symbol",
  paint: {
    "text-halo-color": Color.backgroundFill,
    "text-halo-width": 1.5,
    "icon-halo-width": 0.4,
    "text-halo-blur": 1,
    "icon-halo-blur": 0.2,
    "text-color": [
      "match",
      ["get", "subclass"],
      [...iconDefs.bar, ...iconDefs.coffee],
      Color.poi.consumer,
      ["hospital", "parking"],
      Color.poi.infrastructure,
      Color.poi.infrastructure,
    ],
  },
  filter: [
    ">=",
    ["zoom"],
    [
      "match",
      ["get", "subclass"],
      "hospital",
      15,
      [...iconDefs.bar, ...iconDefs.coffee],
      16,
      ["clinic", "doctors", "parking"],
      17,
      99,
    ],
  ],
  layout: {
    "text-font": ["OpenHistorical"],
    "icon-optional": false,
    "text-size": {
      base: 1.0,
      stops: [
        [15, 10],
        [17, 12],
      ],
    },
    "icon-image": [
      "match",
      ["get", "subclass"],
      iconDefs.bar,
      "poi_martini_glass",
      iconDefs.coffee,
      "poi_coffee_cup",
      iconDefs.medical,
      "poi_health_cross",
      iconDefs.hospital,
      "poi_hospital",
      iconDefs.parking,
      "poi_p",
      "poi_square_dot", //icon for generic POI, not currently used
    ],
    "icon-size": 1.0,
    "text-field": label.localizedName,
    "text-variable-anchor": ["left", "right", "bottom"],
    "text-justify": "auto",
    "text-radial-offset": 1.2,
    "text-max-width": 5,
    "icon-padding": 0,
    "text-padding": 0,
    "icon-allow-overlap": false,
  },
  source: "openmaptiles",
  "source-layer": "poi",
};

export const legendEntries = [
  {
    description: "Hospital",
    layers: [poi.id],
    filter: ["==", ["get", "subclass"], iconDefs.hospital],
  },
  {
    description: "Doctor's office or clinic",
    layers: [poi.id],
    filter: ["in", ["get", "subclass"], ["literal", iconDefs.medical]],
  },
  {
    description: "Coffee shop",
    layers: [poi.id],
    filter: ["in", ["get", "subclass"], ["literal", iconDefs.coffee]],
  },
  {
    description: "Bar or pub",
    layers: [poi.id],
    filter: ["in", ["get", "subclass"], ["literal", iconDefs.bar]],
  },
  {
    description: "Parking",
    layers: [poi.id],
    filter: ["==", ["get", "subclass"], iconDefs.parking],
  },
];
