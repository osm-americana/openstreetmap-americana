export function calcStatsJSON(style) {
  const layerMap = new Map();
  const layers = style.layers;
  const layerCount = layers.length;
  const styleSize = JSON.stringify(style).length;

  const stats = {
    layerCount,
    styleSize,
    layerGroup: {},
  };

  for (let i = 0; i < layerCount; i++) {
    const layer = layers[i];
    layerMap.set(layer.id, layers[i]);
    const layerSize = JSON.stringify(layer).length;
    const layerGroup = layer["source-layer"] || layer.source || layer.type;
    if (stats.layerGroup[layerGroup]) {
      stats.layerGroup[layerGroup].size += layerSize;
      stats.layerGroup[layerGroup].layerCount++;
    } else {
      stats.layerGroup[layerGroup] = {
        size: layerSize,
        layerCount: 1,
      };
    }
  }
  return stats;
}
