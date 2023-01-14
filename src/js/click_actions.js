"use strict";

import VanillaContextMenu from "vanilla-context-menu";

// Add one to the zoom level for raster tech
function rasterHash(hash) {
  let hashparts = hash.split(/[=\/]/g);
  return `${hashparts[0]}=${Number(hashparts[1]) + 1}/${hashparts[2]}/${
    hashparts[3]
  }`;
}

export function attachRightClickMenu() {
  new VanillaContextMenu({
    scope: document.querySelector("#map"),
    menuItems: [
      {
        label: "View on osm.org",
        callback: () =>
          (window.location.href =
            "https://www.openstreetmap.org/" +
            rasterHash(window.location.hash)),
      },
      {
        label: "Edit in iD",
        callback: () =>
          (window.location.href =
            "https://www.openstreetmap.org/edit?editor=id" +
            rasterHash(window.location.hash)),
      },
      {
        label: "Edit in JOSM",
        callback: () =>
          (window.location.href =
            "https://www.openstreetmap.org/edit?editor=remote" +
            rasterHash(window.location.hash)),
      },
      {
        label: "Edit in RapiD",
        callback: () =>
          (window.location.href =
            "https://mapwith.ai/rapid#background=Maxar-FB&disable_features=boundaries&" +
            rasterHash(window.location.hash).substring(1)),
      },
    ],
  });
}
