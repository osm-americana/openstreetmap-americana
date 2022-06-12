"use strict";

module.exports = {
  multipass: true,
  js2svg: {
    indent: 1,
    pretty: true,
  },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // disable plugins that cause problems with spritezero
          convertPathData: false,
        },
      },
    },
  ],
};
