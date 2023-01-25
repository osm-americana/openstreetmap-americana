"use strict";

/*
  Locally-run openmaptiles build
*/
const OPENMAPTILES_URL = "http://localhost:8080/data/v3.json";

/*
The following two variables override the color of the bounding box and halo of
shield text, respectively. Useful while testing shield design changes.
Both accept an HTML color name, hex code, or other CSS color value.
*/
const SHIELD_TEXT_BBOX_COLOR = null;
const SHIELD_TEXT_HALO_COLOR_OVERRIDE = null;

export default {
  OPENMAPTILES_URL,
  SHIELD_TEXT_BBOX_COLOR,
  SHIELD_TEXT_HALO_COLOR_OVERRIDE,
};
