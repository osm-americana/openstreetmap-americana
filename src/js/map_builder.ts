/**
 * Functions for assembling user-facing map components
 */
import {
  OPENMAPTILES,
  createShieldRenderer,
  type DebugOptions,
  type ShieldDefinitions,
} from "@americana/maplibre-shield-generator";
import config from "../config.js";

import { networkPredicate } from "../js/shield_format.js";

import * as Poi from "../js/poi.js";
import * as Style from "./style.js";
import {
  setWorkerUrl,
  type MapOptions,
  type StyleSpecification,
} from "maplibre-gl";
import { MapView } from "./map_view.js";
import { getGlobalStateForLocalization, getLocales } from "@americana/diplomat";

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
    config.FONT_URL ?? "https://font.americanamap.org/{fontstack}/{range}.pbf",
    getLocales()
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
  window: Window,
  shieldDefCallback: (shields: ShieldDefinitions) => void,
  options: MapOptions,
  debugOptions: DebugOptions
): MapView {
  setWorkerUrl(new URL("./maplibre-gl-worker.mjs", import.meta.url).toString());
  let map: MapView = (window.map = new MapView(options));

  const shieldRenderer = createShieldRenderer(
    new URL("shields.json", window.location.href),
    OPENMAPTILES
  )
    .debugOptions(debugOptions)
    .filterNetwork(networkPredicate)
    .renderOnMaplibreGL(map)
    .onShieldDefLoad(shieldDefCallback);

  // Compose shield + POI missing-image handling. renderOnMaplibreGL installs
  // the shield resolver; replace it with a dispatcher that keeps both.
  const resolveShield = shieldRenderer.getMissingStyleImageResolver();
  map.setMissingStyleImageResolver((id) => {
    switch (id.split("\n")[0]) {
      case "shield":
        return resolveShield(id);
      case "poi":
        Poi.missingIconHandler(shieldRenderer, map, id);
        break;
      default:
        console.warn("Image id not recognized:", JSON.stringify(id));
        break;
    }
  });

  map.once("styledata", (event) => {
    let localizationState = getGlobalStateForLocalization(getLocales(), {
      uppercaseCountryNames: true,
    });
    for (let [key, value] of Object.entries(localizationState)) {
      map.setGlobalStateProperty(key, value);
    }
  });

  return map;
}
