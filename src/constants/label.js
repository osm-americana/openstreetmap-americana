"use strict";

/**
 * Returns a list of languages as a comma-delimited string from the given URL hash.
 */
export function getLanguageFromURL(url) {
  let language = new URLSearchParams(url.hash.substr(1)).get("language");
  return language === "" ? null : language;
}

/**
 * Returns the languages that the user prefers.
 */
export function getLocales() {
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
  return locales;
}

/**
 * Returns a `coalesce` expression that resolves to the feature's name in a
 * language that the user prefers.
 *
 * @param {[string]} locales - Locales of the name fields to include.
 * @param {boolean} includesLegacyFields - Whether to include the older fields
 *  that include underscores, for layers that have not transitioned to the
 *  colon syntax.
 */
export function getLocalizedNameExpression(locales, includesLegacyFields) {
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

/**
 * Replaces the value of a variable in the given `let` expression.
 *
 * @param {array} letExpr - Expression to update.
 * @param {string} variable - Name of the variable to set.
 * @param {*} value - The variable's new value.
 */
export function updateVariable(letExpr, variable, value) {
  if (!letExpr || letExpr[0] !== "let") return;

  let variableNameIndex = letExpr.indexOf(variable);
  if (variableNameIndex % 2 === 1) {
    letExpr[variableNameIndex + 1] = value;
  }
}

/**
 * Updates localizable variables at the top level of each layer's `text-field` expression based on the given locales.
 *
 * @param {[object]} layers - The style layers to localize.
 * @param {[string]} locales - The locales to insert into each layer.
 */
export function localizeLayers(layers, locales) {
  let localizedNameExpression = getLocalizedNameExpression(locales, false);
  let legacyLocalizedNameExpression = getLocalizedNameExpression(locales, true);

  for (let layer of layers) {
    if ("layout" in layer && "text-field" in layer.layout) {
      let textField = layer.layout["text-field"];

      updateVariable(
        textField,
        "localizedName",
        // https://github.com/openmaptiles/openmaptiles/issues/769
        layer["source-layer"] === "transportation_name"
          ? legacyLocalizedNameExpression
          : localizedNameExpression
      );

      updateVariable(textField, "localizedCollator", [
        "collator",
        {
          "case-sensitive": false,
          "diacritic-sensitive": true,
          locale: locales[0],
        },
      ]);

      // Only perform diacritic folding in English. English normally uses few diacritics except when labeling foreign place names on maps.
      updateVariable(textField, "diacriticInsensitiveCollator", [
        "collator",
        {
          "case-sensitive": false,
          "diacritic-sensitive": !/^en\b/.test(locales[0]),
          locale: locales[0],
        },
      ]);
    }
  }
}

/**
 * Recursively scans a semicolon-delimited value list, replacing a finite number
 * of semicolons with a separator, starting from the given index.
 *
 * This expression nests recursively by the maximum number of replacements. Take
 * special care to minimize this limit, which exponentially increases the length
 * of a property value in JSON. Excessive nesting causes acute performance
 * problems when loading the style.
 *
 * The returned expression can be complex, so use it only once within a property
 * value. To reuse the evaluated value, bind it to a variable in a let
 * expression.
 *
 * @param list The overall string expression to search within.
 * @param separator A string to insert after the value, or an expression that
 *  evaluates to this string.
 * @param listStart A zero-based index into the list at which the search begins.
 * @param numReplacements The maximum number of replacements remaining.
 */
function listValueExpression(
  list,
  separator,
  valueToOmit,
  listStart,
  numReplacements
) {
  let asIs = ["slice", list, listStart];
  if (numReplacements <= 0) {
    return asIs;
  }

  let iteration = numReplacements;
  let rawSeparator = ";";
  return [
    "let",
    "needleStart" + iteration,
    ["index-of", rawSeparator, list, listStart],
    [
      "case",
      [">=", ["var", "needleStart" + iteration], 0],
      // Found a semicolon.
      [
        "let",
        "value" + iteration,
        ["slice", list, listStart, ["var", "needleStart" + iteration]],
        "needleEnd" + iteration,
        ["+", ["var", "needleStart" + iteration], rawSeparator.length],
        [
          "concat",
          // Start with everything before the semicolon unless it's the value to
          // omit.
          [
            "case",
            ["==", ["var", "value" + iteration], valueToOmit],
            "",
            ["var", "value" + iteration],
          ],
          [
            "let",
            "lookahead" + iteration,
            // Look ahead by one character.
            [
              "slice",
              list,
              ["var", "needleEnd" + iteration],
              ["+", ["var", "needleEnd" + iteration], rawSeparator.length],
            ],
            [
              "let",
              // Skip past the current value and semicolon for any subsequent
              // searches.
              "nextListStart" + iteration,
              [
                "+",
                ["var", "needleEnd" + iteration],
                // Also skip past any escaped semicolon or space padding.
                [
                  "match",
                  ["var", "lookahead" + iteration],
                  [rawSeparator, " "],
                  rawSeparator.length,
                  0,
                ],
              ],
              [
                "case",
                // If the only remaining value is the value to omit, stop
                // scanning.
                [
                  "==",
                  ["slice", list, ["var", "nextListStart" + iteration]],
                  valueToOmit,
                ],
                "",
                [
                  "concat",
                  [
                    "case",
                    // If the lookahead character is another semicolon, append
                    // an unescaped semicolon.
                    ["==", ["var", "lookahead" + iteration], rawSeparator],
                    rawSeparator,
                    // Otherwise, if the value is the value to omit, do nothing.
                    ["==", ["var", "value" + iteration], valueToOmit],
                    "",
                    // Otherwise, append the passed-in separator.
                    separator,
                  ],
                  // Recurse for the next value in the value list.
                  listValueExpression(
                    list,
                    separator,
                    valueToOmit,
                    ["var", "nextListStart" + iteration],
                    numReplacements - 1
                  ),
                ],
              ],
            ],
          ],
        ],
      ],
      // No semicolons left in the string, so stop looking and append the value as is.
      asIs,
    ],
  ];
}

/**
 * Maximum number of values in a semicolon-delimited list of values.
 *
 * Increasing this constant deepens recursion for replacing delimiters in the
 * list, potentially affecting style loading performance.
 */
const maxValueListLength = 3;

/**
 * Returns an expression interpreting the given string as a list of tag values,
 * pretty-printing the standard semicolon delimiter with the given separator.
 *
 * https://wiki.openstreetmap.org/wiki/Semi-colon_value_separator
 *
 * The returned expression can be complex, so use it only once within a property
 * value. To reuse the evaluated value, bind it to a variable in a let
 * expression.
 *
 * @param valueList A semicolon-delimited list of values.
 * @param separator A string to insert between each value, or an expression that
 *  evaluates to this string.
 */
export function listValuesExpression(valueList, separator, valueToOmit) {
  let maxSeparators = maxValueListLength - 1;
  return [
    "let",
    "valueList",
    valueList,
    "valueToOmit",
    valueToOmit || ";",
    listValueExpression(
      ["var", "valueList"],
      separator,
      ["var", "valueToOmit"],
      0,
      maxSeparators
    ),
  ];
}

/**
 * The names in the user's preferred language, each on a separate line.
 */
export const localizedName = [
  "let",
  "localizedName",
  "",
  listValuesExpression(["var", "localizedName"], "\n"),
];

/**
 * The separator to use in inline contexts.
 */
const inlineSeparator = " \u2022 ";

/**
 * The names in the user's preferred language, all on the same line.
 */
export const localizedNameInline = [
  "let",
  "localizedName",
  "",
  listValuesExpression(["var", "localizedName"], inlineSeparator),
];

/**
 * Returns an expression that tests whether the target has the given prefix,
 * respecting word boundaries.
 */
function startsWithExpression(target, candidatePrefix, collator) {
  // "Quebec City" vs. "Québec", "Washington, D.C." vs. "Washington"
  let wordBoundaries = " ,";
  return [
    "all",
    [
      "==",
      ["slice", target, 0, ["length", candidatePrefix]],
      candidatePrefix,
      collator,
    ],
    [
      "in",
      [
        "slice",
        // Pad the target in case the prefix matches exactly.
        // "Montreal " vs. "Montréal"
        ["concat", target, wordBoundaries[0]],
        ["length", candidatePrefix],
        ["+", ["length", candidatePrefix], 1],
      ],
      wordBoundaries,
    ],
  ];
}

function overwritePrefixExpression(target, newPrefix) {
  return ["concat", newPrefix, ["slice", target, ["length", newPrefix]]];
}

/**
 * Returns an expression that tests whether the target has the given suffix,
 * respecting word boundaries.
 */
function endsWithExpression(target, candidateSuffix, collator) {
  let wordBoundary = " ";
  return [
    "let",
    "suffixStart",
    ["-", ["length", target], ["length", candidateSuffix]],
    [
      "all",
      [
        "==",
        ["slice", target, ["var", "suffixStart"]],
        candidateSuffix,
        collator,
      ],
      [
        "==",
        [
          "slice",
          target,
          ["-", ["var", "suffixStart"], 1],
          ["var", "suffixStart"],
        ],
        wordBoundary,
      ],
    ],
  ];
}

function overwriteSuffixExpression(target, newSuffix) {
  return [
    "concat",
    ["slice", target, 0, ["-", ["length", target], ["length", newSuffix]]],
    newSuffix,
  ];
}

/**
 * The name in the user's preferred language, followed by the name in the local
 * language in parentheses if it differs.
 */
export const localizedNameWithLocalGloss = [
  "let",
  "localizedName",
  "",
  "localizedCollator",
  ["collator", {}],
  "diacriticInsensitiveCollator",
  ["collator", {}],
  [
    "let",
    "localizedNameList",
    listValuesExpression(["var", "localizedName"], "\n"),
    [
      "case",
      // If the name in the preferred and local languages match exactly...
      [
        "==",
        ["var", "localizedName"],
        ["get", "name"],
        ["var", "localizedCollator"],
      ],
      // ...just pick one.
      ["format", ["var", "localizedNameList"]],
      [
        "let",
        "nameList",
        listValuesExpression(["get", "name"], "\n"),
        [
          "case",
          // If the name in the preferred language is the same as the name in the
          // local language except for the omission of diacritics and/or the addition
          // of a suffix (e.g., "City" in English)...
          startsWithExpression(
            ["var", "localizedName"],
            ["get", "name"],
            ["var", "diacriticInsensitiveCollator"]
          ),
          // ...then replace the common prefix with the local name.
          [
            "format",
            overwritePrefixExpression(
              ["var", "localizedName"],
              ["var", "nameList"]
            ),
          ],
          // If the name in the preferred language is the same as the name in the
          // local language except for the omission of diacritics and/or the addition
          // of a prefix (e.g., "City of" in English or "Ciudad de" in Spanish)...
          endsWithExpression(
            ["var", "localizedName"],
            ["get", "name"],
            ["var", "diacriticInsensitiveCollator"]
          ),
          // ...then replace the common suffix with the local name.
          [
            "format",
            overwriteSuffixExpression(
              ["var", "localizedName"],
              ["var", "nameList"]
            ),
          ],
          // Otherwise, gloss the name in the local language if it differs from the
          // localized name.
          [
            "format",
            ["var", "localizedNameList"],
            "\n",
            "(\u200B",
            { "font-scale": 0.8 },
            // GL JS lacks support for bidirectional isolating characters, so use a
            // character from the localized name to insulate the parentheses from the
            // embedded text's writing direction. Make it so small that GL JS doesn't
            // bother rendering it.
            ["concat", ["slice", ["var", "localizedName"], 0, 1], " "],
            { "font-scale": 0.001 },
            listValuesExpression(["get", "name"], inlineSeparator, [
              "var",
              "localizedName",
            ]),
            { "font-scale": 0.8 },
            ["concat", " ", ["slice", ["var", "localizedName"], 0, 1]],
            { "font-scale": 0.001 },
            // A ZWSP prevents GL JS from combining this component with the preceding
            // one, which would cause it to vanish along with the faux isolating
            // character.
            "\u200B)",
            { "font-scale": 0.8 },
          ],
        ],
      ],
    ],
  ],
];
