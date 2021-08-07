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
 Road widths
*/
var roadWidth = {};
roadWidth["motorway_road_fill"] = {
  base: roadExp,
  stops: [
    [4, 0.5],
    [9, 1],
    [20, 18],
  ],
};
roadWidth["motorway_link_fill"] = {
  base: roadExp,
  stops: [
    [7, 1],
    [13, 1.5],
    [14, 2.5],
    [20, 11.5],
  ],
};
roadWidth["motorway_road_casing"] = {
  base: roadExp,
  stops: [
    [4, 1.5],
    [9, 3],
    [20, 22],
  ],
};
roadWidth["motorway_link_casing"] = {
  base: roadExp,
  stops: [
    [7, 2],
    [13, 3],
    [14, 4],
    [20, 15],
  ],
};

roadWidth["trunk_road_fill"] = {
  base: roadExp,
  stops: [
    [4, 0.5],
    [9, 1],
    [12, 4],
    [20, 18],
  ],
};

roadWidth["trunk_road_casing"] = {
  base: roadExp,
  stops: [
    [12, 0],
    [13, 5],
    [20, 22],
  ],
};

roadWidth["trunk_link_fill"] = {
  base: roadExp,
  stops: [
    [7, 1],
    [13, 1.5],
    [14, 2.5],
    [20, 11.5],
  ],
};

roadWidth["trunk_link_casing"] = {
  base: roadExp,
  stops: [
    [7, 2],
    [13, 3],
    [14, 4],
    [20, 15],
  ],
};

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
 The following code populates the road layer array based on the style variables set above.
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

  if (casing && brunnel === "tunnel") {
    layer.paint = tunCasePaint(
      roadCasingColor[classBrunnelID],
      roadWidth[widthAndZoomID]
    );
  } else if (casing) {
    layer.paint = roadPaint(
      roadCasingColor[classBrunnelID],
      roadWidth[widthAndZoomID]
    );
  } else {
    var fillColor =
      brunnel === "tunnel"
        ? tunnelFillColor[hwyClass]
        : roadFillColor[hwyClass];
    layer.paint = roadPaint(fillColor, roadWidth[widthAndZoomID]);
  }
  return layer;
}

var layerRoad = {};

var lyrMoto = roadLayer("motorway", false, "surface", false);
var lyrMotoCase = roadLayer("motorway", false, "surface", true);
var lyrMotoBrg = roadLayer("motorway", false, "bridge", false);
var lyrMotoBrgCase = roadLayer("motorway", false, "bridge", true);
var lyrMotoTun = roadLayer("motorway", false, "tunnel", false);
var lyrMotoTunCase = roadLayer("motorway", false, "tunnel", true);
var lyrMotoLink = roadLayer("motorway", true, "surface", false);
var lyrMotoLinkCase = roadLayer("motorway", true, "surface", true);
var lyrMotoLinkBrg = roadLayer("motorway", true, "bridge", false);
var lyrMotoLinkBrgCase = roadLayer("motorway", true, "bridge", true);
var lyrMotoLinkTun = roadLayer("motorway", true, "tunnel", false);
var lyrMotoLinkTunCase = roadLayer("motorway", true, "tunnel", true);

var lyrTrunk = roadLayer("trunk", false, "surface", false);
var lyrTrunkCase = roadLayer("trunk", false, "surface", true);
var lyrTrunkBrg = roadLayer("trunk", false, "bridge", false);
var lyrTrunkBrgCase = roadLayer("trunk", false, "bridge", true);
var lyrTrunkTun = roadLayer("trunk", false, "tunnel", false);
var lyrTrunkTunCase = roadLayer("trunk", false, "tunnel", true);
var lyrTrunkLink = roadLayer("trunk", true, "surface", false);
var lyrTrunkLinkCase = roadLayer("trunk", true, "surface", true);
var lyrTrunkLinkBrg = roadLayer("trunk", true, "bridge", false);
var lyrTrunkLinkBrgCase = roadLayer("trunk", true, "bridge", true);
var lyrTrunkLinkTun = roadLayer("trunk", true, "tunnel", false);
var lyrTrunkLinkTunCase = roadLayer("trunk", true, "tunnel", true);
