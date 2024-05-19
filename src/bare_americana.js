"use strict";

import "maplibre-gl/dist/maplibre-gl.css";

import { createMap, loadRTLPlugin, buildStyle } from "./js/map_builder.js";
import { debugOptions } from "./debug_config.js";

loadRTLPlugin();

export const map = createMap(
  window,
  (shields) => shieldDefLoad(),
  {
    container: "map", // container id
    hash: "map",
    antialias: true,
    style: buildStyle(),
    center: [-94, 40.5],
    zoom: 4,
    fadeDuration: 0,
    attributionControl: false,
  },
  debugOptions
);

function shieldDefLoad() {
  if (window.top === window.self) {
    // if not embedded in an iframe, autofocus canvas to enable keyboard shortcuts
    map.getCanvas().focus();
  }

  if (window.LIVE_RELOAD) {
    new EventSource("/esbuild").addEventListener("change", () =>
      location.reload()
    );
  }
}
