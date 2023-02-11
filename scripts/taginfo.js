"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";
import * as Shields from "../src/js/shield.js";
import * as Gfx from "../src/js/screen_gfx.js";
import * as CustomShields from "../src/js/custom_shields.js";
import * as skia from "skia-canvas";
import namer from "color-namer";
import { mkdir } from "node:fs/promises";

await mkdir("dist/shield-sample", { recursive: true });

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

const shieldGfxMap = new Map();

function getNamedColor(colorString, defaultColor) {
  if (colorString) {
    if (colorString.startsWith("#")) {
      return namer(colorString)["pantone"][0].name.toLowerCase();
    } else {
      return colorString;
    }
  }
  return defaultColor;
}

/**
 * Adds documentation about network=* tags to a project description object, modifying it in place.
 *
 * @param {*} project - The project description object to modify.
 */
function addNetworkTags(project) {
  CustomShields.loadCustomShields();
  let shields = ShieldDef.loadShields();

  // Convert each shield's rendering metadata to an entry that taginfo understands.
  let tags = Object.entries(shields)
    .filter((entry) => !entry[0].match(/^omt-/))
    .map((entry) => {
      let network = entry[0],
        definition = entry[1];

      let icon = definition.spriteBlank || definition.norefImage;
      if (Array.isArray(icon)) {
        icon = icon[0];
      }

      let icon_url;

      //Shield ID with ref as a single space character
      let id = `shield\n${network}= `;

      let routeDef = Shields.getRouteDef(id);
      let shieldDef = Shields.getShieldDef(routeDef);

      if (icon == undefined && shieldDef.canvasDrawnBlank !== undefined) {
        //Generate empty canvas sized to the graphic
        let shieldGfx = Gfx.getGfxContext(
          Shields.getDrawnShieldBounds(shieldDef, " ")
        );

        //Draw shield to the canvas
        Shields.drawShield(shieldGfx, shieldDef, routeDef);

        delete shields[network].modifiers;
        let def = JSON.stringify(shields[network]);

        if (!shieldGfxMap.has(def)) {
          shieldGfxMap.set(def, shieldGfxMap.size);
        }

        let network_filename_id = shieldGfxMap.get(def);
        let save_filename = `dist/shield-sample/shield_${network_filename_id}.svg`;

        if (!fs.existsSync(save_filename)) {
          shieldGfx.canvas.saveAsSync(save_filename);
        }
        icon_url = `https://zelonewolf.github.io/openstreetmap-americana/shield-sample/shield_${network_filename_id}.svg`;
      } else {
        icon_url = `https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/icons/${icon}.svg`;
      }

      let description = `Roads carrying routes in this network are marked by `;
      if (definition.canvasDrawnBlank) {
        let shapeDef = definition.canvasDrawnBlank;
        let prettyShapeName = `${shapeDef.drawFunc}-shaped`;
        let prettyFillColor = getNamedColor(shapeDef.params.fillColor, "white");
        let prettyStrokeColor = getNamedColor(
          shapeDef.params.strokeColor,
          "black"
        );

        switch (shapeDef.drawFunc) {
          case "roundedRectangle":
            if (shapeDef.params.radius == 10) {
              prettyShapeName = "pill-shaped";
            } else {
              prettyShapeName = "rectangular";
            }
            break;
          case "hexagonVertical":
            prettyShapeName = "vertical hexagonal";
            break;
          case "octagonVertical":
            prettyShapeName = "vertical octagonal";
            break;
          case "hexagonHorizontal":
            prettyShapeName = "horizontal hexagonal";
            break;
          case "ellipse":
            if (shapeDef.params.rectWidth == 20) {
              prettyShapeName = "circular";
            } else {
              prettyShapeName = "elliptical";
            }
          case "pentagon":
            if (shapeDef.params.angle == 0) {
              prettyShapeName = "home plate";
            }
        }
        description += `${prettyFillColor} ${prettyShapeName} shields with ${prettyStrokeColor} borders`;
      } else {
        description += "shields";
      }

      if (definition.modifiers && definition.modifiers.length > 0) {
        description += ` modified by ${definition.modifiers.join(
          ", "
        )} banners`;
      }
      description += ".";

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
