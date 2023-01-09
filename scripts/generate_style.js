"use strict";

import * as Style from "../src/js/style.js";
import config from "../src/config.js";

let style = Style.build(
  config.OPENMAPTILES_URL,
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  ["mul"]
);

console.log("%j", style);
