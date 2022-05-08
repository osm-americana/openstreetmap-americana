"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as ShieldText from "./shield_text.js";
import * as Gfx from "./screen_gfx.js";

//Height of modifier banners
export const bannerSizeH = 8 * Gfx.getPixelRatio();

export const shields = {};

function circleShield(fillColor, strokeColor, textColor, rectWidth) {
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
    maxFontSize: 16,
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
    maxFontSize: 16,
    textColor: textColor,
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

  //Diamond shields
  var diamondShield = {
    backgroundImage: shieldImages.shield40_diamond_white,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "black",
    padding: {
      left: 2.5,
      right: 2.5,
      top: 4.5,
      bottom: 4.5,
    },
  };

  var usMUTCDCountyShield = {
    backgroundImage: [
      shieldImages.shield40_us_county_2,
      shieldImages.shield40_us_county_3,
    ],
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "#f7d117",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 5,
    },
  };

  var shield_badge = [
    shieldImages.shield40_badge_2,
    shieldImages.shield40_badge_3,
  ];
  var padding_badge = {
    left: 2,
    right: 2,
    top: 4,
    bottom: 5,
  };
  var badgeShield = {
    backgroundImage: shield_badge,
    textColor: "black",
    padding: padding_badge,
  };

  let padding_home_down = {
    left: 2,
    right: 2,
    top: 2,
    bottom: 6,
  };
  // Home plate, flipped vertically, white fill, black stroke
  let homeDownWhiteShield = {
    backgroundImage: [
      shieldImages.shield40_home_down_white_2,
      shieldImages.shield40_home_down_white_3,
    ],
    textColor: "black",
    padding: padding_home_down,
  };

  // Home plate, flipped vertically, blue fill, white stroke
  let homeDownBlueWhiteShield = {
    backgroundImage: [
      shieldImages.shield40_home_down_blue_2,
      shieldImages.shield40_home_down_blue_3,
    ],
    textColor: "white",
    padding: padding_home_down,
  };

  // Home plate, flipped vertically, white fill, blue stroke
  let homeDownWhiteBlueShield = {
    backgroundImage: [
      shieldImages.shield40_home_down_white_2,
      shieldImages.shield40_home_down_white_3,
    ],
    textColor: "black",
    padding: padding_home_down,
    colorLighten: "#003f87",
  };

  let padding_trapezoid_up = {
    left: 4,
    right: 4,
    top: 2,
    bottom: 5,
  };

  let shield_trapezoid_up = [
    shieldImages.shield40_trapezoid_up_2,
    shieldImages.shield40_trapezoid_up_3,
  ];
  let trapezoidUpShield = {
    backgroundImage: shield_trapezoid_up,
    textColor: "black",
    padding: padding_trapezoid_up,
  };
  let trapezoidUpShieldWhiteBlue = {
    backgroundImage: shield_trapezoid_up,
    textColor: "black",
    padding: padding_trapezoid_up,
    colorLighten: "#003f87",
  };

  let shield_trapezoid_up_black_yellow = [
    shieldImages.shield40_trapezoid_up_black_yellow_2,
    shieldImages.shield40_trapezoid_up_black_yellow_3,
  ];
  let trapezoidUpShieldBlackYellow = {
    backgroundImage: shield_trapezoid_up_black_yellow,
    textColor: "#ffcd00",
    padding: padding_trapezoid_up,
  };

  let shield_trapezoid_up_blue_white = [
    shieldImages.shield40_trapezoid_up_blue_white_2,
    shieldImages.shield40_trapezoid_up_blue_white_3,
  ];
  let trapezoidUpShieldBlueWhite = {
    backgroundImage: shield_trapezoid_up_blue_white,
    textColor: "white",
    padding: padding_trapezoid_up,
  };

  let shield_trapezoid_up_green_yellow = [
    shieldImages.shield40_trapezoid_up_green_yellow_2,
    shieldImages.shield40_trapezoid_up_green_yellow_3,
  ];
  let trapezoidUpShieldGreenYellow = {
    backgroundImage: shield_trapezoid_up_green_yellow,
    textColor: "#ffcd00",
    padding: padding_trapezoid_up,
  };

  let shield_trapezoid_down = [
    shieldImages.shield40_trapezoid_down_2,
    shieldImages.shield40_trapezoid_down_3,
  ];
  let padding_trapezoid_down = {
    left: 4,
    right: 4,
    top: 5,
    bottom: 2,
  };
  let trapezoidDownShield = {
    backgroundImage: shield_trapezoid_down,
    textColor: "black",
    padding: padding_trapezoid_down,
  };

  // North America

  shields["CA:transcanada"] = {
    backgroundImage: shieldImages.shield40_ca_tch,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "#006747",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 4,
    },
  };
  shields["CA:transcanada:namedRoute"] = {
    norefImage: shieldImages.shield40_ca_tch,
    notext: true,
  };

  shields["CA:AB:primary"] = homeDownWhiteShield;
  shields["CA:AB:secondary"] = circleShield("white", "black");

  shields["CA:BC"] = {
    backgroundImage: [
      shieldImages.shield40_ca_bc_2,
      shieldImages.shield40_ca_bc_3,
    ],
    textColor: "#003f87",
    padding: {
      left: 3.5,
      right: 3.5,
      top: 5,
      bottom: 4,
    },
  };

  shields["CA:MB:PTH"] = homeDownWhiteShield;
  shields["CA:MB:PR"] = circleShield("black", "white", "white", 30);
  shields["CA:MB:Winnipeg"] = {
    backgroundImage: shieldImages.shield40_ca_mb_winnipeg,
    textColor: "black",
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 3,
    },
  };

  var padding_ca_nb = {
    left: 4,
    right: 4,
    top: 5,
    bottom: 5,
  };
  shields["CA:NB:primary"] = {
    backgroundImage: shieldImages.shield40_ca_nb_primary,
    textColor: "black",
    padding: padding_ca_nb,
  };
  shields["CA:NB:secondary"] = {
    backgroundImage: shieldImages.shield40_ca_nb_secondary,
    textColor: "black",
    padding: padding_ca_nb,
  };
  shields["CA:NB:tertiary"] = {
    backgroundImage: shieldImages.shield40_ca_nb_tertiary,
    textColor: "black",
    padding: padding_ca_nb,
  };

  shields["CA:NS:H"] = {
    backgroundImage: shieldImages.shield40_ca_ns_h,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 6.5,
      bottom: 4,
    },
  };
  shields["CA:NS:T"] = badgeShield;
  shields["CA:NS:R"] = roundedRectShield("#693f23", "white", "white", 1, 1);

  shields["CA:NT"] = {
    backgroundImage: shieldImages.shield40_ca_nt,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 8.5,
      bottom: 2,
    },
  };

  let padding_on_primary = {
    left: 3,
    right: 3,
    top: 6,
    bottom: 3,
  };
  shields["CA:ON:primary"] = {
    backgroundImage: shieldImages.shield40_ca_on_primary,
    textColor: "black",
    padding: padding_on_primary,
  };
  shields["CA:ON:primary:Toll"] = {
    backgroundImage: shieldImages.shield40_ca_on_primary_toll,
    textColor: "white",
    padding: padding_on_primary,
  };
  shields["CA:ON:private_toll"] = banneredShield(
    roundedRectShield("white", "#003f87", "black", 8, 1, null),
    ["ETR"]
  );
  shields["CA:ON:secondary"] = trapezoidDownShield;
  shields["CA:ON:tertiary"] = roundedRectShield(
    "white",
    "black",
    "black",
    1,
    1
  );
  shields["CA:ON:Halton"] = trapezoidUpShieldGreenYellow;
  shields["CA:ON:Peel"] = trapezoidUpShieldBlackYellow;
  shields["CA:ON:Simcoe"] = trapezoidUpShieldWhiteBlue;
  ["Grey", "Hamilton", "Niagara"].forEach(
    (county) => (shields[`CA:ON:${county}`] = trapezoidUpShieldBlueWhite)
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
    roundedRectShield("white", "black", "black", 1, 1),
    ["TWP"]
  );
  shields["CA:ON:Waterloo:Wellesley"] = circleShield("white", "black");
  shields["CA:ON:Waterloo:Woolwich"] = circleShield("white", "black");
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

  shields["CA:PE"] = {
    backgroundImage: shieldImages.shield40_ca_pe,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  shields["CA:QC:A"] = {
    backgroundImage: [
      shieldImages.shield40_ca_qc_a_2,
      shieldImages.shield40_ca_qc_a_3,
    ],
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 5.5,
      bottom: 4,
    },
  };
  shields["CA:QC:R"] = {
    backgroundImage: shieldImages.shield40_ca_qc_r,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  shields["CA:SK:primary"] = homeDownBlueWhiteShield;
  shields["CA:SK:secondary"] = {
    backgroundImage: shieldImages.shield40_ca_sk_secondary,
    textColor: "#006747",
    padding: {
      left: 2,
      right: 2,
      top: 9,
      bottom: 2,
    },
  };
  shields["CA:SK:tertiary"] = homeDownWhiteBlueShield;

  shields["CA:YT"] = roundedRectShield("white", "black", "black", 1, 1);

  shields["US:I"] = {
    backgroundImage: [
      shieldImages.shield40_us_interstate_2,
      shieldImages.shield40_us_interstate_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 3.5,
      right: 3.5,
      top: 5,
      bottom: 4,
    },
  };

  shields["US:I:Alternate"] = banneredShield(shields["US:I"], ["ALT"]);
  shields["US:I:Truck"] = banneredShield(shields["US:I"], ["TRK"]);

  shields["US:I:Business:Loop"] = {
    backgroundImage: [
      shieldImages.shield40_us_interstate_business_2,
      shieldImages.shield40_us_interstate_business_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
  };

  shields["US:I:Business:Spur"] = shields["US:I:Business:Loop"];

  //US Highways
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
    backgroundImage: shield_badge,
    textColor: "black",
    padding: padding_badge,
    colorLighten: "#613214",
  };

  shields["US:AK"] = {
    backgroundImage: shieldImages.shield40_us_ak,
    textColor: "black",
    padding: {
      left: 5,
      right: 1,
      top: 1,
      bottom: 8,
    },
  };

  shields["US:AL"] = {
    backgroundImage: [
      shieldImages.shield40_us_al_2,
      shieldImages.shield40_us_al_3,
    ],
    textColor: "black",
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 6,
    },
  };
  shields["US:AL:Truck"] = banneredShield(shields["US:AL"], ["TRK"]);

  shields["US:AR"] = {
    backgroundImage: [
      shieldImages.shield40_us_ar_2,
      shieldImages.shield40_us_ar_3,
    ],
    textColor: "black",
    padding: {
      left: 3,
      right: 4,
      top: 4,
      bottom: 5,
    },
  };

  shields["US:AS"] = {
    backgroundImage: shieldImages.shield40_us_as,
    textColor: "white",
    padding: {
      left: 4,
      right: 4,
      top: 9.5,
      bottom: 2,
    },
  };

  shields["US:AZ"] = {
    backgroundImage: [
      shieldImages.shield40_us_az_2,
      shieldImages.shield40_us_az_3,
    ],
    textColor: "black",
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

  shields["US:CA"] = {
    backgroundImage: [
      shieldImages.shield40_us_ca_2,
      shieldImages.shield40_us_ca_3,
    ],
    textColor: "white",
    padding: {
      left: 4,
      right: 4,
      top: 6,
      bottom: 4,
    },
  };

  shields["US:CA:Business"] = banneredShield(shields["US:CA"], ["BUS"]);
  shields["US:CA:CR"] = usMUTCDCountyShield;

  shields["US:CO"] = {
    backgroundImage: shieldImages.shield40_us_co,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 9.5,
      bottom: 2,
    },
  };

  shields["US:CT"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:DC"] = {
    backgroundImage: shieldImages.shield40_us_dc,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 10,
      bottom: 4,
    },
  };
  shields["US:DE"] = circleShield("white", "black");
  shields["US:DE:Alternate"] = banneredShield(shields["US:DE"], ["ALT"]);
  shields["US:DE:Business"] = banneredShield(shields["US:DE"], ["BUS"]);
  shields["US:DE:Truck"] = banneredShield(shields["US:DE"], ["TRK"]);

  shields["US:FL"] = {
    backgroundImage: [
      shieldImages.shield40_us_fl_2,
      shieldImages.shield40_us_fl_3,
    ],
    textColor: "black",
    padding: {
      left: 2,
      right: 4.5,
      top: 6,
      bottom: 4,
    },
  };
  shields["US:FL:Toll"] = banneredShield(
    {
      backgroundImage: shieldImages.shield40_us_fl_toll,
      textColor: "black",
      padding: {
        left: 2,
        right: 5,
        top: 7.5,
        bottom: 4.5,
      },
    },
    ["TOLL"]
  );
  [
    "Alachua",
    "Baker",
    "Bay",
    "Bradford",
    "Brevard",
    "Broward",
    "Calhoun",
    "Charlotte",
    "Citrus",
    "Clay",
    "Collier",
    "Columbia",
    "DeSoto",
    "Dixie",
    "Duval",
    "Escambia",
    "Flagler",
    "Franklin",
    "Gadsden",
    "Gilchrist",
    "Glades",
    "Gulf",
    "Hamilton",
    "Hardee",
    "Hendry",
    "Hernando",
    "Highlands",
    "Hillsborough",
    "Holmes",
    "Indian River",
    "Jackson",
    "Jefferson",
    "Lafayette",
    "Lake",
    "Lee",
    "Leon",
    "Levy",
    "Liberty",
    "Madison",
    "Manatee",
    "Marion",
    "Martin",
    "Monroe",
    "Nassau",
    "Okaloosa",
    "Okeechobee",
    "Orange",
    "Osceola",
    "Palm Beach",
    "Pasco",
    "Pinellas",
    "Polk",
    "Putnam",
    "Santa Rosa",
    "Sarasota",
    "Seminole",
    "St. Johns",
    "St. Lucie",
    "Sumter",
    "Suwannee",
    "Taylor",
    "Union",
    "Volusia",
    "Wakulla",
    "Walton",
    "Washington",
  ].forEach((county) => (shields[`US:FL:CR:${county}`] = usMUTCDCountyShield));

  shields["US:GA"] = {
    backgroundImage: [
      shieldImages.shield40_us_ga_2,
      shieldImages.shield40_us_ga_3,
    ],
    textColor: "black",
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

  shields["US:GU"] = {
    backgroundImage: [
      shieldImages.shield40_us_gu_2,
      shieldImages.shield40_us_gu_3,
    ],
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 1,
      right: 1,
      top: 4,
      bottom: 4,
    },
  };

  shields["US:HI"] = {
    backgroundImage: shieldImages.shield40_us_hi,
    textColor: "black",
    padding: {
      left: 3,
      right: 3,
      top: 5.5,
      bottom: 4.5,
    },
  };

  shields["US:IA"] = roundedRectShield("white", "black", "black", 8, 1, null);

  shields["US:ID"] = {
    backgroundImage: [
      shieldImages.shield40_us_id_2,
      shieldImages.shield40_us_id_3,
    ],
    textColor: "black",
    padding: {
      left: 5,
      right: 1,
      top: 1,
      bottom: 8,
    },
  };

  shields["US:IL"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:IN"] = roundedRectShield("white", "black", "black", 1, 1);

  shields["US:IN:Toll"] = {
    norefImage: shieldImages.shield40_us_in_toll,
    notext: true,
  };

  shields["US:KS"] = {
    backgroundImage: [
      shieldImages.shield40_us_ks_2,
      shieldImages.shield40_us_ks_3,
    ],
    textColor: "black",
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
  };

  shields["US:KY"] = roundedRectShield("white", "black", "black", 8, 1, null);
  shields["US:KY:Business"] = banneredShield(shields["US:KY"], ["BUS"]);

  shields["US:KY:AA"] = {
    backgroundImage: shieldImages.shield40_us_ky_parkway,
    textColor: "#003f87",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
  };
  shields["US:KY:Parkway"] = Object.assign(
    {
      // FIXME: This object contains both spelled-out and abbreviated road
      // names to accommodate both the abbreviated names from OpenMapTiles and
      // the spelled-out names from Planetiler.
      // https://github.com/onthegomap/planetiler/issues/14
      // This is a special case, as documented in CONTRIBUTE.md
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

  shields["US:LA"] = {
    backgroundImage: [
      shieldImages.shield40_us_la_2,
      shieldImages.shield40_us_la_3,
    ],
    textColor: "black",
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

  shields["US:MA"] = roundedRectShield("white", "black", "black", 1, 1);

  let padding_us_md = {
    left: 4,
    right: 4,
    top: 7,
    bottom: 3,
  };
  let shield_us_md = [
    shieldImages.shield40_us_md_2,
    shieldImages.shield40_us_md_3,
  ];
  shields["US:MD"] = {
    backgroundImage: shield_us_md,
    textColor: "black",
    padding: padding_us_md,
  };
  shields["US:MD:Alternate"] = banneredShield(shields["US:MD"], ["ALT"]);
  shields["US:MD:Bypass"] = banneredShield(shields["US:MD"], ["BYP"]);
  shields["US:MD:Business"] = banneredShield(
    {
      backgroundImage: shield_us_md,
      textColor: "black",
      padding: padding_us_md,
      colorLighten: "#006747",
    },
    ["BUS"]
  );

  shields["US:ME"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:MI"] = diamondShield;
  shields["US:MI:CR"] = usMUTCDCountyShield;

  shields["US:MN"] = {
    backgroundImage: [
      shieldImages.shield40_us_mn_2,
      shieldImages.shield40_us_mn_3,
    ],
    textColor: "white",
    padding: {
      left: 4,
      right: 4,
      top: 7,
      bottom: 3,
    },
  };

  shields["US:MO"] = {
    backgroundImage: [
      shieldImages.shield40_us_mo_2,
      shieldImages.shield40_us_mo_3,
    ],
    textColor: "black",
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
    "white",
    "black",
    "black",
    1,
    1
  );
  shields["US:MO:Supplemental:Spur"] = banneredShield(
    shields["US:MO:Supplemental"],
    ["SPUR"]
  );
  shields["US:MO:Taney"] = usMUTCDCountyShield;

  shields["US:MP"] = {
    backgroundImage: [
      shieldImages.shield40_us_mp_2,
      shieldImages.shield40_us_mp_3,
    ],
    textColor: "black",
    padding: {
      left: 4,
      right: 4,
      top: 2,
      bottom: 2,
    },
  };

  shields["US:MS"] = circleShield("white", "black");

  shields["US:MT"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:MT:secondary"] = {
    backgroundImage: shieldImages.shield40_us_mt_secondary,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 0,
      bottom: 6,
    },
  };

  shields["US:NC"] = diamondShield;
  shields["US:NC:Bypass"] = banneredShield(shields["US:NC"], ["BYP"]);
  shields["US:NC:Business"] = banneredShield(shields["US:NC"], ["BUS"]);
  shields["US:NC:Charlotte"] = {
    backgroundImage: shieldImages.shield40_us_nc_charlotte,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 6,
    },
  };

  shields["US:ND"] = {
    backgroundImage: [
      shieldImages.shield40_us_nd_2,
      shieldImages.shield40_us_nd_3,
    ],
    textColor: "black",
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

  shields["US:NE"] = trapezoidUpShield;
  shields["US:NE:Business"] = banneredShield(shields["US:NE"], ["BUS"]);
  shields["US:NE:Link"] = banneredShield(shields["US:NE"], ["LINK"]);
  shields["US:NE:Rec"] = banneredShield(shields["US:NE"], ["REC"]);
  shields["US:NE:Spur"] = banneredShield(shields["US:NE"], ["SPUR"]);

  shields["US:NH"] = {
    backgroundImage: shieldImages.shield40_us_nh,
    textColor: "black",
    padding: {
      left: 3,
      right: 2,
      top: 4,
      bottom: 5,
    },
  };

  shields["US:NH:Bypass"] = banneredShield(shields["US:NH"], ["BYP"]);
  shields["US:NJ"] = circleShield("white", "black");

  shields["US:NJ:ACE"] = {
    backgroundImage: shieldImages.shield40_us_nj_ace_noref,
    notext: true,
  };

  shields["US:NJ:GSP"] = {
    backgroundImage: shieldImages.shield40_us_nj_gsp_noref,
    notext: true,
  };

  shields["US:NJ:NJTP"] = {
    backgroundImage: shieldImages.shield40_us_nj_njtp_noref,
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
  ].forEach((county) => (shields[`US:NJ:${county}`] = usMUTCDCountyShield));
  shields["US:NJ:Bergen"] = roundedRectShield("white", "black", "black", 1, 1);

  shields["US:NM"] = roundedRectShield("white", "red", "black", 8, 1, null);

  shields["US:NV"] = {
    backgroundImage: shieldImages.shield40_us_nv,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 12,
    },
  };
  shields["US:NV:Clark"] = usMUTCDCountyShield;

  shields["US:NY"] = {
    backgroundImage: shieldImages.shield40_us_ny,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  shields["US:NY:Thruway"] = {
    norefImage: shieldImages.shield40_us_ny_thruway,
    notext: true,
  };

  shields["US:NY:STE"] = {
    norefImage: shieldImages.shield40_us_ny_ste,
    notext: true,
  };

  shields["US:OH"] = {
    backgroundImage: [
      shieldImages.shield40_us_oh_2,
      shieldImages.shield40_us_oh_3,
    ],
    norefImage: shieldImages.shield40_us_oh_turnpike,
    textColor: "black",
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
    // Yellow on blue pentagon
    (county) => (shields[`US:OH:${county}`] = usMUTCDCountyShield)
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
    // Black on white rectangle
    (countyTownshipOrCity) =>
      (shields[`US:OH:${countyTownshipOrCity}`] = roundedRectShield(
        "white",
        "black",
        "black",
        2,
        1,
        null
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
    // White on green rectangle
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        "#006747",
        "white",
        "white",
        2,
        1,
        null
      ))
  );
  ["MED", "NOB", "WAY:Paint", "WAY:Salt_Creek"].forEach(
    // White on blue rectangle
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        "#003f87",
        "white",
        "white",
        2,
        1,
        null
      ))
  );
  ["TRU", "VIN", "COS:Adams"].forEach(
    // Black on yellow rectangle
    (countyOrTownship) =>
      (shields[`US:OH:${countyOrTownship}`] = roundedRectShield(
        "#ffcd00",
        "black",
        "black",
        2,
        1,
        null
      ))
  );
  shields["US:OH:ASD"] = {
    backgroundImage: [shieldImages.shield40_us_oh_asd],
    textColor: "#006747",
    padding: {
      left: 6,
      right: 3,
      top: 4,
      bottom: 7,
    },
  };
  shields["US:OH:SCI"] = {
    backgroundImage: [
      shieldImages.shield40_us_oh_sci_2,
      shieldImages.shield40_us_oh_sci_3,
    ],
    textColor: "black",
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 6,
    },
  };
  shields["US:OH:HOC:Falls"] = roundedRectShield(
    "white",
    "#006747",
    "black",
    2,
    1,
    null
  );
  shields["US:OH:PER:Monday_Creek"] = roundedRectShield(
    "#006747",
    "black",
    "black",
    2,
    1,
    null
  );
  shields["US:OH:TUS:Salem"] = {
    backgroundImage: [shieldImages.shield40_us_oh_tus_salem],
    textColor: "black",
    padding: {
      left: 1,
      right: 4,
      top: 1,
      bottom: 4,
    },
  };

  // If a township's road shields have the same shape and colors as the surrounding county's road shields,
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

  shields["US:OK"] = {
    backgroundImage: [
      shieldImages.shield40_us_ok_2,
      shieldImages.shield40_us_ok_3,
    ],
    textColor: "black",
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

  shields["US:OR"] = {
    backgroundImage: [
      shieldImages.shield40_us_or_2,
      shieldImages.shield40_us_or_3,
    ],
    textColor: "black",
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 6.5,
    },
  };

  shields["US:OR:Business"] = banneredShield(shields["US:OR"], ["BUS"]);

  shields["US:PA"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
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
    backgroundImage: shieldImages.shield40_us_pa_turnpike,
    norefImage: shieldImages.shield40_us_pa_turnpike_noref,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 5,
      bottom: 5,
    },
  };

  shields["US:PA:Belt"] = {
    notext: true,
    backgroundDraw: ShieldDraw.paBelt,
  };

  shields["US:RI"] = roundedRectShield("white", "black", "black", 1, 1);

  shields["US:SC"] = {
    backgroundImage: shieldImages.shield40_us_sc,
    textColor: "#003478",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 4,
    },
  };

  shields["US:SC:Truck"] = banneredShield(shields["US:SC"], ["TRK"]);
  shields["US:SC:Business"] = banneredShield(shields["US:SC"], ["BUS"]);
  shields["US:SC:Alternate"] = banneredShield(shields["US:SC"], ["ALT"]);

  shields["US:SD"] = {
    backgroundImage: [
      shieldImages.shield40_us_sd_2,
      shieldImages.shield40_us_sd_3,
    ],
    textColor: "black",
    padding: {
      left: 2,
      right: 3,
      top: 2,
      bottom: 4,
    },
  };

  shields["US:TX"] = roundedRectShield("white", "black", "black", 1, 1, null);
  shields["US:TX:Andrews:Andrews:Loop"] = banneredShield(
    roundedRectShield("white", "#003f87", "#003f87", 1, 1, null),
    ["LOOP"]
  );
  shields["US:TX:Loop"] = banneredShield(shields["US:TX"], ["LOOP"]);
  shields["US:TX:Spur"] = banneredShield(shields["US:TX"], ["SPUR"]);
  shields["US:TX:Business"] = banneredShield(shields["US:TX"], ["BUS"]);
  shields["US:TX:Park"] = banneredShield(shields["US:TX"], ["PARK"]);
  shields["US:TX:Beltway"] = banneredShield(shields["US:TX"], ["BELT"]);
  shields["US:TX:FM"] = banneredShield(shields["US:TX"], ["F.M."]);
  shields["US:TX:FM:Business"] = banneredShield(shields["US:TX:FM"], [
    "BUS, F.M.",
  ]);
  shields["US:TX:PA"] = banneredShield(shields["US:TX"], ["P.A."]);
  shields["US:TX:RM"] = banneredShield(shields["US:TX"], ["R.M."]);
  shields["US:TX:Recreational"] = banneredShield(
    roundedRectShield("white", "#693f23", "#693f23", 1, 1, null),
    ["R"]
  );
  shields["US:TX:NASA"] = banneredShield(shields["US:TX"], ["NASA"]);

  shields["US:TX:Toll"] = banneredShield(
    roundedRectShield("#003f87", "white", "white", 1, 1, null),
    ["TOLL"]
  );
  shields["US:TX:BCTRA"] = shields["US:TX:Toll"];
  shields["US:TX:CTRMA"] = shields["US:TX:Toll"];
  shields["US:TX:NTTA"] = shields["US:TX:Toll"];
  shields["US:TX:Express:Toll"] = banneredShield(shields["US:TX:Toll"], [
    "EXPR",
    "TOLL",
  ]);
  shields["US:TX:Loop:Toll"] = banneredShield(shields["US:TX:Toll"], [
    "TOLL",
    "LOOP",
  ]);
  shields["US:TX:Loop:Express:Toll"] = banneredShield(shields["US:TX:Toll"], [
    "EXPR",
    "TOLL",
    "LOOP",
  ]);

  shields["US:UT"] = {
    backgroundImage: [
      shieldImages.shield40_us_ut_2,
      shieldImages.shield40_us_ut_3,
    ],
    textColor: "black",
    padding: {
      left: 4,
      right: 4,
      top: 5.5,
      bottom: 5,
    },
  };

  shields["US:VA"] = {
    backgroundImage: shieldImages.shield40_us_va,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 8,
    },
  };

  shields["US:VA:Business"] = banneredShield(shields["US:VA"], ["BUS"]);
  shields["US:VA:Alternate"] = banneredShield(shields["US:VA"], ["ALT"]);

  shields["US:VA:Secondary"] = roundedRectShield(
    "white",
    "black",
    "black",
    8,
    1,
    null
  );

  shields["US:VI"] = circleShield("white", "black");

  shields["US:VT"] = {
    backgroundImage: shieldImages.shield40_us_vt,
    textColor: "#006b54",
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 5,
    },
  };

  shields["US:WA"] = {
    backgroundImage: shieldImages.shield40_us_wa,
    textColor: "black",
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

  shields["US:WI"] = {
    backgroundImage: [
      shieldImages.shield40_us_wi_2,
      shieldImages.shield40_us_wi_3,
    ],
    textColor: "black",
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
    "Eau Claire",
    "Florence",
    "Fond du Lac",
    "Forest",
    "Grant",
    "Green",
    "Green Lake",
    "Iowa",
    "Iron",
    "Jackson",
    "Jefferson",
    "Juneau",
    "Kenosha",
    "Kewaunee",
    "La Crosse",
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
    "Saint Croix",
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
        "white",
        "black",
        "black",
        1,
        1
      ))
  );
  shields["US:WI:Marquette:Truck"] = banneredShield(
    shields["US:WI:Marquette"],
    ["TRK"]
  );
  shields["US:WI:Rustic"] = {
    backgroundImage: shieldImages.shield40_us_wi_rustic,
    textColor: "#ffcd00",
    padding: {
      left: 1.5,
      right: 4,
      top: 9,
      bottom: 4,
    },
  };

  shields["US:WV"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:WY"] = roundedRectShield("#ffcd00", "black", "black", 1, 1);

  // Asia
  shields["BD:national"] = roundedRectShield("#006747", "white", "white", 2, 1);
  shields["BD:regional"] = roundedRectShield("#ffcd00", "black", "black", 2, 1);

  shields["CN:national"] = roundedRectShield(
    "#bf2033",
    "white",
    "white",
    2,
    1,
    null
  );
  shields["CN:expressway"] = {
    backgroundImage: [
      shieldImages.shield40_cn_national_expressway_2,
      shieldImages.shield40_cn_national_expressway_3,
      shieldImages.shield40_cn_national_expressway_4,
    ],
    textColor: "white",
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
      "#ffcd00",
      "black",
      "black",
      2,
      1,
      null
    );
    shields[`CN:${province}:expressway`] = {
      backgroundImage: [
        shieldImages.shield40_cn_regional_expressway_2,
        shieldImages.shield40_cn_regional_expressway_3,
        shieldImages.shield40_cn_regional_expressway_4,
      ],
      textColor: "white",
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
        "white",
        "black",
        "black",
        2,
        1
      ))
  );

  shields["HK"] = {
    backgroundImage: shieldImages.shield40_hk,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "black",
    padding: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 12,
    },
  };

  shields["JP:E"] = roundedRectShield("#006747", "white", "white", 2, 1);
  shields["JP:national"] = {
    backgroundImage: [
      shieldImages.shield40_jp_national_2,
      shieldImages.shield40_jp_national_3,
    ],
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 1,
      bottom: 5,
    },
  };
  shields["JP:prefectural"] = {
    backgroundImage: shieldImages.shield40_jp_prefectural,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
  };
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

  shields["MY:E"] = shields["my:federal"] = {
    backgroundImage: shieldImages.shield40_my,
    textColor: "black",
    padding: {
      left: 1,
      right: 1,
      top: 5,
      bottom: 5,
    },
  };

  shields["np:national"] = roundedRectShield("#006747", "white", "white", 2, 1);
  shields["np:regional"] = roundedRectShield("white", "black", "black", 2, 1);

  shields["PH:N"] = homeDownWhiteShield;
  shields["PH:E"] = {
    backgroundImage: shieldImages.shield40_ph_expressway_2,
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
  };

  shields["KR:expressway"] = {
    backgroundImage: [
      shieldImages.shield40_kr_expressway_2,
      shieldImages.shield40_kr_expressway_3,
    ],
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 4,
      right: 4,
      top: 8,
      bottom: 4,
    },
  };
  shields["KR:national"] = circleShield("#003f87", "white", "white", 30);
  shields["KR:local"] = roundedRectShield(
    "#ffcd00",
    "white",
    "#003f87",
    2,
    1,
    null
  );

  shields["TW:freeway"] = {
    backgroundImage: shieldImages.shield40_tw_freeway,
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    textColor: "black",
    padding: {
      left: 4,
      right: 4,
      top: 4,
      bottom: 4,
    },
  };
  shields["TW:provincial"] = {
    backgroundImage: shieldImages.shield40_tw_provincial,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 10,
    },
  };
  shields["TW:expressway"] = {
    backgroundImage: shieldImages.shield40_tw_expressway,
    textLayoutConstraint: ShieldText.southHalfellipseTextConstraint,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 10,
    },
  };
  ["city", "county", "district", "township"].forEach(
    (type) =>
      (shields[`TW:${type}`] = roundedRectShield(
        "white",
        "black",
        "black",
        2,
        1
      ))
  );

  shields["vn:expressway"] = roundedRectShield(
    "#ffcd00",
    "black",
    "black",
    2,
    1,
    null
  );
  shields["vn:national"] = roundedRectShield("white", "black", "black", 2, 1);

  // Europe
  shields["e-road"] = {
    backgroundImage: [
      shieldImages.shield40_un_e_2,
      shieldImages.shield40_un_e_3,
    ],
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 2,
    },
  };

  shields["AT:A-road"] = roundedRectShield(
    "#276fb7",
    null,
    "white",
    2,
    0,
    null
  );

  shields["CZ:national"] = {
    backgroundImage: shieldImages.shield40_cz_2,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 4,
      bottom: 4,
    },
  };

  shields["cz:national"] = {
    backgroundImage: shieldImages.shield40_cz_prim_2,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 4,
      bottom: 4,
    },
  };

  shields["IT:A-road"] = {
    backgroundImage: [
      shieldImages.shield40_it_2,
      shieldImages.shield40_it_3,
      shieldImages.shield40_it_4,
    ],
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

  /**
   * The top-level Swiss highway network is currently tagged with the oddly generic network=motorway.
   * Given the general lack of data consumer support for road route relations in Europe, this code is
   * temporarily disabled until we can be assured that supporting such a generic value for a national
   * network is appropriate mapper feedback.
   */

  // Switzerland
  // shields["motorway"] = {
  //   backgroundImage: shieldImages.shield40_ch_2,
  //   textColor: "white",
  //   padding: {
  //     left: 2,
  //     right: 2,
  //     top: 5,
  //     bottom: 5,
  //   },
  // };

  shields["HU:national"] = {
    backgroundImage: shieldImages.shield40_hu_2,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 2,
      bottom: 6,
    },
  };

  shields["sk:national"] = roundedRectShield(
    "#ba1e10",
    "white",
    "white",
    3,
    2,
    33
  );

  shields["SI:AC"] = {
    backgroundImage: shieldImages.shield40_si_2,
    textColor: "white",
    padding: {
      left: 3,
      right: 3,
      top: 4,
      bottom: 5,
    },
  };

  // Croatia
  shields["Autoceste"] = shields["SI:AC"];
  shields["Državne ceste"] = shields["cz:national"];

  // Netherlands
  shields["NL:A"] = roundedRectShield(
    "#ba1e10",
    "white",
    "white",
    2,
    1.5,
    null
  );
  shields["NL:N"] = roundedRectShield("#eacb44", null, "black", 2, 0, null);

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
 * Determines whether a shield should be changed in color from the base color
 * to another color via a "lighten" operation.  For example, Historic US 66
 * should be converted from the standard black US route shield to the historic
 * brown color.  This function is a comprehensive list of special cases.
 *
 * @param {*} network - Route network
 * @param {*} ref - Route ref value
 */
export function shieldLighten(network, ref) {
  var shieldDef = shields[network];
  if (shieldDef == null) {
    return null;
  }
  //Ref-specific cases.  Additional entries should be documented in CONTRIBUTE.md
  switch (network) {
    case "US:GA":
      switch (ref) {
        case "515":
          return "#003478";
        case "520":
          return "#006a4d";
        default:
          return null;
      }
    case "CA:YT":
      switch (ref) {
        case "2":
        case "3":
          return "#ce9d00";
        case "5":
        case "11":
          return "#003f87";
        case "6":
          return "#006747";
        default:
          return "#bf2033";
      }
    default:
      //Network-specific cases are defined in shield definitions:
      return shieldDef.colorLighten;
  }
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
