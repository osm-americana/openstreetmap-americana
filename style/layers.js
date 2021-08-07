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

  roadCasing("motorway", "tunnel"),
  roadCasing("trunk", "tunnel"),

  roadLinkCasing("motorway", "tunnel"),
  roadLinkCasing("trunk", "tunnel"),

  roadFill("motorway", "tunnel"),
  roadFill("trunk", "tunnel"),

  roadLinkFill("motorway", "tunnel"),
  roadLinkFill("trunk", "tunnel"),

  layerTunnelOneway,
  layerTunnelOnewayLink,

  roadCasing("motorway", "surface"),
  roadCasing("trunk", "surface"),

  roadLinkCasing("motorway", "surface"),
  roadLinkCasing("trunk", "surface"),

  roadFill("motorway", "surface"),
  roadFill("trunk", "surface"),

  roadLinkFill("motorway", "surface"),
  roadLinkFill("trunk", "surface"),

  layerRoadOneway,
  layerRoadOnewayLink
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
