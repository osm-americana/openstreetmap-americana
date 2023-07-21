import { calculateDifference, mdCompareRow } from "./object_compare";

const stats1 = JSON.parse(process.argv[2]);
const stats2 = JSON.parse(process.argv[3]);

const difference = calculateDifference(stats1, stats2);

const diffHeaderRow = [
  "|           | main          | this PR      | change          | % change        |",
  "|-----------|--------------:|-------------:|----------------:|----------------:|",
];

/**
 * Show comparison of overall aggregate statistics between this PR and previous
 */

const pctFormat = {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
};

const layersRow = mdCompareRow(
  "Layers",
  stats1.layerCount,
  stats2.layerCount,
  difference.layerCount
);

const sizeRow = mdCompareRow(
  "Size (b)",
  stats1.styleSize,
  stats2.styleSize,
  difference.styleSize
);

const summaryChangeTable = [...diffHeaderRow, layersRow, sizeRow].join("\n");

const summaryChange = `

## Style size statistics

${summaryChangeTable}
`;

console.log(summaryChange);

/**
 * Show comparison of the number of layers in each group before and after
 */

const layerCountChangeRows = [];

for (const layer in difference.layerGroup) {
  layerCountChangeRows.push(
    mdCompareRow(
      layer,
      stats1.layerGroup[layer]?.layerCount,
      stats2.layerGroup[layer]?.layerCount,
      difference.layerGroup[layer]?.layerCount
    )
  );
}

const layerCountChangeTable = [...diffHeaderRow, ...layerCountChangeRows].join(
  "\n"
);

const layerCountChange = `

## Layer count comparison

${layerCountChangeTable}
`;

console.log(layerCountChange);

/**
 * Show comparison of the aggregate size of layers in each group before and after
 */

const layerSizeChangeRows = [];

for (const layer in difference.layerGroup) {
  layerSizeChangeRows.push(
    mdCompareRow(
      layer,
      stats1.layerGroup[layer]?.size,
      stats2.layerGroup[layer]?.size,
      difference.layerGroup[layer]?.size
    )
  );
}

const layerSizeChangeTable = [...diffHeaderRow, ...layerSizeChangeRows].join(
  "\n"
);

const layerSizeChange = `

## Layer size comparison

${layerSizeChangeTable}
`;

console.log(layerSizeChange);
