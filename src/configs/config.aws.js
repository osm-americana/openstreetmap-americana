"use strict";

/*
Planetiler tile server, hosted at AWS
*/
const OPENMAPTILES_URL = "https://tile.ourmap.us/data/v3.json";

/*
The following two variables override the color of the bounding box and halo of
shield text, respectively. Useful while testing shield design changes.
Both accept an HTML color name, hex code, or other CSS color value.
*/
const SHIELD_TEXT_BBOX_COLOR = null;
const SHIELD_TEXT_HALO_COLOR_OVERRIDE = null;

/*
Uncomment the following line here and in the export block to change the location
of the font stack (normally, for development and test)
*/
//const FONT_URL = font_stack_url

export default {
  OPENMAPTILES_URL,
  SHIELD_TEXT_BBOX_COLOR,
  SHIELD_TEXT_HALO_COLOR_OVERRIDE,
  // FONT_URL,
};
