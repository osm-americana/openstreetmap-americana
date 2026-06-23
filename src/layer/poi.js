import { localizedName } from "@americana/diplomat";
import * as Color from "../constants/color.js";

var iconDefs = {
  aerialway_station: {
    classes: {
      aerialway: ["station"],
    },
    sprite: "poi_aerialway_circle",
    color: Color.poi.transport,
    description: "Aerial lift station",
  },
  bar: {
    classes: {
      bar: ["bar"],
      beer: ["beer", "pub"],
    },
    sprite: "poi_martini_glass",
    color: Color.poi.consumer,
    description: "Bar or pub",
  },
  bookstore: {
    classes: {
      library: ["books"],
    },
    sprite: "poi_book_upright",
    color: Color.poi.consumer,
    description: "Bookstore",
  },
  bus_station: {
    classes: {
      bus: ["bus_station"],
    },
    sprite: "poi_bus_circle",
    color: Color.poi.transport,
    description: "Bus station",
  },
  bus_stop: {
    classes: {
      bus: ["bus_stop"],
    },
    sprite: "poi_bus",
    color: Color.poi.transport,
    description: "Bus stop",
  },
  car_repair: {
    classes: {
      car: ["car_repair"],
    },
    sprite: "poi_car_repair",
    color: Color.poi.consumer,
    description: "Car mechanic",
  },
  car_shop: {
    classes: {
      car: ["car"],
    },
    sprite: "poi_car_shop",
    color: Color.poi.consumer,
    description: "Car dealership",
  },
  cemetery: {
    classes: {
      cemetery: ["cemetery", "grave_yard"],
    },
    sprite: "poi_gravestone",
    color: Color.poi.outdoor,
    description: "Cemetery",
  },
  charging_station: {
    classes: {
      fuel: ["charging_station"],
    },
    sprite: "poi_charging_station",
    color: Color.poi.consumer,
    description: "Charging station",
  },
  taxi: {
    classes: {
      office: ["taxi"],
    },
    sprite: "poi_taxi",
    color: Color.poi.transport,
    description: "Taxi stand",
  },
  coffee: {
    classes: {
      cafe: ["cafe"],
    },
    sprite: "poi_coffee_cup",
    color: Color.poi.consumer,
    description: "Coffee shop",
  },
  food_court: {
    classes: {
      fast_food: ["food_court"],
    },
    sprite: "poi_restaurant_circle",
    color: Color.poi.consumer,
    description: "Food court",
  },
  fire_station: {
    classes: {
      fire_station: ["fire_station"],
    },
    sprite: "poi_fire_station",
    color: Color.poi.infrastructure,
    description: "Fire station",
  },
  fuel: {
    classes: {
      fuel: ["fuel"],
    },
    sprite: "poi_fuel",
    color: Color.poi.consumer,
    description: "Gas station",
  },
  hospital: {
    classes: {
      hospital: ["hospital"],
    },
    sprite: "poi_hospital",
    color: Color.poi.infrastructure,
    description: "Hospital",
  },
  hotel: {
    classes: {
      lodging: ["hotel", "motel", "guest_house"],
    },
    sprite: "poi_hotel",
    color: Color.poi.consumer,
    description: "Hotel",
  },
  hostel: {
    classes: {
      lodging: ["hostel"],
    },
    sprite: "poi_hostel",
    color: Color.poi.consumer,
    description: "Hostel",
  },
  library: {
    classes: {
      library: ["library"],
    },
    sprite: "poi_book_upright",
    color: Color.poi.infrastructure,
    description: "Library",
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
  museum: {
    classes: {
      museum: ["museum"],
    },
    sprite: "poi_museum",
    color: Color.poi.attraction,
    description: "Museum",
  },
  parking: {
    classes: {
      parking: ["parking"],
    },
    sprite: "poi_p",
    color: Color.poi.infrastructure,
    description: "Parking",
  },
  police: {
    classes: {
      police: ["police"],
    },
    sprite: "poi_police_shield",
    color: Color.poi.infrastructure,
    description: "Police station",
  },
  post_office: {
    classes: {
      post: ["post_office"],
    },
    sprite: "poi_envelope",
    color: Color.poi.infrastructure,
    description: "Post office",
  },
  pow_buddhist: {
    classes: {
      place_of_worship: ["buddhist"],
    },
    sprite: "poi_pow_buddhist",
    color: Color.poi.infrastructure,
    description: "Buddhist place of worship",
  },
  pow_christian: {
    classes: {
      place_of_worship: ["christian"],
    },
    sprite: "poi_pow_christian",
    color: Color.poi.infrastructure,
    description: "Christian place of worship",
  },
  pow_hindu: {
    classes: {
      place_of_worship: ["hindu"],
    },
    sprite: "poi_pow_hindu",
    color: Color.poi.infrastructure,
    description: "Hindu place of worship",
  },
  pow_jewish: {
    classes: {
      place_of_worship: ["jewish"],
    },
    sprite: "poi_pow_jewish",
    color: Color.poi.infrastructure,
    description: "Jewish place of worship",
  },
  pow_muslim: {
    classes: {
      place_of_worship: ["muslim"],
    },
    sprite: "poi_pow_muslim",
    color: Color.poi.infrastructure,
    description: "Muslim place of worship",
  },
  pow_sikh: {
    classes: {
      place_of_worship: ["sikh"],
    },
    sprite: "poi_pow_sikh",
    color: Color.poi.infrastructure,
    description: "Sikh place of worship",
  },
  pow_shinto: {
    classes: {
      place_of_worship: ["shinto"],
    },
    sprite: "poi_pow_shinto",
    color: Color.poi.infrastructure,
    description: "Shinto place of worship",
  },
  pow_taoist: {
    classes: {
      place_of_worship: ["taoist"],
    },
    sprite: "poi_pow_taoist",
    color: Color.poi.infrastructure,
    description: "Taoist place of worship",
  },
  pow_uu: {
    classes: {
      place_of_worship: ["unitarian_universalist"],
    },
    sprite: "poi_pow_uu",
    color: Color.poi.infrastructure,
    description: "Unitarian Universalist place of worship",
  },
  railway_station: {
    classes: {
      railway: ["station", "halt"],
    },
    sprite: "poi_rail_circle",
    color: Color.poi.transport,
    description: "Train or subway station",
  },
  rail_subway_station: {
    classes: {
      railway: ["subway"],
    },
    sprite: "poi_rail_circle",
    color: Color.poi.transport,
    description: "Train or subway station",
  },
  railway_stop: {
    classes: {
      railway: ["tram_stop"],
    },
    sprite: "poi_rail",
    color: Color.poi.transport,
    description: "Tram stop",
  },
  restaurant: {
    classes: {
      restaurant: ["restaurant"],
      fast_food: ["fast_food"],
    },
    sprite: "poi_restaurant",
    color: Color.poi.consumer,
    description: "Restaurant or fast food",
  },
  school: {
    classes: {
      school: ["kindergarten", "school"],
    },
    sprite: "poi_school",
    color: Color.poi.infrastructure,
    description: "School",
  },
  supermarket: {
    classes: {
      grocery: ["supermarket"],
    },
    sprite: "poi_supermarket",
    color: Color.poi.consumer,
    description: "Supermarket",
  },
  college: {
    classes: {
      college: ["college", "university"],
    },
    sprite: "poi_mortarboard",
    color: Color.poi.infrastructure,
    description: "College or university",
  },
  townhall: {
    classes: {
      town_hall: ["townhall"],
    },
    sprite: "poi_town_hall",
    color: Color.poi.infrastructure,
    description: "City hall",
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

function getClassSubclassGroups(groups, fallback) {
  let mapping = {};
  for (let [iconDefList, value] of groups) {
    for (let iconDef of iconDefList) {
      for (let cls in iconDef.classes) {
        if (!mapping[cls]) {
          mapping[cls] = ["match", ["get", "subclass"]];
        }
        mapping[cls].push(iconDef.classes[cls]);
        mapping[cls].push(value);
      }
    }
  }
  let out = [];
  for (let cls in mapping) {
    out.push(cls);
    out.push(mapping[cls].concat([fallback]));
  }
  return out;
}
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
      ["get", "class"],
      ...getClassSubclassGroups(
        [
          [
            [
              iconDefs.fuel,
              iconDefs.bar,
              iconDefs.bookstore,
              iconDefs.coffee,
              iconDefs.supermarket,
              iconDefs.car_shop,
              iconDefs.car_repair,
              iconDefs.food_court,
              iconDefs.hotel,
              iconDefs.hostel,
              iconDefs.restaurant,
              iconDefs.charging_station,
            ],
            Color.poi.consumer,
          ],
          [
            [
              iconDefs.aerialway_station,
              iconDefs.bus_station,
              iconDefs.bus_stop,
              iconDefs.railway_station,
              iconDefs.rail_subway_station,
              iconDefs.railway_stop,
              iconDefs.taxi,
            ],
            Color.poi.transport,
          ],
          [[iconDefs.museum], Color.poi.attraction],
          [
            [
              iconDefs.hospital,
              iconDefs.fire_station,
              iconDefs.parking,
              iconDefs.police,
              iconDefs.school,
              iconDefs.college,
              iconDefs.library,
              iconDefs.townhall,
              iconDefs.post_office,
              iconDefs.pow_christian,
              iconDefs.pow_buddhist,
              iconDefs.pow_hindu,
              iconDefs.pow_jewish,
              iconDefs.pow_muslim,
              iconDefs.pow_sikh,
              iconDefs.pow_shinto,
              iconDefs.pow_taoist,
              iconDefs.pow_uu,
            ],
            Color.poi.infrastructure,
          ],
          [[iconDefs.cemetery], Color.poi.outdoor],
        ],
        Color.poi.infrastructure //Fallback for match expression in helper function
      ),
      Color.poi.infrastructure, //Fallback for match expression here
    ],
  },
  filter: [
    ">=",
    ["zoom"],
    [
      "match",
      ["get", "class"],
      ...getClassSubclassGroups(
        [
          [[iconDefs.college], 10],
          [[iconDefs.railway_station], 12],
          [
            [
              iconDefs.aerialway_station,
              iconDefs.rail_subway_station,
              iconDefs.bus_station,
            ],
            14,
          ],
          [
            [
              iconDefs.bus_stop,
              iconDefs.fire_station,
              iconDefs.food_court,
              iconDefs.hospital,
              iconDefs.library,
              iconDefs.museum,
              iconDefs.police,
              iconDefs.fuel,
              iconDefs.post_office,
              iconDefs.pow_buddhist,
              iconDefs.pow_christian,
              iconDefs.pow_hindu,
              iconDefs.pow_jewish,
              iconDefs.pow_muslim,
              iconDefs.pow_sikh,
              iconDefs.pow_shinto,
              iconDefs.pow_taoist,
              iconDefs.pow_uu,
              iconDefs.school,
              iconDefs.supermarket,
              iconDefs.charging_station,
              iconDefs.railway_stop,
              iconDefs.townhall,
            ],
            15,
          ],
          [
            [
              iconDefs.bar,
              iconDefs.bookstore,
              iconDefs.coffee,
              iconDefs.car_shop,
              iconDefs.car_repair,
              iconDefs.taxi,
              iconDefs.hotel,
              iconDefs.hostel,
              iconDefs.restaurant,
            ],
            16,
          ],
          [[iconDefs.medical, iconDefs.parking, iconDefs.cemetery], 17],
        ],
        99 //Fallback for match expression in helper function
      ),
      99, //Fallback for match expression here
    ],
  ],

  //POIs that have no labels at lower zooms
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
    "text-field": [
      "step",
      ["zoom"],
      [
        "match",
        ["get", "class"],
        ...getClassSubclassGroups(
          [
            [
              [
                iconDefs.bus_stop,
                iconDefs.railway_stop,
                iconDefs.fuel,
                iconDefs.supermarket,
                iconDefs.food_court,
                iconDefs.charging_station,
              ],
              "",
            ],
          ],
          localizedName
        ),
        localizedName,
      ],
      16,
      [
        "match",
        ["get", "class"],
        ...getClassSubclassGroups([[[iconDefs.bus_stop], ""]], localizedName),
        localizedName,
      ],
      17,
      localizedName,
    ],
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

// POIs that have no icon at lower zooms
export const iconlessPoi = {
  id: "iconless_poi",
  type: "symbol",
  paint: {
    "text-halo-color": Color.parkLabelHalo,
    "text-halo-width": 1,
    "icon-halo-width": 0.4,
    "text-halo-blur": 1,
    "icon-halo-blur": 0.2,
    "text-color": Color.parkLabel,
  },
  filter: ["all", ["<", ["zoom"], 17], ["==", ["get", "subclass"], "cemetery"]],
  layout: {
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    "text-field": localizedName,
    "text-anchor": "center",
    "text-justify": "center",
    "text-radial-offset": 0,
    "text-max-width": 5,
    "text-padding": 0,
    "symbol-sort-key": ["get", "rank"],
  },
  source: "openmaptiles",
  "source-layer": "poi",
};

export const legendEntries = Object.values(
  // Dedupicates entries that have the same sprite, color, and description but appear at multiple zoom levels
  Object.entries(iconDefs).reduce((unique_list, [id, def]) => {
    const duplicate_key = `${def.sprite}|${def.color}|${def.description}`;

    if (!unique_list[duplicate_key]) {
      unique_list[duplicate_key] = {
        description: def.description,
        classes: { ...def.classes },
      };
    } else {
      Object.entries(def.classes).forEach(([cls, subclasses]) => {
        if (!unique_list[duplicate_key].classes[cls]) {
          unique_list[duplicate_key].classes[cls] = subclasses;
        } else {
          unique_list[duplicate_key].classes[cls] = [
            ...new Set([
              ...unique_list[duplicate_key].classes[cls],
              ...subclasses,
            ]),
          ];
        }
      });
    }

    return unique_list;
  }, {})
).map(({ description, classes }) => ({
  description,
  layers: [poi.id],
  filter: [
    "all",
    ["in", ["get", "class"], ["literal", Object.keys(classes)]],
    ["in", ["get", "subclass"], ["literal", Object.values(classes).flat()]],
  ],
}));
