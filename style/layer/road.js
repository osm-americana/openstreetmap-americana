//At this zoom, render switches from unified to differentiated bridge/tunnel rendering
var minzoomBrunnel = 11;

//Exponent base for inter-zoom interpolation
var roadExp = 1.2;

//Tunnel casing dash pattern
var tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

//Join styles for fill and casing
var layoutRoadFill = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
};
var layoutRoadCase = {
  "line-cap": "butt",
  "line-join": "round",
  visibility: "visible",
};

var clrTrunk = `hsl(${hueTrunk}, 70%, 28%)`;
var clrTrunkCase = `hsl(${hueTrunk}, 70%, 18%)`;
var clrTrunkTun = `hsl(${hueTrunk}, 41%, 90%)`;
var clrTrunkTunCase = clrTrunkCase;

/*
 Minimum zooms
*/
var roadMinzoom = {};
roadMinzoom["motorway_road_fill"] = 4;
roadMinzoom["motorway_link_fill"] = 7;
roadMinzoom["motorway_road_casing"] = 4;
roadMinzoom["motorway_link_casing"] = 7;

roadMinzoom["trunk_road_fill"] = 8;
roadMinzoom["trunk_link_fill"] = 10;
roadMinzoom["trunk_road_casing"] = 11;
roadMinzoom["trunk_link_casing"] = 11;

/*
 Road fill and casing widths
*/
var roadWidth = {};

roadWidth["motorway_road_fill"] = [
  [4, 0.5],
  [9, 1],
  [20, 18],
];
roadWidth["motorway_link_fill"] = [
  [7, 1],
  [13, 1.5],
  [14, 2.5],
  [20, 11.5],
];
roadWidth["motorway_road_casing"] = [
  [4, 1.5],
  [9, 3],
  [20, 22],
];
roadWidth["motorway_link_casing"] = [
  [7, 2],
  [13, 3],
  [14, 4],
  [20, 15],
];

roadWidth["trunk_road_fill"] = [
  [4, 0.5],
  [9, 1],
  [12, 4],
  [20, 18],
];
roadWidth["trunk_road_casing"] = [
  [12, 0],
  [13, 5],
  [20, 22],
];
roadWidth["trunk_link_fill"] = [
  [7, 1],
  [13, 1.5],
  [14, 2.5],
  [20, 11.5],
];
roadWidth["trunk_link_casing"] = [
  [7, 2],
  [13, 3],
  [14, 4],
  [20, 15],
];

/*
 Colors
*/

var hueMoto = 354;
var hueTrunk = 0;

//Unified motorway bridge/tunnel/surface rendering at low zoom
var colorMotorwayFillLowZoom = [
  "interpolate",
  ["exponential", roadExp],
  ["zoom"],
  4,
  `hsl(${hueMoto}, 70%, 76%)`,
  6,
  `hsl(${hueMoto}, 70%, 66%)`,
  minzoomBrunnel - 0.5,
  `hsl(${hueMoto}, 70%, 60%)`,
];

var colorMotorwayCasingLowZoom = [
  "interpolate",
  ["exponential", roadExp],
  ["zoom"],
  4,
  `hsl(${hueMoto}, 10%, 85%)`,
  6,
  `hsl(${hueMoto}, 60%, 50%)`,
  minzoomBrunnel - 0.5,
  `hsl(${hueMoto}, 71%, 40%)`,
];

//Fill for surface roads and bridges
var roadFillColor = {};

roadFillColor["motorway"] = colorMotorwayFillLowZoom.concat(
  14,
  `hsl(${hueMoto}, 71%, 45%)`
);

roadFillColor["trunk"] = `hsl(${hueTrunk}, 70%, 28%)`;

//Fill for tunnels
var tunnelFillColor = {};

tunnelFillColor["motorway"] = colorMotorwayFillLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 90%)`
);

tunnelFillColor["trunk"] = `hsl(${hueTrunk}, 41%, 90%)`;

//Casing
var roadCasingColor = {};

roadCasingColor["motorway_surface"] = colorMotorwayCasingLowZoom.concat(
  14,
  `hsl(${hueMoto}, 71%, 23%)`
);

roadCasingColor["motorway_bridge"] = colorMotorwayCasingLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 10%)`
);

roadCasingColor["motorway_tunnel"] = colorMotorwayCasingLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 75%)`
);

roadCasingColor["trunk_surface"] = `hsl(${hueTrunk}, 70%, 18%)`;
roadCasingColor["trunk_bridge"] = `hsl(${hueTrunk}, 70%, 5%)`;
roadCasingColor["trunk_tunnel"] = roadCasingColor["trunk_surface"];

/*
 The following code create road layer generation functions based on the style variables set above.
*/
function filterRoad(roadClass, ramp, brunnel) {
  return [
    "all",
    brunnel === "surface"
      ? ["!in", "brunnel", "bridge", "tunnel"]
      : ["==", "brunnel", brunnel],
    ["==", "class", roadClass],
    [ramp ? "==" : "!=", "ramp", 1],
  ];
}

var defRoad = {
  type: "line",
  source: "openmaptiles",
  "source-layer": "transportation",
};

function roadLayer(hwyClass, link, brunnel, casing) {
  var linkStr = link ? "link" : "road";
  var casingStr = casing ? "casing" : "fill";

  var id = [hwyClass, linkStr, brunnel, casingStr].join("_");
  var widthAndZoomID = [hwyClass, linkStr, casingStr].join("_");
  var classBrunnelID = [hwyClass, brunnel].join("_");

  var layer = layerClone(defRoad, id);
  layer.filter = filterRoad(hwyClass, link, brunnel);
  layer.minzoom = roadMinzoom[widthAndZoomID];

  layer.layout = casing ? layoutRoadCase : layoutRoadFill;

  var width = {
    base: roadExp,
    stops: roadWidth[widthAndZoomID],
  };

  if (casing && brunnel === "tunnel") {
    layer.paint = tunCasePaint(roadCasingColor[classBrunnelID], width);
  } else if (casing) {
    layer.paint = roadPaint(roadCasingColor[classBrunnelID], width);
  } else {
    var fillColor =
      brunnel === "tunnel"
        ? tunnelFillColor[hwyClass]
        : roadFillColor[hwyClass];
    layer.paint = roadPaint(fillColor, width);
  }
  return layer;
}

function roadFill(hwyClass, brunnel) {
  return roadLayer(hwyClass, false, brunnel, false);
}

function roadCasing(hwyClass, brunnel) {
  return roadLayer(hwyClass, false, brunnel, true);
}

function roadLinkFill(hwyClass, brunnel) {
  return roadLayer(hwyClass, true, brunnel, false);
}

function roadLinkCasing(hwyClass, brunnel) {
  return roadLayer(hwyClass, true, brunnel, true);
}
