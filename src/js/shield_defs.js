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
  shields["GLCT"] = {
    notext: true,
    overrideByRef: {
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
    },
  };
  shields["GLCT:Loop"] = {
    ...shields["GLCT"],
    banners: ["LOOP"],
    bannerTextColor: Color.shields.brown,
    overrideByRef: {
      LMCT: {
        spriteBlank: "shield_glct_lmct",
        colorLighten: Color.shields.brown,
      },
    },
  };

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
  shields["CA:NS:S"] = {
    notext: true,
    overrideByName: {
      "A. Murray MacKay Bridge": {
        spriteBlank: "shield_ca_ns_s_mkb",
      },
      "Angus L. MacDonald Bridge": {
        spriteBlank: "shield_ca_ns_s_mdb",
      },
      "Bras d'Or Lakes Scenic Drive": {
        spriteBlank: "shield_ca_ns_s_bdolsd",
      },
      "Ceilidh Trail": {
        spriteBlank: "shield_ca_ns_s_cet",
      },
      "Cabot Trail": {
        spriteBlank: "shield_ca_ns_s_ct",
      },
      "Digby Neck and Islands Scenic Drive": {
        spriteBlank: "shield_ca_ns_s_dnisd",
      },
      "Evangeline Trail": {
        spriteBlank: "shield_ca_ns_s_et",
      },
      "Fleur-de-lis Trail": {
        spriteBlank: "shield_ca_ns_s_fdlt",
      },
      "Glooscap Trail": {
        spriteBlank: "shield_ca_ns_s_gt",
      },
      "Kejimkujik Scenic Drive": {
        spriteBlank: "shield_ca_ns_s_ksd",
      },
      "Lighthouse Route": {
        spriteBlank: "shield_ca_ns_s_lr",
      },
      "Marine Drive": {
        spriteBlank: "shield_ca_ns_s_md",
      },
      "Marconi Trail": {
        spriteBlank: "shield_ca_ns_s_mt",
      },
      "Sunrise Trail": {
        spriteBlank: "shield_ca_ns_s_st",
      },
    },
  };

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
    overrideByRef: {
      QEW: {
        textColor: Color.shields.blue,
        colorLighten: Color.shields.blue,
        colorDarken: Color.shields.yellow,
      },
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
  shields["CA:ON:Hamilton:Expressway"] = {
    notext: true,
    overrideByName: {
      "Lincoln M. Alexander Parkway": {
        spriteBlank: "shield_ca_on_hamilton_blue",
      },
      "Red Hill Valley Parkway": {
        spriteBlank: "shield_ca_on_hamilton_green",
      },
    },
  };
  shields["CA:ON:Toronto:Expressway"] = {
    spriteBlank: "shield_ca_on_toronto",
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
    refsByName: {
      "Don Valley Parkway": "DV",
      "Gardiner Expressway": "G",
    },
  };

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
  shields["CA:YT"] = {
    ...roundedRectShield(Color.shields.white, Color.shields.red),
    overrideByRef: {
      2: roundedRectShield(Color.shields.white, "#ce9d00"),
      3: roundedRectShield(Color.shields.white, "#ce9d00"),
      5: roundedRectShield(Color.shields.white, Color.shields.blue),
      6: roundedRectShield(Color.shields.white, Color.shields.green),
      11: roundedRectShield(Color.shields.white, Color.shields.blue),
    },
  };

  // Haiti
  shields["HT:RN-road"] = shields["HT:RD-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Mexico

  // Carreteras Federales
  shields["MX:MX"] = {
    spriteBlank: ["shield_mx_mx_2", "shield_mx_mx_3", "shield_mx_mx_4"],
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 1,
      right: 1,
      top: 5,
      bottom: 4,
    },
  };
  [
    "AGS",
    "BC",
    "BCS",
    "CAMP",
    "COAH",
    "COL",
    "CHIS",
    "CHIH",
    "DGO",
    "GTO",
    "GRO",
    "HGO",
    "JAL",
    // FIXME missing State of Mexico
    "MICH",
    "MOR",
    "NAY",
    "NL",
    "OAX",
    "PUE",
    "QRO",
    "Q.ROO",
    "SLP",
    "SIN",
    "SON",
    "TAB",
    "TAM",
    "TLAX",
    "VER",
    "YUC",
    "ZAC",
  ].forEach(
    (state) =>
      (shields[`MX:${state}`] = {
        spriteBlank: ["shield_mx_state_2", "shield_mx_state_3"],
        textColor: Color.shields.black,
        padding: {
          left: 2,
          right: 2,
          top: 5.5,
          bottom: 4.5,
        },
      })
  );

  // Ejes Viales (CDMX)
  shields["MX:CDMX:EJE:CENTRAL"] = {
    noref: {
      spriteBlank: "shield_mx_cdmx_eje_central",
    },
  };
  shields["MX:CDMX:EJE:NTE"] = {
    spriteBlank: "shield_mx_cdmx_eje_nte",
    padding: {
      left: 2,
      right: 2,
      top: 8,
      bottom: 2,
    },
  };
  shields["MX:CDMX:EJE:OTE"] = {
    spriteBlank: "shield_mx_cdmx_eje_ote",
    padding: {
      left: 2,
      right: 8,
      top: 2,
      bottom: 2,
    },
  };
  shields["MX:CDMX:EJE:PTE"] = {
    spriteBlank: "shield_mx_cdmx_eje_pte",
    padding: {
      left: 8,
      right: 2,
      top: 2,
      bottom: 2,
    },
  };
  shields["MX:CDMX:EJE:SUR"] = {
    spriteBlank: "shield_mx_cdmx_eje_sur",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 8,
    },
  };

  // United States

  // Interstate Highways
  const usInterstateShield = {
    spriteBlank: ["shield_us_interstate_2", "shield_us_interstate_3"],
    textLayout: textConstraint("southHalfEllipse"),
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 5,
    },
  };
  shields["US:I"] = {
    ...usInterstateShield,
    bannerMap: {
      "US:I:Alternate": ["ALT"],
      "US:I:Express": ["EXPR"],
      "US:I:Express:Toll": ["EXPR"],
      "US:I:Future": ["FUT"],
      "US:I:Spur": ["SPUR"],
      "US:I:Truck": ["TRK"],
    },
  };

  shields["US:I:Business:Loop"] = {
    ...usInterstateShield,
    spriteBlank: [
      "shield_us_interstate_business_2",
      "shield_us_interstate_business_3",
    ],
  };

  shields["US:I:Business:Spur"] = shields["US:I:Business:Loop"];
  shields["US:I:Downtown:Loop"] = shields["US:I:Business:Loop"];
  shields["US:I:Downtown:Spur"] = shields["US:I:Business:Spur"];

  // US Highways
  shields["US:US"] = {
    ...badgeShield,
    bannerMap: {
      "US:US:Truck": ["TRK"],
      "US:US:Truck:Bypass": ["TRK", "BYP"],
      "US:US:Spur": ["SPUR"],
      "US:US:Connector": ["CONN"],
      "US:US:Bypass": ["BYP"],
      "US:US:Future": ["FUT"],
      "US:US:Business": ["BUS"],
      "US:US:Business:Alternate": ["BUS", "ALT"],
      "US:US:Business:Truck": ["BUS", "TRK"],
      "US:US:Alternate": ["ALT"],
      "US:US:Alternate:Truck:Business": ["ALT", "TRK", "BUS"],
    },
  };

  shields["US:US:Historic"] = banneredShield(
    {
      ...badgeShieldCrossbar,
      textColor: Color.shields.brown,
      colorLighten: Color.shields.brown,
    },
    ["HIST"],
    Color.shields.brown
  );

  // US Federal Agencies

  // Bureau of Indian Affairs
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

  // Department of Energy: see California
  // National Park Service
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
  shields["US:NHT"] = {
    notext: true,
    overrideByName: {
      "Oregon National Historic Trail Auto Tour Route": {
        spriteBlank: "shield_us_nht_oreg",
      },
      "Overmountain Victory National Historic Trail Commemorative Motor Route":
        {
          spriteBlank: "shield_us_nht_ovvi",
        },
      "Selma to Montgomery National Historic Trail": {
        spriteBlank: "shield_us_nht_semo",
      },
    },
  };

  // Other multistate routes

  // Great Lakes Seaway Trail
  shields["US:GLST"] = {
    noref: {
      spriteBlank: "shield_us_glst",
    },
  };

  // Great River Road
  shields["US:GRR"] = {
    noref: {
      spriteBlank: "shield_us_grr",
    },
  };

  // Lincoln Heritage Trail
  shields["US:LHT"] = {
    spriteBlank: "shield_us_lht",
    notext: true,
  };

  // Ohio River Scenic Byway
  shields["US:ORSB"] = {
    spriteBlank: ["shield_us_orsb"],
    notext: true,
  };

  // US States

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
    bannerMap: {
      "US:AL:Truck": ["TRK"],
    },
  };

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
  shields["US:AL:Baldwin:Baldwin_Beach_Express"] = {
    ...roundedRectShield(Color.shields.green, Color.shields.white),
    ref: "BBX",
  };
  shields["US:AL:Baldwin:Foley_Beach_Express"] = {
    spriteBlank: "shield_us_al_foley",
    notext: true,
  };

  // Arizona
  shields["US:AZ:Scenic"] = {
    spriteBlank: "shield_us_az_scenic",
    notext: true,
  };

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
    overrideByRef: {
      980: {
        textColor: Color.shields.white,
        colorLighten: Color.shields.white,
        colorDarken: Color.shields.blue,
      },
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
    bannerMap: {
      "US:AZ:Spur": ["SPUR"],
      "US:AZ:Loop": ["LOOP"],
      "US:AZ:Business": ["BUS"],
    },
  };

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
    bannerMap: {
      "US:CA:Business": ["BUS"],
    },
  };
  ["CR", "Nevada", "Sierra"].forEach(
    (county) =>
      (shields[`US:CA:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );
  shields["US:CA:Mendocino"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );
  shields["US:CA:San_Francisco:49_Mile_Scenic_Drive"] = {
    spriteBlank: "shield_us_ca_sf_49",
    notext: true,
  };

  // Department of Energy
  shields["US:DOE:Hanford"] = shields["US:CA"];

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
    "Arapahoe",
    "Archuleta",
    "Chaffee",
    "Clear_Creek",
    "Conejos",
    "Grand",
    "Gunnison",
    "Jackson",
    "Jefferson",
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
  shields["US:CO:Weld:WCP"] = {
    ...pentagonUpShield(3, 15, Color.shields.blue, Color.shields.green),
    textHaloColor: Color.shields.white,
  };

  // Connecticut
  shields["US:CT"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:CT:Parkway"] = {
    notext: true,
    overrideByName: {
      "Merritt Parkway": {
        spriteBlank: "shield_us_ct_parkway_merritt",
      },
    },
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
  shields["US:DE"] = {
    ...ovalShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:DE:Alternate": ["ALT"],
      "US:DE:Business": ["BUS"],
      "US:DE:Truck": ["TRK"],
    },
  };

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

  shields["US:DE"] = {
    ...ovalShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:DE:Alternate": ["ALT"],
      "US:DE:Business": ["BUS"],
      "US:DE:Truck": ["TRK"],
    },
  };

  shields["US:FL:CR"] = {
    ...pentagonUpShield(3, 15, Color.shields.blue, Color.shields.yellow),
    bannerMap: {
      "US:FL:CR:Truck": ["TRK"],
    },
  };

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
    bannerMap: {
      "US:GA:Truck:Bypass": ["TRK", "BYP"],
      "US:GA:Spur": ["SPUR"],
      "US:GA:Loop": ["LOOP"],
      "US:GA:Connector": ["CONN"],
      "US:GA:Bypass": ["BYP"],
      "US:GA:Business": ["BUS"],
      "US:GA:Alternate": ["ALT"],
    },
    overrideByRef: {
      515: {
        textColor: Color.shields.blue,
        colorLighten: Color.shields.blue,
      },
      520: {
        textColor: Color.shields.green,
        colorLighten: Color.shields.green,
      },
    },
  };

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
    bannerMap: {
      "US:ID:Business": ["BUS"],
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
  shields["US:KS:Truck"] = banneredShield(shields["US:KS"], ["TRK"]);
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
  shields["US:KY"] = {
    ...pillShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:KY:Business": ["BUS"],
    },
  };

  shields["US:KY:AA"] = shields["US:KY:Parkway"] = {
    spriteBlank: "shield_us_ky_parkway",
    textColor: Color.shields.blue,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
    refsByName: {
      "Audubon Parkway": "AU",
      "Bluegrass Parkway": "BG",
      "Cumberland Parkway": "LN",
      "Hal Rogers Parkway": "HR",
      "Mountain Parkway": "MP",
      "Purchase Parkway": "JC",
      "Western Kentucky Parkway": "WK",
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
    bannerMap: {
      "US:LA:Business": ["BUS"],
      "US:LA:Spur": ["SPUR"],
      "US:LA:Truck": ["TRK"],
    },
  };

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
    (parish) =>
      (shields[`US:LA:${parish}`] = pentagonUpShield(
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
  const marylandShield = {
    spriteBlank: ["shield_us_md_2", "shield_us_md_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 2,
    },
  };

  shields["US:MD"] = {
    ...marylandShield,
    bannerMap: {
      "US:MD:Alternate": ["ALT"],
      "US:MD:Bypass": ["BYP"],
    },
  };
  shields["US:MD:Business"] = banneredShield(
    {
      ...marylandShield,
      textColor: Color.shields.green,
      colorLighten: Color.shields.green,
    },
    ["BUS"],
    Color.shields.green
  );

  // Maine
  shields["US:ME"] = {
    ...roundedRectShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:ME:Business": ["BUS"],
    },
  };
  shields["US:ME:Turnpike"] = {
    spriteBlank: "shield_us_me_turnpike",
    notext: true,
  };

  // Michigan
  shields["US:MI"] = {
    ...diamondShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:MI:Business": ["BUS"],
      "US:MI:Connector": ["CONN"],
    },
    overrideByRef: {
      185: diamondShield(
        Color.shields.brown,
        Color.shields.white,
        Color.shields.white,
        0,
        24
      ),
    },
  };

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
  shields["US:MN:Intercounty"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.yellow,
    Color.shields.white
  );
  [
    "Brown",
    "Chisago",
    "Clearwater",
    "Cottonwood",
    "Dakota",
    "Freeborn",
    "Goodhue",
    "Isanti",
    "Jackson",
    "Kittson",
    "Lac_qui_Parle",
    "McLeod",
    "Meeker",
    "Morrison",
    "Nobles",
    "Norman",
    "Olmsted",
    "Otter_Tail",
    "Pennington",
    "Pine",
    "Pipestone",
    "Polk",
    "Red_Lake",
    "Redwood",
    "Renville",
    "Roseau",
    "Saint_Louis",
    "Sibley",
    "Stearns",
    "Stevens",
    "Todd",
    "Traverse",
    "Wabasha",
    "Wadena",
    "Washington",
    "Wright",
    "Yellow_Medicine",
  ].forEach(
    (county) =>
      ([shields[`US:MN:${county}:CSAH`], shields[`US:MN:${county}:CR`]] = [
        pentagonUpShield(
          3,
          15,
          Color.shields.blue,
          Color.shields.yellow,
          Color.shields.white
        ),
        roundedRectShield(Color.shields.white, Color.shields.black),
      ])
  );
  [
    "Anoka",
    "Blue_Earth",
    "Fillmore",
    "Hennepin",
    "Kandiyohi",
    "Lincoln",
    "Mower",
    "Murray",
    "Pope",
    "Ramsey",
    "Scott",
    "Wilkin",
  ].forEach((county) =>
    ["CSAH", "CR"].forEach(
      (network) =>
        (shields[`US:MN:${county}:${network}`] = pentagonUpShield(
          3,
          15,
          Color.shields.blue,
          Color.shields.yellow,
          Color.shields.white
        ))
    )
  );
  [
    "Aitkin",
    "Becker",
    "Beltrami",
    "Benton",
    "Big_Stone",
    "Carlton",
    "Carver",
    "Cass",
    "Chippewa",
    "Clay",
    "Cook",
    "Crow_Wing",
    "Dodge",
    "Douglas",
    "Faribault",
    "Grant",
    "Houston",
    "Hubbard",
    "Itasca",
    "Kanabec",
    "Koochiching",
    "Lake",
    "Lake_of_the_Woods",
    "Le_Sueur",
    "Lyon",
    "Mahnomen",
    "Marshall",
    "Martin",
    "Mille_Lacs",
    "Nicollet",
    "Rice",
    "Rock",
    "Sherburne",
    "Steele",
    "Swift",
    "Waseca",
    "Watonwan",
    "Winona",
  ].forEach((county) =>
    ["CSAH", "CR"].forEach(
      (network) =>
        (shields[`US:MN:${county}:${network}`] = roundedRectShield(
          Color.shields.white,
          Color.shields.black
        ))
    )
  );
  shields[`US:MN:Hennepin:Park_Access`] = trapezoidDownShield(
    10,
    Color.shields.brown,
    Color.shields.white,
    Color.shields.white,
    2
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
    bannerMap: {
      "US:MO:Alternate": ["ALT"],
      "US:MO:Business": ["BUS"],
      "US:MO:Spur": ["SPUR"],
    },
  };
  shields["US:MO:Supplemental"] = {
    ...roundedRectShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:MO:Supplemental:Spur": ["SPUR"],
    },
  };
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
  shields["US:MO:Taney:Branson"] = {
    overrideByRef: {
      "Red Route": bransonRouteShield(Color.shields.red, Color.shields.white),
      "Yellow Route": bransonRouteShield(
        Color.shields.yellow,
        Color.shields.green
      ),
      "Blue Route": bransonRouteShield(Color.shields.blue, Color.shields.white),
    },
  };

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
  shields["US:MS:Scenic"] = banneredShield(
    ovalShield(Color.shields.white, Color.shields.blue),
    ["SCEN"],
    Color.shields.blue
  );
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
  shields["US:NC"] = {
    ...diamondShield(
      Color.shields.white,
      Color.shields.black,
      Color.shields.black,
      2,
      24
    ),
    bannerMap: {
      "US:NC:Bypass": ["BYP"],
      "US:NC:Business": ["BUS"],
      "US:NC:Truck": ["TRK"],
    },
  };
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
    bannerMap: {
      "US:ND:Alternate": ["ALT"],
      "US:ND:Business": ["BUS"],
      "US:ND:Bypass": ["BYP"],
      "US:ND:Truck": ["TRK"],
    },
  };
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
  shields["US:NE"] = {
    ...trapezoidDownShield(10, Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:NE:Business": ["BUS"],
      "US:NE:Link": ["LINK"],
      "US:NE:Rec": ["REC"],
      "US:NE:Spur": ["SPUR"],
      "US:NE:Truck": ["TRK"],
    },
  };
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
    bannerMap: {
      "US:NH:Bypass": ["BYP"],
    },
  };
  shields["US:NH:Turnpike"] = {
    notext: true,
    overrideByName: {
      "Everett Turnpike": {
        spriteBlank: "shield_us_nh_turnpike",
        colorLighten: Color.shields.green,
      },
      "Spaulding Turnpike": {
        spriteBlank: "shield_us_nh_turnpike",
        colorLighten: Color.shields.blue,
      },
    },
  };

  // New Jersey
  shields["US:NJ"] = ovalShield(Color.shields.white, Color.shields.black);
  shields["US:NJ:ACE"] = {
    spriteBlank: "shield_us_nj_ace_noref",
    notext: true,
    bannerTextColor: Color.shields.blue,
    bannerMap: {
      "US:NJ:ACE:Connector": ["CONN"],
    },
  };
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
  ["Sussex", "Warren"].forEach(
    (county) =>
      (shields[`US:NJ:${county}:NPS`] = pillShield(
        Color.shields.brown,
        Color.shields.white
      ))
  );

  // New Mexico
  shields["US:NM"] = {
    spriteBlank: ["shield40_us_nm_2", "shield40_us_nm_3"],
    textColor: Color.shields.black,
    textLayout: textConstraint("ellipse"),
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
  };
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
  const usNewYorkShield = {
    spriteBlank: ["shield_us_ny_2", "shield_us_ny_3"],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };
  shields["US:NY"] = {
    ...usNewYorkShield,
    bannerMap: {
      "US:NY:Truck": ["TRK"],
    },
  };
  shields["US:NY:Inner_Loop"] = {
    ...trapezoidDownShield(
      10,
      Color.shields.white,
      Color.shields.black,
      Color.shields.black,
      4
    ),
    padding: {
      left: 4,
      right: 4,
      top: 3,
      bottom: 3,
    },
    ref: "LOOP",
  };
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
    ...usNewYorkShield,
    textColor: Color.shields.white,
    colorLighten: Color.shields.white,
    colorDarken: Color.shields.green,
    refsByName: {
      "Bear Mountain State Parkway": "BMP",
      "Bronx River Parkway": "BRP",
      "Cross County Parkway": "CCP",
      "Hutchinson River Parkway": "HRP",
      "Korean War Veterans Parkway": "KWVP",
      "Mosholu Parkway": "MP",
      "Niagara Scenic Parkway": "NSP",
      "Saw Mill River Parkway": "SMP",
      "Sprain Brook Parkway": "SBP",
      "Taconic State Parkway": "TSP",
    },
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
    bannerMap: {
      "US:OH:Bypass": ["BYP"],
      "US:OH:Business": ["BUS"],
    },
  };
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
    bannerMap: {
      "US:OK:Toll": [],
      "US:OK:Business": ["BUS"],
      "US:OK:Loop": ["LOOP"],
      "US:OK:Spur": ["SPUR"],
      "US:OK:Truck": ["TRK"],
    },
  };
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
    bannerMap: {
      "US:OR:Business": ["BUS"],
    },
  };
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
    bannerMap: {
      "US:PA:Truck": ["TRK"],
      "US:PA:Business": ["BUS"],
      "US:PA:Alternate": ["ALT"],
    },
  };
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
  shields["US:PA:Allegheny:Belt"] = {
    overrideByRef: {
      "Red Belt": paBeltShield(Color.shields.red, Color.shields.black),
      "Orange Belt": paBeltShield(Color.shields.orange, Color.shields.black),
      "Yellow Belt": paBeltShield(Color.shields.yellow, Color.shields.black),
      "Green Belt": paBeltShield(Color.shields.green, Color.shields.white),
      "Blue Belt": paBeltShield(Color.shields.blue, Color.shields.white),
      "Purple Belt": paBeltShield(Color.shields.purple, Color.shields.white),
    },
  };

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
    bannerTextColor: Color.shields.blue,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 3,
    },
    bannerMap: {
      "US:SC:Truck": ["TRK"],
      "US:SC:Business": ["BUS"],
      "US:SC:Alternate": ["ALT"],
      "US:SC:Connector": ["CONN"],
    },
  };

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
    bannerMap: {
      "US:SD:Business": ["BUS"],
      "US:SD:Truck": ["TRK"],
    },
  };
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
  shields["US:SD:Custer:NPS"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.yellow
  );

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
    bannerMap: {
      "US:TN:primary:Business": ["BUS"],
      "US:TN:primary:Bypass": ["BYP"],
      "US:TN:primary:Truck": ["TRK"],
    },
  };
  shields["US:TN:secondary"] = {
    ...triangleDownShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:TN:secondary:Alternate": ["ALT"],
      "US:TN:secondary:Scenic": ["SCEN"],
      "US:TN:secondary:Truck": ["TRK"],
    },
  };
  shields["US:TN:McMinn"] = pentagonUpShield(
    3,
    15,
    Color.shields.blue,
    Color.shields.yellow
  );

  // Texas
  const usTexasShapedShield = {
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

  shields["US:TX"] = {
    ...roundedRectShield(Color.shields.white, Color.shields.black),
    bannerMap: {
      "US:TX:Beltway": ["BELT"],
      "US:TX:Business": ["BUS"],
      "US:TX:Loop": ["LOOP"],
      "US:TX:NASA": ["NASA"],
      "US:TX:Park": ["PARK"],
      "US:TX:PA": ["P.A."],
      "US:TX:Spur": ["SPUR"],
    },
  };
  shields["US:TX:FM"] = shields["US:TX:RM"] = {
    ...usTexasShapedShield,
    bannerMap: {
      "US:TX:FM:Business": ["BUS"],
    },
  };
  shields["US:TX:Recreational"] = banneredShield(
    {
      ...usTexasShapedShield,
      textColor: Color.shields.brown,
      colorLighten: Color.shields.brown,
    },
    ["R"],
    Color.shields.brown
  );

  // Texas toll roads
  shields["US:TX:Toll"] = {
    ...roundedRectShield(Color.shields.blue, Color.shields.white),
    bannerTextColor: Color.shields.blue,
    bannerMap: {
      "US:TX:NTTA": [],
      "US:TX:Express:Toll": ["EXPR"],
      "US:TX:Loop:Toll": ["LOOP"],
      "US:TX:Loop:Express:Toll": ["EXPR", "LOOP"],
    },
  };

  shields["US:TX:CTRMA"] = {
    ...roundedRectShield(
      Color.shields.blue,
      Color.shields.yellow,
      Color.shields.white
    ),
    bannerMap: {
      "US:TX:CTRMA:Express": ["EXPR"],
    },
  };
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
    refsByName: {
      "Fort Bend Parkway Toll Road": "FBP",
      "Fort Bend Westpark Tollway": "WPT",
    },
  };
  shields["US:TX:Harris:HCTRA"] = {
    ...pentagonUpShield(3, 15, Color.shields.purple, Color.shields.yellow),
    refsByName: {
      "Sam Houston Tollway": "SHT",
      "Fort Bend Toll Road": "FBTR",
      "Hardy Toll Road": "HTR",
      "Tomball Tollway": "TBT",
      "Westpark Tollway": "WPT",
    },
  };

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
      top: 6,
      bottom: 5,
    },
  };
  ["FA", "Washington"].forEach(
    (county) =>
      (shields[`US:UT:${county}`] = pentagonUpShield(
        3,
        15,
        Color.shields.blue,
        Color.shields.yellow
      ))
  );

  // Virginia
  shields["US:VA"] = {
    ...escutcheonDownShield(
      12,
      Color.shields.white,
      Color.shields.black,
      Color.shields.black,
      2
    ),
    bannerMap: {
      "US:VA:Business": ["BUS"],
      "US:VA:Alternate": ["ALT"],
    },
  };
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
    bannerTextColor: Color.shields.green,
    bannerMap: {
      "US:VT:Alternate": ["ALT"],
      "US:VT:Truck": ["TRK"],
    },
  };

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
    bannerMap: {
      "US:WA:Spur": ["SPUR"],
      "US:WA:Business": ["BUS"],
      "US:WA:Alternate": ["ALT"],
    },
  };

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
    bannerMap: {
      "US:WI:Business": ["BUS"],
      "US:WI:Spur": ["SPUR"],
    },
  };
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
  shields["US:WI:Marquette"].bannerMap = {
    "US:WI:Marquette:Truck": ["TRK"],
  };
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

  // Bolivia
  shields["BO:fundamental"] = {
    ...badgeShieldCrossbar,
    colorDarken: Color.shields.green,
    colorLighten: Color.shields.white,
    textColor: Color.shields.white,
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
  shields["DZ:motorway"] = shields["DZ:national"] = roundedRectShield(
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

  // Madagascar
  shields["MG:RN-road"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Niger
  shields["NE:N-roads"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

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
    bannerMap: {
      "ID:toll": ["TOL"],
    },
  };

  // Iran
  shields["ir:freeway"] = roundedRectShield(
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
  shields["TR:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
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
  shields["VN:expressway"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  shields["VN:national"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // EUROPE
  shields["e-road"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
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
  shields["BE:VLG:Ring_Antwerpen"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );

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

  // Faroe Islands
  shields["FO"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black,
    Color.shields.black,
    34
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
  // Autoroutes/national routes
  shields["FR:A-road"] =
    shields["FR:N-road"] =
    shields["FR:971:N-road"] =
    shields["FR:972:A-road"] =
    shields["FR:972:N-road"] =
    shields["FR:973:N-road"] =
    shields["FR:974:N-road"] =
    shields["FR:975:N-road"] =
    shields["FR:976:N-road"] =
    shields["FR:978:N-road"] =
    shields["FR:986:RT-road"] =
    shields["FR:987:RT-road"] =
    shields["FR:988:VE-road"] =
    shields["FR:988:RT-road"] =
      roundedRectShield(Color.shields.red, Color.shields.white);
  // Departmental routes
  // compute list of French department INSEE codes, 01 through 95, inclusive
  let departments = Array.from({ length: 95 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  [...departments, "971", "972", "973", "974", "976", "977", "978"].forEach(
    (department) => {
      shields[`FR:${department}:D-road`] = roundedRectShield(
        Color.shields.yellow,
        Color.shields.black
      );
    }
  );
  // Metropolitan routes
  [
    "06",
    "21",
    "31",
    "34",
    "37",
    "42",
    "44",
    "54",
    "57",
    "59",
    "63",
    "67",
    "69",
  ].forEach((department) => {
    shields[`FR:${department}:M-road`] = roundedRectShield(
      Color.shields.blue,
      Color.shields.white
    );
  });

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

  // Croatia
  shields["HR:Autoceste"] = hexagonVerticalShield(
    3,
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    0,
    34
  );
  shields["HR:Državne ceste"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white
  );
  shields["HR:Županijske ceste"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black,
    Color.shields.black
  );
  shields["HR:Lokalne ceste"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black,
    Color.shields.black
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
    Color.shields.white,
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

  // Netherlands, Kingdom of the (European Netherlands, Aruba, and Curacao)
  // https://wiki.openstreetmap.org/wiki/The_Netherlands_road_network
  shields["NL:A"] = roundedRectShield(Color.shields.red, Color.shields.white);
  shields["NL:N"] = shields["AW:route"] = roundedRectShield(
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
  shields["NL:binnenstedelijke_ring"] = nlCityRoute; // for both European Netherlands and Curacao
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
  shields["pl:expressway"] = shields["pl:motorway"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    34
  );
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
    Color.shields.white,
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
