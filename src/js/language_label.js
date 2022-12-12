"use strict";

import * as maplibregl from "maplibre-gl";

var langField = labelControlElement("span", "language-field");

var langChanger = labelControlElement("span", "language-switcher");
langChanger.innerHTML = '[<a href="">Change</a>]';

var langReset = labelControlElement("span", "language-reset");
langReset.innerHTML = '[<a href="">Reset</a>]';

var langCancel = labelControlElement("span", "language-cancel");
langCancel.innerHTML = '[<a href="">X</a>]';

var langPicker = labelControlElement("select", "language-picker");

function addLanguage(name, code) {
  var langEntry = document.createElement("option");
  langEntry.setAttribute("value", code);
  langEntry.textContent = name;
  langPicker.appendChild(langEntry);
}

addLanguage("Select...", "");
addLanguage("English", "en");
addLanguage("Esperanto", "eo");
addLanguage("French", "fr");
addLanguage("Spanish", "es");

function labelControlElement(tag, id) {
  var element = document.createElement(tag);
  element.id = id;
  Object.assign(element.style, {
    margin: "0 2.5px",
    color: "#444",
  });
  return element;
}

/**
 * Label for displaying the current language being used
 */
class LanguageControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    Object.assign(this._container.style, {
      margin: "0",
      padding: "0 5px",
      color: "#444",
      backgroundColor: "#ffffff80",
    });
    this._container.textContent = "";
    this._container.appendChild(langField);
    this._container.appendChild(langChanger);
    this._container.appendChild(langReset);
    this._container.appendChild(langPicker);
    this._container.appendChild(langCancel);
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
  //  document.getElementById("language-switcher").innerHTML = '[<a href="https://www.googlefu.com">Change</a>]';
}
