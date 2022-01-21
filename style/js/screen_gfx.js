"use strict";

const fontFamily = '"sans-serif-condensed", "Arial Narrow", sans-serif';
export const shieldFont = (size) => `bold ${size}px ${fontFamily}`;
export const fontSizeThreshold = 105;

export function getGfxContext(bounds) {
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.canvas.width = bounds.width;
  ctx.canvas.height = bounds.height;
  return ctx;
}
