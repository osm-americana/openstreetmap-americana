"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";

/**
 * Adds documentation about network=* tags to a project description object, modifying it in place.
 *
 * @param {*} project - The project description object to modify.
 * @param {*} sprites - Sprite metadata object parsed from a JSON spritesheet.
 */
function addNetworkTags(project, sprites) {
  // Inject a map of each sprite ID to an absolute image URL instead of the usual sprite metadata.
  let shieldImageURLs = Object.fromEntries(
    Object.keys(sprites).map((sprite) => [
      sprite,
      `https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/icons/${sprite}.svg`,
    ])
  );
  let shields = ShieldDef.loadShields(shieldImageURLs);

  // Convert each shield's rendering metadata to an entry that taginfo understands.
  let tags = Object.entries(shields).map((entry) => {
    let network = entry[0],
      definition = entry[1];

    let description = `Roads carrying routes in this network are marked by shields`;
    if (definition.modifiers && definition.modifiers.length > 0) {
      description += ` modified by ${definition.modifiers.join(", ")} banners`;
    }
    description += ".";

    let icon = definition.backgroundImage || definition.norefImage;
    if (Array.isArray(icon)) {
      icon = icon[0];
    }

    return {
      key: "network",
      value: network,
      object_types: ["relation"],
      description: description,
      icon_url: icon,
    };
  });
  project.tags.push(...tags);
}

let project = JSON.parse(
  fs.readFileSync(`${process.cwd()}/scripts/taginfo_template.json`)
);
let sprites = JSON.parse(
  fs.readFileSync(`${process.cwd()}/dist/sprites/sprite.json`)
);
addNetworkTags(project, sprites);
fs.writeFileSync(
  `${process.cwd()}/dist/taginfo.json`,
  JSON.stringify(project, null, 2)
);
