"use strict";

import * as Style from "../src/js/style.js";
import config from "../src/config.js";

/**
 * Accepts a list of languages as parameters
 *
 * For example:
 * generate_style.js en de
 *
 * ...will generate a style in English with German fallback
 */

let languages = process.argv.slice(2);
if (languages.length == 0) {
  languages = ["mul"];
}

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  languages
);

console.log("%j", style);
