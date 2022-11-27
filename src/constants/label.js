"use strict";

/**
 * Returns a list of languages as a comma-delimited string from the given URL hash.
 */
export function getLanguageFromURL(url) {
  return new URLSearchParams(url.hash.substr(1)).get("language");
}

/**
 * Returns a `coalesce` expression that resolves to the feature's name in a
 * language that the user prefers.
 *
 * @param {boolean} includesLegacyFields - Whether to include the older fields
 *  that include underscores, for layers that have not transitioned to the
 *  colon syntax.
 */
export function getLocalizedNameExpression(includesLegacyFields) {
  // Check the language "parameter" in the hash.
  let parameter = getLanguageFromURL(window.location)?.split(",");
  // Fall back to the user's language preference.
  let userLocales = parameter ?? navigator.languages ?? [navigator.language];
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
  let nameFields = [
    ...locales.flatMap((l) => {
      let fields = [`name:${l}`];
      // transportation_label uses an underscore instead of a colon.
      // https://github.com/openmaptiles/openmaptiles/issues/769
      if (includesLegacyFields && (l === "de" || l === "en"))
        fields.push(`name_${l}`);
      return fields;
    }),
    "name",
  ];
  return ["coalesce", ...nameFields.map((f) => ["get", f])];
}

// Placeholder to be resolved by buildLayers()
export const localizedName = "$$localizedName";
