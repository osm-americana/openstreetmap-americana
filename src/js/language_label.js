"use strict";

import Tokenfield from "tokenfield";
import { updateLanguageLabel } from "../americana";
import * as Label from "../constants/label.js";

var langField = labelControlElement("span", "language-field");

var langChanger = labelControlElement("button", "language-switcher");
langChanger.textContent = "Change";

var langPicker = labelControlElement("input", "language-picker");
hide(langPicker);

var langHeader = labelControlElement("span", "lang-header");
var langHints = labelControlElement("span", "lang-hints");
langHints.textContent = "Begin typing to add languages";

var langCancel = labelControlElement("button", "language-cancel");
langCancel.textContent = "X";
Object.assign(langCancel.style, {
  "margin-top": "0.3em",
});

langHeader.appendChild(langCancel);
langHeader.appendChild(langHints);

hide(langHeader);

function hide(element) {
  Object.assign(element.style, {
    display: "none",
  });
}
function show(element) {
  element.style.removeProperty("display");
}

let languageNames = new Intl.DisplayNames(Label.getLocales(), {
  type: "language",
});
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
  // "ja_kana",
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
].map((id) => {
  return { id, name: languageNames.of(id) };
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

var tf = null;

langChanger.onclick = function () {
  hide(langChanger);
  show(langHeader);

  if (tf == null) {
    tf = new Tokenfield({
      el: document.querySelector("#language-picker"), // Attach Tokenfield to the input element with class "text-input"
      items: langCodes,
      newItems: false,
    });
    document.querySelectorAll(".tokenfield").forEach((e) => {
      Object.assign(e.style, {
        height: "5em",
        width: "20em",
        "margin-bottom": "4em",
        "margin-top": "0.3em",
      });
    });
    tf.on("change", function () {
      let items = tf.getItems();
      let langCodes = [];
      items.forEach((element) => langCodes.push(element.id));
      let langQuery = langCodes.join(",");
      let hash = window.location.hash.substr(1); // omit #
      let searchParams = new URLSearchParams(hash);
      searchParams.set("language", langQuery);
      window.location.hash = `#${searchParams}`;
    });
  }

  document.querySelectorAll(".tokenfield").forEach((e) => show(e));
  tf.focus();
};

langCancel.onclick = function () {
  document.querySelectorAll(".tokenfield").forEach((e) => hide(e));
  hide(langHeader);
  updateLanguageLabel();
  show(langChanger);
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
    this._container.appendChild(langHeader);
    this._container.appendChild(langPicker);
    this._container.appendChild(langField);
    this._container.appendChild(langChanger);
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
