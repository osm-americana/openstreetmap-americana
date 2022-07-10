"use strict";

import * as Color from "../constants/color.js";
import * as ShieldDraw from "./shield_canvas_draw.js";
import * as ShieldText from "./shield_text.js";
import * as Gfx from "./screen_gfx.js";

//Height of modifier banners
export const bannerSizeH = 9 * Gfx.getPixelRatio();
export const bannerPadding = 0.5 * Gfx.getPixelRatio();
export const topPadding = 1 * Gfx.getPixelRatio();

export const shields = {};

function ovalShield(fillColor, strokeColor, textColor, rectWidth) {
  textColor = textColor ?? strokeColor;
  return {
    backgroundDraw: (ref) =>
      ShieldDraw.ellipse(fillColor, strokeColor, ref, rectWidth),
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

function roundedRectShield(
  fillColor,
  strokeColor,
  textColor,
  radius,
  outlineWidth,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  radius = radius ?? 2;
  outlineWidth = outlineWidth ?? 1;
  return {
    backgroundDraw: (ref) =>
      ShieldDraw.roundedRectangle(
        fillColor,
        strokeColor,
        ref,
        radius,
        outlineWidth,
        rectWidth
      ),
    textLayoutConstraint: (spaceBounds, textBounds) =>
      ShieldText.roundedRectTextConstraint(spaceBounds, textBounds, radius),
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
    },
    textColor: textColor,
  };
}

function pillShield(
  fillColor,
  strokeColor,
  textColor,
  outlineWidth,
  rectWidth
) {
  textColor = textColor ?? strokeColor;
  outlineWidth = outlineWidth ?? 1;
  return {
    backgroundDraw: (ref) =>
      ShieldDraw.roundedRectangle(
        fillColor,
        strokeColor,
        ref,
        10,
        outlineWidth,
        rectWidth
      ),
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    textColor: textColor,
  };
}

function paBeltShield(fillColor, strokeColor) {
  return {
    notext: true,
    backgroundDraw: (ref) => ShieldDraw.paBelt(fillColor, strokeColor),
  };
}

function banneredShield(baseDef, modifiers) {
  return {
    ...baseDef,
    modifiers: modifiers,
  };
}

export function loadShields(shieldImages) {
  // Multi-use shields

  // Triangle shields
  let triangleRoundedDownShield = {
    backgroundImage: shieldImages.shield_tri_rounded,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.black,
    padding: {
      left: 7,
      right: 7,
      top: 2,
      bottom: 7,
    },
  };

  let triangleConvexDownShield = {
    backgroundImage: [
      shieldImages.shield_tri_convex_2,
      shieldImages.shield_tri_convex_3,
    ],
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
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
    backgroundImage: [
      shieldImages.shield_tri_convex_blue_2,
      shieldImages.shield_tri_convex_blue_3,
    ],
    textColor: Color.shields.white,
  };

  let triangleConvexDownShieldRedBlue = {
    ...triangleConvexDownShieldBlue,
    backgroundImage: shieldImages.shield_tri_convex_red_blue_2,
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

  // Diamond shields
  let diamondShield = {
    backgroundImage: shieldImages.shield_diamond,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: Color.shields.black,
    padding: {
      left: 2.5,
      right: 2.5,
      top: 4.5,
      bottom: 4.5,
    },
  };

  let diamondShieldBrown = {
    ...diamondShield,
    backgroundImage: shieldImages.shield_diamond_brown,
    textColor: Color.shields.white,
  };

  // Trapezoid shields
  let trapezoidUpShield = {
    backgroundImage: [
      shieldImages.shield_trapezoid_2,
      shieldImages.shield_trapezoid_3,
    ],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 2,
      bottom: 5,
    },
  };

  let trapezoidUpShieldRoundedBrown = {
    ...trapezoidUpShield,
    backgroundImage: [
      shieldImages.shield_trapezoid_rounded_brown_2,
      shieldImages.shield_trapezoid_rounded_brown_3,
    ],
    textColor: Color.shields.white,
  };

  let trapezoidUpShieldBlue = {
    ...trapezoidUpShieldRoundedBrown,
    backgroundImage: [
      shieldImages.shield_trapezoid_blue_2,
      shieldImages.shield_trapezoid_blue_3,
    ],
  };

  let trapezoidUpShieldBlackYellow = {
    ...trapezoidUpShield,
    backgroundImage: [
      shieldImages.shield_trapezoid_black_yellow_2,
      shieldImages.shield_trapezoid_black_yellow_3,
    ],
    textColor: Color.shields.yellow,
  };

  let trapezoidUpShieldGreenYellow = {
    ...trapezoidUpShieldBlackYellow,
    backgroundImage: [
      shieldImages.shield_trapezoid_green_yellow_2,
      shieldImages.shield_trapezoid_green_yellow_3,
    ],
  };

  let trapezoidDownShield = {
    ...trapezoidUpShield,
    verticalReflect: true,
    padding: {
      left: 4,
      right: 4,
      top: 5,
      bottom: 2,
    },
  };

  // Pentagon shields
  let pentagonShield = {
    backgroundImage: shieldImages.shield_pent_3,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 5,
    },
  };

  let pentagonShieldBlueYellow = {
    ...pentagonShield,
    backgroundImage: [
      shieldImages.shield_pent_blue_yellow_2,
      shieldImages.shield_pent_blue_yellow_3,
    ],
    textColor: Color.shields.yellow,
  };

  let pentagonShieldPurpleYellow = {
    ...pentagonShieldBlueYellow,
    backgroundImage: shieldImages.shield_pent_purple_yellow_3,
  };

  let pentagonShieldGreen = {
    ...pentagonShield,
    backgroundImage: [
      shieldImages.shield_pent_green_2,
      shieldImages.shield_pent_green_3,
    ],
    textColor: Color.shields.white,
  };

  // Home plate shields
  let homeDownShield = {
    backgroundImage: [shieldImages.shield_home_2, shieldImages.shield_home_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
  };

  let homeDownShieldYellow = {
    ...homeDownShield,
    backgroundImage: shieldImages.shield_home_yellow_2,
  };

  let homeDownShieldBlue = {
    ...homeDownShield,
    backgroundImage: [
      shieldImages.shield_home_blue_2,
      shieldImages.shield_home_blue_3,
    ],
    textColor: Color.shields.white,
  };

  // Hexagon shields
  let hexagonVerticalShieldYellow = {
    backgroundImage: shieldImages.shield_hex_vert_yellow,
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4.5,
      bottom: 4.5,
    },
  };

  let hexagonVerticalShieldGreen = {
    ...hexagonVerticalShieldYellow,
    backgroundImage: shieldImages.shield_hex_vert_green,
    textColor: Color.shields.white,
  };

  let hexagonHorizontalShieldBlue = {
    backgroundImage: shieldImages.shield_hex_horz_blue,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
  };

  // Octagon shields
  let octagonShieldGreen = {
    backgroundImage: [
      shieldImages.shield_oct_green_2,
      shieldImages.shield_oct_green_3,
      shieldImages.shield_oct_green_4,
    ],
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
  };

  // Other common shield shapes
  let badgeShield = {
    backgroundImage: [shieldImages.shield_badge_2, shieldImages.shield_badge_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 4,
      bottom: 5,
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
    backgroundImage: shieldImages.shield_ca_tch,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: Color.shields.green,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 4,
    },
  };
  shields["CA:transcanada:namedRoute"] = {
    norefImage: shieldImages.shield_ca_tch,
    notext: true,
  };

  // Alberta
  shields["CA:AB:primary"] = homeDownShield;
  shields["CA:AB:secondary"] = ovalShield(
    Color.shields.white,
    Color.shields.black
  );

  // British Columbia
  shields["CA:BC"] = {
    backgroundImage: [shieldImages.shield_ca_bc_2, shieldImages.shield_ca_bc_3],
    textColor: Color.shields.blue,
    padding: {
      left: 3.5,
      right: 3.5,
      top: 5,
      bottom: 4,
    },
  };

  // Manitoba
  shields["CA:MB:PTH"] = homeDownShield;
  shields["CA:MB:PR"] = ovalShield(Color.shields.black, Color.shields.white);
  shields["CA:MB:Winnipeg"] = {
    backgroundImage: shieldImages.shield_ca_mb_winnipeg,
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 3,
    },
  };

  // New Brunswick
  shields["CA:NB:tertiary"] = {
    backgroundImage: shieldImages.shield_ca_nb,
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
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

  // Nova Scotia
  shields["CA:NS:H"] = {
    backgroundImage: shieldImages.shield_ca_ns_h,
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 6.5,
      bottom: 4,
    },
  };
  shields["CA:NS:T"] = badgeShield;
  shields["CA:NS:R"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.white
  );

  // Northwest Territories
  shields["CA:NT"] = {
    backgroundImage: shieldImages.shield_ca_nt,
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
    backgroundImage: shieldImages.shield_ca_on_primary,
    textColor: Color.shields.black,
    padding: {
      left: 3.5,
      right: 3.5,
      top: 6,
      bottom: 3,
    },
  };
  shields["CA:ON:primary:Toll"] = {
    ...shields["CA:ON:primary"],
    backgroundImage: shieldImages.shield_ca_on_primary_toll,
    textColor: Color.shields.white,
  };
  shields["CA:ON:private_toll"] = banneredShield(
    pillShield(Color.shields.white, Color.shields.blue, Color.shields.black),
    ["ETR"]
  );
  shields["CA:ON:secondary"] = trapezoidDownShield;
  shields["CA:ON:tertiary"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["CA:ON:Halton"] = trapezoidUpShieldGreenYellow;
  shields["CA:ON:Peel"] = trapezoidUpShieldBlackYellow;
  shields["CA:ON:Simcoe"] = {
    ...trapezoidUpShield,
    textColor: Color.shields.blue,
    colorLighten: Color.shields.blue,
  };
  ["Grey", "Hamilton", "Niagara"].forEach(
    (county) => (shields[`CA:ON:${county}`] = trapezoidUpShieldBlue)
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
      (shields[`CA:ON:${countyTownshipOrCity}`] = trapezoidUpShield)
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
    backgroundImage: shieldImages.shield_ca_pe,
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
    backgroundImage: [
      shieldImages.shield_ca_qc_a_2,
      shieldImages.shield_ca_qc_a_3,
    ],
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5.5,
      bottom: 4,
    },
  };
  shields["CA:QC:R"] = {
    backgroundImage: shieldImages.shield_ca_qc_r,
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  // Saskatchewan
  shields["CA:SK:primary"] = homeDownShieldBlue;
  shields["CA:SK:secondary"] = {
    backgroundImage: shieldImages.shield_ca_sk_secondary,
    textColor: Color.shields.green,
    padding: {
      left: 2,
      right: 2,
      top: 11,
      bottom: 2,
    },
  };
  shields["CA:SK:tertiary"] = {
    ...homeDownShield,
    textColor: Color.shields.blue,
    colorLighten: Color.shields.blue,
  };

  // Yukon
  shields["CA:YT"] = roundedRectShield(Color.shields.white, Color.shields.red);

  // United States

  // Interstate Highways
  shields["US:I"] = {
    backgroundImage: [
      shieldImages.shield_us_interstate_2,
      shieldImages.shield_us_interstate_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 5,
    },
  };

  shields["US:I:Alternate"] = banneredShield(shields["US:I"], ["ALT"]);
  shields["US:I:Truck"] = banneredShield(shields["US:I"], ["TRK"]);
  shields["US:I:Express"] = banneredShield(shields["US:I"], ["EXPR"]);
  shields["US:I:Express:Toll"] = shields["US:I:Express"];

  shields["US:I:Business:Loop"] = {
    ...shields["US:I"],
    backgroundImage: [
      shieldImages.shield_us_interstate_business_2,
      shieldImages.shield_us_interstate_business_3,
    ],
  };

  shields["US:I:Business:Spur"] = shields["US:I:Business:Loop"];

  // US Highways
  shields["US:US"] = badgeShield;
  shields["US:US:Truck"] = banneredShield(shields["US:US"], ["TRK"]);
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

  shields["US:US:Historic"] = {
    ...badgeShield,
    textColor: Color.shields.brown,
    colorLighten: Color.shields.brown,
  };

  // Federal Agencies
  shields["US:BIA"] = {
    backgroundImage: shieldImages.shield_us_bia,
    textColor: Color.shields.black,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 5,
    },
  };

  // Alaska
  shields["US:AK"] = {
    backgroundImage: shieldImages.shield_us_ak,
    textColor: Color.shields.black,
    padding: {
      left: 5,
      right: 1,
      top: 1,
      bottom: 8,
    },
  };

  // Alabama
  shields["US:AL"] = {
    backgroundImage: [shieldImages.shield_us_al_2, shieldImages.shield_us_al_3],
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
    (county) => (shields[`US:AL:${county}`] = pentagonShieldBlueYellow)
  );

  // Arkansas
  shields["US:AR"] = {
    backgroundImage: [shieldImages.shield_us_ar_2, shieldImages.shield_us_ar_3],
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
    (county) => (shields[`US:AR:${county}`] = pentagonShieldBlueYellow)
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
    backgroundImage: shieldImages.shield_us_as,
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 9.5,
      bottom: 2,
    },
  };

  shields["US:AZ"] = {
    backgroundImage: [shieldImages.shield_us_az_2, shieldImages.shield_us_az_3],
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
    (county) => (shields[`US:AZ:${county}`] = pentagonShieldBlueYellow)
  );
  shields["US:AZ:Apache"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // California
  shields["US:CA"] = {
    backgroundImage: [shieldImages.shield_us_ca_2, shieldImages.shield_us_ca_3],
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 4,
    },
  };
  shields["US:CA:Business"] = banneredShield(shields["US:CA"], ["BUS"]);
  shields["US:CA:CR"] = pentagonShieldBlueYellow;

  // Colorado
  shields["US:CO"] = {
    backgroundImage: shieldImages.shield_us_co,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 9.5,
      bottom: 2,
    },
  };
  shields["US:CO:E470"] = {
    backgroundImage: shieldImages.shield_us_co_e470,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 9.5,
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
    (county) => (shields[`US:CO:${county}`] = pentagonShieldBlueYellow)
  );
  ["Fremont", "Ouray", "Routt"].forEach(
    (county) =>
      (shields[`US:CO:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );
  shields["US:CO:Douglas"] = pentagonShieldGreen;

  // Connecticut
  shields["US:CT"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Washington, D.C.
  shields["US:DC"] = {
    backgroundImage: shieldImages.shield_us_dc,
    textColor: Color.shields.black,
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
    backgroundImage: [shieldImages.shield_us_fl_2, shieldImages.shield_us_fl_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 4.5,
      top: 6,
      bottom: 4,
    },
  };
  shields["US:FL:Toll"] = {
    backgroundImage: shieldImages.shield_us_fl_toll,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 5,
      top: 7.5,
      bottom: 4.5,
    },
  };
  shields["US:FL:Turnpike"] = {
    norefImage: shieldImages.shield_us_fl_turnpike,
    notext: true,
  };
  shields["US:FL:CR"] = pentagonShieldBlueYellow;

  // Georgia
  shields["US:GA"] = {
    backgroundImage: [shieldImages.shield_us_ga_2, shieldImages.shield_us_ga_3],
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
    backgroundImage: [shieldImages.shield_us_gu_2, shieldImages.shield_us_gu_3],
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
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
  shields["US:IA:CR"] = pentagonShieldBlueYellow;

  // Idaho
  shields["US:ID"] = {
    backgroundImage: [shieldImages.shield_us_id_2, shieldImages.shield_us_id_3],
    textColor: Color.shields.black,
    padding: {
      left: 5,
      right: 1,
      top: 1,
      bottom: 8,
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
    (county) => (shields[`US:IL:${county}`] = pentagonShieldBlueYellow)
  );
  shields["US:IL:Cook:Chicago:Skyway"] = {
    norefImage: shieldImages.shield_us_il_skyway,
    notext: true,
  };

  // Indiana
  shields["US:IN"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:IN:Toll"] = {
    norefImage: shieldImages.shield_us_in_toll,
    notext: true,
  };

  // Kansas
  shields["US:KS"] = {
    backgroundImage: [shieldImages.shield_us_ks_2, shieldImages.shield_us_ks_3],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
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
    (county) => (shields[`US:KS:${county}`] = pentagonShieldBlueYellow)
  );

  // Kentucky
  shields["US:KY"] = pillShield(Color.shields.white, Color.shields.black);
  shields["US:KY:Business"] = banneredShield(shields["US:KY"], ["BUS"]);
  shields["US:KY:AA"] = {
    backgroundImage: shieldImages.shield_us_ky_parkway,
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
    backgroundImage: [shieldImages.shield_us_la_2, shieldImages.shield_us_la_3],
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
    (parish) => (shields[`US:LA:${parish}`] = pentagonShieldBlueYellow)
  );

  // Massachusetts
  shields["US:MA"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Maryland
  shields["US:MD"] = {
    backgroundImage: [shieldImages.shield_us_md_2, shieldImages.shield_us_md_3],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 7,
      bottom: 3,
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
    ["BUS"]
  );

  // Maine
  shields["US:ME"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Michigan
  shields["US:MI"] = diamondShield;
  ["CR", "Benzie", "Gogebic", "Kalkaska", "Montcalm", "Roscommon"].forEach(
    (county) => (shields[`US:MI:${county}`] = pentagonShieldBlueYellow)
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
    backgroundImage: [shieldImages.shield_us_mn_2, shieldImages.shield_us_mn_3],
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
        {
          ...pentagonShieldBlueYellow,
          textColor: Color.shields.white,
        },
        roundedRectShield(Color.shields.white, Color.shields.black),
        trapezoidUpShieldRoundedBrown,
      ])
  );

  // Missouri
  shields["US:MO"] = {
    backgroundImage: [shieldImages.shield_us_mo_2, shieldImages.shield_us_mo_3],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4.5,
      top: 3,
      bottom: 5.5,
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
    (county) => (shields[`US:MO:${county}`] = pentagonShieldBlueYellow)
  );
  shields["US:MO:Lewis"] = roundedRectShield(
    Color.shields.brown,
    Color.shields.white
  );

  // Northern Mariana Islands
  shields["US:MP"] = {
    backgroundImage: [shieldImages.shield_us_mp_2, shieldImages.shield_us_mp_3],
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
    (county) => (shields[`US:MS:${county}`] = pentagonShieldBlueYellow)
  );

  // Montana
  shields["US:MT"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:MT:secondary"] = {
    backgroundImage: shieldImages.shield_us_mt_secondary,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 0,
      bottom: 6,
    },
  };
  ["Dawson", "Richland"].forEach(
    (county) => (shields[`US:MT:${county}`] = pentagonShieldBlueYellow)
  );

  // North Carolina
  shields["US:NC"] = diamondShield;
  shields["US:NC:Bypass"] = banneredShield(shields["US:NC"], ["BYP"]);
  shields["US:NC:Business"] = banneredShield(shields["US:NC"], ["BUS"]);
  shields["US:NC:Truck"] = banneredShield(shields["US:NC"], ["TRK"]);
  shields["US:NC:Mecklenburg:Charlotte"] = pentagonShieldGreen;

  // North Dakota
  shields["US:ND"] = {
    backgroundImage: [shieldImages.shield_us_nd_2, shieldImages.shield_us_nd_3],
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
    (county) => (shields[`US:ND:${county}`] = pentagonShieldBlueYellow)
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
  shields["US:NE"] = trapezoidUpShield;
  shields["US:NE:Business"] = banneredShield(shields["US:NE"], ["BUS"]);
  shields["US:NE:Link"] = banneredShield(shields["US:NE"], ["LINK"]);
  shields["US:NE:Rec"] = banneredShield(shields["US:NE"], ["REC"]);
  shields["US:NE:Spur"] = banneredShield(shields["US:NE"], ["SPUR"]);

  // New Hampshire
  shields["US:NH"] = {
    backgroundImage: [shieldImages.shield_us_nh_2, shieldImages.shield_us_nh_3],
    textColor: Color.shields.black,
    padding: {
      left: 3.5,
      right: 2,
      top: 4,
      bottom: 5,
    },
  };
  shields["US:NH:Bypass"] = banneredShield(shields["US:NH"], ["BYP"]);

  // New Jersey
  shields["US:NJ"] = ovalShield(Color.shields.white, Color.shields.black);
  shields["US:NJ:ACE"] = {
    backgroundImage: shieldImages.shield_us_nj_ace_noref,
    notext: true,
  };
  shields["US:NJ:GSP"] = {
    backgroundImage: shieldImages.shield_us_nj_gsp_noref,
    notext: true,
  };
  shields["US:NJ:NJTP"] = {
    backgroundImage: shieldImages.shield_us_nj_njtp_noref,
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
    (county) => (shields[`US:NJ:${county}`] = pentagonShieldBlueYellow)
  );
  shields["US:NJ:Bergen"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:NJ:CR:Spur"] = banneredShield(shields["US:NJ:CR"], ["SPUR"]);
  shields["US:NJ:CR:Truck"] = banneredShield(shields["US:NJ:CR"], ["TRK"]);

  // New Mexico
  shields["US:NM"] = pillShield(
    Color.shields.white,
    Color.shields.pink,
    Color.shields.black
  );
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
    (county) => (shields[`US:NM:${county}`] = pentagonShieldBlueYellow)
  );
  shields["US:NM:San_Juan:NCM"] = {
    ...pentagonShield,
    colorLighten: Color.shields.pink,
    textColor: Color.shields.pink,
  };

  // Nevada
  shields["US:NV"] = {
    backgroundImage: shieldImages.shield_us_nv,
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 12,
    },
  };
  ["Clark", "Washoe"].forEach(
    (county) => (shields[`US:NV:${county}`] = pentagonShieldBlueYellow)
  );

  // New York
  shields["US:NY"] = {
    backgroundImage: [shieldImages.shield_us_ny_2, shieldImages.shield_us_ny_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };
  shields["US:NY:Thruway"] = {
    norefImage: shieldImages.shield_us_ny_thruway,
    notext: true,
  };
  shields["US:NY:STE"] = {
    norefImage: shieldImages.shield_us_ny_ste,
    notext: true,
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
    (county) => (shields[`US:NY:${county}`] = pentagonShieldBlueYellow)
  );

  // Ohio
  shields["US:OH"] = {
    backgroundImage: [shieldImages.shield_us_oh_2, shieldImages.shield_us_oh_3],
    norefImage: shieldImages.shield_us_oh_turnpike,
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

  // Ohio county and township roads

  ["COL", "JEF", "MAH", "OTT", "SEN", "STA", "SUM", "TUS"].forEach(
    (county) => (shields[`US:OH:${county}`] = pentagonShieldBlueYellow)
  );
  [
    "CAR",
    "COS",
    "FAI",
    "FUL",
    "GAL",
    "HAS",
    "HOC",
    "HOL",
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
    backgroundImage: [shieldImages.shield_us_oh_asd],
    textColor: Color.shields.green,
    padding: {
      left: 6,
      right: 3,
      top: 4,
      bottom: 7,
    },
  };
  shields["US:OH:SCI"] = {
    backgroundImage: [
      shieldImages.shield_us_oh_sci_2,
      shieldImages.shield_us_oh_sci_3,
    ],
    textColor: Color.shields.black,
    padding: {
      left: 3,
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
    backgroundImage: [shieldImages.shield_us_oh_tus_salem],
    textColor: Color.shields.black,
    padding: {
      left: 1,
      right: 4,
      top: 1,
      bottom: 4,
    },
  };

  // If a township's road shields have the same shape and color as the surrounding county's road shields,
  // add a banner to distinguish the township road shields from the more prominent county road shields.

  [
    ["ASD", "TWP"],
    ["ATH", "Trimble"],
    ["FAI", "Violet"],
    ["HOL", "Berlin"],
    ["HOL", "Clark"],
    ["HOL", "Knox"],
    ["HOL", "Monroe"], // No black border in reality, but a border is needed for contrast.
    ["HOL", "Paint"],
    ["HOL", "Salt_Creek"],
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

  // Oklahoma
  shields["US:OK"] = {
    backgroundImage: [shieldImages.shield_us_ok_2, shieldImages.shield_us_ok_3],
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

  // Oregon
  shields["US:OR"] = {
    backgroundImage: [shieldImages.shield_us_or_2, shieldImages.shield_us_or_3],
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 6.5,
    },
  };
  shields["US:OR:Business"] = banneredShield(shields["US:OR"], ["BUS"]);
  ["Douglas", "Grant", "Lake", "Morrow"].forEach(
    (county) => (shields[`US:OR:${county}`] = pentagonShieldBlueYellow)
  );

  // Pennsylvania
  shields["US:PA"] = {
    backgroundImage: [shieldImages.shield_us_pa_2, shieldImages.shield_us_pa_3],
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
    backgroundImage: [
      shieldImages.shield_us_pa_turnpike_2,
      shieldImages.shield_us_pa_turnpike_3,
    ],
    norefImage: shieldImages.shield_us_pa_turnpike_noref,
    textColor: Color.shields.white,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
  };
  shields["US:PA:Allegheny:Belt"] = {}; // See ref-specific cases below

  // Rhode Island
  shields["US:RI"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // South Carolina
  shields["US:SC"] = {
    backgroundImage: shieldImages.shield_us_sc,
    textColor: Color.shields.blue,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 3,
    },
  };
  shields["US:SC:Truck"] = banneredShield(shields["US:SC"], ["TRK"]);
  shields["US:SC:Business"] = banneredShield(shields["US:SC"], ["BUS"]);
  shields["US:SC:Alternate"] = banneredShield(shields["US:SC"], ["ALT"]);

  // South Dakota
  shields["US:SD"] = {
    backgroundImage: [shieldImages.shield_us_sd_2, shieldImages.shield_us_sd_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 3,
      top: 3,
      bottom: 5,
    },
  };
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
    (county) => (shields[`US:SD:${county}`] = pentagonShieldBlueYellow)
  );
  ["Brown", "Tripp"].forEach(
    (county) =>
      (shields[`US:SD:${county}`] = roundedRectShield(
        Color.shields.green,
        Color.shields.white
      ))
  );

  // Tennessee
  shields["US:TN:primary"] = {
    backgroundImage: shieldImages.shield_us_tn_primary,
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
  shields["US:TN:secondary"] = triangleRoundedDownShield;
  shields["US:TN:secondary:Alternate"] = banneredShield(
    shields["US:TN:secondary"],
    ["ALT"]
  );
  shields["US:TN:secondary:Truck"] = banneredShield(
    shields["US:TN:secondary"],
    ["TRK"]
  );
  shields["US:TN:McMinn"] = pentagonShieldBlueYellow;

  // Texas
  shields["US:TX"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["US:TX:Loop"] = banneredShield(shields["US:TX"], ["LOOP"]);
  shields["US:TX:Spur"] = banneredShield(shields["US:TX"], ["SPUR"]);
  shields["US:TX:Business"] = banneredShield(shields["US:TX"], ["BUS"]);
  shields["US:TX:Park"] = banneredShield(shields["US:TX"], ["PARK"]);
  shields["US:TX:Beltway"] = banneredShield(shields["US:TX"], ["BELT"]);
  shields["US:TX:FM"] = banneredShield(shields["US:TX"], ["F.M."]);
  shields["US:TX:FM:Business"] = banneredShield(shields["US:TX:FM"], [
    "BUS",
    "F.M.",
  ]);
  shields["US:TX:PA"] = banneredShield(shields["US:TX"], ["P.A."]);
  shields["US:TX:RM"] = banneredShield(shields["US:TX"], ["R.M."]);
  shields["US:TX:Recreational"] = banneredShield(
    roundedRectShield(Color.shields.white, Color.shields.brown),
    ["R"]
  );
  shields["US:TX:NASA"] = banneredShield(shields["US:TX"], ["NASA"]);
  shields["US:TX:Toll"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["US:TX:CTRMA"] = shields["US:TX:Toll"];
  shields["US:TX:NTTA"] = shields["US:TX:Toll"];
  shields["US:TX:Express:Toll"] = banneredShield(shields["US:TX:Toll"], [
    "EXPR",
  ]);
  shields["US:TX:Loop:Toll"] = banneredShield(shields["US:TX:Toll"], ["LOOP"]);
  shields["US:TX:Loop:Express:Toll"] = banneredShield(shields["US:TX:Toll"], [
    "EXPR",
    "LOOP",
  ]);
  shields["US:TX:Montgomery:MCTRA"] = {
    ...homeDownShieldBlue,
    backgroundImage: shieldImages.shield_home_blue_red_3,
  };
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
    (county) => (shields[`US:TX:${county}`] = pentagonShieldBlueYellow)
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
    ["CR"]
  );
  shields["US:TX:Andrews:Andrews:Loop"] = banneredShield(
    roundedRectShield(Color.shields.white, Color.shields.blue),
    ["LOOP"]
  );

  // Utah
  shields["US:UT"] = {
    backgroundImage: [shieldImages.shield_us_ut_2, shieldImages.shield_us_ut_3],
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 5.5,
      bottom: 5,
    },
  };
  shields["US:UT:Wayne"] = pentagonShieldBlueYellow;

  // Virginia
  shields["US:VA"] = {
    backgroundImage: [shieldImages.shield_us_va_2, shieldImages.shield_us_va_3],
    textColor: Color.shields.black,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 7,
    },
  };
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
    backgroundImage: [shieldImages.shield_us_vt_2, shieldImages.shield_us_vt_3],
    textColor: Color.shields.green,
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 2,
    },
  };
  shields["US:VT:Alternate"] = banneredShield(shields["US:VT"], ["ALT"]);
  // Vermont routes town maintained sections - black and white ovals
  shields["US:VT:Town"] = ovalShield(Color.shields.white, Color.shields.black);

  // Washington (state)
  shields["US:WA"] = {
    backgroundImage: shieldImages.shield_us_wa,
    textColor: Color.shields.black,
    padding: {
      left: 3,
      right: 4,
      top: 3,
      bottom: 7,
    },
  };
  shields["US:WA:Spur"] = banneredShield(shields["US:WA"], ["SPUR"]);
  shields["US:WA:Business"] = banneredShield(shields["US:WA"], ["BUS"]);
  shields["US:WA:Alternate"] = banneredShield(shields["US:WA"], ["ALT"]);

  // Wisconsin
  shields["US:WI"] = {
    backgroundImage: [shieldImages.shield_us_wi_2, shieldImages.shield_us_wi_3],
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
    backgroundImage: shieldImages.shield_us_wi_rustic,
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

  // Wyoming
  shields["US:WY"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  [
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
    (county) => (shields[`US:WY:${county}`] = pentagonShieldBlueYellow)
  );

  // SOUTH AMERICA

  // Chile
  shields["CL:national"] = {
    backgroundImage: [
      shieldImages.shield_cl_national_2,
      shieldImages.shield_cl_national_3,
    ],
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 4,
      bottom: 5,
    },
  };
  shields["CL:regional"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white
  );

  // Colombia
  shields["co:national"] = {
    backgroundImage: [
      shieldImages.shield_co_national_2,
      shieldImages.shield_co_national_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.black,
    padding: {
      left: 4,
      right: 4,
      top: 3,
      bottom: 6,
    },
  };

  // Uruguay
  shields["UY"] = homeDownShieldBlue;

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
          backgroundImage: shieldImages.shield_ve_t,
          textColor: Color.shields.black,
          padding: {
            left: 4,
            right: 4,
            top: 3,
            bottom: 5,
          },
        },
        ovalShield(Color.shields.white, Color.shields.black),
        diamondShield,
      ])
  );

  // AFRICA

  // Ghana
  shields["GH:national"] =
    shields["GH:inter-regional"] =
    shields["GH:regional"] =
      roundedRectShield(Color.shields.yellow, Color.shields.black);

  // ASIA

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
    backgroundImage: [
      shieldImages.shield_cn_national_expressway_2,
      shieldImages.shield_cn_national_expressway_3,
      shieldImages.shield_cn_national_expressway_4,
    ],
    textColor: Color.shields.white,
    padding: {
      left: 2,
      right: 2,
      top: 6,
      bottom: 2,
    },
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
      backgroundImage: [
        shieldImages.shield_cn_regional_expressway_2,
        shieldImages.shield_cn_regional_expressway_3,
        shieldImages.shield_cn_regional_expressway_4,
      ],
      textColor: Color.shields.white,
      padding: {
        left: 2,
        right: 2,
        top: 6,
        bottom: 2,
      },
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
  shields["HK"] = {
    backgroundImage: shieldImages.shield_hk,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.black,
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 12,
    },
  };

  // Iran
  shields["ir:freeways"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Japan
  shields["JP:E"] = roundedRectShield(Color.shields.green, Color.shields.white);
  shields["JP:national"] = triangleConvexDownShieldBlue;
  shields["JP:prefectural"] = hexagonHorizontalShieldBlue;
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

  // Myanmar
  shields["MY:E"] = shields["my:federal"] = hexagonVerticalShieldYellow;

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
  shields["PH:N"] = homeDownShield;
  shields["PH:E"] = homeDownShieldYellow;

  // South Korea
  shields["KR:expressway"] = {
    backgroundImage: [
      shieldImages.shield_kr_expressway_2,
      shieldImages.shield_kr_expressway_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 8,
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

  // Taiwan
  shields["TW:freeway"] = {
    backgroundImage: shieldImages.shield_tw_freeway,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
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
    2,
    1,
    35
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
    2,
    1,
    35
  );

  shields["ba:Magistralne ceste"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  // Belgium
  shields["BE:A-road"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );
  shields["BE:N-road"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );
  shields["BE:R-road"] = roundedRectShield(
    Color.shields.white,
    Color.shields.black
  );

  // Bulgaria
  shields["bg:national"] = roundedRectShield(
    Color.shields.green,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  // Belarus
  shields["by:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Czechia
  shields["CZ:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  shields["cz:national"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  // Denmark
  shields["dk:national"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black,
    Color.shields.black,
    2,
    1,
    35
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
  shields["FR:A-road"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Greece
  shields["GR:national"] = hexagonVerticalShieldGreen;
  shields["GR:motorway"] = shields["GR:national"];

  // Hungary
  shields["HU:national"] = {
    ...homeDownShieldBlue,
    backgroundImage: shieldImages.shield_home_blue_3,
  };

  // Italy
  shields["IT:A-road"] = octagonShieldGreen;

  // Lithuania
  shields["lt:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Latvia
  shields["lv:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );
  shields["lv:regional"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white
  );

  // Moldova
  shields["md:national"] = {
    backgroundImage: shieldImages.shield_ro_trunk_2,
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
  };

  // Montenegro
  shields["ME:Magistralni putevi"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  // North Macedonia
  shields["mk:national"] = hexagonVerticalShieldGreen;

  // Netherlands
  // https://wiki.openstreetmap.org/wiki/The_Netherlands_road_network
  shields["NL:A"] = roundedRectShield(Color.shields.red, Color.shields.white);
  shields["NL:N"] = roundedRectShield(
    Color.shields.yellow,
    Color.shields.black
  );
  let nlCityRoute = {
    backgroundImage: shieldImages.shield_nl_city,
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
    2,
    1,
    35
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
    2,
    1,
    35
  );

  // Serbia
  shields["RS:national"] = hexagonVerticalShieldGreen;

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
  shields["SI:AC"] = hexagonVerticalShieldGreen;

  // Slovakia
  shields["sk:national"] = roundedRectShield(
    Color.shields.red,
    Color.shields.white,
    Color.shields.white,
    2,
    1,
    35
  );

  // Ukraine
  shields["ua:international"] = roundedRectShield(
    Color.shields.blue,
    Color.shields.white
  );

  // Kosovo
  shields["XK:motorway"] = hexagonVerticalShieldGreen;

  // OCEANIA

  // New Zealand
  shields["NZ:SH"] = {
    backgroundImage: [shieldImages.shield_nz_sh_2, shieldImages.shield_nz_sh_3],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: Color.shields.white,
    padding: {
      left: 4,
      right: 4,
      top: 3,
      bottom: 5,
    },
  };
  shields["NZ:UR"] = homeDownShield;

  // Ref-specific cases. Each entry should be documented in CONTRIBUTE.md

  shields["CA:ON:primary"].overrideByRef = {
    QEW: {
      backgroundImage: shieldImages.shield_ca_on_primary_qew,
      textColor: Color.shields.blue,
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
      backgroundImage: shieldImages.shield_us_ar_980,
      textColor: Color.shields.white,
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

  shields["US:KY:Parkway"] = Object.assign(
    {
      // FIXME: This object contains both spelled-out and abbreviated road
      // names to accommodate both the abbreviated names from OpenMapTiles and
      // the spelled-out names from Planetiler.
      // https://github.com/onthegomap/planetiler/issues/14
      refsByWayName: {
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
      },
    },
    shields["US:KY:AA"]
  );

  shields["US:MI"].overrideByRef = {
    185: diamondShieldBrown,
  };

  shields["US:PA:Allegheny:Belt"].overrideByRef = {
    "Red Belt": paBeltShield(Color.shields.red, Color.shields.black),
    "Orange Belt": paBeltShield(Color.shields.orange, Color.shields.black),
    "Yellow Belt": paBeltShield(Color.shields.yellow, Color.shields.black),
    "Green Belt": paBeltShield(Color.shields.green, Color.shields.white),
    "Blue Belt": paBeltShield(Color.shields.blue, Color.shields.white),
    "Purple Belt": paBeltShield(Color.shields.purple, Color.shields.white),
  };

  shields["US:TX:Fort_Bend:FBCTRA"] = Object.assign(
    {
      refsByWayName: {
        "Fort Bend Parkway Toll Road": "FBP",
        "Fort Bend Westpark Tollway": "WPT",
      },
    },
    {
      backgroundImage: shieldImages.shield_us_tx_fbctra,
      textColor: Color.shields.white,
      padding: {
        left: 3,
        right: 3,
        top: 2,
        bottom: 8,
      },
    }
  );
  shields["US:TX:Harris:HCTRA"] = Object.assign(
    {
      refsByWayName: {
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
      },
    },
    pentagonShieldPurpleYellow
  );

  return shields;
}

/**
 * Determines whether there is a raster shield background for a particular network
 *
 * @param {*} network - Route network
 * @returns true if a raster shield is available
 */
export function hasShieldArtwork(network) {
  return (
    shields[network] != null &&
    typeof shields[network].backgroundImage !== "undefined"
  );
}

/**
 * Get the number of banner placards associated with this shield
 *
 * @param {*} shield - Shield definition
 * @returns the number of banner placards that need to be drawn
 */
export function getBannerCount(shield) {
  if (shield == null || typeof shield.modifiers == "undefined") {
    return 0; //Unadorned shield
  }
  return shield.modifiers.length;
}
