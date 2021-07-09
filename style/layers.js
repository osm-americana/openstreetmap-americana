/*
 This is a list of the layers in the Americana style, from bottom to top.  They're defined in the layer/ folder
*/
var americanaLayers = [];

americanaLayers.push(layerBackground);

americanaLayers.push(layerWater);

americanaLayers.push(layerTunnelMotorwayCasing);
americanaLayers.push(layerTunnelMotorwayLinkCasing);
americanaLayers.push(layerTunnelMotorway);
americanaLayers.push(layerTunnelMotorwayLink);
americanaLayers.push(layerTunnelOneway);
americanaLayers.push(layerTunnelOnewayLink);

americanaLayers.push(layerMotorwayCasing);

americanaLayers.push(layerMotorwayLinkCasing);
americanaLayers.push(layerMotorway);
americanaLayers.push(layerMotorwayLink);
americanaLayers.push(layerRoadOneway);
americanaLayers.push(layerRoadOnewayLink);

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

americanaLayers.push(layerMotorwayLabel);

americanaLayers.push(layerHighwayShieldInterstate);

americanaLayers.push(layerPlaceCity);
americanaLayers.push(layerPlaceState);
americanaLayers.push(layerPlaceCountryOther);
americanaLayers.push(layerPlaceCountry3);
americanaLayers.push(layerPlaceCountry2);
americanaLayers.push(layerPlaceCountry1);
americanaLayers.push(layerPlaceContinent);
