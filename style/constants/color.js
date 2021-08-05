var minzoomBrunnel = 11;
var clrTransparent = "hsla(0, 0%, 0%, 0)";

var clrWaterFill = "hsl(211, 42%, 70%)";
var clrWaterLine = "hsl(211, 73%, 78%)";
var clrWaterIntermittent = "hsl(205, 89%, 83%)";

var hueMoto = 354;
var hueTrunk = 0;

var clrMotoLowZoom = [
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
var clrMoto = clrMotoLowZoom.concat(14, `hsl(${hueMoto}, 71%, 45%)`);

var clrTrunk = `hsl(${hueTrunk}, 70%, 28%)`;

var clrMotoCaseLowZoom = [
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
var clrMotoCase = clrMotoCaseLowZoom.concat(14, `hsl(${hueMoto}, 71%, 23%)`);

var clrTrunkCase = `hsl(${hueTrunk}, 70%, 18%)`;

var tunDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

var clrMotoBridgeCase = clrMotoCaseLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 10%)`
);
var clrMotoTun = clrMotoLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 90%)`
);
var clrTrunkTun = `hsl(${hueTrunk}, 41%, 90%)`;

var clrMotoTunCase = clrMotoCaseLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMoto}, 71%, 75%)`
);
var clrTrunkTunCase = clrTrunkCase;

var clrBridgeCase = "black";

var hueBorder = 0;
var hueBorderCase = 281;

var clrBorder = "hsl(0, 2%, 47%)";
var clrBorderCase = `hsl(${hueBorderCase}, 35%, 86%)`;

var clrParkFill = "hsl(136, 41%, 89%)";
var clrParkOutline = "hsl(136, 41%, 79%)";
var clrParkLabel = "hsl(136, 71%, 29%)";
