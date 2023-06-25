import { pctFormat, timingFormat, durationFormat } from "./compare_func.js";

const stats1 = JSON.parse(process.argv[2]);
const stats2 = JSON.parse(process.argv[3]);

for (const tile in stats2) {
  const tileStats1 = stats1[tile];
  const tileStats2 = stats2[tile];
  let tilePerf = `
## Performance for ${tile}

| layer | #features | main (/feature) | PR (/feature) | main (/tile) | PR (/tile) | change (/tile) | % change |
|-------|----------:|----------------:|--------------:|-------------:|-----------:|---------------:|---------:|
`;

  for (const layer in tileStats2) {
    let perf1 = tileStats1[layer];
    let perf2 = tileStats2[layer];
    let tileTime1 = perf1.time * perf1.featureCount;
    let tileTime2 = perf2.time * perf2.featureCount;
    let tileDiff = tileTime2 - tileTime1;
    tilePerf += `${layer}|${perf2.featureCount}|${perf1.time.toLocaleString(
      undefined,
      durationFormat
    )}ms|${perf2.time.toLocaleString(
      undefined,
      durationFormat
    )}ms|${tileTime1.toLocaleString(
      undefined,
      durationFormat
    )}ms|${tileTime2.toLocaleString(
      undefined,
      durationFormat
    )}ms|${tileDiff.toLocaleString(undefined, timingFormat)}ms|${(
      tileDiff / tileTime1
    ).toLocaleString(undefined, pctFormat)}}
`;
  }
  console.log(tilePerf);
}
