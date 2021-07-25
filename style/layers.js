/*
 This is a list of the layers in the Americana style, from bottom to top.  They're defined in the layer/ folder
*/
var americanaLayers = [];

americanaLayers.push(
  layerBackground,

  layerBoundaryCountyBg,
  layerBoundaryStateBg,
  layerBoundaryCountryBg,

  layerWater,

  layerParkFill,

  layerBoundaryCity,
  layerBoundaryCounty,
  layerBoundaryState,
  layerBoundaryCountry,

  layerTunnelMotorwayCasing,
  layerTunnelMotorwayLinkCasing,
  layerTunnelMotorway,
  layerTunnelMotorwayLink,
  layerTunnelOneway,
  layerTunnelOnewayLink,

  layerMotorwayCasing,

  layerMotorwayLinkCasing,
  layerMotorway,
  layerMotorwayLink,
  layerRoadOneway,
  layerRoadOnewayLink
);

var bridgeLayers = [
  layerBridgeMotorwayCasing,
  layerBridgeMotorwayLinkCasing,
  layerBridgeMotorway,
  layerBridgeMotorwayLink,
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

  layerPlaceCity,
  layerPlaceState,
  layerPlaceCountryOther,
  layerPlaceCountry3,
  layerPlaceCountry2,
  layerPlaceCountry1,
  layerPlaceContinent
);
