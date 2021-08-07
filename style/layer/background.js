/*
  Background Layer

  This is the base color of the map.
*/
var layerBackground = {
  id: "background",
  type: "background",
  paint: {
    "background-color": {
      stops: [
        [6, "rgba(253, 251, 242, 1)"],
        [10, "rgba(253, 251, 242, 1)"],
        [14, "rgba(250, 246, 242, 1)"],
        [15, "rgba(250, 246, 242, 1)"],
      ],
    },
  },
  layout: { visibility: "visible" },
};
