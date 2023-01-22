"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";

/**
 * Adds documentation about network=* tags to a project description object, modifying it in place.
 *
 * @param {*} project - The project description object to modify.
 */
function addNetworkTags(project) {
  // Inject a map of each sprite ID to an absolute image URL instead of the usual sprite metadata.
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

    let taginfoEntry = {
      key: "network",
      value: network,
      object_types: ["relation"],
      description: description,
    };

    let icon = definition.spriteBlank || definition.norefImage;
    if (Array.isArray(icon)) {
      return {
        ...taginfoEntry,
        icon_url: `https://raw.githubusercontent.com/ZeLonewolf/openstreetmap-americana/main/icons/${icon[0]}.svg`,
      };
    }

    return taginfoEntry;
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
