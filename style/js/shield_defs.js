"use strict";

export function loadShields(shieldImages) {
  var shields = {};

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

  shields["US:US:Historic"] = {
    backgroundImage: shield_us_us,
    textColor: "black",
    padding: padding_us_us,
    colorLighten: "#613214",
  };

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

  //Diamond shields
  shields["US:MI"] = {
    backgroundImage: shieldImages.shield40_us_nc,
    textColor: "black",
    padding: {
      left: 17,
      right: 17,
      top: 17,
      bottom: 17,
    },
  };
  shields["US:NC"] = shields["US:MI"];

  shields["US:NH"] = {
    backgroundImage: shieldImages.shield40_us_nh,
    textColor: "black",
    padding: {
      left: 18,
      right: 10,
      top: 12,
      bottom: 12,
    },
  };

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

  shields["US:NJ:CR"] = {
    backgroundImage: shieldImages.shield40_us_county,
    textColor: "#f7d117",
    padding: {
      left: 10,
      right: 10,
      top: 14,
      bottom: 15,
    },
  };

  shields["US:NY"] = {
    backgroundImage: shieldImages.shield40_us_ny,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: 15,
      bottom: 15,
    },
  };

  shields["US:OH"] = {
    backgroundImage: [
      shieldImages.shield40_us_oh_2,
      shieldImages.shield40_us_oh_3,
    ],
    textColor: "black",
    padding: {
      left: 10,
      right: 15,
      top: 15,
      bottom: 15,
    },
  };

  shields["US:PA"] = {
    backgroundImage: shieldImages.shield40_us_pa,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: 12,
      bottom: 11,
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
    textColor: "white",
    padding: {
      left: 10,
      right: 10,
      top: 12,
      bottom: 11,
    },
  };

  shields["US:PA:Belt"] = {
    notext: true,
  };

  shields["US:SC"] = {
    backgroundImage: shieldImages.shield40_us_sc,
    textColor: "#003478",
    padding: {
      left: 10,
      right: 10,
      top: 15,
      bottom: 12,
    },
  };

  shields["US:VA"] = {
    backgroundImage: shieldImages.shield40_us_va,
    textColor: "black",
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 20,
    },
  };

  shields["US:VT"] = {
    backgroundImage: shieldImages.shield40_us_vt,
    textColor: "#006b54",
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 12,
    },
  };

  return shields;
}

/**
 * Determines whether a shield should be changed in color from the base color
 * to another color via a "lighten" operation.  For example, Historic US 66
 * should be converted from the standard black US route shield to the historic
 * brown color.  This function is a comprehensive list of special cases.
 *
 * @param {*} shieldDef - Shield style definition defined in loadShields
 * @param {*} network - Route network
 * @param {*} ref - Route ref value
 */
export function shieldLighten(shieldDef, network, ref) {
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
