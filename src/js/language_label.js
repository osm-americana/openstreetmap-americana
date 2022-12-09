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
    this._container.style.textAlign = "right";
    this._container.style.paddingRight = "5px";
    this._container.style.paddingLeft = "5px";
    this._container.style.color = "#444";
    this._container.style.backgroundColor = "#ffffff80";
    this._container.style.float = "right";
    this._container.style.display = "table";
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
