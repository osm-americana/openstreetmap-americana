"use strict";

import * as maplibregl from "maplibre-gl";

var langField = labelControlElement("span", "language-field");

var langChanger = labelControlElement("button", "language-switcher");
langChanger.textContent = "Change";

var langAdd = labelControlElement("button", "language-add");
langAdd.textContent = "Add";
hide(langAdd);

var langReset = labelControlElement("button", "language-reset");
langReset.textContent = "Reset";
hide(langReset);

var langCancel = labelControlElement("button", "language-cancel");
langCancel.textContent = "X";
hide(langCancel);

var langPicker = labelControlElement("select", "language-picker");
hide(langPicker);

function addLanguage(name, code) {
  var langEntry = document.createElement("option");
  langEntry.setAttribute("value", code);
  langEntry.textContent = name;
  langPicker.appendChild(langEntry);
}

function hide(element) {
  Object.assign(element.style, {
    display: "none",
    visibility: "hidden",
  });
}
function show(element) {
  Object.assign(element.style, {
    display: "initial",
    visibility: "visible",
  });
}

addLanguage("Select...", "");

let langCodes = [
  "am",
  "ar",
  "az",
  "be",
  "bg",
  "br",
  "bs",
  "ca",
  "co",
  "cs",
  "cy",
  "da",
  "de",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fi",
  "fr",
  "fy",
  "ga",
  "gd",
  "he",
  "hi",
  "hr",
  "hu",
  "hy",
  "id",
  "is",
  "it",
  "ja",
  "ja_kana",
  "ja_rm",
  "ja-Latn",
  "ja-Hira",
  "ka",
  "kk",
  "kn",
  "ko",
  "ko-Latn",
  "ku",
  "la",
  "lb",
  "lt",
  "lv",
  "mk",
  "mt",
  "ml",
  "nl",
  "no",
  "oc",
  "pl",
  "pt",
  "rm",
  "ro",
  "ru",
  "sk",
  "sl",
  "sq",
  "sr",
  "sr-Latn",
  "sv",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "zh",
].forEach(lang => {
  addLanguage(lang, lang);  
});

function labelControlElement(tag, id) {
  var element = document.createElement(tag);
  element.id = id;
  Object.assign(element.style, {
    margin: "0 2.5px",
    color: "#444",
  });
  return element;
}

langChanger.onclick = function () {
  hide(langField);
  hide(langChanger);
  show(langPicker);
  show(langAdd);
  show(langCancel);
};

langAdd.onclick = function () {
  alert(langPicker.value);
};

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
    this._container.appendChild(langPicker);
    this._container.appendChild(langAdd);
    this._container.appendChild(langReset);
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
}
