export const pctFormat = {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
};

export const timingFormat = {
  style: "decimal",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
  signDisplay: "exceptZero",
};

export const durationFormat = {
  style: "decimal",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
  signDisplay: "never",
};

export function calculateDifference(object1, object2) {
  const difference = {};

  for (const key in object1) {
    if (typeof object1[key] === "object") {
      difference[key] = calculateDifference(object1[key], object2[key]);
    } else if (typeof object1[key] === "number") {
      difference[key] = object2[key] - object1[key];
    }
  }

  return difference;
}
