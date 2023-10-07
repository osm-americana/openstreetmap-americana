"use strict";

import "maplibre-gl/dist/maplibre-gl.css";

import { createMap } from "./js/map_builder.js";

loadRTLPlugin();

export const map = createMap(
  window,
  (shields) => shieldDefLoad(),
  [-94, 40.5],
  4
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
