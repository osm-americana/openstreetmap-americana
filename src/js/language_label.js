"use strict";

var langField = document.createElement("div");
langField.id = "language-field";

/**
 * Label for displaying the current language being used
 */
class LanguageControl {
  onAdd(map) {
    this._map = map;
    this._container = langField;
    this._container.className = "maplibregl-ctrl";
    Object.assign(this._container.style, {
      margin: "0",
      padding: "0 5px",
      color: "#444",
      backgroundColor: "#ffffff80",
    });
    this._container.textContent = "";
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export var label = new LanguageControl();

export function displayLocales(locales) {
  let languageNames = new Intl.DisplayNames(locales, { type: "language" });
  let listFormat = new Intl.ListFormat(locales, { type: "disjunction" });
  document.getElementById("language-field").textContent = listFormat.format(
    locales.map((locale) => languageNames.of(locale))
  );
}
