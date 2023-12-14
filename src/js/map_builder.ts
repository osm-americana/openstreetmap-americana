/**
 * Functions for assembling user-facing map components
 */
import {
  ShieldDefinitions,
  URLShieldRenderer,
} from "@americana/maplibre-shield-generator";
import config from "../config.js";

import {
  shieldPredicate,
  networkPredicate,
  routeParser,
} from "../js/shield_format.js";

import * as Poi from "../js/poi.js";
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
    `${baseUrl}/sprites/sprite`,
    config.FONT_URL ??
      "https://osm-americana.github.io/fontstack66/{fontstack}/{range}.pbf",
    Label.getLocales()
  );
}

function removeAfterLastSlash(str: string): string {
  const lastSlashIndex = str.lastIndexOf("/");
  if (lastSlashIndex === -1) {
    return str; // return the original string if no slash is found
  }
  return str.substring(0, lastSlashIndex + 1);
}

export function loadRTLPlugin(): void {
  maplibregl.setRTLTextPlugin(
    "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
    null,
    true
  );
}

export function createMap(
  window,
  shieldDefCallback: (shields: ShieldDefinitions) => void,
  options: MapOptions
): Map {
  window.maplibregl = maplibregl;
  let map: Map = (window.map = new maplibregl.Map(options));

  const shieldRenderer = new URLShieldRenderer("shields.json", routeParser)
    .filterImageID(shieldPredicate)
    .filterNetwork(networkPredicate)
    .renderOnMaplibreGL(map)
    .onShieldDefLoad(shieldDefCallback);

  map.on("styleimagemissing", function (e) {
    switch (e.id.split("\n")[0]) {
      case "shield":
        break;
      case "poi":
        Poi.missingIconHandler(shieldRenderer, map, e);
        break;
      default:
        console.warn("Image id not recognized:", JSON.stringify(e.id));
        break;
    }
  });
  return map;
}
