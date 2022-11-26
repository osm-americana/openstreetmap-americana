"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";
import * as Color from "../src/constants/color.js";

let sprites = JSON.parse(
  fs.readFileSync(`${process.cwd()}/dist/sprites/sprite.json`)
);

// Reverse the color map to turn CSS values back into keywords.
let colorKeywords = Object.fromEntries(
  Object.entries(Color.shields).map((c) => c.reverse())
);

/**
 * Converts any color-typed values in the object to color keywords.
 */
function convertColorsToKeywords(obj) {
  for (let property of [
    "colorLighten",
    "fillColor",
    "strokeColor",
    "textColor",
    "textHaloColor",
  ]) {
    if (property in obj) {
      obj[property] =
        colorKeywords[obj[property].toLowerCase()] || obj[property];
    }
  }
  if ("overrideByRef" in obj) {
    for (let ref of Object.keys(obj.overrideByRef)) {
      convertColorsToKeywords(obj.overrideByRef[ref]);
    }
  }
}

/**
 * Deletes redundant properties from the given object. Properties are redundant if they are hardcoded elsewhere in the codebase.
 */
function deleteRedundantProperties(obj) {
  switch (obj.shape) {
    case "oval":
      if (
        obj.padding.left === 2 &&
        obj.padding.right === 2 &&
        obj.padding.top === 2 &&
        obj.padding.bottom === 2
      ) {
        delete obj.padding;
      }
      break;
    case "circle":
      if (
        obj.padding.left === 2 &&
        obj.padding.right === 2 &&
        obj.padding.top === 2 &&
        obj.padding.bottom === 2
      ) {
        delete obj.padding;
      }
      if (obj.rectWidth === 20) delete obj.rectWidth;
      break;
    case "rectangle":
      if (obj.textColor === obj.strokeColor) delete obj.textColor;
      if (obj.radius === 2) delete obj.radius;
      //if (obj.padding.left === 3 && obj.padding.right === 3 && obj.padding.top === 3 && obj.padding.bottom === 3) {
      //  delete obj.padding;
      //}
      break;
    case "trapezoid":
      if (obj.textColor === obj.strokeColor) delete obj.textColor;
      if (obj.radius === 0) delete obj.radius;
      break;
    case "diamond":
    case "home_plate":
    case "vertical_hexagon":
      if (obj.textColor === obj.strokeColor) delete obj.textColor;
      if (obj.radius === 2) delete obj.radius;
      break;
    case "pill":
      if (
        obj.padding.left === 2 &&
        obj.padding.right === 2 &&
        obj.padding.top === 2 &&
        obj.padding.bottom === 2
      ) {
        delete obj.padding;
      }
      break;
    case "disc_in_rectangle":
    case "bar_in_rectangle":
      delete obj.notext;
      break;
  }
  if ("overrideByRef" in obj) {
    for (let ref of Object.keys(obj.overrideByRef)) {
      deleteRedundantProperties(obj.overrideByRef[ref]);
    }
  }
}

// Inject a map of each sprite ID to a file name instead of the usual sprite metadata.
let shieldImageNames = Object.fromEntries(
  Object.keys(sprites).map((sprite) => [sprite, sprite])
);
let shields = ShieldDef.loadShields(shieldImageNames);
for (let network of Object.keys(shields)) {
  let shield = shields[network];
  convertColorsToKeywords(shield);
  deleteRedundantProperties(shield);
  shields[network] = shield;
}

// Sort the definitions by network.
let sortedShields = Object.fromEntries(
  Object.entries(shields).sort((a, b) =>
    a[0].toLowerCase() < b[0].toLowerCase() ? -1 : 1
  )
);

fs.writeFileSync(
  `${process.cwd()}/data/shield_defs.json`,
  JSON.stringify(sortedShields, null, 2)
);
