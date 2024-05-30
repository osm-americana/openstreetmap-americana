"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";
import namer from "color-namer";
import { mkdir } from "node:fs/promises";
import {
  ShieldRenderer,
  InMemorySpriteRepository,
} from "@americana/maplibre-shield-generator";
/**
 * TODO - BUG
 * Exporting HeadlessGraphicsFactory in shieldlib's index.ts causes an unexplained error in node-canvas
 * where it thinks it's running in a browser and attempts to create a browser canvas, and fails. The same
 * behavior occurs in skia-canvas. This hack works well enough for the taginfo script, but ideally the shield
 * library should be capable of generating shields outside the browser.
 */
import { HeadlessGraphicsFactory } from "@americana/maplibre-shield-generator/src/headless_graphics";
import {
  routeParser,
  shieldPredicate,
  networkPredicate,
} from "../src/js/shield_format";

await mkdir("dist/shield-sample", { recursive: true });

const shieldGfxMap = new Map();
const shields = ShieldDef.loadShields();

const shieldRenderer = new ShieldRenderer(shields, routeParser)
  .filterImageID(shieldPredicate)
  .filterNetwork(networkPredicate)
  .graphicsFactory(new HeadlessGraphicsFactory("svg"))
  .renderOnRepository(new InMemorySpriteRepository());

const colorNames = new Map();

function getNamedColor(colorString, defaultColor) {
  if (colorString) {
    if (colorString.startsWith("#")) {
      if (colorNames.has(colorString)) {
        return colorNames.get(colorString);
      } else {
        const result = namer(colorString)["pantone"][0].name.toLowerCase();
        colorNames.set(colorString, result);
        return result;
      }
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
  let shieldSpec = shields;

  // Convert each shield's rendering metadata to an entry that taginfo understands.
  let tags = Object.entries(shieldSpec.networks)
    .filter((entry) => !entry[0].match(/^omt-/))
    .map((entry) => {
      let network = entry[0],
        shieldDef = entry[1];

      let icon = shieldDef.spriteBlank || shieldDef.noref?.spriteBlank;
      if (Array.isArray(icon)) {
        icon = icon[0];
      }

      let icon_url;
      let defBanners = shieldDef.banners;

      if (icon == undefined && shieldDef?.shapeBlank !== undefined) {
        //Remove banners and allow blank to render without a ref
        delete shieldDef.banners;
        shieldDef.notext = true;

        let shieldGfx = shieldRenderer.getGraphicForRoute(network, "", "");

        let shieldDefText = JSON.stringify(shieldDef);
        if (!shieldGfxMap.has(shieldDefText)) {
          shieldGfxMap.set(shieldDefText, shieldGfxMap.size);
        }

        let network_filename_id = shieldGfxMap.get(shieldDefText);
        let save_filename = `dist/shield-sample/shield_${network_filename_id}.svg`;

        if (!fs.existsSync(save_filename)) {
          fs.writeFileSync(save_filename, shieldGfx.canvas.toBuffer());
        }
        icon_url = `https://zelonewolf.github.io/openstreetmap-americana/shield-sample/shield_${network_filename_id}.svg`;
      } else if (
        icon !== undefined &&
        (shieldDef.colorLighten !== undefined ||
          shieldDef.colorDarken !== undefined)
      ) {
        let svgText = fs.readFileSync(`${process.cwd()}/icons/${icon}.svg`, {
          encoding: "utf8",
        });
        if (shieldDef.colorLighten) {
          svgText = svgText.replace(/#000/gi, shieldDef.colorLighten);
        }
        if (shieldDef.colorDarken) {
          svgText = svgText.replace(/#fff/gi, shieldDef.colorDarken);
        }

        delete shieldSpec.networks[network].banners;
        let def = JSON.stringify(shieldSpec.networks[network]);

        if (!shieldGfxMap.has(def)) {
          shieldGfxMap.set(def, shieldGfxMap.size);
        }

        let network_filename_id = shieldGfxMap.get(def);
        let save_filename = `dist/shield-sample/shield_${network_filename_id}.svg`;

        if (!fs.existsSync(save_filename)) {
          fs.writeFileSync(`${process.cwd()}/${save_filename}`, svgText);
        }
        icon_url = `https://zelonewolf.github.io/openstreetmap-americana/shield-sample/shield_${network_filename_id}.svg`;
      } else {
        icon_url = `https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/icons/${icon}.svg`;
      }

      let description = `Roads carrying routes in this network are marked by `;
      if (shieldDef.shapeBlank) {
        let shapeDef = shieldDef.shapeBlank;
        let prettyShapeName = `${shapeDef.drawFunc}-shaped`;
        let prettyFillColor = getNamedColor(shapeDef.params.fillColor, "white");
        let prettyStrokeColor = getNamedColor(
          shapeDef.params.strokeColor,
          "black"
        );

        switch (shapeDef.drawFunc) {
          case "pill":
            prettyShapeName = "pill-shaped";
            break;
          case "roundedRectangle":
            prettyShapeName = "rectangular";
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

      if (defBanners && defBanners.length > 0) {
        description += ` modified by ${defBanners.join(", ")} banners`;
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
