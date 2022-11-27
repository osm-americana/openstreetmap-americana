"use strict";

// Name fields in order of preference
export const localizedName = (function () {
  let userLocales =
    "languages" in navigator ? [...navigator.languages] : [navigator.language];
  let locales = [];
  let localeSet = new Set(); // avoid duplicates
  for (let locale of userLocales) {
    // Add progressively less specific variants of each user-specified locale.
    let components = locale.split("-");
    while (components.length > 0) {
      let parent = components.join("-");
      if (!localeSet.has(parent)) locales.push(parent);
      localeSet.add(parent);
      components.pop();
    }
  }
  if (locales.at(-1) === "en") {
    locales.push("latin");
  }
  let nameFields = [...locales.map((l) => `name:${l}`), "name"];
  return ["coalesce", ...nameFields.map((f) => ["get", f])];
})();
