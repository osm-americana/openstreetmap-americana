"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";

//Height of modifier banners
export const bannerSizeH = 40;

export const shields = {};

function circleShield(fillColor, strokeColor) {
  return {
    backgroundDraw: () => ShieldDraw.circle(fillColor, strokeColor),
    padding: {
      left: 11,
      right: 11,
      top: 11,
      bottom: 11,
    },
  };
}

export function loadShields(shieldImages) {
  // Multi-use shields

  //Diamond shields
  var diamondShield = {
    backgroundImage: shieldImages.shield40_us_nc,
    textColor: "black",
    padding: {
      left: 17,
      right: 17,
      top: 17,
      bottom: 17,
    },
  };

  var usMUTCDCountyShield = {
    backgroundImage: shieldImages.shield40_us_county,
    textColor: "#f7d117",
    padding: {
      left: 10,
      right: 10,
      top: 14,
      bottom: 23,
    },
  };

  shields["US:I"] = {
    backgroundImage: [
      shieldImages.shield40_us_interstate_2,
      shieldImages.shield40_us_interstate_3,
    ],
    textColor: "white",
    padding: {
      left: 12,
      right: 12,
      top: 20,
      bottom: 20,
    },
  };

  shields["US:I:Business:Loop"] = {
    backgroundImage: [
      shieldImages.shield40_us_interstate_business_2,
      shieldImages.shield40_us_interstate_business_3,
    ],
    textColor: "white",
    padding: {
      left: 12,
      right: 12,
      top: 20,
      bottom: 20,
    },
  };

  shields["US:I:Business:Spur"] = shields["US:I:Business:Loop"];

  //US Highways
  var shield_us_us = [
    shieldImages.shield40_us_us_2,
    shieldImages.shield40_us_us_3,
  ];
  var padding_us_us = {
    left: 10,
    right: 10,
    top: 17,
    bottom: 20,
  };

  shields["US:US"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
  };

  shields["US:US:Truck"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["TRK"],
  };

  shields["US:US:Alternate:Truck:Business"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["ALT", "TRK", "BUS"],
  };

  shields["US:US:Historic"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    colorLighten: "#613214",
  };

  shields["US:CA"] = {
    backgroundImage: [
      shieldImages.shield40_us_ca_2,
      shieldImages.shield40_us_ca_3,
    ],
    textColor: "white",
    padding: {
      left: 13,
      right: 13,
      top: 25,
      bottom: 10,
    },
  };

  shields["US:CA:CR"] = usMUTCDCountyShield;
  shields["US:DE"] = circleShield("white", "black");

  shields["US:GA"] = {
    backgroundImage: [
      shieldImages.shield40_us_ga_2,
      shieldImages.shield40_us_ga_3,
    ],
    textColor: "black",
    padding: {
      left: 10,
      right: 14,
      top: 25,
      bottom: 13,
    },
  };

  shields["US:HI"] = {
    backgroundImage: shieldImages.shield40_us_hi,
    textColor: "black",
    padding: {
      left: 13,
      right: 13,
      top: 25,
      bottom: 13,
    },
  };

  shields["US:IA"] = circleShield("white", "black");

  shields["US:KS"] = {
    backgroundImage: [
      shieldImages.shield40_us_ks_2,
      shieldImages.shield40_us_ks_3,
    ],
    textColor: "black",
    padding: {
      left: 13,
      right: 13,
      top: 13,
      bottom: 13,
    },
  };

  shields["US:MI"] = diamondShield;

  shields["US:MN"] = {
    backgroundImage: [
      shieldImages.shield40_us_mn_2,
      shieldImages.shield40_us_mn_3,
    ],
    textColor: "white",
    padding: {
      left: 13,
      right: 13,
      top: 25,
      bottom: 10,
    },
  };

  shields["US:MS"] = circleShield("white", "black");
  shields["US:NC"] = diamondShield;

  shields["US:NH"] = {
    backgroundImage: shieldImages.shield40_us_nh,
    textColor: "black",
    padding: {
      left: 9,
      right: 5,
      top: 16,
      bottom: 16,
    },
  };

  shields["US:NM"] = circleShield("white", "red");
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
  ].forEach((county) => (shields["US:NJ:" + county] = usMUTCDCountyShield));

  shields["US:NY"] = {
    backgroundImage: shieldImages.shield40_us_ny,
    textColor: "black",
    padding: {
      left: 5,
      right: 5,
      top: 20,
      bottom: 20,
    },
  };

  shields["US:NY:Thruway"] = {
    norefImage: shieldImages.shield40_us_ny_thruway,
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
      left: 10,
      right: 15,
      top: 20,
      bottom: 20,
    },
  };

  shields["US:PA"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    padding: {
      left: 8,
      right: 8,
      top: 17,
      bottom: 13,
    },
  };

  shields["US:PA:Business"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: 0,
      bottom: 10,
    },
    modifiers: ["BUS"],
  };

  shields["US:PA:Turnpike"] = {
    backgroundImage: shieldImages.shield40_us_pa_turnpike,
    norefImage: shieldImages.shield40_us_pa_turnpike_noref,
    textColor: "white",
    padding: {
      left: 8,
      right: 8,
      top: 22,
      bottom: 22,
    },
  };

  shields["US:PA:Belt"] = {
    notext: true,
    backgroundDraw: ShieldDraw.paBelt,
  };

  shields["US:SC"] = {
    backgroundImage: shieldImages.shield40_us_sc,
    textColor: "#003478",
    padding: {
      left: 2,
      right: 2,
      top: 15,
      bottom: 12,
    },
  };

  shields["US:VA"] = {
    backgroundImage: shieldImages.shield40_us_va,
    textColor: "black",
    padding: {
      left: 6,
      right: 6,
      top: 6,
      bottom: 32,
    },
  };

  shields["US:VA:Secondary"] = circleShield("white", "black");

  shields["US:VT"] = {
    backgroundImage: shieldImages.shield40_us_vt,
    textColor: "#006b54",
    padding: {
      left: 8,
      right: 8,
      top: 12,
      bottom: 12,
    },
  };

  // Europe
  shields["e-road"] = {
    backgroundImage: [
      shieldImages.shield40_eu_hw_2,
      shieldImages.shield40_eu_hw_3,
    ],
    textColor: "white",
    padding: {
      left: 15,
      right: 15,
      top: 10,
      bottom: 10,
    },
  };

  // Switzerland
  shields["motorway"] = {
    backgroundImage: shieldImages.shield40_eu_ch_2,
    textColor: "white",
    padding: {
      left: 10,
      right: 10,
      top: 18,
      bottom: 20,
    },
  };

  shields["HU:national"] = {
    backgroundImage: shieldImages.shield40_eu_hu_2,
    textColor: "white",
    padding: {
      left: 13,
      right: 13,
      top: 13,
      bottom: 23,
    },
  };

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
  //Ref-specific cases:
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
