import * as label from "../constants/label.js";
import * as Color from "../constants/color.js";

//Define which tile server attributes are associated with an icon.
var iconAttrs = {
  aerialway_station: {
    aerialway: ["station"],
  },
  bar: {
    bar: ["bar"],
    beer: ["beer", "pub"],
  },
  bookstore: {
    library: ["books"],
  },
  bus_station: {
    bus: ["bus_station"],
  },
  bus_stop: {
    bus: ["bus_stop"],
  },
  car_repair: {
    car: ["car_repair"],
  },
  car_shop: {
    car: ["car"],
  },
  charging_station: {
    fuel: ["charging_station"],
  },
  taxi: {
    office: ["taxi"],
  },
  coffee: {
    cafe: ["cafe"],
  },
  fuel: {
    fuel: ["fuel"],
  },
  fire_station: {
    fire_station: ["fire_station"],
  },
  hospital: {
    hospital: ["hospital"],
  },
  hotel: {
    lodging: ["hotel", "motel", "guest_house"],
  },
  hostel: {
    lodging: ["hostel"],
  },
  library: {
    library: ["library"],
  },
  medical: {
    hospital: ["clinic"],
    doctors: ["doctors"],
  },
  museum: {
    museum: ["museum"],
  },
  parking: {
    parking: ["parking"],
  },
  police: {
    police: ["police"],
  },
  post_office: {
    post: ["post_office"],
  },
  pow_buddhist: {
    place_of_worship: ["buddhist"],
  },
  pow_christian: {
    place_of_worship: ["christian"],
  },
  pow_hindu: {
    place_of_worship: ["hindu"],
  },
  pow_jewish: {
    place_of_worship: ["jewish"],
  },
  pow_muslim: {
    place_of_worship: ["muslim"],
  },
  pow_sikh: {
    place_of_worship: ["sikh"],
  },
  pow_shinto: {
    place_of_worship: ["shinto"],
  },
  pow_taoist: {
    place_of_worship: ["taoist"],
  },
  railway_station: {
    railway: ["station", "halt", "subway"],
  },
  railway_stop: {
    railway: ["tram_stop"],
  },
  restaurant: {
    restaurant: ["restaurant"],
    fast_food: ["fast_food", "food_court"],
  },
  school: {
    school: ["kindergarten", "school"],
  },
  supermarket: {
    grocery: ["supermarket"],
  },
  college: {
    college: ["college", "university"],
  },
  townhall: {
    town_hall: ["townhall"],
  },
};

