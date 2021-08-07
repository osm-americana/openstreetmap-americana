/*
 This is a list of the layers in the Americana style, from bottom to top.  They're defined in the layer/ folder
*/
var americanaLayers = [];

/*
function roadFill(hwyClass, brunnel) {
function roadCasing(hwyClass, brunnel) {
function roadLinkFill(hwyClass, brunnel) {
function roadLinkCasing(hwyClass, brunnel) {
*/

americanaLayers.push(
  lyrBackground,

  lyrParkFill,

  lyrBoundaryCountyBg,
  lyrBoundaryStateBg,
  lyrBoundaryCountryBg,

  lyrWater,

  lyrParkOutline,

  lyrBoundaryCity,
  lyrBoundaryCounty,
  lyrBoundaryState,
  lyrBoundaryCountry,

  roadCasing("motorway", "tunnel"),
  roadCasing("trunk", "tunnel"),

  roadLinkCasing("motorway", "tunnel"),
  roadLinkCasing("trunk", "tunnel"),

  roadFill("motorway", "tunnel"),
  roadFill("trunk", "tunnel"),

  roadLinkFill("motorway", "tunnel"),
  roadLinkFill("trunk", "tunnel"),

  lyrTunOneway,
  lyrTunOnewayLink,

  roadCasing("motorway", "surface"),
  roadCasing("trunk", "surface"),

  roadLinkCasing("motorway", "surface"),
  roadLinkCasing("trunk", "surface"),

  roadFill("motorway", "surface"),
  roadFill("trunk", "surface"),

  roadLinkFill("motorway", "surface"),
  roadLinkFill("trunk", "surface"),

  lyrRoadOneway,
  lyrRoadOnewayLink
);

var bridgeLayers = [
  roadCasing("motorway", "bridge"),
  roadLinkCasing("motorway", "bridge"),
  roadFill("motorway", "bridge"),
  roadLinkFill("motorway", "bridge"),

  roadCasing("trunk", "bridge"),
  roadLinkCasing("trunk", "bridge"),
  roadFill("trunk", "bridge"),
  roadLinkFill("trunk", "bridge"),

  lyrBrgOneway,
  lyrBrgOnewayLink,
];

//Render Brg without layer on the lowest Brg layer
bridgeLayers.forEach((layer) =>
  americanaLayers.push(filteredClone(layer, ["!has", "layer"], "_layer_bottom"))
);

//One layer at a time to handle stacked Brgs
for (let i = 1; i <= 4; i++) {
  bridgeLayers.forEach((layer) =>
    americanaLayers.push(restrictLayer(layer, i))
  );
}

//If layer is more than 5, just give up and render on a single layer.
bridgeLayers.forEach((layer) =>
  americanaLayers.push(filteredClone(layer, [">=", "layer", 5], "_layer_top"))
);

americanaLayers.push(
  //The labels at the end of the list have the highest priority.

  lyrMotoLabel,

  lyrParkLabel,

  lyrHighwayShieldInterstate,

  lyrPlaceState,
  lyrPlaceCity,
  lyrPlaceCountryOther,
  lyrPlaceCountry3,
  lyrPlaceCountry2,
  lyrPlaceCountry1,
  lyrPlaceContinent
);
