"use strict";

import { getShieldLayer } from "@americana/maplibre-shield-generator";

/**
 * Highway shield symbol layer for the OpenMapTiles transportation_name encoding.
 * Uses Trailblazer's `"openmaptiles"` schema; `text-font` is left to MapLibre's
 * style-spec default.
 */
export const shield = getShieldLayer("openmaptiles");