//Define how the icon is displayed.
var iconDefs = {
  aerialway_station: {
    classes: iconAttrs.aerialway_station,
    sprite: "poi_aerialway_circle",
    color: Color.poi.transport,
    description: "Aerial lift station",
  },
  bar: {
    classes: iconAttrs.bar,
    sprite: "poi_martini_glass",
    color: Color.poi.consumer,
    description: "Bar or pub",
  },
  bookstore: {
    classes: iconAttrs.bookstore,
    sprite: "poi_book_upright",
    color: Color.poi.consumer,
    description: "Bookstore",
  },
  bus_station: {
    classes: iconAttrs.bus_station,
    sprite: "poi_bus_circle",
    color: Color.poi.transport,
    description: "Bus station",
  },
  bus_stop: {
    classes: iconAttrs.bus_stop,
    sprite: "poi_bus",
    color: Color.poi.transport,
    description: "Bus stop",
  },
  car_repair: {
    classes: iconAttrs.car_repair,
    sprite: "poi_car_repair",
    color: Color.poi.consumer,
    description: "Car mechanic",
  },
  car_shop: {
    classes: iconAttrs.car_shop,
    sprite: "poi_car_shop",
    color: Color.poi.consumer,
    description: "Car dealership",
  },
  charging_station: {
    classes: iconAttrs.charging_station,
    sprite: "poi_charging_station",
    color: Color.poi.consumer,
    description: "Charging station",
  },
  taxi: {
    classes: iconAttrs.taxi,
    sprite: "poi_taxi",
    color: Color.poi.transport,
    description: "Taxi stand",
  },
  coffee: {
    classes: iconAttrs.coffee,
    sprite: "poi_coffee_cup",
    color: Color.poi.consumer,
    description: "Coffee shop",
  },
  fuel: {
    classes: iconAttrs.fuel,
    sprite: "poi_fuel",
    color: Color.poi.consumer,
    description: "Gas station",
  },
  fire_station: {
    classes: iconAttrs.fire_station,
    sprite: "poi_fire_station",
    color: Color.poi.infrastructure,
    description: "Fire station",
  },
  hospital: {
    classes: iconAttrs.hospital,
    sprite: "poi_hospital",
    color: Color.poi.infrastructure,
    description: "Hospital",
  },
  hotel: {
    classes: iconAttrs.hotel,
    sprite: "poi_hotel",
    color: Color.poi.consumer,
    description: "Hotel",
  },
  hostel: {
    classes: iconAttrs.hostel,
    sprite: "poi_hostel",
    color: Color.poi.consumer,
    description: "Hostel",
  },
  library: {
    classes: iconAttrs.library,
    sprite: "poi_book_upright",
    color: Color.poi.infrastructure,
    description: "Library",
  },
  medical: {
    classes: iconAttrs.medical,
    sprite: "poi_health_cross",
    color: Color.poi.infrastructure,
    description: "Doctor's office or clinic",
  },
  museum: {
    classes: iconAttrs.museum,
    sprite: "poi_museum",
    color: Color.poi.attraction,
    description: "Museum",
  },
  parking: {
    classes: iconAttrs.parking,
    sprite: "poi_p",
    color: Color.poi.infrastructure,
    description: "Parking",
  },
  police: {
    classes: iconAttrs.police,
    sprite: "poi_police_shield",
    color: Color.poi.infrastructure,
    description: "Police station",
  },
  post_office: {
    classes: iconAttrs.post_office,
    sprite: "poi_envelope",
    color: Color.poi.infrastructure,
    description: "Post office",
  },
  pow_buddhist: {
    classes: iconAttrs.pow_buddhist,
    sprite: "poi_pow_buddhist",
    color: Color.poi.infrastructure,
    description: "Buddhist place of worship",
  },
  pow_christian: {
    classes: iconAttrs.pow_christian,
    sprite: "poi_pow_christian",
    color: Color.poi.infrastructure,
    description: "Christian place of worship",
  },
  pow_hindu: {
    classes: iconAttrs.pow_hindu,
    sprite: "poi_pow_hindu",
    color: Color.poi.infrastructure,
    description: "Hindu place of worship",
  },
  pow_jewish: {
    classes: iconAttrs.pow_jewish,
    sprite: "poi_pow_jewish",
    color: Color.poi.infrastructure,
    description: "Jewish place of worship",
  },
  pow_muslim: {
    classes: iconAttrs.pow_muslim,
    sprite: "poi_pow_muslim",
    color: Color.poi.infrastructure,
    description: "Muslim place of worship",
  },
  pow_sikh: {
    classes: iconAttrs.pow_sikh,
    sprite: "poi_pow_sikh",
    color: Color.poi.infrastructure,
    description: "Sikh place of worship",
  },
  pow_shinto: {
    classes: iconAttrs.pow_shinto,
    sprite: "poi_pow_shinto",
    color: Color.poi.infrastructure,
    description: "Shinto place of worship",
  },
  pow_taoist: {
    classes: iconAttrs.pow_taoist,
    sprite: "poi_pow_taoist",
    color: Color.poi.infrastructure,
    description: "Taoist place of worship",
  },
  railway_station: {
    classes: iconAttrs.railway_station,
    sprite: "poi_rail_circle",
    color: Color.poi.transport,
    description: "Train or subway station",
  },
  railway_stop: {
    classes: iconAttrs.railway_stop,
    sprite: "poi_rail",
    color: Color.poi.transport,
    description: "Tram stop",
  },
  restaurant: {
    classes: iconAttrs.restaurant,
    sprite: "poi_restaurant",
    color: Color.poi.consumer,
    description: "Restaurant or fast food",
  },
  school: {
    classes: iconAttrs.school,
    sprite: "poi_school",
    color: Color.poi.infrastructure,
    description: "School",
  },
  supermarket: {
    classes: iconAttrs.supermarket,
    sprite: "poi_supermarket",
    color: Color.poi.consumer,
    description: "Supermarket",
  },
  college: {
    classes: iconAttrs.college,
    sprite: "poi_mortarboard",
    color: Color.poi.infrastructure,
    description: "College or university",
  },
  townhall: {
    classes: iconAttrs.townhall,
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
      [
        ...getSubclasses(iconDefs.fuel),
        ...getSubclasses(iconDefs.bar),
        ...getSubclasses(iconDefs.bookstore),
        ...getSubclasses(iconDefs.coffee),
        ...getSubclasses(iconDefs.supermarket),
        ...getSubclasses(iconDefs.car_shop),
        ...getSubclasses(iconDefs.car_repair),
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
      ],
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
      [...getSubclasses(iconDefs.college)],
      10,
      ["station", "halt"],
      12,
      ["bus_station", "subway"],
      14,
      [
        "bus_stop",
        "fire_station",
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
    "text-field": [
      "step",
      ["zoom"],
      [
        "match",
        ["get", "subclass"],
        ["bus_stop", "tram_stop", "fuel", "supermarket", "charging_station"],
        "",
        label.localizedName,
      ],
      16,
      ["match", ["get", "subclass"], ["bus_stop"], "", label.localizedName],
      17,
      label.localizedName,
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
