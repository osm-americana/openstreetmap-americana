"use strict";

// Name fields in order of preference
export const name_en = [
  "coalesce",
  ["get", "name:en"],
  ["get", "name:latin"],
  ["get", "name"],
];

const localizations = {
  en: {
    /// Appended to the road name label if the road is under construction.
    under_construction_suffix: " (Under Construction)",
  },
  es: {
    under_construction_suffix: " (Bajo Construcción)",
  },
};

/**
 * Returns a localized string for given string ID in the user’s current language.
 */
export function t(stringId) {
  let locales =
    (typeof navigator !== "undefined" &&
      (navigator.languages || [navigator.language])) ||
    [];
  let locale =
    locales
      .map(
        (locale) => locale && locale.match(/^\w+/) && locale.match(/^\w+/)[0]
      )
      .find(
        (locale) => locale in localizations && localizations[locale][stringId]
      ) || "en";
  return localizations[locale][stringId];
}
