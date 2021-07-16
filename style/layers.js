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

//One layer at a time to handle stacked bridges
for (let i = 1; i <= 5; i++) {
  [
    layerBridgeMotorwayCasing,
    layerBridgeMotorwayLinkCasing,
    layerBridgeMotorway,
    layerBridgeMotorwayLink,
    layerBridgeOneway,
    layerBridgeOnewayLink,
  ].forEach((layer) => americanaLayers.push(restrictLayer(layer, i)));
}

americanaLayers.push(
  layerMotorwayLabel,

  layerHighwayShieldInterstate,

  layerPlaceCity,
  layerPlaceState,
  layerPlaceCountryOther,
  layerPlaceCountry3,
  layerPlaceCountry2,
  layerPlaceCountry1,
  layerPlaceContinent
);
