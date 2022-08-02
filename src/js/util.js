"use strict";
//Utility functions

//Limit the specified definition to a single numbered layer
export function restrictLayer(def, layer) {
  return filteredClone(
    def,
    ["==", ["coalesce", ["get", "layer"], 0], layer],
    "_layer_" + layer
  );
}

export function cp(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function layerClone(def, id) {
  var clone = cp(def);
  clone.id = id;
  return clone;
}

//Make a clone of a layer definition, with a filter added
export function filteredClone(def, filterStep, idSuffix) {
  var clone = layerClone(def, def.id + idSuffix);
  clone.filter.push(filterStep);
  return clone;
}

//Make a clone of a zoom-based value array
export function zoomMultiply(arr, multiplier) {
  var transformedArray = cp(arr);
  for (var i = 0; i < transformedArray.length; i++) {
    transformedArray[i][1] *= multiplier;
  }
  return transformedArray;
}
