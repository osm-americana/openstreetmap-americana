"use strict";

import {
  getShieldLayer,
  routeParserFromSchema,
} from "@americana/maplibre-shield-generator";

/**
 * Highway shield symbol layer for the OpenMapTiles transportation_name encoding.
 * Uses Trailblazer's `"openmaptiles"` schema; `text-font` is left to MapLibre's
 * style-spec default.
 */
export const shield = getShieldLayer("openmaptiles");

const routeParser = routeParserFromSchema("openmaptiles");

/**
 * Returns a structured representation of a shield image id.
 *
 * Includes `color` and `imageName` for legend UI; the shield renderer itself
 * only needs network, ref, and name.
 */
export function parseImageName(imageName) {
  const route = routeParser.parse(imageName);
  const lines = imageName.split("\n");
  return {
    network: route.network ?? "",
    ref: route.ref ?? "",
    name: route.name ?? "",
    color: lines[4] ?? "",
    imageName,
  };
}
