/*
 This is a list of the layers in the Americana style, from bottom to top.  They're defined in the layer/ folder
*/
var americanaLayers = [];

americanaLayers.push(
  layerBackground,

  layerParkFill,

  layerBoundaryCountyCasing,
  layerBoundaryStateCasing,
  layerBoundaryCountryCasing,

  layerWater,

  layerParkOutline,

  layerBoundaryCity,
  layerBoundaryCounty,
  layerBoundaryState,
  layerBoundaryCountry,

  roadMotorway.casing("tunnel"),
  roadTrunk.casing("tunnel"),

  roadMotorwayLink.casing("tunnel"),
  roadTrunkLink.casing("tunnel"),

  roadMotorway.fill("tunnel"),
  roadTrunk.fill("tunnel"),

  roadMotorwayLink.fill("tunnel"),
  roadTrunkLink.fill("tunnel"),

  layerTunnelOneway,
  layerTunnelOnewayLink,

  roadMotorway.casing("surface"),
  roadTrunk.casing("surface"),

  roadMotorwayLink.casing("surface"),
  roadTrunkLink.casing("surface"),

  roadMotorway.fill("surface"),
  roadTrunk.fill("surface"),

  roadMotorwayLink.fill("surface"),
  roadTrunkLink.fill("surface"),

  layerRoadOneway,
  layerRoadOnewayLink
);

var bridgeLayers = [
  roadMotorway.casing("bridge"),
  roadMotorwayLink.casing("bridge"),
  roadMotorway.fill("bridge"),
  roadMotorwayLink.fill("bridge"),

  roadTrunk.casing("bridge"),
  roadTrunkLink.casing("bridge"),
  roadTrunk.fill("bridge"),
  roadTrunkLink.fill("bridge"),

  layerBridgeOneway,
  layerBridgeOnewayLink,
];

//Render bridge without layer on the lowest bridge layer
bridgeLayers.forEach((layer) =>
  americanaLayers.push(filteredClone(layer, ["!has", "layer"], "_layer_bottom"))
);

//One layer at a time to handle stacked bridges
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

  layerMotorwayLabel,

  layerParkLabel,

  layerHighwayShieldInterstate,

  layerPlaceState,
  layerPlaceCity,
  layerPlaceCountryOther,
  layerPlaceCountry3,
  layerPlaceCountry2,
  layerPlaceCountry1,
  layerPlaceContinent
);
