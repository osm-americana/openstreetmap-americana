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

printTable("Style size statistics", [layersRow, sizeRow]);

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

printTable("Layer count comparison", layerCountChangeRows);

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

printTable("Layer size comparison", layerSizeChangeRows);

function printTable(headingText, rows) {
  const table = [...diffHeaderRow, ...rows].join("\n");
  const text = `

## ${headingText}

${table}
`;

  console.log(text);
}
