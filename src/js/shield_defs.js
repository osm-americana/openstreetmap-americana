"use strict";

import * as Color from "../constants/color.js";
import {
  textConstraint,
  homePlateDownShield,
  octagonVerticalShield,
  hexagonHorizontalShield,
  hexagonVerticalShield,
  homePlateUpShield,
  ovalShield,
  circleShield,
  roundedRectShield,
  pillShield,
  trapezoidUpShield,
  trapezoidDownShield,
  pentagonUpShield,
  diamondShield,
  triangleDownShield,
  escutcheonDownShield,
  fishheadDownShield,
  banneredShield,
  paBeltShield,
  bransonRouteShield,
} from "@americana/maplibre-shield-generator";

export function loadShields() {
  const shields = {};

  // Multi-use shields

  // Triangle shields
  let triangleConvexDownShield = {
    spriteBlank: ["shield_tri_convex_2", "shield_tri_convex_3"],
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 1,
      bottom: 5,
    },
  };

  let triangleConvexDownShieldBlue = {
    ...triangleConvexDownShield,
    textColor: Color.shields.white,
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.blue,
  };

  let triangleConvexDownShieldRedBlue = {
    ...triangleConvexDownShieldBlue,
    colorLighten: Color.shields.blue,
    colorDarken: Color.shields.red,
  };

  let triangleConvexUpShield = {
    ...triangleConvexDownShield,
    verticalReflect: true,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 1,
    },
  };

  // Other common shield shapes
  let badgeShield = {
    spriteBlank: ["shield_badge_2", "shield_badge_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 5,
    },
  };

  let badgeShieldCrossbar = {
    spriteBlank: ["shield_badge_crossbar_2", "shield_badge_crossbar_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 6,
      bottom: 4,
    },
  };

  // Default

  shields["default"] = {
    textColor: Color.shields.black,
    textHaloColor: Color.backgroundFill,
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
  };

  // NORTH AMERICA

  // Canada
  shields["CA:transcanada"] = {
    spriteBlank: ["shield_ca_tch_2", "shield_ca_tch_3"],
    textColor: Color.shields.green,
    padding: {
      left: 5,
      right: 5,
      top: 7,
      bottom: 5,
    },
  };
  shields["CA:transcanada:namedRoute"] = {
    noref: {
      spriteBlank: "shield_ca_tch_2",
    },
  };

  // Alberta
  shields["CA:AB:primary"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:AB:secondary"] = ovalShield(
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    30
  );

  // British Columbia
  shields["CA:BC"] = {
    spriteBlank: ["shield_ca_bc_2", "shield_ca_bc_3"],
    textColor: Color.shields.blue,
    padding: {
      left: 3,
      right: 3,
      top: 5.5,
      bottom: 4.5,
    },
  };

  // Manitoba
  shields["CA:MB:PTH"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:MB:PR"] = ovalShield(
    Color.shields.black,
    Color.shields.white,
    Color.shields.white,
    30
  );
  shields["CA:MB:Winnipeg"] = trapezoidDownShield(
    10,
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    2
  );

  // New Brunswick
  shields["CA:NB:tertiary"] = {
    spriteBlank: "shield_ca_nb",
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 5,
      top: 5,
      bottom: 5,
    },
  };
  shields["CA:NB:secondary"] = {
    ...shields["CA:NB:tertiary"],
    colorLighten: Color.shields.blue,
  };
  shields["CA:NB:primary"] = {
    ...shields["CA:NB:tertiary"],
    colorLighten: Color.shields.green,
  };

  // Newfoundland and Labrador
  shields["CA:NL"] = roundedRectShield(
    Color.shields.white,
    Color.shields.green,
    Color.shields.black
  );

  // Nova Scotia
  shields["CA:NS:H"] = escutcheonDownShield(
    12,
    Color.shields.blue,
    Color.shields.white
  );
  shields["CA:NS:T"] = badgeShield;
  shields["CA:NS:R"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.white
  );

  // Northwest Territories
  shields["CA:NT"] = {
    spriteBlank: "shield_ca_nt",
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 9,
      bottom: 3,
    },
  };

  // Ontario
  shields["CA:ON:primary"] = {
    spriteBlank: "shield_ca_on_primary",
    textColor: Color.shields.black,
    padding: {
      left: 3.5,
      right: 3.5,
      top: 6,
      bottom: 2,
    },
  };
  shields["CA:ON:primary:Toll"] = {
    ...shields["CA:ON:primary"],
    textColor: Color.shields.white,
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.blue,
  };
  shields["CA:ON:private_toll"] = banneredShield(
    pillShield(Color.shields.white, Color.shields.blue, Color.shields.black),
    ["ETR"]
  );
  shields["CA:ON:secondary"] = trapezoidUpShield(
    10,
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:ON:tertiary"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:ON:Halton"] = trapezoidDownShield(
    10,
    Color.shields.green,
    Color.shields.yellow
  );
  shields["CA:ON:Peel"] = trapezoidDownShield(
    10,
    Color.shields.black,
    Color.shields.yellow
  );
  shields["CA:ON:Simcoe"] = trapezoidDownShield(
    10,
    Color.shields.white,
    Color.shields.blue
  );
  ["Grey", "Hamilton", "Niagara"].forEach(
    (county) =>
      (shields[`CA:ON:${county}`] = trapezoidDownShield(
        10,
        Color.shields.blue,
        Color.shields.white
      ))
  );
  [
    "Brant",
    "Bruce",
    "Chatham-Kent",
    "Cornwall",
    "Dufferin",
    "Durham",
    "Elgin",
    "Essex",
    "Frontenac:Central Frontenac",
    "Frontenac:Frontenac Islands",
    "Frontenac:North Frontenac",
    "Frontenac:South Frontenac",
    "Greater Sudbury",
    "Haldimand",
    "Haliburton",
    "Hastings:Carlow/Mayo",
    "Hastings:Hastings Highlands",
    "Hastings:Limerick",
    "Hastings:Tyendinaga",
    "Huron",
    "Kawartha Lakes",
    "Kingston",
    "Lambton",
    "Lanark",
    "Leeds and Grenville",
    "Lennox and Addington",
    "Middlesex",
    "Muskoka",
    "Norfolk",
    "Northumberland",
    "Ottawa",
    "Oxford",
    "Perth",
    "Peterborough",
    "Prescott and Russell",
    "Prince Edward",
    "Quinte West",
    "Renfrew",
    "Stormont, Dundas and Glengarry",
    "Waterloo",
    "Wellington",
    "York",
  ].forEach(
    (countyTownshipOrCity) =>
      (shields[`CA:ON:${countyTownshipOrCity}`] = trapezoidDownShield(
        10,
        Color.shields.white,
        Color.shields.black
      ))
  );
  shields["CA:ON:Hastings:Wollaston"] = banneredShield(
    roundedRectShield(Color.shields.white, Color.shields.black),
    ["TWP"]
  );
  shields["CA:ON:Waterloo:Wellesley"] = ovalShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:ON:Waterloo:Woolwich"] = ovalShield(
    Color.shields.white,
    Color.shields.black
  );
  ["North Dumfries", "Wilmot"].forEach(
    (township) =>
      (shields[`CA:ON:Waterloo:${township}`] = banneredShield(
        shields["CA:ON:Waterloo"],
        ["TWP"]
      ))
  );
  ["Brant", "Durham", "Haldimand", "Norfolk"].forEach(
    (county) =>
      (shields[`CA:ON:${county}:Highway`] = banneredShield(
        shields[`CA:ON:${county}`],
        ["HWY"]
      ))
  );
  shields["CA:ON:Muskoka:West"] = banneredShield(shields["CA:ON:Muskoka"], [
    "WEST",
  ]);

  // Prince Edward Island
  shields["CA:PE"] = {
    spriteBlank: "shield_ca_pe",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  // Quebec
  shields["CA:QC:A"] = {
    spriteBlank: ["shield_ca_qc_a_2", "shield_ca_qc_a_3"],
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5.5,
      bottom: 4.5,
    },
  };
  shields["CA:QC:R"] = {
    spriteBlank: "shield_ca_qc_r",
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  // Saskatchewan
  shields["CA:SK:primary"] = homePlateDownShield(
    5,
    Color.shields.blue,
    Color.shields.white
  );
  shields["CA:SK:secondary"] = {
    spriteBlank: "shield_ca_sk_secondary",
    textColor: Color.shields.green,
    padding: {
      left: 2,
      right: 2,
      top: 11,
      bottom: 2,
    },
  };
  shields["CA:SK:tertiary"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.blue
  );

  // Yukon
  shields["CA:YT"] = roundedRectShield(Color.shields.white, Color.shields.red);

  // Haiti
  shields["HT:RN-road"] = shields["HT:RD-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Mexico

  // Carreteras Federales
  shields["MX:MX"] = {
    spriteBlank: "shield_mx_mx",
    padding: {
      left: 2,
      right: 2,
      top: 3,
      bottom: 2,
    },
  };

  // United States

  // Interstate Highways
  shields["US:I"] = {
    spriteBlank: ["shield_us_interstate_2", "shield_us_interstate_3"],
    textLayout: textConstraint("southHalfEllipse"),
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 5,
      bottom: 5,
    },
  };

  shields["US:I:Alternate"] = banneredShield(shields["US:I"], ["ALT"]);
  shields["US:I:Future"] = banneredShield(shields["US:I"], ["FUT"]);
  shields["US:I:Truck"] = banneredShield(shields["US:I"], ["TRK"]);
  shields["US:I:Express"] = banneredShield(shields["US:I"], ["EXPR"]);
  shields["US:I:Express:Toll"] = shields["US:I:Express"];

  shields["US:I:Business:Loop"] = {
    ...shields["US:I"],
    spriteBlank: [
      "shield_us_interstate_business_2",
      "shield_us_interstate_business_3",
    ],
  };

  shields["US:I:Business:Spur"] = shields["US:I:Business:Loop"];
  shields["US:I:Downtown:Loop"] = shields["US:I:Business:Loop"];
  shields["US:I:Downtown:Spur"] = shields["US:I:Business:Spur"];

  // US Highways
  shields["US:US"] = badgeShield;

  shields["US:US:Truck"] = banneredShield(shields["US:US"], ["TRK"]);
  shields["US:US:Truck:Bypass"] = banneredShield(shields["US:US"], [
    "TRK",
    "BYP",
  ]);

  shields["US:US:Spur"] = banneredShield(shields["US:US"], ["SPUR"]);

  shields["US:US:Connector"] = banneredShield(shields["US:US"], ["CONN"]);

  shields["US:US:Bypass"] = banneredShield(shields["US:US"], ["BYP"]);

  shields["US:US:Business"] = banneredShield(shields["US:US"], ["BUS"]);
  shields["US:US:Business:Alternate"] = banneredShield(shields["US:US"], [
    "BUS",
    "ALT",
  ]);
  shields["US:US:Business:Truck"] = banneredShield(shields["US:US"], [
    "BUS",
    "TRK",
  ]);

  shields["US:US:Alternate"] = banneredShield(shields["US:US"], ["ALT"]);
  shields["US:US:Alternate:Truck:Business"] = banneredShield(shields["US:US"], [
    "ALT",
    "TRK",
    "BUS",
  ]);

  shields["US:US:Historic"] = banneredShield(
    {
      ...badgeShieldCrossbar,
      textColor: Color.shields.brown,
      colorLighten: Color.shields.brown,
    },
    ["HIST"],
    Color.shields.brown
  );

  // Federal Agencies
  shields["US:BIA"] = {
    spriteBlank: "shield_us_bia",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 1,
      right: 1,
      top: 3,
      bottom: 5,
    },
  };

  shields["US:NPS:Blue_Ridge"] = {
    noref: {
      spriteBlank: "shield_us_nps_brp",
    },
  };

  shields["US:NPS:Natchez_Trace"] = {
    noref: {
      spriteBlank: "shield_us_nps_ntp",
    },
  };

  shields["US:GRR"] = {
    noref: {
      spriteBlank: "shield_us_grr",
    },
  };

  shields["US:GLST"] = {
    noref: {
      spriteBlank: "shield_us_glst",
    },
  };

  shields["GLCT"] = {
    notext: true,
  };

  shields["GLCT:Loop"] = banneredShield(
    shields["GLCT"],
    ["LOOP"],
    Color.shields.brown
  );

  // Alaska
  shields["US:AK"] = {
    spriteBlank: "shield_us_ak",
    textColor: Color.shields.black,
    padding: {
      left: 5.5,
      right: 1.5,
      top: 1.5,
      bottom: 9,
    },
  };

  // Alabama
  shields["US:AL"] = {
    spriteBlank: ["shield_us_al_2", "shield_us_al_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 6,
    },
  };
  shields["US:AL:Truck"] = banneredShield(shields["US:AL"], ["TRK"]);
  [
    "Autauga",
    "Baldwin",
    "Barbour",
    "Bibb",
    "Blount",
    "Bullock",
    "Butler",
    "Calhoun",
    "Chambers",
    "Cherokee",
    "Chilton",
    "Choctaw",
    "Clarke",
    "Clay",
    "Cleburne",
    "Coffee",
    "Colbert",
    "Conecuh",
    "Coosa",
    "Covington",
    "Crenshaw",
    "Cullman",
    "Dale",
    "Dallas",
    "DeKalb",
    "Elmore",
    "Escambia",
    "Etowah",
    "Fayette",
    "Franklin",
    "Geneva",
    "Greene",
    "Hale",
    "Henry",
    "Houston",
    "Jackson",
    "Jefferson",
    "Lamar",
    "Lauderdale",
    "Lawrence",
    "Lee",
    "Limestone",
    "Lowndes",
    "Macon",
    "Madison",
    "Marengo",
    "Marion",
    "Marshall",
    "Mobile",
    "Monroe",
    "Montgomery",
    "Morgan",
    "Perry",
    "Pike",
    "Pikens",
    "Randolph",
    "Russell",
    "Shelby",
    "Saint_Clair",
    "Sumter",
    "Talladega",
    "Tallapoosa",
    "Tuscaloosa",
    "Walker",
    "Washington",
    "Wilcox",
    "Winston",
  ].forEach(
    (county) =>
      (shields[`US:AL:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Arkansas
  shields["US:AR"] = {
    spriteBlank: ["shield_us_ar_2", "shield_us_ar_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 4,
      top: 4,
      bottom: 5,
    },
  };
  [
    "Calhoun",
    "Carroll",
    "Clay",
    "Columbia",
    "Craighead",
    "Cross",
    "Dallas",
    "Greene",
    "Hempstead",
    "Jackson",
    "Jefferson",
    "Johnson",
    "Lafayette",
    "Lawrence",
    "Little_River",
    "Madison",
    "Miller",
    "Mississippi",
    "Nevada",
    "Ouachita",
    "Phillips",
    "Polk",
    "Saint_Francis",
    "Union",
    "Washington",
    "Woodruff",
  ].forEach(
    (county) =>
      (shields[`US:AR:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Lee", "Izard"].forEach(
    (county) =>
      (shields[`US:AR:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  shields["US:AR:Baxter"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  shields["US:AS"] = {
    spriteBlank: "shield_us_as",
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 9.5,
      bottom: 2,
    },
  };

  shields["US:AZ"] = {
    spriteBlank: ["shield_us_az_2", "shield_us_az_3"],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 3,
      top: 3,
      bottom: 4,
    },
  };
  shields["US:AZ:Spur"] = banneredShield(shields["US:AZ"], ["SPUR"]);
  shields["US:AZ:Loop"] = banneredShield(shields["US:AZ"], ["LOOP"]);
  shields["US:AZ:Business"] = banneredShield(shields["US:AZ"], ["BUS"]);
  ["Coconino", "Mohave", "Yavapai"].forEach(
    (county) =>
      (shields[`US:AZ:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:AZ:Apache"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // California
  shields["US:CA"] = {
    spriteBlank: ["shield_us_ca_2", "shield_us_ca_3"],
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 4,
    },
  };
  shields["US:CA:Business"] = banneredShield(
    shields["US:CA"],
    ["BUS"],
    Color.shields.green
  );
  shields["US:CA:CR"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );
  shields["US:CA:Mendocino"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );
  shields["US:CA:San_Francisco:49_Mile_Scenic_Drive"] = {
    spriteBlank: "shield_us_ca_sf_49",
    notext: true,
  };

  // Colorado
  shields["US:CO"] = {
    spriteBlank: "shield_us_co",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 9.5,
      bottom: 2,
    },
  };
  shields["US:CO:E470"] = {
    spriteBlank: "shield_us_co_e470",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 10,
      bottom: 2,
    },
  };
  [
    "Archuleta",
    "Chaffee",
    "Conejos",
    "Grand",
    "Gunnison",
    "Jackson",
    "Lake",
    "La_Plata",
    "Larimer",
    "Moffat",
    "Park",
    "Rio_Blanco",
    "Rio_Grande",
    "Saguache",
    "San_Juan",
    "Teller",
  ].forEach(
    (county) =>
      (shields[`US:CO:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Fremont", "Ouray", "Routt"].forEach(
    (county) =>
      (shields[`US:CO:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  shields["US:CO:Douglas"] = pentagonUpShield(
    3,
    15,
    Color.shields.green,
    Color.shields.white
  );

  // Connecticut
  shields["US:CT"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  shields["US:CT:Parkway"] = {
    notext: true,
  };

  // Washington, D.C.
  shields["US:DC"] = {
    spriteBlank: "shield_us_dc",
    textColor: Color.shields.black,
    textHaloColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 10,
      bottom: 4,
    },
  };

  // Delaware
  shields["US:DE"] = ovalShield(Color.shields.white, Color.shields.black);
  shields["US:DE:Alternate"] = banneredShield(shields["US:DE"], ["ALT"]);
  shields["US:DE:Business"] = banneredShield(shields["US:DE"], ["BUS"]);
  shields["US:DE:Truck"] = banneredShield(shields["US:DE"], ["TRK"]);

  // Florida
  shields["US:FL"] = {
    spriteBlank: ["shield_us_fl_2", "shield_us_fl_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 4.5,
      top: 6,
      bottom: 4,
    },
  };
  shields["US:FL:Toll"] = {
    spriteBlank: "shield_us_fl_toll",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 5,
      top: 7.5,
      bottom: 4.5,
    },
  };
  shields["US:FL:Turnpike"] = {
    noref: {
      spriteBlank: "shield_us_fl_turnpike",
    },
  };
  shields["US:FL:CR"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );

  // Georgia
  shields["US:GA"] = {
    spriteBlank: ["shield_us_ga_2", "shield_us_ga_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 4,
      top: 5,
      bottom: 4,
    },
  };
  shields["US:GA:Truck:Bypass"] = banneredShield(shields["US:GA"], [
    "TRK",
    "BYP",
  ]);
  shields["US:GA:Spur"] = banneredShield(shields["US:GA"], ["SPUR"]);
  shields["US:GA:Loop"] = banneredShield(shields["US:GA"], ["LOOP"]);
  shields["US:GA:Connector"] = banneredShield(shields["US:GA"], ["CONN"]);
  shields["US:GA:Bypass"] = banneredShield(shields["US:GA"], ["BYP"]);
  shields["US:GA:Business"] = banneredShield(shields["US:GA"], ["BUS"]);
  shields["US:GA:Alternate"] = banneredShield(shields["US:GA"], ["ALT"]);

  // Guam
  shields["US:GU"] = {
    spriteBlank: ["shield_us_gu_2", "shield_us_gu_3"],
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.white,
    padding: {
      left: 1,
      right: 1,
      top: 4,
      bottom: 4,
    },
  };

  // Hawaii
  shields["US:HI"] = triangleConvexUpShield;

  // Iowa
  shields["US:IA"] = pillShield(Color.shields.white, Color.shields.black);
  shields["US:IA:CR"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );

  // Idaho
  shields["US:ID"] = {
    spriteBlank: ["shield_us_id_2", "shield_us_id_3"],
    textColor: Color.shields.black,
    padding: {
      left: 5.5,
      right: 1.5,
      top: 1.5,
      bottom: 9,
    },
  };

  // Illinois
  shields["US:IL"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  [
    "Adams",
    "Boone",
    "Bureau",
    "Champaign",
    "Christian",
    "Clay",
    "Clinton",
    "Coles",
    "Cumberland",
    "DeKalb",
    "De_Witt",
    "Douglas",
    "DuPage",
    "Edgar",
    "Effingham",
    "Fayette",
    "Henderson",
    "Henry",
    "Iroquois",
    "Kankakee",
    "Kendall",
    "Knox",
    "La_Salle",
    "Lake",
    "Livingston",
    "Logan",
    "McDonough",
    "McHenry",
    "McLean",
    "Macon",
    "Mason",
    "Menard",
    "Peoria",
    "Piatt",
    "Rock_Island",
    "Sangamon",
    "Schuyler",
    "Shelby",
    "Saint_Clair",
    "Winnebago",
    "Woodford",
  ].forEach(
    (county) =>
      (shields[`US:IL:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:IL:Cook:Chicago:Skyway"] = {
    noref: {
      spriteBlank: "shield_us_il_skyway",
    },
  };

  // Indiana
  shields["US:IN"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:IN:Toll"] = {
    noref: {
      spriteBlank: "shield_us_in_toll",
    },
  };
  shields["US:IN:JHMHT"] = {
    spriteBlank: ["shield_us_in_jhmht"],
    notext: true,
  };

  // Kansas
  shields["US:KS"] = {
    spriteBlank: ["shield_us_ks_2", "shield_us_ks_3"],
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };
  shields["US:KS:Turnpike"] = {
    noref: {
      spriteBlank: "shield_us_ks_turnpike",
    },
  };
  [
    "Clay",
    "Cowley",
    "Decatur",
    "Douglas",
    "Harvey",
    "Leavenworth",
    "Linn",
    "McPherson",
    "Ness",
    "Rawlins",
    "Riley",
    "Sheridan",
  ].forEach(
    (county) =>
      (shields[`US:KS:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Kentucky
  shields["US:KY"] = pillShield(Color.shields.white, Color.shields.black);
  shields["US:KY:Business"] = banneredShield(shields["US:KY"], ["BUS"]);
  shields["US:KY:AA"] = shields["US:KY:Parkway"] = {
    spriteBlank: "shield_us_ky_parkway",
    textColor: Color.shields.blue,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
  };

  // Louisiana
  shields["US:LA"] = {
    spriteBlank: ["shield_us_la_2", "shield_us_la_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2.5,
      right: 2.5,
      top: 7,
      bottom: 3,
    },
  };
  shields["US:LA:Business"] = banneredShield(shields["US:LA"], ["BUS"]);
  shields["US:LA:Spur"] = banneredShield(shields["US:LA"], ["SPUR"]);
  shields["US:LA:Truck"] = banneredShield(shields["US:LA"], ["TRK"]);
  [
    "Bienville",
    "Caddo",
    "Cameron",
    "De_Soto",
    "Grant",
    "Iberia",
    "Lincoln",
    "Livingston",
    "Natchitoches",
    "Ouachita",
    "Rapides",
    "Red_River",
    "Richland",
    "Saint_Mary",
    "Terrebonne",
    "Union",
    "Webster",
    "Winn",
  ].forEach(
    (county) =>
      (shields[`US:LA:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:LA:Causeway"] = {
    spriteBlank: "shield_us_la_causeway",
    notext: true,
  };

  // Massachusetts
  shields["US:MA"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:MA:Turnpike"] = {
    noref: {
      spriteBlank: "shield_us_ma_pike",
    },
  };

  // Maryland
  shields["US:MD"] = {
    spriteBlank: ["shield_us_md_2", "shield_us_md_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 2,
    },
  };
  shields["US:MD:Alternate"] = banneredShield(shields["US:MD"], ["ALT"]);
  shields["US:MD:Bypass"] = banneredShield(shields["US:MD"], ["BYP"]);
  shields["US:MD:Business"] = banneredShield(
    {
      ...shields["US:MD"],
      textColor: Color.shields.green,
      colorLighten: Color.shields.green,
    },
    ["BUS"],
    Color.shields.green
  );

  // Maine
  shields["US:ME"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:ME:Business"] = banneredShield(shields["US:ME"], ["BUS"]);
  shields["US:ME:Turnpike"] = {
    spriteBlank: "shield_us_me_turnpike",
    notext: true,
  };

  // Michigan
  shields["US:MI"] = diamondShield(Color.shields.white, Color.shields.black);
  shields["US:MI:Business"] = banneredShield(shields["US:MI"], ["BUS"]);
  shields["US:MI:Connector"] = banneredShield(shields["US:MI"], ["CONN"]);
  ["CR", "Benzie", "Gogebic", "Kalkaska", "Montcalm", "Roscommon"].forEach(
    (county) =>
      (shields[`US:MI:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Delta", "Manistee"].forEach(
    (county) =>
      (shields[`US:MI:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  ["Iron", "Luce", "Marquette", "Oscoda", "Schoolcraft"].forEach(
    (county) =>
      (shields[`US:MI:${county}`] = roundedRectShield(
        Color.shields.white,
        Color.shields.black
      ))
  );

  // Minnesota
  shields["US:MN"] = {
    spriteBlank: ["shield_us_mn_2", "shield_us_mn_3"],
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 7,
      bottom: 3,
    },
  };
  [
    "Aitkin",
    "Anoka",
    "Becker",
    "Beltrami",
    "Benton",
    "Big_Stone",
    "Blue_Earth",
    "Brown",
    "Carlton",
    "Carver",
    "Cass",
    "Chippewa",
    "Chisago",
    "Clay",
    "Clearwater",
    "Cook",
    "Cottonwood",
    "Crow_Wing",
    "Dakota",
    "Dodge",
    "Douglas",
    "Faribault",
    "Fillmore",
    "Freeborn",
    "Goodhue",
    "Grant",
    "Hennepin",
    "Houston",
    "Hubbard",
    "Isanti",
    "Itasca",
    "Jackson",
    "Kanabec",
    "Kandiyohi",
    "Kittson",
    "Koochiching",
    "Lac_qui_Parle",
    "Lake",
    "Lake_of_the_Woods",
    "Le_Sueur",
    "Lincoln",
    "Lyon",
    "Mahnomen",
    "Marshall",
    "Martin",
    "McLeod",
    "Meeker",
    "Mille_Lacs",
    "Morrison",
    "Mower",
    "Murray",
    "Nicollet",
    "Nobles",
    "Norman",
    "Olmsted",
    "Otter_Tail",
    "Pennington",
    "Pine",
    "Pipestone",
    "Polk",
    "Pope",
    "Ramsey",
    "Red_Lake",
    "Redwood",
    "Renville",
    "Rice",
    "Rock",
    "Roseau",
    "Saint_Louis",
    "Scott",
    "Sherburne",
    "Sibley",
    "Stearns",
    "Steele",
    "Stevens",
    "Swift",
    "Todd",
    "Traverse",
    "Wabasha",
    "Wadena",
    "Waseca",
    "Washington",
    "Watonwan",
    "Wilkin",
    "Winona",
    "Wright",
    "Yellow_Medicine",
  ].forEach(
    (county) =>
      ([
        shields[`US:MN:${county}:CSAH`],
        shields[`US:MN:${county}:CR`],
        shields[`US:MN:${county}:Park_Access`],
      ] = [
        pentagonUpShield(
          3,
          15,
          Color.shields.blue,
          Color.shields.yellow,
          Color.shields.white
        ),
        roundedRectShield(Color.shields.white, Color.shields.black),
        trapezoidDownShield(
          10,
          Color.shields.brown,
          Color.shields.white,
          Color.shields.white,
          2
        ),
      ])
  );

  // Missouri
  shields["US:MO"] = {
    spriteBlank: ["shield_us_mo_2", "shield_us_mo_3"],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 2,
      bottom: 5,
    },
  };
  shields["US:MO:Alternate"] = banneredShield(shields["US:MO"], ["ALT"]);
  shields["US:MO:Business"] = banneredShield(shields["US:MO"], ["BUS"]);
  shields["US:MO:Spur"] = banneredShield(shields["US:MO"], ["SPUR"]);
  shields["US:MO:Supplemental"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:MO:Supplemental:Spur"] = banneredShield(
    shields["US:MO:Supplemental"],
    ["SPUR"]
  );
  [
    "Bollinger",
    "Butler",
    "Cape_Girardeau",
    "Dunklin",
    "Madison",
    "Mississippi",
    "Perry",
    "Stoddard",
    "Taney",
    "Wayne",
  ].forEach(
    (county) =>
      (shields[`US:MO:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:MO:Lewis"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.white
  );
  shields["US:MO:Taney:Branson"] = {}; // See ref-specific cases below

  // Northern Mariana Islands
  shields["US:MP"] = {
    spriteBlank: ["shield_us_mp_2", "shield_us_mp_3"],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 2,
      bottom: 2,
    },
  };

  // Mississippi
  shields["US:MS"] = ovalShield(Color.shields.white, Color.shields.black);
  [
    "Alcorn",
    "Calhoun",
    "Carroll",
    "Lafayette",
    "Lee",
    "Prentiss",
    "Smith",
    "Tippah",
    "Union",
    "Yalobusha",
  ].forEach(
    (county) =>
      (shields[`US:MS:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Montana
  shields["US:MT"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:MT:secondary"] = {
    spriteBlank: "shield_us_mt_secondary",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 1,
      right: 1,
      top: 4,
      bottom: 8,
    },
  };
  ["Dawson", "Richland"].forEach(
    (county) =>
      (shields[`US:MT:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // North Carolina
  shields["US:NC"] = diamondShield(
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    2,
    24
  );
  shields["US:NC:Bypass"] = banneredShield(shields["US:NC"], ["BYP"]);
  shields["US:NC:Business"] = banneredShield(shields["US:NC"], ["BUS"]);
  shields["US:NC:Truck"] = banneredShield(shields["US:NC"], ["TRK"]);
  shields["US:NC:Mecklenburg:Charlotte"] = pentagonUpShield(
    3,
    15,
    Color.shields.green,
    Color.shields.white
  );

  // North Dakota
  shields["US:ND"] = {
    spriteBlank: ["shield_us_nd_2", "shield_us_nd_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 5,
      top: 4,
      bottom: 4,
    },
  };
  shields["US:ND:Alternate"] = banneredShield(shields["US:ND"], ["ALT"]);
  shields["US:ND:Business"] = banneredShield(shields["US:ND"], ["BUS"]);
  shields["US:ND:Truck"] = banneredShield(shields["US:ND"], ["TRK"]);
  [
    "Barnes",
    "Benson",
    "Bottineau",
    "Burke",
    "Cass",
    "Cavalier",
    "Dickey",
    "Divide",
    "Foster",
    "Grand_Forks",
    "Griggs",
    "LaMoure",
    "McHenry",
    "McIntosh",
    "McKenzie",
    "McLean",
    "Mercer",
    "Morton",
    "Mountrail",
    "Nelson",
    "Pembina",
    "Ramsey",
    "Ransom",
    "Renville",
    "Richland",
    "Sargent",
    "Sioux",
    "Steele",
    "Stutsman",
    "Traill",
    "Walsh",
    "Ward",
    "Wells",
    "Williams",
  ].forEach(
    (county) =>
      (shields[`US:ND:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Eddy", "Kidder"].forEach(
    (county) =>
      (shields[`US:ND:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  shields["US:ND:Towner"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Nebraska
  shields["US:NE"] = trapezoidDownShield(
    10,
    Color.shields.white,
    Color.shields.black
  );
  shields["US:NE:Business"] = banneredShield(shields["US:NE"], ["BUS"]);
  shields["US:NE:Link"] = banneredShield(shields["US:NE"], ["LINK"]);
  shields["US:NE:Rec"] = banneredShield(shields["US:NE"], ["REC"]);
  shields["US:NE:Spur"] = banneredShield(shields["US:NE"], ["SPUR"]);
  shields["US:NE:Truck"] = banneredShield(shields["US:NE"], ["TRK"]);
  shields["US:NE:Scenic"] = {
    spriteBlank: "shield_us_ne_byway_noref",
    notext: true,
  };

  // New Hampshire
  shields["US:NH"] = {
    spriteBlank: ["shield_us_nh_2", "shield_us_nh_3"],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 2,
      top: 4,
      bottom: 5,
    },
  };
  shields["US:NH:Bypass"] = banneredShield(shields["US:NH"], ["BYP"]);
  shields["US:NH:Turnpike"] = {
    notext: true,
  };

  // New Jersey
  shields["US:NJ"] = ovalShield(Color.shields.white, Color.shields.black);
  shields["US:NJ:ACE"] = {
    spriteBlank: "shield_us_nj_ace_noref",
    notext: true,
  };
  shields["US:NJ:ACE:Connector"] = banneredShield(
    shields["US:NJ:ACE"],
    ["CONN"],
    Color.shields.blue
  );
  shields["US:NJ:GSP"] = {
    spriteBlank: "shield_us_nj_gsp_noref",
    notext: true,
  };
  shields["US:NJ:NJTP"] = {
    spriteBlank: "shield_us_nj_njtp_noref",
    notext: true,
  };
  //New Jersey county routes with standard shields
  [
    "CR",
    "Atlantic",
    "Burlington",
    "Camden",
    "Cape_May",
    "Cumberland",
    "Essex",
    "Gloucester",
    "Hudson",
    "Hunterdon",
    "Mercer",
    "Middlesex",
    "Monmouth",
    "Morris",
    "Ocean",
    "Passaic",
    "Salem",
    "Somerset",
    "Sussex",
    "Union",
    "Warren",
  ].forEach(
    (county) =>
      (shields[`US:NJ:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:NJ:Bergen"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:NJ:CR:Spur"] = banneredShield(
    shields["US:NJ:CR"],
    ["SPUR"],
    Color.shields.blue
  );
  shields["US:NJ:CR:Truck"] = banneredShield(
    shields["US:NJ:CR"],
    ["TRK"],
    Color.shields.blue
  );

  // New Mexico
  shields["US:NM"] = pillShield(
    Color.shields.white,
    Color.shields.pink,
    Color.shields.black
  );
  shields["US:NM:Frontage"] = {
    spriteBlank: "shield_us_nm_frontage",
    textColor: Color.shields.black,
    padding: {
      left: 1.5,
      right: 1.5,
      top: 3,
      bottom: 5,
    },
  };
  [
    "Cibola",
    "Doña_Ana",
    "Eddy",
    "Guadalupe",
    "Lea",
    "Lincoln",
    "Luna",
    "McKinley",
    "Mora",
    "Otero",
    "Rio_Arriba",
    "Sandoval",
    "San_Juan",
    "Santa_Fe",
    "Sierra",
    "Taos",
    "Torrance",
    "Union",
  ].forEach(
    (county) =>
      (shields[`US:NM:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:NM:San_Juan:NCM"] = pentagonUpShield(
    3,
    15,
    Color.shields.white,
    Color.shields.pink
  );

  // Nevada
  shields["US:NV"] = {
    spriteBlank: "shield_us_nv",
    textColor: Color.shields.black,
    textLayout: textConstraint("triangleDown"),
    padding: {
      left: -2,
      right: -2,
      top: 2,
      bottom: 6,
    },
  };
  ["Clark", "Washoe"].forEach(
    (county) =>
      (shields[`US:NV:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // New York
  shields["US:NY"] = {
    spriteBlank: ["shield_us_ny_2", "shield_us_ny_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };
  shields["US:NY:Truck"] = banneredShield(shields["US:NY"], ["TRK"]);
  shields["US:NY:Thruway"] = {
    noref: {
      spriteBlank: "shield_us_ny_thruway",
    },
  };
  shields["US:NY:STE"] = {
    noref: {
      spriteBlank: "shield_us_ny_ste",
    },
  };
  shields["US:NY:Parkway"] = {
    ...shields["US:NY"],
    textColor: Color.shields.white,
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.green,
  };
  shields["US:NY:Parkway:LI"] = {
    spriteBlank: "shield_us_ny_parkway_li",
    textColor: Color.shields.black,
    padding: {
      left: 6,
      right: 2,
      top: 2,
      bottom: 8,
    },
  };
  shields["US:NY:Parkway:LOSP"] = {
    noref: {
      spriteBlank: "shield_us_ny_parkway_losp",
    },
  };
  shields["US:NY:Parkway:NYC"] = {
    spriteBlank: "shield_us_ny_parkway_nyc",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 8,
    },
  };
  [
    "Albany",
    "Allegany",
    "Broome",
    "Cattaraugus",
    "Chautauqua",
    "Chemung",
    "Chenango",
    "Clinton",
    "Columbia",
    "Delaware",
    "Dutchess",
    "Erie", // fallback for missing county-shaped shield
    "Essex",
    "Franklin",
    "Fulton",
    "Greene",
    "Hamilton",
    "Herkimer",
    "Jefferson",
    "Lewis",
    "Livingston",
    "Madison",
    "Montgomery",
    "Oneida",
    "Onondaga", // ref=57, unsigned_ref=91 (only)
    "Orange",
    "Oswego",
    "Otsego",
    "Putnam",
    "Rensselaer",
    "Rockland",
    "Saint_Lawrence",
    "Saratoga",
    "Schoharie",
    "Schuyler",
    "Steuben",
    "Suffolk",
    "Sullivan",
    "Tioga",
    "Tompkins",
    "Ulster",
    "Warren",
    "Washington",
    "Yates",
  ].forEach(
    (county) =>
      (shields[`US:NY:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Ohio
  shields["US:OH"] = {
    spriteBlank: ["shield_us_oh_2", "shield_us_oh_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 6,
    },
  };
  shields["US:OH:Bypass"] = banneredShield(shields["US:OH"], ["BYP"]);
  shields["US:OH:Business"] = banneredShield(shields["US:OH"], ["BUS"]);
  shields["US:OH:Turnpike"] = {
    spriteBlank: "shield_us_oh_turnpike",
    notext: true,
  };
  shields["US:OH:OEC"] = {
    spriteBlank: "shield_us_oh_oec",
    notext: true,
  };

  // Ohio county and township roads

  ["COL", "JEF", "MAH", "OTT", "SEN", "STA", "SUM", "TUS"].forEach(
    (county) =>
      (shields[`US:OH:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  [
    "CAR",
    "COS",
    "FAI",
    "FUL",
    "GAL",
    "HAS",
    "HOC",
    "KNO",
    "LAW",
    "LIC",
    "LOG",
    "MAD",
    "MRG",
    "MRW",
    "PER",
    "UNI",
    "WAY",
    "BEL:Kirkwood",
    "HAR:Dudley",
    "JEF:Springfield",
    "MED:Harrisville",
    "MED:Wadsworth",
    "SAN:Fremont",
    "TRU:Kinsman",
    "WYA:township",
  ].forEach(
    (countyTownshipOrCity) =>
      (shields[`US:OH:${countyTownshipOrCity}`] = roundedRectShield(
        Color.shields.white,
        Color.shields.black
      ))
  );
  [
    "ATH",
    "BEL",
    "GUE",
    "HAR",
    "HEN",
    "MOE",
    "PAU",
    "WAS",
    "WIL",
    "WYA",
    "COS:Jackson",
    "FAI:Greenfield",
    "HOL:Berlin",
    "HOL:Clark",
    "HOL:Knox",
    "HOL:Monroe", // No black border in reality, but a border is needed for contrast.
    "HOL:Paint",
    "HOL:Salt_Creek",
    "JEF:Knox",
    "LOG:Bokescreek",
    "LOG:Pleasant",
    "LOG:Washington",
    "MED:Sharon",
    "MRG:York",
    "MRW:Bennington",
    "MRW:Chester",
    "MRW:Franklin",
    "PER:Bearfield",
    "PER:Hopewell",
    "WAY:East_Union",
  ].forEach(
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  ["MED", "NOB", "WAY:Paint", "WAY:Salt_Creek"].forEach(
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        Color.shields.blue,
        Color.shields.white
      ))
  );
  ["TRU", "VIN", "COS:Adams"].forEach(
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        Color.shields.yellow,
        Color.shields.black
      ))
  );
  shields["US:OH:ASD"] = {
    spriteBlank: ["shield_us_oh_asd"],
    textColor: Color.shields.green,
    textLayout: textConstraint("triangleDown"),
    padding: {
      left: 1,
      right: 1,
      top: 4,
      bottom: 2,
    },
  };
  shields["US:OH:HOL"] = {
    spriteBlank: ["shield_us_oh_hol"],
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 3,
      top: 2,
      bottom: 2,
    },
  };
  shields["US:OH:SCI"] = {
    spriteBlank: ["shield_us_oh_sci_2", "shield_us_oh_sci_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 3,
      top: 4,
      bottom: 6,
    },
  };
  shields["US:OH:HOC:Falls"] = roundedRectShield(
    Color.shields.white,
    Color.shields.green,
    Color.shields.black
  );
  shields["US:OH:PER:Monday_Creek"] = roundedRectShield(
    Color.shields.green,
    Color.shields.black
  );
  shields["US:OH:TUS:Salem"] = {
    spriteBlank: ["shield_us_oh_tus_salem"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 4,
      top: 2,
      bottom: 5,
    },
  };

  // If a township's road shields have the same shape and color as the surrounding county's road shields,
  // add a banner to distinguish the township road shields from the more prominent county road shields.

  [
    ["ASD", "TWP"],
    ["ATH", "Trimble"],
    ["FAI", "Violet"],
    ["KNO", "Liberty"],
    ["KNO", "Milford"],
    ["LIC", "Jersey"],
    ["LOG", "Harrison"],
    ["LOG", "Jefferson"],
    ["LOG", "Lake"],
    ["LOG", "Liberty"],
    ["LOG", "McArthur"],
    ["LOG", "Miami"],
    ["LOG", "Monroe"],
    ["LOG", "Perry"],
    ["LOG", "Richland"],
    ["LOG", "Rushcreek"],
    ["LOG", "Stokes"],
    ["LOG", "Union"],
    ["MED", "York"],
    ["MRW", "Canaan"],
    ["MRW", "Harmony"],
    ["MRW", "South_Bloomfield"],
    ["MRW", "Westfield"],
    ["PAU", "Latty"],
    ["PAU", "Washington"],
    ["PER", "Coal"],
    ["WAS", "Aurelius"],
    ["WAS", "Salem"],
  ].forEach(
    (countyAndTownship) =>
      (shields[`US:OH:${countyAndTownship[0]}:${countyAndTownship[1]}`] =
        banneredShield(shields[`US:OH:${countyAndTownship[0]}`], ["TWP"]))
  );
  shields["US:OH:JHMHT"] = {
    spriteBlank: ["shield_us_oh_jhmht"],
    notext: true,
  };

  // Oklahoma
  shields["US:OK"] = {
    spriteBlank: ["shield_us_ok_2", "shield_us_ok_3"],
    textColor: Color.shields.black,
    textHaloColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 7,
      bottom: 3,
    },
  };
  shields["US:OK:Toll"] = shields["US:OK"];
  shields["US:OK:Business"] = banneredShield(shields["US:OK"], ["BUS"]);
  shields["US:OK:Loop"] = banneredShield(shields["US:OK"], ["LOOP"]);
  shields["US:OK:Spur"] = banneredShield(shields["US:OK"], ["SPUR"]);
  shields["US:OK:Truck"] = banneredShield(shields["US:OK"], ["TRK"]);
  shields["US:OK:Turnpike"] = {
    spriteBlank: "shield_us_ok_turnpike",
    notext: true,
  };

  // Oregon
  shields["US:OR"] = {
    spriteBlank: ["shield_us_or_2", "shield_us_or_3"],
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 4,
    },
  };
  shields["US:OR:Business"] = banneredShield(shields["US:OR"], ["BUS"]);
  ["Douglas", "Grant", "Lake", "Lane", "Morrow"].forEach(
    (county) =>
      (shields[`US:OR:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Pennsylvania
  shields["US:PA"] = {
    spriteBlank: ["shield_us_pa_2", "shield_us_pa_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
  };
  shields["US:PA:Truck"] = banneredShield(shields["US:PA"], ["TRK"]);
  shields["US:PA:Business"] = banneredShield(shields["US:PA"], ["BUS"]);
  shields["US:PA:Alternate"] = banneredShield(shields["US:PA"], ["ALT"]);
  shields["US:PA:Turnpike"] = {
    spriteBlank: ["shield_us_pa_2", "shield_us_pa_3"],
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.green,
    noref: {
      spriteBlank: "shield_us_pa_turnpike_noref",
      colorLighten: Color.shields.white,
      colorDarken: Color.shields.green,
    },
  };
  shields["US:PA:Allegheny:Belt"] = {}; // See ref-specific cases below

  // Puerto Rico
  shields["US:PR:primary"] = escutcheonDownShield(
    12,
    Color.shields.blue,
    Color.shields.white
  );
  shields["US:PR:primary_urban"] = escutcheonDownShield(
    12,
    Color.shields.white,
    Color.shields.black
  );
  shields["US:PR:secondary"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );
  shields["US:PR:tertiary"] = ovalShield(
    Color.shields.white,
    Color.shields.black
  );

  // Rhode Island
  shields["US:RI"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // South Carolina
  shields["US:SC"] = {
    spriteBlank: "shield_us_sc",
    textColor: Color.shields.blue,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 3,
    },
  };
  shields["US:SC:Truck"] = banneredShield(
    shields["US:SC"],
    ["TRK"],
    Color.shields.blue
  );
  shields["US:SC:Business"] = banneredShield(
    shields["US:SC"],
    ["BUS"],
    Color.shields.blue
  );
  shields["US:SC:Alternate"] = banneredShield(
    shields["US:SC"],
    ["ALT"],
    Color.shields.blue
  );

  // South Dakota
  shields["US:SD"] = {
    spriteBlank: ["shield_us_sd_2", "shield_us_sd_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 3,
      top: 3,
      bottom: 5,
    },
  };
  shields["US:SD:Business"] = banneredShield(shields["US:SD"], ["BUS"]);
  shields["US:SD:Truck"] = banneredShield(shields["US:SD"], ["TRK"]);
  shields["US:SD:Secondary"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  [
    "Beadle",
    "Bon_Homme",
    "Brookings",
    "Charles_Mix",
    "Clark",
    "Codington",
    "Corson",
    "Custer",
    "Day",
    "Deuel",
    "Edmunds",
    "Fall_River",
    "Faulk",
    "Grant",
    "Hamlin",
    "Harding",
    "Hyde",
    "Kingsbury",
    "Lake",
    "Lincoln",
    "McCook",
    "McPherson",
    "Marshall",
    "Meade",
    "Minnehaha",
    "Moody",
    "Perkins",
    "Roberts",
    "Spink",
    "Stanley",
    "Turner",
    "Union",
    "Yankton",
  ].forEach(
    (county) =>
      (shields[`US:SD:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Brown", "Tripp"].forEach(
    (county) =>
      (shields[`US:SD:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  shields["US:SD:Custer:CSP"] = {
    spriteBlank: "shield_us_sd_csp",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 8,
      right: 7,
      top: 2,
      bottom: 8,
    },
  };

  // Tennessee
  shields["US:TN:primary"] = {
    spriteBlank: "shield_us_tn_primary",
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 7,
    },
  };
  shields["US:TN:primary:Business"] = banneredShield(shields["US:TN:primary"], [
    "BUS",
  ]);
  shields["US:TN:primary:Bypass"] = banneredShield(shields["US:TN:primary"], [
    "BYP",
  ]);
  shields["US:TN:primary:Truck"] = banneredShield(shields["US:TN:primary"], [
    "TRK",
  ]);
  shields["US:TN:secondary"] = triangleDownShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:TN:secondary:Alternate"] = banneredShield(
    shields["US:TN:secondary"],
    ["ALT"]
  );
  shields["US:TN:secondary:Scenic"] = banneredShield(
    shields["US:TN:secondary"],
    ["SCEN"]
  );
  shields["US:TN:secondary:Truck"] = banneredShield(
    shields["US:TN:secondary"],
    ["TRK"]
  );
  shields["US:TN:McMinn"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );

  // Texas
  shields["US:TX"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:TX:Beltway"] = banneredShield(shields["US:TX"], ["BELT"]);
  shields["US:TX:Business"] = banneredShield(shields["US:TX"], ["BUS"]);
  shields["US:TX:Loop"] = banneredShield(shields["US:TX"], ["LOOP"]);
  shields["US:TX:NASA"] = banneredShield(shields["US:TX"], ["NASA"]);
  shields["US:TX:Park"] = banneredShield(shields["US:TX"], ["PARK"]);
  shields["US:TX:PA"] = banneredShield(shields["US:TX"], ["P.A."]);
  shields["US:TX:Spur"] = banneredShield(shields["US:TX"], ["SPUR"]);
  shields["US:TX:FM"] = shields["US:TX:RM"] = {
    spriteBlank: "shield_us_tx_outline",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 3,
      right: 0,
      top: 7,
      bottom: 10,
    },
  };
  shields["US:TX:FM:Business"] = banneredShield(shields["US:TX:FM"], ["BUS"]);
  shields["US:TX:Recreational"] = banneredShield(
    {
      ...shields["US:TX:FM"],
      textColor: Color.shields.brown,
      colorLighten: Color.shields.brown,
    },
    ["R"],
    Color.shields.brown
  );
  shields["US:TX:NASA"] = banneredShield(shields["US:TX"], ["NASA"]);

  // Texas toll roads
  shields["US:TX:Toll"] = shields["US:TX:NTTA"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["US:TX:Express:Toll"] = banneredShield(
    shields["US:TX:Toll"],
    ["EXPR"],
    Color.shields.blue
  );
  shields["US:TX:Loop:Toll"] = banneredShield(
    shields["US:TX:Toll"],
    ["LOOP"],
    Color.shields.blue
  );
  shields["US:TX:Loop:Express:Toll"] = banneredShield(
    shields["US:TX:Toll"],
    ["EXPR", "LOOP"],
    Color.shields.blue
  );
  shields["US:TX:CTRMA"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.yellow,
    Color.shields.white
  );
  shields["US:TX:CTRMA:Express"] = banneredShield(
    shields["US:TX:CTRMA"],
    ["EXPR"],
    Color.shields.blue
  );
  shields["US:TX:Montgomery:MCTRA"] = homePlateDownShield(
    5,
    Color.shields.blue,
    Color.shields.red,
    Color.shields.white
  );
  shields["US:TX:Fort_Bend:FBCTRA"] = {
    spriteBlank: "shield_us_tx_fbctra",
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 8,
    },
  };
  shields["US:TX:Harris:HCTRA"] = pentagonUpShield(
    3,
    15,
    Color.shields.purple,
    Color.shields.yellow,
    Color.shields.yellow,
    2,
    0,
    28
  );

  // Texas county roads
  [
    "Anderson",
    "Blanco",
    "Brooks",
    "Burnet",
    "Caldwell",
    "Grimes",
    "Jim_Wells",
    "Loving",
    "Mitchell",
    "Morris", // fallback for missing county-shaped shield
    "Panola",
    "Reeves",
    "Robertson",
    "Rusk",
    "Scurry",
    "Somervell",
    "Uvalde",
    "Winkler",
  ].forEach(
    (county) =>
      (shields[`US:TX:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  ["Brazoria", "Brown", "Burleson", "Colorado", "Comanche", "Houston"].forEach(
    (county) =>
      (shields[`US:TX:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  [
    "Cass",
    "Kent",
    "Kleberg",
    "Lavaca",
    "Milam",
    "Nolan",
    "Schleicher",
    "Shackelford",
    "Stonewall",
    "Sutton",
    "Ward",
  ].forEach(
    (county) =>
      (shields[`US:TX:${county}`] = banneredShield(
        roundedRectShield(Color.shields.white, Color.shields.black),
        ["CR"]
      ))
  );
  shields["US:TX:Jackson"] = banneredShield(
    roundedRectShield(Color.shields.blue, Color.shields.white),
    ["CR"],
    Color.shields.blue
  );
  shields["US:TX:Andrews:Andrews:Loop"] = banneredShield(
    roundedRectShield(Color.shields.white, Color.shields.blue),
    ["LOOP"],
    Color.shields.blue
  );

  // Utah
  shields["US:UT"] = {
    spriteBlank: ["shield_us_ut_2", "shield_us_ut_3"],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 5.5,
      bottom: 5,
    },
  };
  shields["US:UT:Wayne"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );

  // Virginia
  shields["US:VA"] = escutcheonDownShield(
    12,
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    2
  );
  shields["US:VA:Business"] = banneredShield(shields["US:VA"], ["BUS"]);
  shields["US:VA:Alternate"] = banneredShield(shields["US:VA"], ["ALT"]);
  shields["US:VA:Secondary"] = pillShield(
    Color.shields.white,
    Color.shields.black
  );

  // Virgin Islands
  shields["US:VI"] = pillShield(Color.shields.white, Color.shields.black);

  // Vermont
  shields["US:VT"] = {
    spriteBlank: ["shield_us_vt_2", "shield_us_vt_3"],
    textColor: Color.shields.green,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 2,
    },
  };
  shields["US:VT:Alternate"] = banneredShield(
    shields["US:VT"],
    ["ALT"],
    Color.shields.green
  );
  shields["US:VT:Truck"] = banneredShield(
    shields["US:VT"],
    ["TRK"],
    Color.shields.green
  );

  // Vermont routes town maintained sections - black and white ovals
  shields["US:VT:Town"] = ovalShield(Color.shields.white, Color.shields.black);

  // Washington (state)
  shields["US:WA"] = {
    spriteBlank: "shield_us_wa",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 2,
      right: 3,
      top: 2,
      bottom: 6,
    },
  };
  shields["US:WA:Spur"] = banneredShield(shields["US:WA"], ["SPUR"]);
  shields["US:WA:Business"] = banneredShield(shields["US:WA"], ["BUS"]);
  shields["US:WA:Alternate"] = banneredShield(shields["US:WA"], ["ALT"]);

  shields["US:WA:Asotin"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );

  // Wisconsin
  shields["US:WI"] = {
    spriteBlank: ["shield_us_wi_2", "shield_us_wi_3"],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 6,
    },
  };
  shields["US:WI:Business"] = banneredShield(shields["US:WI"], ["BUS"]);
  shields["US:WI:Spur"] = banneredShield(shields["US:WI"], ["SPUR"]);
  [
    "Adams",
    "Ashland",
    "Barron",
    "Bayfield",
    "Brown",
    "Buffalo",
    "Burnett",
    "Calumet",
    "Chippewa",
    "Clark",
    "Columbia",
    "Crawford",
    "Dane",
    "Dodge",
    "Door",
    "Douglas",
    "Dunn",
    "Eau_Claire",
    "Florence",
    "Fond_du_Lac",
    "Forest",
    "Grant",
    "Green",
    "Green_Lake",
    "Iowa",
    "Iron",
    "Jackson",
    "Jefferson",
    "Juneau",
    "Kenosha",
    "Kewaunee",
    "La_Crosse",
    "Lafayette",
    "Langlade",
    "Lincoln",
    "Manitowoc",
    "Marathon",
    "Marinette",
    "Marquette",
    "Menominee",
    "Milwaukee",
    "Monroe",
    "Oconto",
    "Oneida",
    "Outagamie",
    "Ozaukee",
    "Pepin",
    "Pierce",
    "Polk",
    "Portage",
    "Price",
    "Racine",
    "Richland",
    "Rock",
    "Rusk",
    "Saint_Croix",
    "Sauk",
    "Sawyer",
    "Shawano",
    "Sheboygan",
    "Taylor",
    "Trempealeau",
    "Vernon",
    "Vilas",
    "Walworth",
    "Washburn",
    "Washington",
    "Waukesha",
    "Waupaca",
    "Waushara",
    "Winnebago",
    "Wood",
  ].forEach(
    (county) =>
      (shields[`US:WI:${county}`] = roundedRectShield(
        Color.shields.white,
        Color.shields.black
      ))
  );
  shields["US:WI:Marquette:Truck"] = banneredShield(
    shields["US:WI:Marquette"],
    ["TRK"]
  );
  shields["US:WI:Rustic"] = {
    spriteBlank: "shield_us_wi_rustic",
    textColor: Color.shields.yellow,
    padding: {
      left: 1.5,
      right: 4,
      top: 9,
      bottom: 4,
    },
  };

  // West Virginia
  shields["US:WV"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:WV:County"] = pillShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:WV:HARP"] = homePlateUpShield(
    6,
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    0,
    0
  );

  // Wyoming
  shields["US:WY"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  [
    "Albany",
    "Big_Horn",
    "Carbon",
    "Converse",
    "Crook",
    "Fremont",
    "Hot_Springs",
    "Johnson",
    "Lincoln",
    "Natrona",
    "Niobrara",
    "Park",
    "Sheridan",
    "Sublette",
    "Sweetwater",
    "Uinta",
    "Washakie",
    "Weston",
  ].forEach(
    (county) =>
      (shields[`US:WY:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Multistate auto trails

  shields["US:LHT"] = {
    spriteBlank: "shield_us_lht",
    notext: true,
  };
  shields["US:ORSB"] = {
    spriteBlank: ["shield_us_orsb"],
    notext: true,
  };

  // SOUTH AMERICA

  // Chile
  shields["CL:national"] = {
    spriteBlank: ["shield_badge_2", "shield_badge_3"],
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 5,
    },
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.green,
  };
  shields["CL:regional"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );

  // Colombia
  shields["co:national"] = {
    spriteBlank: ["shield_co_national_2", "shield_co_national_3"],
    textLayout: textConstraint("southHalfEllipse"),
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 3,
      bottom: 7,
    },
  };

  // Uruguay
  shields["UY"] = homePlateDownShield(
    5,
    Color.shields.blue,
    Color.shields.white
  );

  // Venezuela
  [
    "AM",
    "AN",
    "AP",
    "AR",
    "BA",
    "BO",
    "CA",
    "CO",
    "DA",
    "DC",
    "FA",
    "GU",
    "LA",
    "ME",
    "MI",
    "MO",
    "NE",
    "PO",
    "SU",
    "TA",
    "TR",
    "VA",
    "YA",
    "ZU",
  ].forEach(
    (state) =>
      ([
        shields[`VE:T:${state}`],
        shields[`VE:L:${state}`],
        shields[`VE:R:${state}`],
      ] = [
        {
          spriteBlank: "shield_ve_t",
          textColor: Color.shields.black,
          padding: {
            left: 4,
            right: 4,
            top: 3,
            bottom: 5,
          },
        },
        circleShield(Color.shields.white, Color.shields.black),
        diamondShield(Color.shields.white, Color.shields.black),
      ])
  );

  // AFRICA

  // Algeria
  shields["DZ:highway"] = shields["DZ:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  shields["DZ:regional"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );

  // Ghana
  shields["GH:national"] =
    shields["GH:inter-regional"] =
    shields["GH:regional"] =
      roundedRectShield(Color.shields.yellow, Color.shields.black);

  // ASIA

  // Armenia
  shields["am:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Bangladesh
  shields["BD:national"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );
  shields["BD:regional"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );

  // China (mainland)
  shields["CN:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  shields["CN:expressway"] = {
    spriteBlank: [
      "shield_cn_expressway_2",
      "shield_cn_expressway_3",
      "shield_cn_expressway_4",
    ],
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 2,
    },
    colorLighten: Color.shields.red,
    colorDarken: Color.shields.green,
  };
  [
    "AH",
    "BJ",
    "CQ",
    "FJ",
    "GD",
    "GS",
    "GX",
    "GZ",
    "HA",
    "HB",
    "HE",
    "HI",
    "HL",
    "HN",
    "JL",
    "JS",
    "JX",
    "LN",
    "NM",
    "NX",
    "QH",
    "SC",
    "SD",
    "SH",
    "SN",
    "SX",
    "TJ",
    "XJ",
    "XZ",
    "YN",
    "ZJ",
  ].forEach((province) => {
    shields[`CN:${province}`] = roundedRectShield(
      Color.shields.yellow,
      Color.shields.black
    );
    shields[`CN:${province}:expressway`] = {
      spriteBlank: [
        "shield_cn_expressway_2",
        "shield_cn_expressway_3",
        "shield_cn_expressway_4",
      ],
      textColor: Color.shields.white,
      padding: {
        left: 2,
        right: 2,
        top: 6,
        bottom: 2,
      },
      colorLighten: Color.shields.yellow,
      colorDarken: Color.shields.green,
    };
  });
  [
    "FJ:Ningde",
    "GD:Gaozhou",
    "GD:Dianbai",
    "GD:Huazhou",
    "GD:Maoming",
    "GD:Maonan",
    "GD:Xinyi",
    "HA:Luoyang",
    "HA:Mengjin",
    "JS:Liyang",
    "JS:Xuzhou",
    "JS:Wuzhong",
  ].forEach(
    (county) =>
      (shields[`CN:${county}`] = roundedRectShield(
        Color.shields.white,
        Color.shields.black
      ))
  );

  // Hong Kong
  shields["HK"] = escutcheonDownShield(
    12,
    Color.shields.yellow,
    Color.shields.black
  );

  // India
  shields["IN:NH"] = {
    spriteBlank: ["shield_in_nh_2", "shield_in_nh_3", "shield_in_nh_4"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 3,
      bottom: 7,
    },
  };
  shields["IN:NE"] = banneredShield(
    {
      ...shields["IN:NH"],
      numberingSystem: "roman",
    },
    ["NE"]
  );

  // Indonesia
  shields["ID:national"] = {
    spriteBlank: ["shield_id_national"],
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 2,
    },
  };
  shields["ID:toll"] = banneredShield(shields["ID:national"], ["TOL"]);

  // Iran
  shields["ir:freeways"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Iraq
  shields["IQ:national"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Japan
  shields["JP:E"] = roundedRectShield(Color.shields.green, Color.shields.white);
  shields["JP:national"] = triangleConvexDownShieldBlue;
  shields["JP:prefectural"] = hexagonHorizontalShield(
    30,
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    2,
    24
  );
  [
    "aichi",
    "akita",
    "aomori",
    "chiba",
    "ehime",
    "fukui",
    "fukuoka",
    "fukushima",
    "gifu",
    "gunma",
    "hiroshima",
    "hokkaido",
    "hyogo",
    "ibaraki",
    "ishikawa",
    "iwate",
    "kagawa",
    "kagoshima",
    "kanagawa",
    "kochi",
    "kumamoto",
    "kyoto",
    "mie",
    "miyagi",
    "miyazaki",
    "nagano",
    "nagasaki",
    "nara",
    "niigata",
    "oita",
    "okayama",
    "okinawa",
    "osaka",
    "saga",
    "saitama",
    "shiga",
    "shimane",
    "shizuoka",
    "tochigi",
    "tokushima",
    "tokyo",
    "tottori",
    "toyama",
    "wakayama",
    "yamagata",
    "yamaguchi",
    "yamanashi",
  ].forEach((prefecture) => {
    shields[`JP:prefectural:${prefecture}`] = shields["JP:prefectural"];
  });

  // South Korea
  shields["KR:expressway"] = {
    spriteBlank: ["shield_kr_expressway_2", "shield_kr_expressway_3"],
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 4,
    },
  };
  shields["KR:national"] = ovalShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    30
  );
  shields["KR:local"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.white,
    Color.shields.blue
  );

  // Malaysia
  shields["MY:E"] = shields["my:federal"] = hexagonVerticalShield(
    3,
    Color.shields.yellow,
    Color.shields.black,
    Color.shields.black,
    2,
    34
  );

  // Nepal
  shields["np:national"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );
  shields["np:regional"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Philippines
  shields["PH:N"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.black
  );
  shields["PH:E"] = homePlateDownShield(
    5,
    Color.shields.yellow,
    Color.shields.black
  );

  // Pakistan
  shields["PK:national"] = hexagonHorizontalShield(
    30,
    Color.shields.blue,
    Color.shields.white
  );
  shields["PK:motorway"] = {
    spriteBlank: "shield_pk_motorway",
    textLayout: textConstraint("southHalfEllipse"),
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 7,
    },
  };

  // Turkey
  shields["TR:motorway"] = hexagonVerticalShield(
    2,
    Color.shields.orange,
    Color.shields.black,
    Color.shields.black,
    0,
    34
  );

  // Taiwan
  shields["TW:freeway"] = {
    spriteBlank: "shield_tw_freeway",
    textLayout: textConstraint("ellipse"),
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
  };
  shields["TW:provincial"] = triangleConvexDownShieldBlue;
  shields["TW:expressway"] = triangleConvexDownShieldRedBlue;
  ["city", "county", "district", "township"].forEach(
    (type) =>
      (shields[`TW:${type}`] = roundedRectShield(
        Color.shields.white,
        Color.shields.black
      ))
  );

  // Vietnam
  shields["vn:expressway"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  shields["vn:national"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // EUROPE
  shields["e-road"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Austria
  shields["AT:A-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  shields["AT:S-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Åland Islands
  shields["AX:main"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  shields["AX:province"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Bosnia and Herzegovina
  shields["ba:Autoceste"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    34
  );

  shields["ba:Magistralne ceste"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Belgium
  shields["BE:N-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["BE:A-road"] =
    shields["BE:B-road"] =
    shields["BE:R-road"] =
      roundedRectShield(Color.shields.white, Color.shields.black);

  // Bulgaria
  shields["bg:motorway"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    34
  );
  shields["bg:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Belarus
  shields["by:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Switzerland
  shields["ch:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Czechia
  shields["CZ:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    34
  );

  shields["cz:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Estonia
  shields["ee:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Spain
  shields["ES:A-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Finland
  // Valtatie/riksväg
  shields["fi:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  // Kantatie/stamväg
  shields["fi:trunk"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  // Seututie/regionalväg
  shields["fi:regional"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  // Yhdystie/förbindelseväg
  shields["fi:link"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // France
  shields["FR:A-road"] = shields["FR:N-road"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Germany
  shields["DE:national"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black,
    Color.shields.black,
    34
  );

  // Greece
  shields["GR:motorway"] = hexagonVerticalShield(
    3,
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    0,
    34
  );
  shields["GR:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Iceland
  shields["IS"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    34
  );

  // Ireland
  shields["omt-ie-motorway"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  shields["omt-ie-national"] = roundedRectShield(
    Color.shields.green,
    Color.shields.yellow
  );

  shields["omt-ie-regional"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Italy
  shields["IT:A-road"] = octagonVerticalShield(
    2,
    10,
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    0
  );

  // Kosovo
  shields["XK:motorway"] = hexagonVerticalShield(
    3,
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    0,
    34
  );

  // Lithuania
  shields["lt:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Luxembourg
  shields["LU:A-road"] = shields["LU:B-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["LU:N-road"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  shields["LU:CR-road"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );

  // Latvia
  shields["lv:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    34
  );
  shields["lv:regional"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Montenegro
  shields["ME:Magistralni putevi"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Netherlands
  // https://wiki.openstreetmap.org/wiki/The_Netherlands_road_network
  shields["NL:A"] = roundedRectShield(Color.shields.red, Color.shields.white);
  shields["NL:N"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  let nlCityRoute = {
    spriteBlank: "shield_nl_city",
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
  };
  [
    "Amsterdam",
    "Den Haag",
    "Nijmegen",
    "Parkstad",
    "Rotterdam",
    "Zaanstad",
  ].forEach((city) => (shields[`NL:S:${city}`] = nlCityRoute));
  shields["NL:binnenstedelijke_ring"] = nlCityRoute; // for both Netherlands and Curacao
  [
    "Ommen",
    "Schouwen",
    "Sluis",
    "Spaarnwoude",
    "Voorthuizen",
    "IJmuiden",
  ].forEach(
    (place) =>
      (shields[`NL:R:${place}`] = roundedRectShield(
        Color.shields.brown,
        Color.shields.white
      ))
  );

  // Poland
  shields["pl:motorways"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    34
  );
  shields["pl:expressways"] = shields["pl:motorways"];
  shields["pl:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Portugal
  shields["PT:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["PT:regional"] = shields["PT:national"];

  // Romania
  shields["RO:A"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Russia
  shields["ru:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Sweden
  [
    "RV", // Riksväg - national road
    "LV", // Länsväg - primary county road
    "AB", // Individual counties
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "K",
    "M",
    "N",
    "O",
    "S",
    "T",
    "U",
    "W",
    "X",
    "Y",
    "Z",
    "AC",
    "BD",
  ].forEach(
    (county_letter) =>
      (shields[`SE:${county_letter}`] = roundedRectShield(
        Color.shields.blue,
        Color.shields.white
      ))
  );
  // Lokal slinga - Local loops
  shields["SE:LS"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Slovenia
  shields["SI:AC"] = hexagonVerticalShield(
    3,
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    0,
    34
  );

  // Slovakia
  shields["sk:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    34
  );

  // Ukraine
  shields["ua:international"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // United Kingdom
  shields["omt-gb-motorway"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  shields["omt-gb-trunk"] = roundedRectShield(
    Color.shields.green,
    Color.shields.yellow
  );

  shields["omt-gb-primary"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // OCEANIA

  // Australia
  ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].forEach(
    (state_or_territory) => {
      shields[`AU:${state_or_territory}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.yellow
      );
      shields[`AU:${state_or_territory}:NH`] = homePlateDownShield(
        5,
        Color.shields.green,
        Color.shields.yellow
      );
      shields[`AU:${state_or_territory}:NR`] = homePlateDownShield(
        5,
        Color.shields.white,
        Color.shields.black
      );
      shields[`AU:${state_or_territory}:S`] = fishheadDownShield(
        Color.shields.blue,
        Color.shields.white
      );
      shields[`AU:${state_or_territory}:T`] = pentagonUpShield(
        3,
        15,
        Color.shields.brown,
        Color.shields.white,
        Color.shields.white,
        2,
        2
      );
      shields[`AU:${state_or_territory}:ALT`] = banneredShield(
        roundedRectShield(Color.shields.green, Color.shields.yellow),
        ["ALT"],
        Color.shields.green
      );
      shields[`AU:${state_or_territory}:ALT_NR`] = banneredShield(
        homePlateDownShield(5, Color.shields.white, Color.shields.black),
        ["ALT"]
      );
      shields[`AU:${state_or_territory}:ALT_S`] = banneredShield(
        fishheadDownShield(Color.shields.blue, Color.shields.white),
        ["ALT"],
        Color.shields.blue
      );
    }
  );

  shields["AU:QLD:MR"] = hexagonVerticalShield(
    4,
    Color.shields.white,
    Color.shields.blue,
    Color.shields.blue,
    0,
    20
  );
  shields["AU:QLD:SSTR"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.yellow
  );

  // New Zealand
  shields["NZ:SH"] = fishheadDownShield(Color.shields.red, Color.shields.white);
  shields["NZ:UR"] = homePlateDownShield(
    5,
    Color.shields.white,
    Color.shields.black
  );
  shields["NZ:WRR"] = circleShield(Color.shields.white, Color.shields.black);

  // Ref-specific cases. Each entry should be documented in CONTRIBUTE.md

  shields["CA:ON:primary"].overrideByRef = {
    QEW: {
      textColor: Color.shields.blue,
      colorLighten: Color.shields.blue,
      colorDarken: Color.shields.yellow,
    },
  };

  shields["CA:YT"].overrideByRef = {
    2: roundedRectShield(Color.shields.white, "#ce9d00"),
    3: roundedRectShield(Color.shields.white, "#ce9d00"),
    5: roundedRectShield(Color.shields.white, Color.shields.blue),
    6: roundedRectShield(Color.shields.white, Color.shields.green),
    11: roundedRectShield(Color.shields.white, Color.shields.blue),
  };

  shields["US:AR"].overrideByRef = {
    980: {
      textColor: Color.shields.white,
      colorLighten: Color.shields.white,
      colorDarken: Color.shields.blue,
    },
  };

  shields["US:GA"].overrideByRef = {
    515: {
      textColor: Color.shields.blue,
      colorLighten: Color.shields.blue,
    },
    520: {
      textColor: Color.shields.green,
      colorLighten: Color.shields.green,
    },
  };

  shields["US:KY:Parkway"].refsByName = {
    // FIXME: This object contains both spelled-out and abbreviated road
    // names to accommodate both the abbreviated names from OpenMapTiles and
    // the spelled-out names from Planetiler.
    // https://github.com/onthegomap/planetiler/issues/14
    "Audubon Parkway": "AU",
    "Bluegrass Parkway": "BG",
    "Bluegrass Pkwy": "BG",
    "Cumberland Parkway": "LN",
    "Cumberland Pkwy": "LN",
    "Hal Rogers Parkway": "HR",
    "Hal Rogers Pkwy": "HR",
    "Mountain Parkway": "MP",
    "Mountain Pkwy": "MP",
    "Purchase Parkway": "JC",
    "Purchase Pkwy": "JC",
    "Western Kentucky Parkway": "WK",
    "Western Kentucky Pkwy": "WK",
  };

  shields["US:CT:Parkway"].overrideByName = {
    "Merritt Parkway": {
      spriteBlank: "shield_us_ct_parkway_merritt",
    },
  };

  shields["US:MI"].overrideByRef = {
    185: diamondShield(
      Color.shields.brown,
      Color.shields.white,
      Color.shields.white,
      0,
      24
    ),
  };

  shields["US:MO:Taney:Branson"].overrideByRef = {
    "Red Route": bransonRouteShield(Color.shields.red, Color.shields.white),
    "Yellow Route": bransonRouteShield(
      Color.shields.yellow,
      Color.shields.green
    ),
    "Blue Route": bransonRouteShield(Color.shields.blue, Color.shields.white),
  };

  shields["US:NH:Turnpike"].overrideByName = {
    "Everett Turnpike": {
      spriteBlank: "shield_us_nh_turnpike",
      colorLighten: "#006747",
    },
    "Spaulding Turnpike": {
      spriteBlank: "shield_us_nh_turnpike",
      colorLighten: "#003F87",
    },
  };

  shields["US:NY:Parkway"].refsByName = {
    "Bear Mountain Parkway": "BMP",
    "Bronx and Pelham Parkway": "PP",
    "Bronx River Parkway": "BRP",
    "Cross County Parkway": "CCP",
    "Hutchinson River Parkway": "HRP",
    "Korean War Veterans Parkway": "KWVP",
    "Mosholu Parkway": "MP",
    "Niagara Scenic Parkway": "NSP",
    "Pelham Parkway": "PP",
    "Saw Mill River Parkway": "SMP",
    "Sprain Brook Parkway": "SBP",
    "Taconic State Parkway": "TSP",
  };

  shields["US:PA:Allegheny:Belt"].overrideByRef = {
    "Red Belt": paBeltShield(Color.shields.red, Color.shields.black),
    "Orange Belt": paBeltShield(Color.shields.orange, Color.shields.black),
    "Yellow Belt": paBeltShield(Color.shields.yellow, Color.shields.black),
    "Green Belt": paBeltShield(Color.shields.green, Color.shields.white),
    "Blue Belt": paBeltShield(Color.shields.blue, Color.shields.white),
    "Purple Belt": paBeltShield(Color.shields.purple, Color.shields.white),
  };

  shields["US:TX:Fort_Bend:FBCTRA"].refsByName = {
    "Fort Bend Parkway Toll Road": "FBP",
    "Fort Bend Westpark Tollway": "WPT",
  };
  shields["US:TX:Harris:HCTRA"].refsByName = {
    "East Sam Houston Tollway North": "SHT",
    "East Sam Houston Tollway South": "SHT",
    "North Sam Houston Tollway East": "SHT",
    "North Sam Houston Tollway West": "SHT",
    "South Sam Houston Tollway East": "SHT",
    "South Sam Houston Tollway West": "SHT",
    "West Sam Houston Tollway North": "SHT",
    "West Sam Houston Tollway South": "SHT",
    "Fort Bend Toll Road": "FBTR",
    "Hardy Toll Road": "HTR",
    "Tomball Tollway": "TBT",
    "Westpark Tollway": "WPT",
  };

  shields["GLCT"].overrideByRef = {
    LECT: {
      spriteBlank: "shield_glct_lect",
    },
    LHCT: {
      spriteBlank: "shield_glct_lhct",
    },
    LMCT: {
      spriteBlank: "shield_glct_lmct",
      colorLighten: Color.shields.green,
    },
    LSCT: {
      spriteBlank: "shield_glct_lsct",
    },
  };

  shields["GLCT:Loop"].overrideByRef = {
    LMCT: {
      spriteBlank: "shield_glct_lmct",
      colorLighten: Color.shields.brown,
    },
  };

  return {
    networks: shields,
    options: {
      bannerTextColor: Color.palette.black,
      bannerTextHaloColor: Color.backgroundFill,
      bannerHeight: 9,
      bannerPadding: 1,
      shieldFont:
        '"Noto Sans Condensed", "Noto Sans Armenian Condensed", sans-serif-condensed, "Arial Narrow", sans-serif',
      shieldSize: 20,
    },
  };
}
