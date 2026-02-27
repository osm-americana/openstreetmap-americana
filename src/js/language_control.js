"use strict";

import Tokenfield from "tokenfield";
import { getLocales } from "@americana/diplomat";

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

const languageNames = new Intl.DisplayNames(getLocales(), {
  type: "language",
});

/// IETF language tags that include subtags and are prevalent in a name:*=* subkey.
// https://qlever.dev/osm-planet/soyLnO
const subtags = [
  "ar-Latn",
  "az-Arab",
  "az-Latn",
  "ba-Arab",
  "ba-Cyrl",
  "be-tarask",
  "bo-Latn-pinyin",
  "bo-Latn-wylie",
  "bs-Cyrl",
  "bs-Latn",
  "cmn-Latn",
  "cnr-Cyrl",
  "cnr-Latn",
  "cr-Latn",
  "cr-latin",
  "crh-Arab",
  "crh-Cyrl",
  "crk-Latn",
  "el-Latn",
  "en-US",
  "en-fonipa",
  "fa-Latn",
  "fr-gallo",
  "hak-Hant",
  "hi-Latn",
  "iu-Latn",
  "ja-Hira",
  "ja-Hrkt",
  "ja-Jpan",
  "ja-Kana",
  "ja-Latn",
  "ka-Latn",
  "kab-Arab",
  "kab-Tfng",
  "kk-Arab",
  "kk-Cyrl",
  "kk-Latn",
  "km-Latn",
  "ko-CN",
  "ko-Hani",
  "ko-KP",
  "ko-KR",
  "ko-Kana",
  "ko-Kore",
  "ko-Latn",
  "ku-Arab",
  "ky-Arab",
  "ky-Cyrl",
  "lo-Latn",
  "mn-Cyrl",
  "mn-Mong",
  "ms-Arab",
  "my-Latn",
  "nan-Hans",
  "nan-Hant",
  "nan-Latn-pehoeji",
  "nan-Latn-tailo",
  "oc-provenc-grmistr",
  "pa-Arab",
  "pt-BR",
  "ru-Latn",
  "sr-Latn",
  "su-Latn",
  "th-Latn",
  "tk-Arab",
  "tt-Arab",
  "tt-Cyrl",
  "ug-Arab",
  "uk-Latn",
  "uz-Arab",
  "uz-Cyrl",
  "uz-Latn",
  "vi-Hani",
  "yue-Hans",
  "yue-Hant",
  "yue-Latn",
  "yue-Latn-HK",
  "yue-Latn-jyutping",
  "zh-Bopo",
  "zh-Hans",
  "zh-Hans-CN",
  "zh-Hans-MY",
  "zh-Hans-SG",
  "zh-Hant",
  "zh-Hant-CN",
  "zh-Hant-HK",
  "zh-Hant-MO",
  "zh-Hant-TW",
  "zh-Latn",
  "zh-Latn-pinyin",
  "zh-Latn-tongyong",
  "zh-Latn-wadegile",
];

let _languageNamesByCode;
function getLanguageNamesByCode() {
  if (_languageNamesByCode) return _languageNamesByCode;

  // Generate all letter permutations that would be well-formed ISO 639-2 or ISO 639-3 codes, not necessarily valid ones.
  const allLanguageCodes = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .flatMap((l1, i, a) =>
      a.flatMap((l2) => [l1 + l2].concat(a.map((l3) => l1 + l2 + l3)))
    );
  allLanguageCodes.push(...subtags);
  allLanguageCodes.sort();
  // Weed out codes that the browser doesn’t support.
  const supportedLanguageCodes =
    Intl.DisplayNames.supportedLocalesOf(allLanguageCodes);
  // Restore common name:*=* subkeys.
  // Map language codes to localized language names then memoize them.
  const languageNamesByCode = {};
  for (let code of supportedLanguageCodes) {
    languageNamesByCode[code] = languageNames.of(code);
  }
  _languageNamesByCode = Object.entries(languageNamesByCode).map(
    ([id, name]) => ({ id, name })
  );
  return _languageNamesByCode;
}

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
      items: getLanguageNamesByCode(),
      validateNewItem: (value) => {
        try {
          return new Intl.Locale(value);
        } catch (e) {}
      },
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
      items.forEach((element) => langCodes.push(element.id || element.name));
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
  show(langChanger);
};

/**
 * Label for displaying the current language being used
 */
export class LanguageControl {
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
    this._map.once("load", (event) => this.displayLocales());
    this._map.on("americana.languagechange", (event) => this.displayLocales());
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map.off("americana.languagechange");
    this._map = undefined;
  }

  displayLocales() {
    const locales = this._map.locales;
    let listFormat = new Intl.ListFormat(locales, { type: "disjunction" });
    let formattedNames = locales.map((locale) => {
      try {
        return languageNames.of(locale) || locale;
      } catch {
        return locale;
      }
    });
    const label = document.getElementById("language-field");
    if (formattedNames.length > 1) {
      label.textContent = `${formattedNames[0]} +${formattedNames.length - 1}`;
    } else {
      label.textContent = formattedNames[0];
    }
    label.setAttribute("title", listFormat.format(formattedNames));
  }
}
