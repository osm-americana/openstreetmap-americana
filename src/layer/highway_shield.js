"use strict";

import {
  OPENMAPTILES,
  getShieldLayer,
  routeParserFromSchema,
} from "@americana/maplibre-shield-generator";

/**
 * Highway shield symbol layer for the OpenMapTiles transportation_name encoding.
 * Font stays Americana-specific; tile schema comes from OPENMAPTILES.
 */
export const shield = getShieldLayer(OPENMAPTILES, {
  textFont: ["Americana-Regular"],
});

const routeParser = routeParserFromSchema(OPENMAPTILES);

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
