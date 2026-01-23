import maplibregl from "maplibre-gl";
import { hillshading } from "../layer/hillshade.js";

export class MapView extends maplibregl.Map {
  get shadesHills(): Boolean {
    return this.getLayoutProperty(hillshading.id, "visibility") !== "none";
  }

  set shadesHills(newValue): Boolean {
    Promise.resolve(this.style.loaded() || this.once("styledata")).then(() => {
      this.setLayoutProperty(
        hillshading.id,
        "visibility",
        newValue ? "visible" : "none"
      );
      this.fire("americana.terrain");
    });
  }
}
