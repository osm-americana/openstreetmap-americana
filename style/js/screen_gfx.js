"use strict";

export const spriteUpscale = window.devicePixelRatio > 1 ? 1 : 2;

export const fontSizeType = "px";
export const fontSizeThreshold = 48;
export const fontSizeMax = 48;

export function setCanvasWidth(ctx, dimensions) {
  ctx.canvas.width = dimensions.width * spriteUpscale;
  ctx.canvas.height = dimensions.height * spriteUpscale;
}
