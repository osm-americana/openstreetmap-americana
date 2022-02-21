"use strict";

const fontFamily = '"sans-serif-condensed", "Arial Narrow", sans-serif';
export const shieldFont = (size) => `bold ${size}px ${fontFamily}`;
export const fontSizeThreshold = 12;

export function getGfxContext(bounds) {
  var ctx = document.createElement("canvas").getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.canvas.width = bounds.width;
  ctx.canvas.height = bounds.height;
  return ctx;
}

/**
 * Get pixel ratio MapLibre is using for icons based on devicePixelRatio (DPR).
 * MapLibre uses 2x sprites whenever DPR > 1 and 1x sprites otherwise.
 * So this function will always return 1 or 2 as appropriate based on DPR.
 */
export function getPixelRatio() {
  return (typeof window !== "undefined" && window.devicePixelRatio) > 1 ? 2 : 1;
}
