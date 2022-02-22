"use strict";

/*
This style requires a vector tile server to run.
This configuration is for running with MapTiler Cloud.

Visit MapTiler Cloud and create an account/log in:
https://cloud.maptiler.com/maps/

Go to Account->Keys and create a key to paste here:
*/
const MAPTILER_KEY = "<your MapTiler key>";

const OPENMAPTILES_URL = `https://api.maptiler.com/tiles/v3-openmaptiles/tiles.json?key=${MAPTILER_KEY}`;
const ATTRIBUTION_LOGO = `
<a href="https://www.maptiler.com/">
  <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/>
</a>`;
const ATTRIBUTION_TEXT =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>';

export default {
  OPENMAPTILES_URL,
  ATTRIBUTION_LOGO,
  ATTRIBUTION_TEXT,
};
