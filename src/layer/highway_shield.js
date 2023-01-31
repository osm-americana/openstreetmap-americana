"use strict";

export const namedRouteNetworks = [
  "US:KY:Parkway",
  "US:NY:Parkway",
  "US:TX:Fort_Bend:FBCTRA",
  "US:TX:Harris:HCTRA",
];

let AsianHighwayBorders = {};

export async function fetchFeatures(baseURL) {
  if (Object.keys(AsianHighwayBorders).length !== 0) {
    return;
  }
  
  let fetchFile = async function (name) {
    let response = await fetch(`features/${name}.geojson`);
    if (response.ok) {
      AsianHighwayBorders[name] = await response.json();
    } else {
      throw response;
    }
  };
  await Promise.all([
    "az-cn-ir", "id", "in", "jp-kr",
  ].map(f => fetchFile(f)));
}

export function getImageNameExpression(routeIndex) {
  const nullIsland = {type: "Polygon", coordinates: [[[0, 0], [0, 0], [0, 0]]]};
  
  return [
    "let",
    "route",
    ["get", "route_" + routeIndex],
    [
      "concat",
      "shield\n",
      ["var", "route"],
      [
        "match",
        ["var", "route"],
        namedRouteNetworks.map((n) => n + "="),
        ["concat", "\n", ["get", "name"]],
        "",
      ],
      [
        "match",
        ["slice", ["var", "route"], 0, ["index-of", "=", ["var", "route"]]],
        ["AsianHighway", "AH"],
        [
          "concat",
          "\n",
          [
            "case",
            // Azerbaijan, China, Iran
            ["within", AsianHighwayBorders["az-cn-ir"] || nullIsland],
            "green",
            // Japan, South Korea
            ["within", AsianHighwayBorders["jp-kr"] || nullIsland],
            "white",
            // Indonesia
            ["within", AsianHighwayBorders.id || nullIsland],
            "white_id",
            // India
            ["within", AsianHighwayBorders.in || nullIsland],
            "green_in",
            // Armenia, Cambodia, Malaysia, Myanmar, Philippines, Russia, Thailand, Vietnam
            "blue",
          ],
        ],
        "",
      ],
    ],
  ];
}

function routeConcurrency(routeIndex) {
  return [
    "case",
    ["!=", ["get", "route_" + routeIndex], null],
    ["image", getImageNameExpression(routeIndex)],
    ["literal", ""],
  ];
}

/**
 * Returns a structured representation of the given image name.
 *
 * @param name An image name in the format returned by `routeConcurrency`.
 */
export function parseImageName(imageName) {
  let lines = imageName.split("\n");
  let [, network, ref] = lines[1].match(/^(.*?)=(.*)/) || [];
  let name = lines[2];
  return { imageName, network, ref, name };
}

await fetchFeatures();
let shieldTextField = ["format"];
for (var i = 1; i <= 6; i++) {
  shieldTextField.push(routeConcurrency(i));
}

let shieldLayout = {
  "text-rotation-alignment": "viewport-glyph",
  "text-font": ["OpenHistorical"],
  "text-field": shieldTextField,
  "text-anchor": "center",
  "text-letter-spacing": 0.7,
  "symbol-placement": "line",
  "text-max-angle": 180,
  "text-pitch-alignment": "viewport",
  "symbol-sort-key": [
    "match",
    ["get", "class"],
    "motorway",
    0,
    "trunk",
    1,
    "primary",
    2,
    "secondary",
    3,
    "tertiary",
    4,
    5,
  ],
};

export const shield = {
  type: "symbol",
  source: "openmaptiles",
  "source-layer": "transportation_name",
  id: "highway_shield",
  layout: shieldLayout,
  paint: {
    "text-opacity": [
      "step",
      ["zoom"],
      ["match", ["get", "class"], "motorway", 1, 0],
      8,
      ["match", ["get", "class"], ["motorway", "trunk"], 1, 0],
      10,
      ["match", ["get", "class"], ["motorway", "trunk", "primary"], 1, 0],
      11,
      [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary"],
        1,
        0,
      ],
      12,
      [
        "match",
        ["get", "class"],
        ["motorway", "trunk", "primary", "secondary", "tertiary"],
        1,
        0,
      ],
      14,
      1,
    ],
  },
  filter: [
    "any",
    ["has", "route_1"],
    ["has", "route_2"],
    ["has", "route_3"],
    ["has", "route_4"],
    ["has", "route_5"],
    ["has", "route_6"],
  ],
};
