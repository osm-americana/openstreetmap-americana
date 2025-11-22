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

  let countryNames = new Intl.DisplayNames(locales, {
    type: "region",
    fallback: "none",
  });
  let localizedCountryNamesByCode = Object.fromEntries(
    Object.entries(iso3166_1_alpha_2_by_3).map((e) => [
      e[0],
      countryNames
        .of(e[1])
        // Neither the upcase expression operator nor the text-transform layout property is locale-aware, so uppercase the name upfront.
        ?.toLocaleUpperCase(locales)
        // Word boundaries are less discernible in uppercase text, so pad each word by an additional space.
        .replaceAll(" ", "  ") ?? null,
    ])
  );
  Object.assign(countryNamesByCode, localizedCountryNamesByCode);
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
            "(\u2068",
            { "font-scale": 0.8 },
            listValuesExpression(["get", "name"], inlineSeparator, [
              "var",
              "localizedName",
            ]),
            { "font-scale": 0.8 },
            "\u2069)",
            { "font-scale": 0.8 },
          ],
        ],
      ],
    ],
  ],
];

/**
 * ISO 3166-1 alpha-2 country codes by ISO 3166-1 alpha-3 code.
 *
 * Source: https://www.cia.gov/the-world-factbook/references/country-data-codes/
 */
