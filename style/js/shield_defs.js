"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as ShieldText from "./shield_text.js";
import * as Gfx from "./screen_gfx.js";

//Height of modifier banners
export const bannerSizeH = 8 * Gfx.getPixelRatio();

export const shields = {};

function circleShield(fillColor, strokeColor) {
  return {
    backgroundDraw: (ref) => ShieldDraw.ellipse(fillColor, strokeColor, ref),
    textLayoutConstraint: ShieldText.ellipseTextConstraint,
    padding: {
      left: 2,
      right: 2,
      top: 2,
      bottom: 2,
    },
    maxFontSize: 16,
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

  shields["US:US:Truck"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["TRK"],
  };

  shields["US:US:Spur"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["SPUR"],
  };

  shields["US:US:Bypass"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["BYP"],
  };

  shields["US:US:Business"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["BUS"],
  };

  shields["US:US:Alternate"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    modifiers: ["ALT"],
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
      left: 4,
      right: 4,
      top: 6,
      bottom: 4,
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
      left: 3,
      right: 4,
      top: 5,
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
  shields["US:MI"] = diamondShield;

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
  shields["US:NC"] = diamondShield;

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

  shields["US:NM"] = roundedRectShield("white", "red", "black", 8, 1, null);
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

  shields["US:PA:Truck"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: 0,
      bottom: 10,
    },
    modifiers: ["TRK"],
  };

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

  // Switzerland
  shields["motorway"] = {
    backgroundImage: shieldImages.shield40_ch_2,
    textColor: "white",
    padding: {
      left: 2,
      right: 2,
      top: 5,
      bottom: 5,
    },
  };

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
