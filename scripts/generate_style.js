"use strict";

import * as Style from "../src/js/style.js";

let style = Style.build(
  "https://6ug7hetxl9.execute-api.us-east-2.amazonaws.com/data/v3.json",
  "https://zelonewolf.github.io/openstreetmap-americana/sprites/sprite",
  ["mul"]
);

console.log(JSON.stringify(style));
