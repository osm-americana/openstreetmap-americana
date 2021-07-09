//Utility functions

//Limit the specified definition to a single numbered layer
function restrictLayer(def, layer) {
  var layerClone = JSON.parse(JSON.stringify(def));
  layerClone.filter.push(["==", "layer", layer]);
  layerClone.id = layerClone.id + "_layer_" + layer;
  return layerClone;
}
