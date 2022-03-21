"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as ShieldText from "./shield_text.js";
import * as Gfx from "./screen_gfx.js";
import * as Util from "./util.js";

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
    backgroundImage: shieldImages.shield40_us_nc,
    textColor: "black",
    padding: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
  };

  var usMUTCDCountyShield = {
    backgroundImage: shieldImages.shield40_us_county,
    textColor: "#f7d117",
    padding: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 6,
    },
  };

  // Home plate, flipped vertically, white fill, black stroke
  let homeDownWhiteShield = {
    backgroundImage: [
      shieldImages.shield40_home_down_white_2,
      shieldImages.shield40_home_down_white_3,
    ],
    textColor: "black",
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 6,
    },
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
  var shield_us_us = [
    shieldImages.shield40_us_us_2,
    shieldImages.shield40_us_us_3,
  ];
  var padding_us_us = {
    left: 2,
    right: 2,
    top: 4,
    bottom: 5,
  };

  shields["US:US"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
  };

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
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    colorLighten: "#613214",
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
  shields["US:CT"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:DE"] = circleShield("white", "black");
  shields["US:DE:Alternate"] = banneredShield(shields["US:DE"], ["ALT"]);
  shields["US:DE:Business"] = banneredShield(shields["US:DE"], ["BUS"]);
  shields["US:DE:Truck"] = banneredShield(shields["US:DE"], ["TRK"]);

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

  shields["US:MA"] = roundedRectShield("white", "black", "black", 1, 1);
  shields["US:MI"] = diamondShield;
  shields["US:MI:CR"] = usMUTCDCountyShield;
  shields["US:ME"] = roundedRectShield("white", "black", "black", 1, 1);

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
    "Camden",
    "Cumberland",
    "Passaic",
    "Burlington",
    "Essex",
    "Atlantic",
    "Somerset",
    "Sussex",
    "Morris",
    "Monmouth",
    "Ocean",
    "Middlesex",
    "Mercer",
    "Union",
    "Warren",
    "Hudson",
    "Salem",
    "Gloucester",
  ].forEach((county) => (shields[`US:NJ:${county}`] = usMUTCDCountyShield));

  shields["US:NM"] = roundedRectShield("white", "red", "black", 8, 1, null);

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
  shields["US:WV"] = roundedRectShield("white", "black", "black", 1, 1);

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
