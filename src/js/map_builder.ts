/**
 * Functions for assembling user-facing map components
 */
import config from "../config.js";

import * as Label from "../constants/label.js";
import * as Style from "../js/style.js";
import maplibregl, { Map, MapOptions, StyleSpecification } from "maplibre-gl";

export function buildStyle(): StyleSpecification {
  var getUrl = window.location;
  var baseUrl = (
    getUrl.protocol +
    "//" +
    getUrl.host +
    removeAfterLastSlash(getUrl.pathname)
  )
    //Trim trailing slashes from URL
    .replace(/\/+$/, "");
  return Style.build(
    config.OPENMAPTILES_URL,
    `${baseUrl}/sprites/sprite-${Label.getMode()}`,
    config.FONT_URL ??
      "https://font.americanamap.org/{fontstack}/{range}.pbf",
    Label.getMode()
  );
}

function removeAfterLastSlash(str: string): string {
  const lastSlashIndex = str.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return str; // return the original string if no slash is found
  }
  return str.substring(0, lastSlashIndex + 1);
}

export function createMap(
  window,
  options: MapOptions
): Map {
  window.maplibregl = maplibregl;
  let map: Map = (window.map = new maplibregl.Map(options));
  return map;
}
