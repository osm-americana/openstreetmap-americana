/*
 This is a list of the layers in the Americana style, from bottom to top.  They're defined in the layer/ folder
*/
var americanaLayers = [];

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

  lyrMotoTunCase,
  lyrTrunkTunCase,
  lyrMotoLinkTunCase,
  lyrTrunkTun,
  lyrMotoTun,
  lyrTrunkLinkTun,
  lyrMotoLinkTun,
  lyrTunOneway,
  lyrTunOnewayLink,

  lyrTrunkCase,
  lyrMotoCase,

  lyrMotoLinkCase,
  lyrTrunk,
  lyrMoto,
  lyrTrunkLink,
  lyrMotoLink,
  lyrRoadOneway,
  lyrRoadOnewayLink
);

var bridgeLayers = [
  lyrTrunkBrgCase,
  lyrTrunkLinkBrgCase,
  lyrTrunkBrg,
  lyrTrunkLinkBrg,
  lyrMotoBrgCase,
  lyrMotoLinkBrgCase,
  lyrMotoBrg,
  lyrMotoLinkBrg,
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
