"use strict";

import * as fs from "fs";
import * as ShieldDef from "../src/js/shield_defs.js";

function fillPaths(svg, codes) {
  let selectors = new Set(codes.map((code) => `.${code.toLowerCase()}`));
  if (selectors.has(".nl")) {
    // Curaçao routes use NL prefix with the Netherlands.
    selectors.add(".cw");
  }
  if (selectors.has(".us")) {
    // Routes in United States insular areas use US prefix with the U.S.
    selectors.add(".ust");
  }
  // The Asian Highway Network isn't a real country.
  if (selectors.has(".ah")) {
    selectors.delete(".ah");
  }
  return svg.replace(".supported", new Array(...selectors).join(",\n"));
}

// Inject a map of each sprite ID to an absolute image URL instead of the usual sprite metadata.
let shields = ShieldDef.loadShields();

let worldSVG = fs.readFileSync(`${process.cwd()}/scripts/blank_map_world.svg`, {
  encoding: "utf8",
});
worldSVG = fillPaths(
  worldSVG,
  Object.keys(shields)
    .map((network) => network.match(/^(\w\w)(?::|$)|^omt-(\w\w)-/))
    .filter((m) => m)
    .map((m) => m[1] || m[2])
);
worldSVG = worldSVG.replace(
  /<title>.+?<\/title>/,
  "<title>Countries with shields supported by OpenStreetMap Americana</title>"
);
fs.writeFileSync(`${process.cwd()}/doc-img/shield_map_world.svg`, worldSVG);
