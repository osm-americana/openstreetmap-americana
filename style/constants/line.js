var layoutRoad = {
  "line-cap": "round",
  "line-join": "round",
  visibility: "visible",
};
var layoutRoadCase = {
  "line-cap": "butt",
  "line-join": "round",
  visibility: "visible",
};

var wdMoto = {
  base: 1.2,
  stops: [
    [4, 0.5],
    [9, 1],
    [20, 18],
  ],
};
var wdTrunk = wdMoto;
var wdMotoCase = {
  base: 1.2,
  stops: [
    [4, 1.5],
    [9, 3],
    [20, 22],
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

var minzoomMoto = 4;
var minzoomTrunk = 8;
var wdMotoLink = {
  base: 1.2,
  stops: [
    [7, 1],
    [13, 1.5],
    [14, 2.5],
    [20, 11.5],
  ],
};
var wdTrunkLink = wdMotoLink;
var wdMotoLinkCase = {
  base: 1.2,
  stops: [
    [7, 2],
    [13, 3],
    [14, 4],
    [20, 15],
  ],
};
var wdTrunkLinkCase = wdMotoLinkCase;
var minzoomMotoLink = 7;
var minzoomTrunkLink = 10;
var minzoomTrunkCase = 11;
