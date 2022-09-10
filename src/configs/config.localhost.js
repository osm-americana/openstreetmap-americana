"use strict";

/*
  Locally-run openmaptiles build
*/
const OPENMAPTILES_URL = "http://localhost:8080/data/v3.json";

/*
Uncomment this variable to override the shield text halo color. Useful while testing shield design changes.
Accepts an HTML color name, hex code, or other CSS color value.
*/
const SHIELD_TEXT_HALO_COLOR_OVERRIDE = null;

export default {
  OPENMAPTILES_URL,
  SHIELD_TEXT_HALO_COLOR_OVERRIDE,
};
