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
  switch (clone.filter[0]) {
    case "all":
    case "any":
      clone.filter.push(filterStep);
      break;
    case "interpolate":
    case "interpolate-hcl":
    case "interpolate-lab":
    case "step":
      clone.filter = mapRampExpression(clone.filter, (input, output) => ["all", output, filterStep]);
      break;
    default:
      throw new TypeError("Unlikely filter");
  }
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

/**
 * Returns a copy of the interpolate or step expression with each output replaced with the return value of the callback.
 *
 * @param expression An interpolate or step expression.
 * @param callback A function that takes the expression's input value and output expression and returns a replacement expression.
 * @returns A copy of the interpolate or step expression with the output expressions replaced.
 */
export function mapRampExpression(expression, callback) {
  let copy = [...expression];
  let start = copy[0] === "step" ? 1 : 3;
  for (var i = start; i + 1 < copy.length; i += 2) {
    copy[i + 1] = callback(copy[i], copy[i + 1]);
  }
  return copy;
}
