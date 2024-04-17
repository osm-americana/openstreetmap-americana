"use strict";

import * as lyrLight from "./lightmode.js";
import * as lyrDark from "./darkmode.js";

/**
 * Builds the layers property.
 * See: https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/
 */
export function build(mode) {
  if(mode == "light") {
    return lyrLight.mapStyleLayersLight;
  }
  return lyrDark.mapStyleLayersDark;
}
