//Utility functions

//Limit the specified definition to a single numbered layer
function restrictLayer(def, layer) {
  return filteredClone(def, ["==", "layer", layer], "_layer_" + layer);
}

function cp(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function layerClone(def, id) {
  var clone = cp(def);
  clone.id = id;
  return clone;
}

//Make a clone of a layer definition, with a filter added
function filteredClone(def, filterStep, idSuffix) {
  var clone = layerClone(def, def.id + idSuffix);
  clone.filter.push(filterStep);
  return clone;
}
