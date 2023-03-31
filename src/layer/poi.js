import * as label from "../constants/label.js";
import * as Color from "../constants/color.js";

var iconDefs = {
  bar: {
    classes: {
      bar: ["bar"],
      beer: ["beer", "pub"],
    },
    sprite: "poi_martini_glass",
    color: Color.poi.consumer,
    description: "Bar or pub",
  },
  bus: {
    subclasses: ["bus_station", "bus_stop"],
    sprite: "poi_bus",
    color: Color.poi.transport,
    description: "Bus station or stop",
  },
  coffee: {
    classes: {
      cafe: ["cafe"],
    },
    sprite: "poi_coffee_cup",
    color: Color.poi.consumer,
    description: "Coffee shop",
  },
  hospital: {
    classes: {
      hospital: ["hospital"],
    },
    sprite: "poi_hospital",
    color: Color.poi.infrastructure,
    description: "Hospital",
  },
  medical: {
    classes: {
      hospital: ["clinic"],
      doctors: ["doctors"],
    },
    sprite: "poi_health_cross",
    color: Color.poi.infrastructure,
    description: "Doctor's office or clinic",
  },
  parking: {
    classes: {
      parking: ["parking"],
    },
    sprite: "poi_p",
    color: Color.poi.infrastructure,
    description: "Parking",
  },
  railway: {
    subclasses: ["station", "halt", "tram_stop", "subway"],
    sprite: "poi_rail",
    color: Color.poi.transport,
    description: "Train station, tram or subway stop",
  },
  school: {
    classes: {
      school: ["kindergarten", "school"],
      college: ["college", "university"],
    },
    sprite: "poi_school",
    color: Color.poi.infrastructure,
    description: "School",
  },
};

function iconImageDefs() {
  let mapping = {};
  for (var key in iconDefs) {
    let classes = iconDefs[key].classes;
    for (var poiClass in classes) {
      if (!mapping[poiClass]) {
        mapping[poiClass] = ["match", ["get", "subclass"]];
      }
      mapping[poiClass].push(classes[poiClass]);
      mapping[poiClass].push(
        `sprite=${iconDefs[key].sprite}\ncolor=${iconDefs[key].color}`
      );
    }
  }

  let out = [];
  for (var poiClass in mapping) {
    out.push(poiClass);
    out.push(mapping[poiClass].concat(["poi"])); //icon for generic POI, not currently used
  }
  return out;
}

var imageExpression = [
  "concat",
  "poi\n",
  [
    "match",
    ["get", "class"],
    ...iconImageDefs(),
    "poi", //icon for generic POI, not currently used
  ],
];

const getSubclasses = (iconDef) => Object.values(iconDef.classes).flat();

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
      [...getSubclasses(iconDefs.bar), ...getSubclasses(iconDefs.coffee)],
      Color.poi.consumer,
      [...iconDefs.bus.subclasses, ...iconDefs.railway.subclasses],
      Color.poi.transport,
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
      ["station"],
      12,
      ["bus_station", "subway"],
      14,
      [
        "bus_stop",
        "halt",
        "hospital",
        "tram_stop",
        ...getSubclasses(iconDefs.school)],
      15,
      [...getSubclasses(iconDefs.bar), ...getSubclasses(iconDefs.coffee)],
      16,
      ["clinic", "doctors", "parking"],
      17,
      99,
    ],
  ],
  layout: {
    "text-font": ["Americana-Regular"],
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
    filter: [
      "all",
      ["in", ["get", "class"], ["literal", Object.keys(iconDefs[id].classes)]],
      ["in", ["get", "subclass"], ["literal", getSubclasses(iconDefs[id])]],
    ],
  };
});
