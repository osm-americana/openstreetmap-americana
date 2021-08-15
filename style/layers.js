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

  roadMotorwayTunnel.casing(),
  roadTrunkTunnel.casing(),

  roadMotorwayLinkTunnel.casing(),
  roadTrunkLinkTunnel.casing(),

  roadMotorwayTunnel.fill(),
  roadTrunkTunnel.fill(),

  roadMotorwayLinkTunnel.fill(),
  roadTrunkLinkTunnel.fill(),

  layerTunnelOneway,
  layerTunnelOnewayLink,

  roadMotorway.casing(),
  roadTrunk.casing(),

  roadMotorwayLink.casing(),
  roadTrunkLink.casing(),

  roadMotorway.fill(),
  roadTrunk.fill(),

  roadMotorwayLink.fill(),
  roadTrunkLink.fill(),

  layerRoadOneway,
  layerRoadOnewayLink
);

var bridgeLayers = [
  roadMotorwayBridge.casing(),
  roadMotorwayLinkBridge.casing(),
  roadMotorwayBridge.fill(),
  roadMotorwayLinkBridge.fill(),

  roadTrunkBridge.casing(),
  roadTrunkLinkBridge.casing(),
  roadTrunkBridge.fill(),
  roadTrunkLinkBridge.fill(),

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
