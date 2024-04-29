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
  "StyleJSON Size (b)",
  stats1.styleSize,
  stats2.styleSize,
  difference.styleSize
);

const shieldRow = mdCompareRow(
  "ShieldJSON Size (b)",
  stats1.shieldJSONSize,
  stats2.shieldJSONSize,
  difference.shieldJSONSize
);

const ss1xRow = mdCompareRow(
  "1x Sprite Sheet Size (b)",
  stats1.spriteSheet1xSize,
  stats2.spriteSheet1xSize,
  difference.spriteSheet1xSize
);

const ss2xRow = mdCompareRow(
  "2x Sprite Sheet Size (b)",
  stats1.spriteSheet2xSize,
  stats2.spriteSheet2xSize,
  difference.spriteSheet2xSize
);

printTable("Style size statistics", [
  layersRow,
  sizeRow,
  ss1xRow,
  ss2xRow,
  shieldRow,
]);

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
