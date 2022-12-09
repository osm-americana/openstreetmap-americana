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

export function displayLocales(localeSet) {
  let languageField = document.getElementById("language-field");
  if (languageField) {
    //  console.log(localeSet);
    languageField.textContent = Array.from(localeSet).join(", ");
  }
}
