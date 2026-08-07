import { getLocales, localizeStyle, updateVariable } from "@americana/diplomat";
import maplibregl from "maplibre-gl";
import { hillshading } from "../layer/hillshade.js";

export class MapView extends maplibregl.Map {
  get locales(): [String] {
    return getLocales();
  }

  set locales(newValue: [String]) {
    localizeStyle(this);
    let peakTextExpression = this.getLayerProperty("peak", "text-field");
    peakTextExpression = updateVariable(
      peakTextExpression,
      "eleUnits",
      getEleUnits(newValue[0])
    );
    this.setLayerProperty("peak", "text-field", peakTextExpression);
    this.fire("americana.languagechange");
  }

  localize() {
    this.locales = getLocales();
  }

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
