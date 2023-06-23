function calculateDifference(object1, object2) {
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

const stats1 = JSON.parse(process.argv[2]);
const stats2 = JSON.parse(process.argv[3]);

const difference = calculateDifference(stats1, stats2);

const pctFormat = {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
};

const summaryChange = `

## Style size statistics

|           | main          | this PR      | change          | % change        |
|-----------|--------------:|-------------:|----------------:|----------------:|
| Layers    | ${stats1.layerCount} | ${stats2.layerCount} | ${
  difference.layerCount
} | ${((100 * difference.layerCount) / stats1.layerCount).toLocaleString(
  undefined,
  pctFormat
)} |
| Size (b)  | ${stats1.styleSize.toLocaleString(
  "en"
)} | ${stats2.styleSize.toLocaleString(
  "en"
)} | ${difference.styleSize.toLocaleString("en")} | ${(
  (100 * difference.styleSize) /
  stats1.styleSize
).toLocaleString(undefined, pctFormat)}

`;

let layerCountChange = `

## Layer count comparison

|           | main          | this PR      | change          | % change        |
|-----------|--------------:|-------------:|----------------:|----------------:|
`;

for (const layer in difference.layerGroup) {
  layerCountChange += `${layer} | ${stats1.layerGroup[layer].layerCount} | ${
    stats2.layerGroup[layer].layerCount
  } | ${difference.layerGroup[layer].layerCount} | ${(
    difference.layerGroup[layer].layerCount /
    stats1.layerGroup[layer].layerCount
  ).toLocaleString(undefined, pctFormat)}
`;
}

let layerSizeChange = `

## Layer size comparison

|           | main          | this PR      | change          | % change        |
|-----------|--------------:|-------------:|----------------:|----------------:|
`;

for (const layer in difference.layerGroup) {
  layerSizeChange += `${layer} | ${stats1.layerGroup[layer].size.toLocaleString(
    "en"
  )} | ${stats2.layerGroup[layer].size.toLocaleString(
    "en"
  )} | ${difference.layerGroup[layer].size.toLocaleString("en")} | ${(
    difference.layerGroup[layer].size / stats1.layerGroup[layer].size
  ).toLocaleString(undefined, pctFormat)}
`;
}

console.log(summaryChange);
console.log(layerCountChange);
console.log(layerSizeChange);