const iso3166_1_alpha_2_by_3 = {
  ABW: "AW",
  AFG: "AF",
  AGO: "AO",
  AIA: "AI",
  ALB: "AL",
  AND: "AD",
  ARE: "AE",
  ARG: "AR",
  ARM: "AM",
  ASM: "AS",
  ATA: "AQ",
  ATF: "TF",
  ATG: "AG",
  AUS: "AU",
  AUT: "AT",
  AZE: "AZ",
  BDI: "BI",
  BEL: "BE",
  BEN: "BJ",
  BFA: "BF",
  BGD: "BD",
  BGR: "BG",
  BHR: "BH",
  BHS: "BS",
  BIH: "BA",
  BLM: "BL",
  BLR: "BY",
  BLZ: "BZ",
  BMU: "BM",
  BOL: "BO",
  BRA: "BR",
  BRB: "BB",
  BRN: "BN",
  BTN: "BT",
  BVT: "BV",
  BWA: "BW",
  CAF: "CF",
  CAN: "CA",
  CCK: "CC",
  CHE: "CH",
  CHL: "CL",
  CHN: "CN",
  CIV: "CI",
  CMR: "CM",
  COD: "CD",
  COG: "CG",
  COK: "CK",
  COL: "CO",
  COM: "KM",
  CPV: "CV",
  CRI: "CR",
  CUB: "CU",
  CUW: "CW",
  CXR: "CX",
  CYM: "KY",
  CYP: "CY",
  CZE: "CZ",
  DEU: "DE",
  DJI: "DJ",
  DMA: "DM",
  DNK: "DK",
  DOM: "DO",
  DZA: "DZ",
  ECU: "EC",
  EGY: "EG",
  ERI: "ER",
  ESH: "EH",
  ESP: "ES",
  EST: "EE",
  ETH: "ET",
  FIN: "FI",
  FJI: "FJ",
  FLK: "FK",
  FRA: "FR",
  FRO: "FO",
  FSM: "FM",
  FXX: "FX",
  GAB: "GA",
  GBR: "GB",
  GEO: "GE",
  GGY: "GG",
  GHA: "GH",
  GIB: "GI",
  GIN: "GN",
  GLP: "GP",
  GMB: "GM",
  GNB: "GW",
  GNQ: "GQ",
  GRC: "GR",
  GRD: "GD",
  GRL: "GL",
  GTM: "GT",
  GUF: "GF",
  GUM: "GU",
  GUY: "GY",
  HKG: "HK",
  HMD: "HM",
  HND: "HN",
  HRV: "HR",
  HTI: "HT",
  HUN: "HU",
  IDN: "ID",
  IMN: "IM",
  IND: "IN",
  IOT: "IO",
  IRL: "IE",
  IRN: "IR",
  IRQ: "IQ",
  ISL: "IS",
  ISR: "IL",
  ITA: "IT",
  JAM: "JM",
  JEY: "JE",
  JOR: "JO",
  JPN: "JP",
  KAZ: "KZ",
  KEN: "KE",
  KGZ: "KG",
  KHM: "KH",
  KIR: "KI",
  KNA: "KN",
  KOR: "KR",
  KWT: "KW",
  LAO: "LA",
  LBN: "LB",
  LBR: "LR",
  LBY: "LY",
  LCA: "LC",
  LIE: "LI",
  LKA: "LK",
  LSO: "LS",
  LTU: "LT",
  LUX: "LU",
  LVA: "LV",
  MAC: "MO",
  MAF: "MF",
  MAR: "MA",
  MCO: "MC",
  MDA: "MD",
  MDG: "MG",
  MDV: "MV",
  MEX: "MX",
  MHL: "MH",
  MKD: "MK",
  MLI: "ML",
  MLT: "MT",
  MMR: "MM",
  MNE: "ME",
  MNG: "MN",
  MNP: "MP",
  MOZ: "MZ",
  MRT: "MR",
  MSR: "MS",
  MTQ: "MQ",
  MUS: "MU",
  MWI: "MW",
  MYS: "MY",
  MYT: "YT",
  NAM: "NA",
  NCL: "NC",
  NER: "NE",
  NFK: "NF",
  NGA: "NG",
  NIC: "NI",
  NIU: "NU",
  NLD: "NL",
  NOR: "NO",
  NPL: "NP",
  NRU: "NR",
  NZL: "NZ",
  OMN: "OM",
  PAK: "PK",
  PAN: "PA",
  PCN: "PN",
  PER: "PE",
  PHL: "PH",
  PLW: "PW",
  PNG: "PG",
  POL: "PL",
  PRI: "PR",
  PRK: "KP",
  PRT: "PT",
  PRY: "PY",
  PSE: "PS",
  PYF: "PF",
  QAT: "QA",
  REU: "RE",
  ROU: "RO",
  RUS: "RU",
  RWA: "RW",
  SAU: "SA",
  SDN: "SD",
  SEN: "SN",
  SGP: "SG",
  SGS: "GS",
  SHN: "SH",
  SJM: "SJ",
  SLB: "SB",
  SLE: "SL",
  SLV: "SV",
  SMR: "SM",
  SOM: "SO",
  SPM: "PM",
  SRB: "RS",
  SSD: "SS",
  STP: "ST",
  SUR: "SR",
  SVK: "SK",
  SVN: "SI",
  SWE: "SE",
  SWZ: "SZ",
  SXM: "SX",
  SYC: "SC",
  SYR: "SY",
  TCA: "TC",
  TCD: "TD",
  TGO: "TG",
  THA: "TH",
  TJK: "TJ",
  TKL: "TK",
  TKM: "TM",
  TLS: "TL",
  TON: "TO",
  TTO: "TT",
  TUN: "TN",
  TUR: "TR",
  TUV: "TV",
  TWN: "TW",
  TZA: "TZ",
  UGA: "UG",
  UKR: "UA",
  UMI: "UM",
  URY: "UY",
  USA: "US",
  UZB: "UZ",
  VAT: "VA",
  VCT: "VC",
  VEN: "VE",
  VGB: "VG",
  VIR: "VI",
  VNM: "VN",
  VUT: "VU",
  WLF: "WF",
  WSM: "WS",
  YEM: "YE",
  ZAF: "ZA",
  ZMB: "ZM",
  ZWE: "ZW",
};

/**
 * Country names in the user's preferred language by ISO 3166-1 alpha-3 code.
 */
export let countryNamesByCode = {};
