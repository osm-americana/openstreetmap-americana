"use strict";

export function loadShields(shieldImages) {
  
    shields["US:US"] = {
      backgroundImage: shieldImages.shield40_us_us,
      textColor: "black",
      padding: {
        left: 10,
        right: 10,
        top: 14,
        bottom: 15,
      },
    };
  
    shields["US:I"] = {
      backgroundImage: shieldImages.shield40_us_interstate_2,
      textColor: "white",
      padding: {
        left: 5,
        right: 5,
        top: 18,
        bottom: 20,
      },
    };
  
    shields["US:US:Truck"] = {
      backgroundImage: shieldImages.shield40_us_us,
      textColor: "black",
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 20,
      },
      modifiers: ["TRK"],
    };
  
    shields["US:US:Historic"] = {
      backgroundImage: shieldImages.shield40_us_us,
      textColor: "black",
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10,
      },
      colorLighten: "#613214",
    };
  
    //Diamon shields
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