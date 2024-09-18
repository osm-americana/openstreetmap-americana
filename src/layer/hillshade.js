export const hillshading = {
  id: "hillshading",
  type: "hillshade",
  source: "dem",
  paint: {
    "hillshade-exaggeration": [
      "interpolate",
      ["linear"],
      ["zoom"],
      3,
      0.2,
      12,
      0.5,
    ],
    "hillshade-shadow-color": "rgba(102,85,51,1)",
    "hillshade-highlight-color": "rgba(255,255,204,1)",
    "hillshade-accent-color": "rgba(0,0,0,1)",
  },
};
