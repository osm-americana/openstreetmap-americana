"use strict";

/*
This style requires a vector tile server to run, and is designed to work with the MapTiler service

Visit MapTiler Cloud and create an account/log in:
https://cloud.maptiler.com/maps/

Go to Account->Keys and create a key to paste here:
*/
const MAPTILER_KEY = "<your MapTiler key>";

const OPENMAPTILES_URL = `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_KEY}`;

export default {
  OPENMAPTILES_URL,
};
