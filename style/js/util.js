//Utility functions

//Limit the specified definition to a single numbered layer
function restrictLayer(def, layer) {
  return filteredClone(def, ["==", "layer", layer], "_layer_" + layer);
}

//Make a clone of a layer definition, with a filter added
function filteredClone(def, filterStep, idSuffix) {
  var layerClone = JSON.parse(JSON.stringify(def));
  layerClone.filter.push(filterStep);
  layerClone.id = layerClone.id + idSuffix;
  return layerClone;
}
