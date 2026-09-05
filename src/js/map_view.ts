import { getLocales, localizeStyle, updateVariable } from "@americana/diplomat";
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import maplibregl from "maplibre-gl";
import { hillshading } from "../layer/hillshade.js";
import { getEleUnits } from "../layer/peak.js";

export class MapView extends maplibregl.Map {
  get locales(): [String] {
    return getLocales();
  }

  set locales(newValue: [String]) {
    localizeStyle(this, getLocales(), {
      localizedNamePropertyFormat: "name_$1",
    });
    let peakTextExpression = this.getLayoutProperty("peak", "text-field");
    updateVariable(peakTextExpression, "eleUnits", getEleUnits(newValue[0]));
    this.setLayoutProperty("peak", "text-field", peakTextExpression);
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

  get date(): Date | null {
    return this.getGlobalState().date;
  }

  set date(newValue: Date) {
    console.log(`Setting date to ${newValue}`);
    this.setGlobalStateProperty("date", newValue);
    Promise.resolve(this.style.loaded() || this.once("styledata")).then(() => {
      filterByDate(this, newValue);
      this.fire("americana.datechanged");
    });
  }
}
