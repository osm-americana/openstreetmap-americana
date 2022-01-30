"use strict";

/**
 * Shield blanks which are drawn rather built from raster shield blanks
 */

import * as Gfx from "./screen_gfx.js";
import * as ShieldText from "./shield_text.js";

export const PXR = Gfx.getPixelRatio();

// Canvas size in pixels.  Used for width and height of square canvas.
const CS = 20 * PXR;

const minGenericShieldWidth = 20;
const maxGenericShieldWidth = 30;
const genericShieldFontSize = 18;

export function paBelt(ref) {
  var ctx = square();

  let lineWidth = 1 * PXR;
  let diameter = CS / 3 - lineWidth;
  ctx.beginPath();
  ctx.arc(CS / 2, CS / 2, diameter, 0, 2 * Math.PI, false);

  switch (ref) {
    case "Red Belt":
      ctx.fillStyle = "#b01c2e";
      break;
    case "Orange Belt":
      ctx.fillStyle = "#d97300";
      break;
    case "Yellow Belt":
      ctx.fillStyle = "#f7d117";
      break;
    case "Green Belt":
      ctx.fillStyle = "#006b54";
      break;
    case "Blue Belt":
      ctx.fillStyle = "#003882";
      break;
    default:
      return null;
  }
  ctx.fill();

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "black";
  ctx.stroke();
  return ctx;
}

export function ellipse(fill, outline, ref) {
  let shieldWidth =
    ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 4;

  let width = Math.max(
    minGenericShieldWidth,
    Math.min(maxGenericShieldWidth, shieldWidth)
  );

  let ctx = Gfx.getGfxContext({ width: width * PXR, height: CS });
  let lineWidth = 1 * PXR;
  let radiusX = (width * PXR) / 2 - lineWidth;
  let radiusY = CS / 2 - lineWidth;

  ctx.beginPath();

  ctx.ellipse(
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
    radiusX,
    radiusY,
    0,
    2 * Math.PI,
    false
  );

  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = outline;
  ctx.stroke();
  return ctx;
}

export function rectangle(ref) {
  var shieldWidth =
    ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 4;
  var width = Math.max(
    minGenericShieldWidth,
    Math.min(maxGenericShieldWidth, shieldWidth)
  );

  var ctx = Gfx.getGfxContext({ width: width * PXR, height: CS });
  let lineWidth = 1 * PXR;
  let rectHt = CS - lineWidth;
  let rectWd = width * PXR - lineWidth;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "black";
  ctx.strokeRect(lineWidth / 2, lineWidth / 2, rectWd, rectHt);
  ctx.fillStyle = "black";
  return ctx;
}
