/**
 * Calculates the difference between two objects by comparing their properties.
 * If a property value is an object, it recursively calls itself to calculate the difference.
 * Positive numbers for a property means that property is greater in object2 than object1.
 * @param {Object|null} object1 - The first object to compare.
 * @param {Object|null} object2 - The second object to compare.
 * @returns {Object} - An object containing the differences between object2 and object1.
 */
export function calculateDifference(
  object1: object | null,
  object2: object | null
): object {
  // If one object exists and the other doesn't, return the difference
  if (object1 === null && object2 !== null) {
    return object2;
  } else if (object2 === null && object1 !== null) {
    return negate(object1);
  }

  const difference = {};

  // Iterate through each property in object1
  for (const key in object1) {
    if (typeof object1[key] === "object" && typeof object2![key] === "object") {
      // Recursively calculate the difference for nested objects
      difference[key] = calculateDifference(object1[key], object2![key]);
    } else if (
      typeof object1[key] === "number" &&
      typeof object2![key] === "number"
    ) {
      // Calculate the difference for numeric properties
      difference[key] = object2![key] - object1[key];
    } else {
      // If the property exists in object1 but not in object2, include it in the result
      difference[key] = negate(object1![key]);
    }
  }

  // Include properties that exist in object2 but not in object1
  for (const key in object2!) {
    if (!(key in object1!)) {
      difference[key] = object2[key];
    }
  }

  return difference;
}

/**
 * Negate all numeric properties of this object.
 * @param {Object} object - The object to process.
 */
function negate(object: object) {
  if (typeof object === "number") {
    return -object;
  }

  // Create a new object to store the result
  const result = {};

  for (const key in object) {
    if (typeof object[key] === "object" && object[key] !== null) {
      // If the property value is an object (and not null), recursively process it
      result[key] = negate(object[key]);
    } else if (typeof object[key] === "number") {
      // If the property value is a number, multiply it by the multiplier
      result[key] = -object[key];
    }
  }

  return result;
}

// "|           | main          | this PR      | change          | % change        |",
export type ComparedStats = {
  name: string;
  beforeValue: number | null;
  afterValue: number | null;
  change: number;
  pctChange: number | null;
};

export function statsComparisonRow(
  name: string,
  val1: number | null,
  val2: number | null,
  change: number
): ComparedStats {
  let pctChange: number | null;

  if (val1 !== null) {
    if (val2 !== null) {
      pctChange = change / val1;
    } else {
      pctChange = -1;
    }
  } else {
    pctChange = null;
  }

  return {
    name,
    beforeValue: val1,
    afterValue: val2,
    change,
    pctChange,
  };
}

const pctFormat: Intl.NumberFormatOptions = {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
};

function naLocString(val: number | null) {
  return val !== null ? val.toLocaleString("en") : "N/A";
}

/**
 * produce a markdown row of statistics comparison
 */
export function mdStringValues(stats: ComparedStats): string[] {
  const beforeValueStr = naLocString(stats.beforeValue);
  const afterValueStr = naLocString(stats.afterValue);
  const changeStr = naLocString(stats.change);
  const pctChangeStr =
    stats.pctChange !== null
      ? stats.pctChange.toLocaleString("en", pctFormat)
      : "N/A";

  return [stats.name, beforeValueStr, afterValueStr, changeStr, pctChangeStr];
}

export function mdCompareRow(
  name: string,
  val1: number | null,
  val2: number | null,
  change: number
): string {
  return mdStringValues(statsComparisonRow(name, val1, val2, change)).join(
    " | "
  );
}
