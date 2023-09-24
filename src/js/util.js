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
  if (!["all", "any"].includes(clone.filter[0])) {
    throw new TypeError("Unlikely filter");
  }
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

//Create a zoom interpolation expression, given width at zoom 20
export function zoomInterpolate(widthZ20) {
  return [
    "interpolate",
    ["exponential", 1.2],
    ["zoom"],
    8,
    multiplyMatchExpression(widthZ20, 1 / 16),
    12,
    multiplyMatchExpression(widthZ20, 1 / 4),
    20,
    widthZ20,
  ];
}

export function multiplyMatchExpression(value, factor) {
  if (Array.isArray(value)) {
    var result = [value[0], value[1]];
    for (let i = 2; i < value.length - 1; i++) {
      if (i % 2 == 0) {
        result.push(value[i]);
      } else {
        result.push(multiplyMatchExpression(value[i], factor));
      }
    }
    result.push(multiplyMatchExpression(value[value.length - 1], factor));
    return result;
  } else {
    return value * factor;
  }
}
