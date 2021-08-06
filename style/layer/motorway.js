//At this zoom, render switches from unified to differentiated bridge/tunnel rendering
var minzoomBrunnel = 11;

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

var hueTrunk = 0;
var clrTrunk = `hsl(${hueTrunk}, 70%, 28%)`;
var clrTrunkCase = `hsl(${hueTrunk}, 70%, 18%)`;
var clrTrunkTun = `hsl(${hueTrunk}, 41%, 90%)`;
var clrTrunkTunCase = clrTrunkCase;

var wdTrunk = {
  base: 1.2,
  stops: [
    [4, 0.5],
    [9, 1],
    [20, 18],
  ],
};

var wdTrunkCase = {
  base: 1.2,
  stops: [
    [12, 0],
    [13, 5],
    [20, 22],
  ],
};

var wdTrunkLink = {
  base: 1.2,
  stops: [
    [7, 1],
    [13, 1.5],
    [14, 2.5],
    [20, 11.5],
  ],
};
var wdTrunkLinkCase = {
  base: 1.2,
  stops: [
    [7, 2],
    [13, 3],
    [14, 4],
    [20, 15],
  ],
};

var minzoomMoto = 4;
var minzoomTrunk = 8;
var minzoomMotoLink = 7;
var minzoomTrunkLink = 10;
var minzoomTrunkCase = 11;

/*
 Minimum zooms
*/
var roadMinzoom = {};
roadMinzoom["motorway_road_fill"] = 4;
roadMinzoom["motorway_link_fill"] = 7;
roadMinzoom["motorway_road_casing"] = 4;
roadMinzoom["motorway_link_casing"] = 7;

/*
 Road widths
*/
var roadWidth = {};
roadWidth["motorway_road_fill"] = {
  base: 1.2,
  stops: [
    [4, 0.5],
    [9, 1],
    [20, 18],
  ],
};
roadWidth["motorway_link_fill"] = {
  base: 1.2,
  stops: [
    [7, 1],
    [13, 1.5],
    [14, 2.5],
    [20, 11.5],
  ],
};
roadWidth["motorway_road_casing"] = {
  base: 1.2,
  stops: [
    [4, 1.5],
    [9, 3],
    [20, 22],
  ],
};
roadWidth["motorway_link_casing"] = {
  base: 1.2,
  stops: [
    [7, 2],
    [13, 3],
    [14, 4],
    [20, 15],
  ],
};

//Tunnel casing dash pattern
var tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

/*
 Colors
*/

var roadColor = {};

var hueMoto = 354;

//Unified bridge/tunnel/surface rendering at low zoom
var colorMotorwayFillLowZoom = [
  "interpolate",
  ["exponential", 1.2],
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
  ["exponential", 1.2],
  ["zoom"],
  4,
  `hsl(${hueMoto}, 10%, 85%)`,
  6,
  `hsl(${hueMoto}, 60%, 50%)`,
  minzoomBrunnel - 0.5,
  `hsl(${hueMoto}, 71%, 40%)`,
];

//Fill
var roadFillColor = {};

roadFillColor["motorway"] = colorMotorwayFillLowZoom.concat(
  14,
  `hsl(${hueMoto}, 71%, 45%)`
);

var tunnelFillColor = {};

tunnelFillColor["motorway"] = colorMotorwayFillLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 90%)`
);

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

// The following code populates the road layer array based on the style variables set above.

function filterRoad(roadClass, ramp, brunnel) {
  return [
    "all",
    brunnel == null
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
  var brunnelStr = brunnel == null ? "surface" : brunnel;
  var casingStr = casing ? "casing" : "fill";

  var id = [hwyClass, linkStr, brunnelStr, casingStr].join("_");
  var widthAndZoomID = [hwyClass, linkStr, casingStr].join("_");
  var classBrunnelID = [hwyClass, brunnelStr].join("_");

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

var lyrMoto = roadLayer("motorway", false, null, false);
var lyrMotoCase = roadLayer("motorway", false, null, true);
var lyrMotoBrg = roadLayer("motorway", false, "bridge", false);
var lyrMotoBrgCase = roadLayer("motorway", false, "bridge", true);
var lyrMotoTun = roadLayer("motorway", false, "tunnel", false);
var lyrMotoTunCase = roadLayer("motorway", false, "tunnel", true);
var lyrMotoLink = roadLayer("motorway", true, null, false);
var lyrMotoLinkCase = roadLayer("motorway", true, null, true);
var lyrMotoLinkBrg = roadLayer("motorway", true, "bridge", false);
var lyrMotoLinkBrgCase = roadLayer("motorway", true, "bridge", true);
var lyrMotoLinkTun = roadLayer("motorway", true, "tunnel", false);
var lyrMotoLinkTunCase = roadLayer("motorway", true, "tunnel", true);
