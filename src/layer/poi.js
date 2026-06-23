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
      amenity: ["bar", "pub"],
    },
    sprite: "poi_martini_glass",
    color: Color.poi.consumer,
    description: "Bar or pub",
  },
  bookstore: {
    classes: {
      shop: ["books"],
    },
    sprite: "poi_book_upright",
    color: Color.poi.consumer,
    description: "Bookstore",
  },
  bus_station: {
    classes: {
      amenity: ["bus_station"],
    },
    sprite: "poi_bus_circle",
    color: Color.poi.transport,
    description: "Bus station",
  },
  bus_stop: {
    classes: {
      highway: ["bus_stop"],
    },
    sprite: "poi_bus",
    color: Color.poi.transport,
    description: "Bus stop",
  },
  car_repair: {
    classes: {
      shop: ["car_repair"],
    },
    sprite: "poi_car_repair",
    color: Color.poi.consumer,
    description: "Car mechanic",
  },
  car_shop: {
    classes: {
      shop: ["car"],
    },
    sprite: "poi_car_shop",
    color: Color.poi.consumer,
    description: "Car dealership",
  },
  cemetery: {
    classes: {
      amenity: ["grave_yard"],
      landuse: ["cemetery"],
    },
    sprite: "poi_gravestone",
    color: Color.poi.outdoor,
    description: "Cemetery",
  },
  charging_station: {
    classes: {
      amenity: ["charging_station"],
    },
    sprite: "poi_charging_station",
    color: Color.poi.consumer,
    description: "Charging station",
  },
  taxi: {
    classes: {
      amenity: ["taxi"],
    },
    sprite: "poi_taxi",
    color: Color.poi.transport,
    description: "Taxi stand",
  },
  coffee: {
    classes: {
      amenity: ["cafe"],
    },
    sprite: "poi_coffee_cup",
    color: Color.poi.consumer,
    description: "Coffee shop",
  },
  food_court: {
    classes: {
      amenity: ["food_court"],
    },
    sprite: "poi_restaurant_circle",
    color: Color.poi.consumer,
    description: "Food court",
  },
  fire_station: {
    classes: {
      amenity: ["fire_station"],
    },
    sprite: "poi_fire_station",
    color: Color.poi.infrastructure,
    description: "Fire station",
  },
  fuel: {
    classes: {
      amenity: ["fuel"],
    },
    sprite: "poi_fuel",
    color: Color.poi.consumer,
    description: "Gas station",
  },
  hospital: {
    classes: {
      amenity: ["hospital"],
    },
    sprite: "poi_hospital",
    color: Color.poi.infrastructure,
    description: "Hospital",
  },
  hotel: {
    classes: {
      tourism: ["hotel", "motel", "guest_house"],
    },
    sprite: "poi_hotel",
    color: Color.poi.consumer,
    description: "Hotel",
  },
  hostel: {
    classes: {
      tourism: ["hostel"],
    },
    sprite: "poi_hostel",
    color: Color.poi.consumer,
    description: "Hostel",
  },
  library: {
    classes: {
      amenity: ["library"],
    },
    sprite: "poi_book_upright",
    color: Color.poi.infrastructure,
    description: "Library",
  },
  medical: {
    classes: {
      amenity: ["clinic", "doctors"],
    },
    sprite: "poi_health_cross",
    color: Color.poi.infrastructure,
    description: "Doctor's office or clinic",
  },
  museum: {
    classes: {
      tourism: ["museum"],
    },
    sprite: "poi_museum",
    color: Color.poi.attraction,
    description: "Museum",
  },
  parking: {
    classes: {
      amenity: ["parking"],
    },
    sprite: "poi_p",
    color: Color.poi.infrastructure,
    description: "Parking",
  },
  police: {
    classes: {
      amenity: ["police"],
    },
    sprite: "poi_police_shield",
    color: Color.poi.infrastructure,
    description: "Police station",
  },
  post_office: {
    classes: {
      amenity: ["post_office"],
    },
    sprite: "poi_envelope",
    color: Color.poi.infrastructure,
    description: "Post office",
  },
  pow_buddhist: {
    classes: {
      religion: ["buddhist"],
    },
    sprite: "poi_pow_buddhist",
    color: Color.poi.infrastructure,
    description: "Buddhist place of worship",
  },
  pow_christian: {
    classes: {
      religion: ["christian"],
    },
    sprite: "poi_pow_christian",
    color: Color.poi.infrastructure,
    description: "Christian place of worship",
  },
  pow_hindu: {
    classes: {
      religion: ["hindu"],
    },
    sprite: "poi_pow_hindu",
    color: Color.poi.infrastructure,
    description: "Hindu place of worship",
  },
  pow_jewish: {
    classes: {
      religion: ["jewish"],
    },
    sprite: "poi_pow_jewish",
    color: Color.poi.infrastructure,
    description: "Jewish place of worship",
  },
  pow_muslim: {
    classes: {
      religion: ["muslim"],
    },
    sprite: "poi_pow_muslim",
    color: Color.poi.infrastructure,
    description: "Muslim place of worship",
  },
  pow_sikh: {
    classes: {
      religion: ["sikh"],
    },
    sprite: "poi_pow_sikh",
    color: Color.poi.infrastructure,
    description: "Sikh place of worship",
  },
  pow_shinto: {
    classes: {
      religion: ["shinto"],
    },
    sprite: "poi_pow_shinto",
    color: Color.poi.infrastructure,
    description: "Shinto place of worship",
  },
  pow_taoist: {
    classes: {
      religion: ["taoist"],
    },
    sprite: "poi_pow_taoist",
    color: Color.poi.infrastructure,
    description: "Taoist place of worship",
  },
  pow_uu: {
    classes: {
      religion: ["unitarian_universalist"],
    },
    sprite: "poi_pow_uu",
    color: Color.poi.infrastructure,
    description: "Unitarian Universalist place of worship",
  },
  railway_station: {
    classes: {
      railway: ["station", "halt", "subway"],
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
      amenity: ["restaurant", "fast_food"],
    },
    sprite: "poi_restaurant",
    color: Color.poi.consumer,
    description: "Restaurant or fast food",
  },
  school: {
    classes: {
      amenity: ["kindergarten", "school"],
    },
    sprite: "poi_school",
    color: Color.poi.infrastructure,
    description: "School",
  },
  supermarket: {
    classes: {
      shop: ["supermarket"],
    },
    sprite: "poi_supermarket",
    color: Color.poi.consumer,
    description: "Supermarket",
  },
  college: {
    classes: {
      amenity: ["college", "university"],
    },
    sprite: "poi_mortarboard",
    color: Color.poi.infrastructure,
    description: "College or university",
  },
  townhall: {
    classes: {
      amenity: ["townhall"],
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
        mapping[poiClass] = ["match", ["get", "type"]];
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
      ["get", "type"],
      [
        ...getSubclasses(iconDefs.fuel),
        ...getSubclasses(iconDefs.bar),
        ...getSubclasses(iconDefs.bookstore),
        ...getSubclasses(iconDefs.coffee),
        ...getSubclasses(iconDefs.supermarket),
        ...getSubclasses(iconDefs.car_shop),
        ...getSubclasses(iconDefs.car_repair),
        ...getSubclasses(iconDefs.food_court),
        ...getSubclasses(iconDefs.hotel),
        ...getSubclasses(iconDefs.hostel),
        ...getSubclasses(iconDefs.restaurant),
        ...getSubclasses(iconDefs.charging_station),
      ],
      Color.poi.consumer,
      [
        "bus_station",
        "bus_stop",
        ...getSubclasses(iconDefs.railway_station),
        ...getSubclasses(iconDefs.railway_stop),
        ...getSubclasses(iconDefs.taxi),
      ],
      Color.poi.transport,
      ["museum"],
      Color.poi.attraction,
      [
        "hospital",
        "fire_station",
        "parking",
        "police",
        "school",
        ...getSubclasses(iconDefs.college),
        "library",
        "townhall",
        ...getSubclasses(iconDefs.post_office),
        ...getSubclasses(iconDefs.pow_christian),
        ...getSubclasses(iconDefs.pow_buddhist),
        ...getSubclasses(iconDefs.pow_hindu),
        ...getSubclasses(iconDefs.pow_jewish),
        ...getSubclasses(iconDefs.pow_muslim),
        ...getSubclasses(iconDefs.pow_sikh),
        ...getSubclasses(iconDefs.pow_shinto),
        ...getSubclasses(iconDefs.pow_taoist),
        ...getSubclasses(iconDefs.pow_uu),
      ],
      Color.poi.infrastructure,
      [...getSubclasses(iconDefs.cemetery)],
      Color.poi.outdoor,
      Color.poi.infrastructure,
    ],
  },
  filter: [
    ">=",
    ["zoom"],
    [
      "match",
      ["get", "type"],
      [...getSubclasses(iconDefs.college)],
      10,
      ["station", "halt"],
      12,
      ["bus_station", "subway"],
      14,
      [
        "bus_stop",
        "fire_station",
        "food_court",
        "hospital",
        "library",
        "museum",
        "police",
        ...getSubclasses(iconDefs.fuel),
        ...getSubclasses(iconDefs.post_office),
        ...getSubclasses(iconDefs.pow_buddhist),
        ...getSubclasses(iconDefs.pow_christian),
        ...getSubclasses(iconDefs.pow_hindu),
        ...getSubclasses(iconDefs.pow_jewish),
        ...getSubclasses(iconDefs.pow_muslim),
        ...getSubclasses(iconDefs.pow_sikh),
        ...getSubclasses(iconDefs.pow_shinto),
        ...getSubclasses(iconDefs.pow_taoist),
        ...getSubclasses(iconDefs.pow_uu),
        ...getSubclasses(iconDefs.school),
        ...getSubclasses(iconDefs.supermarket),
        ...getSubclasses(iconDefs.charging_station),
        "townhall",
        "tram_stop",
      ],
      15,
      [
        ...getSubclasses(iconDefs.bar),
        ...getSubclasses(iconDefs.bookstore),
        ...getSubclasses(iconDefs.coffee),
        ...getSubclasses(iconDefs.car_shop),
        ...getSubclasses(iconDefs.car_repair),
        ...getSubclasses(iconDefs.taxi),
        ...getSubclasses(iconDefs.hotel),
        ...getSubclasses(iconDefs.hostel),
        ...getSubclasses(iconDefs.restaurant),
      ],
      16,
      ["clinic", "doctors", "parking", ...getSubclasses(iconDefs.cemetery)],
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
    "text-field": [
      "step",
      ["zoom"],
      [
        "match",
        ["get", "type"],
        [
          "bus_stop",
          "tram_stop",
          "fuel",
          "supermarket",
          "food_court",
          "charging_station",
        ],
        "",
        localizedName,
      ],
      16,
      ["match", ["get", "type"], ["bus_stop"], "", localizedName],
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
  },
  source: "ohm",
  "source-layer": "other_points_centroids",
};

export const amenity = {
  ...poi,
  id: "amenity",
  "source-layer": "amenity_points_centroids",
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
  filter: ["all", ["<", ["zoom"], 17], ["==", ["get", "type"], "cemetery"]],
  layout: {
    "text-font": ["Americana-Bold"],
    "text-size": 10,
    "text-field": localizedName,
    "text-anchor": "center",
    "text-justify": "center",
    "text-radial-offset": 0,
    "text-max-width": 5,
    "text-padding": 0,
    "symbol-sort-key": ["*", -1, ["get", "area_km2"]],
  },
  source: "ohm",
  "source-layer": "landuse_points_centroids",
};

export const legendEntries = Object.keys(iconDefs).map(function (id) {
  return {
    description: iconDefs[id].description,
    layers: [poi.id, amenity.id],
    filter: [
      "all",
      ["in", ["get", "class"], ["literal", Object.keys(iconDefs[id].classes)]],
      ["in", ["get", "type"], ["literal", getSubclasses(iconDefs[id])]],
    ],
  };
});
