"use strict";

import * as Gfx from "./screen_gfx.js";

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldTextBbox(ctx, text, padding, bounds) {
  var padding = padding || {};
  var padTop = padding.top || 0;
  var padBot = padding.bottom || 0;
  var padLeft = padding.left || 0;
  var padRight = padding.right || 0;

  ctx.font = "bold " + Gfx.fontSizeThreshold + Gfx.fontSizeType + " sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  var metrics = ctx.measureText(text);

  var width = bounds.width;
  var height = bounds.height;

  var textWidth = metrics.width;
  var textHeight = metrics.actualBoundingBoxAscent;

  var availHeight = height - padTop - padBot;
  var availWidth = width - padLeft - padRight;

  var xBaseline = padLeft + availWidth / 2;

  var scaleHeight = availHeight / textHeight;
  var scaleWidth = availWidth / textWidth;

  var scale = Math.min(scaleWidth, scaleHeight);

  var fontSize = Math.min(Gfx.fontSizeMax, Gfx.fontSizeThreshold * scale);

  ctx.font = "bold " + fontSize + Gfx.fontSizeType + " sans-serif";
  metrics = ctx.measureText(text);
  textHeight = metrics.actualBoundingBoxAscent;
  var marginY = (height - padTop - padBot - textHeight) / 2;

  return {
    xBaseline: xBaseline,
    yBaseline: ctx.canvas.height - padBot - marginY,
    fontPx: fontSize * scale,
  };
}

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.  The bounding box is based on the height/width of the
 * graphics context and within the specified padding.
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldText(ctx, text, padding) {
  return layoutShieldTextBbox(ctx, text, padding, {
    width: ctx.canvas.width,
    height: ctx.canvas.height,
  });
}
