var minzoomBrunnel = 11;
var colorTransparent = "hsla(0, 0%, 0%, 0)";

var colorWaterFill = "hsl(211, 42%, 70%)";
var colorWaterLine = "hsl(211, 73%, 78%)";
var colorWaterIntermittent = "hsl(205, 89%, 83%)";

var hueMotorway = 354;
var hueTrunk = 0;

var colorMotorwayLowZoom = [
  "interpolate",
  ["exponential", 1.2],
  ["zoom"],
  4,
  `hsl(${hueMotorway}, 70%, 76%)`,
  6,
  `hsl(${hueMotorway}, 70%, 66%)`,
  minzoomBrunnel - 0.5,
  `hsl(${hueMotorway}, 70%, 60%)`,
];
var colorMotorway = colorMotorwayLowZoom.concat(
  14,
  `hsl(${hueMotorway}, 71%, 45%)`
);

var colorTrunk = `hsl(${hueTrunk}, 70%, 28%)`;

var colorMotorwayCasingLowZoom = [
  "interpolate",
  ["exponential", 1.2],
  ["zoom"],
  4,
  `hsl(${hueMotorway}, 10%, 85%)`,
  6,
  `hsl(${hueMotorway}, 60%, 50%)`,
  minzoomBrunnel - 0.5,
  `hsl(${hueMotorway}, 71%, 40%)`,
];
var colorMotorwayCasing = colorMotorwayCasingLowZoom.concat(
  14,
  `hsl(${hueMotorway}, 71%, 23%)`
);

var colorTrunkCasing = `hsl(${hueTrunk}, 70%, 18%)`;

var tunnelDashArray = [
  "step",
  ["zoom"],
  ["literal", [1]],
  minzoomBrunnel,
  ["literal", [0.5, 0.25]],
];

var colorMotorwayBridgeCasing = colorMotorwayCasingLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMotorway}, 71%, 10%)`
);
var colorMotorwayTunnel = colorMotorwayLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMotorway}, 71%, 90%)`
);
var colorTrunkTunnel = `hsl(${hueTrunk}, 41%, 90%)`;

var colorMotorwayTunnelCasing = colorMotorwayCasingLowZoom.concat(
  minzoomBrunnel + 0.5,
  `hsl(${hueMotorway}, 71%, 75%)`
);
var colorTrunkTunnelCasing = colorTrunkCasing;

var colorBridgeCasing = "black";

var hueBorder = 0;
var hueBorderCasing = 281;

var colorBorder = "hsl(0, 2%, 47%)";
var colorBorderCasing = `hsl(${hueBorderCasing}, 35%, 86%)`;

var colorParkFill = "hsl(136, 41%, 89%)";
var colorParkOutline = "hsl(136, 41%, 79%)";
var colorParkLabel = "hsl(136, 71%, 29%)";
