export const hillshading = {
  id: "hillshading",
  type: "hillshade",
  source: "dem",
  paint: {
    "hillshade-exaggeration": [
      "interpolate",
      ["linear"],
      ["zoom"],
      12,
      0.5,
      17,
      0.1,
    ],
    "hillshade-shadow-color": "hsla(30, 14%, 76%, 1)",
    "hillshade-highlight-color": "hsla(30, 44%, 99%, 1)",
  },
};
