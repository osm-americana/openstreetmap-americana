import { calculateDifference, mdCompareRow } from "./object_compare";

interface Stats {
  layerCount: number;
  styleSize: number;
  gzipStyleSize: number;
  shieldJSONSize: number;
  gzipShieldJSONSize: number;
  spriteSheet1xSize: number;
  spriteSheet2xSize: number;
  layerGroup: {
    [key: string]: {
      layerCount: number;
      size: number;
    };
  };
}

const stats1: Stats = JSON.parse(process.argv[2]);
const stats2: Stats = JSON.parse(process.argv[3]);

const difference: Stats = calculateDifference(stats1, stats2);

const diffHeaderRow = [
  "|           | main          | this PR      | change          | % change        |",
  "|-----------|--------------:|-------------:|----------------:|----------------:|",
];

/**
 * Show comparison of overall aggregate statistics between this PR and previous
 */

const layersRow: string = mdCompareRow(
  "Layers",
  stats1.layerCount,
  stats2.layerCount,
  difference.layerCount
);

const sizeRow: string = mdCompareRow(
  "StyleJSON Size (b)",
  stats1.styleSize,
  stats2.styleSize,
  difference.styleSize
);

const gzSizeRow: string = mdCompareRow(
  "Compressed StyleJSON Size (b)",
  stats1.gzipStyleSize,
  stats2.gzipStyleSize,
  difference.gzipStyleSize
);

const shieldRow: string = mdCompareRow(
  "ShieldJSON Size (b)",
  stats1.shieldJSONSize,
  stats2.shieldJSONSize,
  difference.shieldJSONSize
);

const gzShieldRow: string = mdCompareRow(
  "Compressed ShieldJSON Size (b)",
  stats1.gzipShieldJSONSize,
  stats2.gzipShieldJSONSize,
  difference.gzipShieldJSONSize
);

const ss1xRow: string = mdCompareRow(
  "1x Sprite Sheet Size (b)",
  stats1.spriteSheet1xSize,
  stats2.spriteSheet1xSize,
  difference.spriteSheet1xSize
);

const ss2xRow: string = mdCompareRow(
  "2x Sprite Sheet Size (b)",
  stats1.spriteSheet2xSize,
  stats2.spriteSheet2xSize,
  difference.spriteSheet2xSize
);

printTable("Style size statistics", [
  layersRow,
  sizeRow,
  gzSizeRow,
  ss1xRow,
  ss2xRow,
  shieldRow,
  gzShieldRow,
]);

/**
 * Show comparison of the number of layers in each group before and after
 */

const layerCountChangeRows: string[] = [];

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

const layerSizeChangeRows: string[] = [];

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

function printTable(headingText: string, rows: string[]): void {
  const table = [...diffHeaderRow, ...rows].join("\n");
  const text = `

## ${headingText}

${table}
`;

  console.log(text);
}
