"use strict";

import Tokenfield from "tokenfield";
import { map, buildStyle } from "../americana";

var langField = labelControlElement("span", "language-field");

var langChanger = labelControlElement("button", "language-switcher");
langChanger.textContent = "Change";

var langPicker = labelControlElement("input", "language-picker");
hide(langPicker);

var langReset = labelControlElement("button", "language-reset");
langReset.textContent = "Reset";
hide(langReset);

var langCancel = labelControlElement("button", "language-cancel");
langCancel.textContent = "X";
hide(langCancel);

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

var langCodes = [
  { id: "am", name: "Amharic" },
  { id: "ar", name: "Arabic" },
  { id: "az", name: "Azerbaijani" },
  { id: "be", name: "Belarusian" },
  { id: "bg", name: "Bulgarian" },
  { id: "br", name: "Breton" },
  { id: "bs", name: "Bosnian" },
  { id: "ca", name: "Catalan; Valencian" },
  { id: "co", name: "Corsican" },
  { id: "cs", name: "Czech" },
  { id: "cy", name: "Welsh" },
  { id: "da", name: "Danish" },
  { id: "de", name: "German" },
  { id: "el", name: "Greek, Modern" },
  { id: "en", name: "English" },
  { id: "eo", name: "Esperanto" },
  { id: "es", name: "Spanish" },
  { id: "et", name: "Estonian" },
  { id: "eu", name: "Basque" },
  { id: "fi", name: "Finnish" },
  { id: "fr", name: "French" },
  { id: "fy", name: "Western Frisian" },
  { id: "ga", name: "Irish" },
  { id: "gd", name: "Gaelic" },
  { id: "he", name: "Hebrew" },
  { id: "hi", name: "Hindi" },
  { id: "hr", name: "Croatian" },
  { id: "hu", name: "Hungarian" },
  { id: "hy", name: "Armenian" },
  { id: "id", name: "Indonesian" },
  { id: "is", name: "Icelandic" },
  { id: "it", name: "Italian" },
  { id: "ja", name: "Japanese" },
  { id: "ja_kana", name: "Japanese Kana" },
  { id: "ja-Latn", name: "Japanese Romanized" },
  { id: "ja-Hira", name: "Japanese Hiragana" },
  { id: "ka", name: "Georgian" },
  { id: "kk", name: "Kazakh" },
  { id: "kn", name: "Kannada" },
  { id: "ko", name: "Korean" },
  { id: "ko-Latn", name: "Korean Romanized" },
  { id: "ku", name: "Kurdish" },
  { id: "la", name: "Latin" },
  { id: "lb", name: "Luxembourgish" },
  { id: "lt", name: "Lithuanian" },
  { id: "lv", name: "Latvian" },
  { id: "mk", name: "Macedonian" },
  { id: "mt", name: "Maltese" },
  { id: "ml", name: "Malayalam" },
  { id: "nl", name: "Dutch" },
  { id: "no", name: "Norwegian" },
  { id: "oc", name: "Occitan" },
  { id: "pl", name: "Polish" },
  { id: "pt", name: "Portuguese" },
  { id: "rm", name: "Romansh" },
  { id: "ro", name: "Romanian" },
  { id: "ru", name: "Russian" },
  { id: "sk", name: "Slovak" },
  { id: "sl", name: "Slovenian" },
  { id: "sq", name: "Albanian" },
  { id: "sr", name: "Serbian" },
  { id: "sr-Latn", name: "Serbian Romanized" },
  { id: "sv", name: "Swedish" },
  { id: "ta", name: "Tamil" },
  { id: "te", name: "Telugu" },
  { id: "th", name: "Thai" },
  { id: "tr", name: "Turkish" },
  { id: "uk", name: "Ukrainian" },
  { id: "zh", name: "Chinese" },
];

function labelControlElement(tag, id) {
  var element = document.createElement(tag);
  element.id = id;
  Object.assign(element.style, {
    margin: "0 2.5px",
    color: "#444",
  });
  return element;
}

var tf;

langChanger.onclick = function () {
  if (langPicker.style.visibility == "visible") {
    return;
  }

  hide(langField);
  hide(langChanger);
  show(langPicker);
  show(langCancel);

  langPicker.style.width = "10em";

  if (!tf) {
    tf = new Tokenfield({
      el: document.querySelector("#language-picker"), // Attach Tokenfield to the input element with class "text-input"
      items: langCodes,
      newItems: false,
    });
    tf.on("change", function () {
      let items = tf.getItems();
      let langCodes = [];
      items.forEach((element) => langCodes.push(element.id));
      let langQuery = langCodes.join(",");
      let rawHash = window.location.hash.split("&")[0];
      var currentURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}${rawHash}&language=${langQuery}`;
      window.history.pushState({ path: currentURL }, "", currentURL);
      map.setStyle(buildStyle());
    });
  }
  tf.focus();
};

langCancel.onclick = function () {
  show(langField);
  show(langChanger);
  hide(langPicker);
  hide(langCancel);
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
    this._container.appendChild(langPicker);
    this._container.appendChild(langChanger);
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
