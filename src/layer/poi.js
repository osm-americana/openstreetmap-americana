import * as label from "../constants/label.js";
import * as Color from "../constants/color.js";

var iconDefs = {
  bar: {
    subclasses: ["bar", "beer", "pub"],
    sprite: "poi_martini_glass",
    color: Color.poi.consumer,
    description: "Bar or pub",
  },
  coffee: {
    subclasses: ["cafe"],
    sprite: "poi_coffee_cup",
    color: Color.poi.consumer,
    description: "Coffee shop",
  },
  hospital: {
    subclasses: ["hospital"],
    sprite: "poi_hospital",
    color: Color.poi.infrastructure,
    description: "Hospital",
  },
  medical: {
    subclasses: ["doctors", "clinic"],
    sprite: "poi_health_cross",
    color: Color.poi.infrastructure,
    description: "Doctor's office or clinic",
  },
  parking: {
    subclasses: ["parking"],
    sprite: "poi_p",
    color: Color.poi.infrastructure,
    description: "Parking",
  },
  school: {
    subclasses: ["kindergarten", "school", "college", "university"],
    sprite: "poi_school",
    color: Color.poi.infrastructure,
    description: "School",
  },
};

function iconImageDefs() {
  var out = [];
  for (var key in iconDefs) {
    out.push(iconDefs[key].subclasses);
    out.push(
      "sprite=" + iconDefs[key].sprite + "\ncolor=" + iconDefs[key].color
    );
  }
  return out;
}

var imageExpression = [
  "concat",
  "poi\n",
  [
    "match",
    ["get", "subclass"],
    ...iconImageDefs(),
    "poi", //icon for generic POI, not currently used
  ],
];

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
      [...iconDefs.bar.subclasses, ...iconDefs.coffee.subclasses],
      Color.poi.consumer,
      ["hospital", "parking", "school"],
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
      ["hospital", ...iconDefs.school.subclasses],
      15,
      [...iconDefs.bar.subclasses, ...iconDefs.coffee.subclasses],
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
    "icon-image": imageExpression,
    "icon-size": 1.0,
    "text-field": label.localizedName,
    "text-variable-anchor": ["left", "right", "bottom"],
    "text-justify": "auto",
    "text-radial-offset": 1.2,
    "text-max-width": 5,
    "icon-padding": 0,
    "text-padding": 0,
    "icon-allow-overlap": false,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "poi",
};

export const legendEntries = Object.keys(iconDefs).map(function (id) {
  return {
    description: iconDefs[id].description,
    layers: [poi.id],
    filter: ["in", ["get", "subclass"], ["literal", iconDefs[id].subclasses]],
  };
});
