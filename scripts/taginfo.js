"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";
import * as Shields from "../src/js/shield.js";
import * as Gfx from "../src/js/screen_gfx.js";
import * as CustomShields from "../src/js/custom_shields.js";
import * as skia from "skia-canvas";

if (!fs.existsSync("dist/shield-sample")) {
  fs.mkdirSync("dist/shield-sample", true);
}

//Headless graphics context
Gfx.setGfxFactory((bounds) => {
  let canvas = new skia.Canvas(bounds.width, bounds.height);
  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.canvas.width = bounds.width;
  ctx.canvas.height = bounds.height;
  return ctx;
});

//Hash function to elminiate duplicate shield graphics
/*
    Released into public comain by bryc (github.com/bryc)
    Source: https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
*/
const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Adds documentation about network=* tags to a project description object, modifying it in place.
 *
 * @param {*} project - The project description object to modify.
 */
function addNetworkTags(project) {
  // Inject a map of each sprite ID to an absolute image URL instead of the usual sprite metadata.
  CustomShields.loadCustomShields();
  let shields = ShieldDef.loadShields();

  // Convert each shield's rendering metadata to an entry that taginfo understands.
  let tags = Object.entries(shields).map((entry) => {
    let network = entry[0],
      definition = entry[1];

    let description = `Roads carrying routes in this network are marked by shields`;
    if (definition.modifiers && definition.modifiers.length > 0) {
      description += ` modified by ${definition.modifiers.join(", ")} banners`;
    }
    description += ".";

    let icon = definition.spriteBlank || definition.norefImage;
    if (Array.isArray(icon)) {
      icon = icon[0];
    }

    let icon_url;

    if (icon == undefined) {
      let shieldGfx = Shields.generateSpriteCtx({}, `shield\n${network}= `);
      let network_filename = cyrb53(JSON.stringify(shields[network]));
      let save_filename = `dist/shield-sample/shield_${network_filename}.svg`;

      if (!fs.existsSync(save_filename)) {
        shieldGfx.canvas.saveAsSync(save_filename);
      }
      icon_url = `https://zelonewolf.github.io/openstreetmap-americana/shield-sample/shield_${network_filename}.svg`;
    } else {
      icon_url = `https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/icons/${icon}.svg`;
    }

    return {
      key: "network",
      value: network,
      object_types: ["relation"],
      description: description,
      icon_url: icon_url,
    };
  });
  project.tags.push(...tags);
}

let project = JSON.parse(
  fs.readFileSync(`${process.cwd()}/scripts/taginfo_template.json`)
);
addNetworkTags(project);
fs.writeFileSync(
  `${process.cwd()}/dist/taginfo.json`,
  JSON.stringify(project, null, 2)
);
