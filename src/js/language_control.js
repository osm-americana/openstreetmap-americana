"use strict";

import Tokenfield from "tokenfield";
import { getLocales } from "@americana/diplomat";

const initialLocales = getLocales();
const languageNames = new Intl.DisplayNames(initialLocales, {
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
  const canonicalLanguageCodes = new Set(
    allLanguageCodes.map((c) => new Intl.Locale(c).baseName)
  );
  // Map language codes to localized language names then memoize them.
  const languageNamesByCode = {};
  for (let code of canonicalLanguageCodes) {
    let name = languageNames.of(code);
    if (name !== code) {
      languageNamesByCode[code] = name;
    }
  }
  _languageNamesByCode = Object.entries(languageNamesByCode).map(
    ([id, name]) => ({ id, name })
  );
  const collator = new Intl.Collator(initialLocales);
  _languageNamesByCode.sort((a, b) => collator.compare(a.name, b.name));
  return _languageNamesByCode;
}

function setLanguages(langCodes) {
  let langQuery = langCodes.join(",");
  let hash = window.location.hash.substr(1); // omit #
  let searchParams = new URLSearchParams(hash);
  searchParams.set("language", langQuery);
  window.location.hash = `#${searchParams}`;
}

/**
 * Label for displaying the current language being used
 */
export class LanguageControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl language-control";
    this._label = document.createElement("span");
    this._label.className = "language-label";
    this._container.appendChild(this._label);
    this._languageNameLabel = document.createElement("span");
    this._languageNameLabel.className = "language-name";
    this._label.appendChild(this._languageNameLabel);
    this._overflowLabel = document.createElement("span");
    this._overflowLabel.className = "language-overflow";
    this._label.appendChild(this._overflowLabel);

    const dialog = (this._dialog = document.getElementById("language-dialog"));
    // FIXME: Replace with Command Invokers API once Firefox ESR supports it.
    const dialogDone = document.getElementById("language-dialog-done");
    dialogDone.addEventListener("click", () => {
      dialog.close();
    });
    this._dialog.addEventListener("close", this.dialogDidClose);

    this._opener = document.createElement("button");
    this._opener.className = "language-dialog-opener";
    this._opener.textContent = "Change";
    this._opener.addEventListener("click", this.openDialog);
    this._container.appendChild(this._opener);

    this._map.once("load", (event) => this.displayLocales());
    this._map.on("americana.languagechange", (event) => this.displayLocales());

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map.off("americana.languagechange");
    delete this._map;
    this._opener.removeEventListener("click", this.openDialog);
    delete this._opener;
    this._dialog.removeEventListener("close", this.dialogDidClose);
    delete this._dialog;
  }

  openDialog() {
    // FIXME: Replace with Command Invokers API once Firefox ESR supports it.
    document.getElementById("language-dialog").showModal();
    document.body.classList.add("language-dialog-open");

    if (!this._tokenField) {
      const inputField = document.getElementById("language-field");
      const listFormat = new Intl.ListFormat(initialLocales, { type: "unit" });
      const firstLocale = new Intl.Locale(initialLocales[0]).minimize();
      const examples = new Set([
        languageNames.of(firstLocale),
        firstLocale.baseName,
      ]);
      inputField.placeholder = listFormat.format([...examples]);

      const tokenField = (this._tokenField = new Tokenfield({
        el: inputField,
        items: getLanguageNamesByCode(),
        validateNewItem: (value) => {
          // Write-ins must be well-formed IETF language tags.
          try {
            return new Intl.Locale(value);
          } catch (e) {}
        },
      }));
      tokenField.on("change", function () {
        // A write-in has no ID, so fall back to the literal name entered by the user.
        let langCodes = this.getItems().map((item) => item.id || item.name);
        setLanguages(langCodes);
      });
      document
        .getElementById("language-reset")
        .addEventListener("click", () => {
          tokenField.emptyItems();
        });
    }

    // Prevent <dialog> from focusing the first link by autofocusing the raw input field.
    document
      .querySelectorAll(".tokenfield-input")
      .forEach((elt) => elt.setAttribute("autofocus", ""));
    this._tokenField.focus();
  }

  dialogDidClose() {
    document.body.classList.remove("language-dialog-open");
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

    // Update most preferred language name label.
    const bestFormattedName = formattedNames[0];
    // Isolate parentheticals between opening and close punctuation marks.
    const bestFormattedComponents = bestFormattedName.split(
      /(\p{gc=Ps}.+?\p{gc=Pe})/u
    );
    const languageNameNodes = [];
    for (const component of bestFormattedComponents) {
      // Deemphasize parentheticals.
      if (component.match(/\p{gc=Ps}/u)) {
        const componentSpan = document.createElement("span");
        componentSpan.className = "language-qualifier";
        componentSpan.textContent = component;
        languageNameNodes.push(componentSpan);
      } else {
        languageNameNodes.push(document.createTextNode(component));
      }
    }
    this._languageNameLabel.replaceChildren(...languageNameNodes);

    // Update overflow label.
    if (formattedNames.length > 1) {
      const numRemainingLocales = formattedNames.length - 1;
      const numberFormat = new Intl.NumberFormat(initialLocales, {
        signDisplay: "always",
      });
      this._overflowLabel.textContent =
        numberFormat.format(numRemainingLocales);
    }

    // Update tooltip with all the locales.
    this._label.setAttribute("title", listFormat.format(formattedNames));
  }
}
