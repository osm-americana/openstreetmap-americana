"use strict";

/**
 * Shield blanks which are drawn rather built from raster shield blanks
 */

import * as Color from "../constants/color.js";
import * as Gfx from "./screen_gfx.js";
import * as ShieldText from "./shield_text.js";

export const PXR = Gfx.getPixelRatio();

// Canvas size in pixels. Length of smallest dimension (typically height)
const CS = 20 * PXR;

const minGenericShieldWidth = 20 * PXR;
const maxGenericShieldWidth = 34 * PXR;
const genericShieldFontSize = 18 * PXR;

// Special case for Allegheny, PA Belt System, documented in CONTRIBUTE.md
export function paBelt(fillColor, strokeColor) {
  var ctx = square();

  let lineWidth = 0.5 * PXR;
  let diameter = CS / 3 - lineWidth;
  ctx.beginPath();
  ctx.arc(CS / 2, CS / 2, diameter, 0, 2 * Math.PI, false);

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.fill();

  ctx.lineWidth = lineWidth;
  ctx.stroke();
  return ctx;
}

export function ellipse(fill, outline, ref, rectWidth) {
  let shieldWidth =
    ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;

  let width = rectWidth
    ? rectWidth * PXR
    : Math.max(
        minGenericShieldWidth,
        Math.min(maxGenericShieldWidth, shieldWidth)
      );

  let ctx = Gfx.getGfxContext({ width: width, height: CS });
  let lineWidth = PXR;
  let radiusX = width / 2 - lineWidth;
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

function square() {
  return rectangle("");
}

export function rectangle(ref) {
  return roundedRectangle(
    Color.shields.white,
    Color.shields.black,
    ref,
    2,
    1,
    null
  );
}

export function blank() {
  return Gfx.getGfxContext({ width: 1, height: 1 });
}

export function roundedRectangle(
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 5 * PXR;
    var width = Math.max(
      minGenericShieldWidth,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }
  width = Math.ceil(width);

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;

  let x0 = lineWidth;
  let x1 = lineWidth + drawRadius;
  let x2 = width - lineWidth - drawRadius;
  let x3 = width - lineWidth;

  let y0 = lineWidth;
  let y1 = lineWidth + radius;
  let y2 = CS - lineWidth - drawRadius;
  let y3 = CS - lineWidth;

  ctx.beginPath();
  ctx.moveTo(x2, y0);
  ctx.arcTo(x3, y0, x3, y1, drawRadius);
  ctx.arcTo(x3, y3, x2, y3, drawRadius);
  ctx.arcTo(x0, y3, x0, y2, drawRadius);
  ctx.arcTo(x0, y0, x1, y0, drawRadius);
  ctx.closePath();

  ctx.lineWidth = lineThick;
  ctx.fillStyle = fill;
  ctx.fill();

  if (outline != null) {
    ctx.strokeStyle = outline;
    ctx.stroke();
  }

  return ctx;
}
