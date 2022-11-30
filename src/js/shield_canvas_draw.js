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

// Special case for Branson color-coded routes, documented in CONTRIBUTE.md
export function bransonRoute(fillColor, strokeColor) {
  var ctx = roundedRectangle(
    Color.shields.green,
    Color.shields.white,
    "",
    2,
    1
  );

  let lineWidth = 0.5 * PXR;
  let x = 0.15 * CS + lineWidth;
  let width = 0.7 * CS - 2 * lineWidth;

  let y = 0.4 * CS + lineWidth;
  let height = 0.45 * CS - 2 * lineWidth;

  ctx.beginPath();
  ctx.rect(x, y, width, height);

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

export function blank(ref) {
  var shieldWidth =
    ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
  var width = Math.max(
    minGenericShieldWidth,
    Math.min(maxGenericShieldWidth, shieldWidth)
  );
  return Gfx.getGfxContext({ width: width, height: CS });
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
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
    var width = Math.max(
      minGenericShieldWidth,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;

  let x0 = lineWidth;
  let x1 = lineWidth + drawRadius;
  let x2 = width - lineWidth - drawRadius;
  let x3 = width - lineWidth;

  let y0 = lineWidth;
  let y1 = lineWidth + drawRadius;
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

export function trapezoid(
  angle,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  let angleSign = Math.sign(angle);
  let sine = Math.sin(Math.abs(angleInRadians));
  let cosine = Math.cos(angleInRadians);
  let tangent = Math.tan(angleInRadians);

  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) +
      (2 + (CS * sine) / 2) * PXR;
    var width = Math.max(
      minGenericShieldWidth,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;

  let x0 = lineWidth;
  let x11 = width - lineWidth;
  let y0 = angle > 0 ? lineWidth : CS - lineWidth;
  let y3 = angle > 0 ? CS - lineWidth : lineWidth;

  let y1 = y0 + angleSign * drawRadius * (1 + sine);
  let y2 = y3 - angleSign * drawRadius * (1 - sine);

  let x1 = x0 + (y1 - y0) * tangent;
  let x2 = x1 + drawRadius * cosine;
  let x3 = x0 + (y2 - y0) * tangent;
  let x4 = x0 + (y3 - y0) * tangent;
  let x5 = x3 + drawRadius * cosine;
  // let x6 = width - x5;
  let x7 = width - x4;
  let x8 = width - x3;
  let x9 = width - x2;
  // let x10 = width - x1;

  ctx.beginPath();
  ctx.moveTo(x9, y0);
  ctx.arcTo(x11, y0, x8, y2, drawRadius);
  ctx.arcTo(x7, y3, x5, y3, drawRadius);
  ctx.arcTo(x4, y3, x1, y1, drawRadius);
  ctx.arcTo(x0, y0, x9, y0, drawRadius);
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

export function diamond(fill, outline, ref, radius, outlineWidth, rectWidth) {
  let extraSpace = 4 * PXR;
  let height = CS + extraSpace;

  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
    var width = Math.max(
      minGenericShieldWidth + extraSpace,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: height });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;

  let x0 = lineWidth;
  let x6 = width - lineWidth;
  let y0 = lineWidth;
  let y6 = height - lineWidth;

  let x3 = (x0 + x6) / 2;
  let y3 = (y0 + y6) / 2;

  let angle = Math.atan((y6 - y0) / (x6 - x0));
  let xInnerOffset = drawRadius * Math.sin(angle);
  let yInnerOffset = drawRadius * Math.cos(angle);
  let xOuterOffset = yInnerOffset / Math.tan(angle);
  let yOuterOffset = xInnerOffset * Math.tan(angle);

  let x1 = x0 + xOuterOffset;
  let x2 = x3 - xInnerOffset;
  let x4 = x3 + xInnerOffset;
  let x5 = x6 - xOuterOffset;

  let y1 = y0 + yOuterOffset;
  let y2 = y3 - yInnerOffset;
  let y4 = y3 + yInnerOffset;
  let y5 = y6 - yOuterOffset;

  ctx.beginPath();
  ctx.moveTo(x1, y2);
  ctx.arcTo(x3, y0, x4, y1, drawRadius);
  ctx.arcTo(x6, y3, x5, y4, drawRadius);
  ctx.arcTo(x3, y6, x2, y5, drawRadius);
  ctx.arcTo(x0, y3, x1, y2, drawRadius);
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

export function homePlate(
  offset,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
    var width = Math.max(
      minGenericShieldWidth,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;
  let drawOffset = Math.abs(offset) * PXR;

  let x0 = lineWidth;
  let x4 = width - lineWidth;
  let y0 = lineWidth;
  let y4 = CS - lineWidth;

  let x1 = x0 + drawRadius;
  let x2 = (x0 + x4) / 2;
  let x3 = x4 - drawRadius;
  let y1 = y0 + drawRadius;
  let y3 = y4 - drawOffset;

  let drawOffsetTangent =
    drawRadius * Math.tan(Math.PI / 4 - Math.asin(drawOffset / (x2 - x0)) / 2);
  let y2 = y3 - drawOffsetTangent;

  if (offset < 0) {
    y0 = CS - y0;
    y1 = CS - y1;
    y2 = CS - y2;
    y3 = CS - y3;
    y4 = CS - y4;
  }

  ctx.beginPath();
  ctx.moveTo(x2, y4);
  ctx.arcTo(x0, y3, x0, y2, drawRadius);
  ctx.arcTo(x0, y0, x1, y0, drawRadius);
  ctx.lineTo(x3, y0);
  ctx.arcTo(x4, y0, x4, y2, drawRadius);
  ctx.arcTo(x4, y3, x2, y4, drawRadius);
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

export function hexagonVertical(
  offset,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
    var width = Math.max(
      minGenericShieldWidth,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;
  let drawOffset = offset * PXR;

  let x0 = lineWidth;
  let x4 = width - lineWidth;
  let y0 = lineWidth;
  let y5 = CS - lineWidth;

  let x1 = x0 + drawRadius;
  let x2 = (x0 + x4) / 2;
  let x3 = x4 - drawRadius;
  let y1 = y0 + drawOffset;
  let y4 = y5 - drawOffset;

  let drawOffsetTangent =
    drawRadius * Math.tan(Math.PI / 4 - Math.asin(drawOffset / (x2 - x0)) / 2);
  let y2 = y1 + drawOffsetTangent;
  let y3 = y4 - drawOffsetTangent;

  ctx.beginPath();
  ctx.moveTo(x2, y5);
  ctx.arcTo(x0, y4, x0, y3, drawRadius);
  ctx.arcTo(x0, y1, x2, y0, drawRadius);
  ctx.lineTo(x2, y0);
  ctx.arcTo(x4, y1, x4, y2, drawRadius);
  ctx.arcTo(x4, y4, x2, y5, drawRadius);
  ctx.lineTo(x2, y5);
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

export function hexagonHorizontal(
  angle,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  let angleInRadians = (angle * Math.PI) / 180;
  let angleSign = Math.sign(angle);
  let sine = Math.sin(Math.abs(angleInRadians));
  let cosine = Math.cos(angleInRadians);
  let tangent = Math.tan(angleInRadians);
  let halfComplementTangent = Math.tan(Math.PI / 4 - angleInRadians / 2);

  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) + 2 * PXR;
    var width = Math.max(
      minGenericShieldWidth + 4 * PXR,
      Math.min(maxGenericShieldWidth, shieldWidth)
    );
  } else {
    var width = rectWidth * PXR;
  }

  var ctx = Gfx.getGfxContext({ width: width, height: CS });

  let lineThick = outlineWidth * PXR;
  let lineWidth = lineThick / 2;
  let drawRadius = radius * PXR;

  let x0 = lineWidth;
  let x9 = width - lineWidth;
  let y0 = lineWidth;
  let y6 = CS - lineWidth;

  let y3 = (y0 + y6) / 2;

  let y1 = y0 + drawRadius * halfComplementTangent * cosine;
  let y2 = y3 - drawRadius * sine;
  let y4 = y3 + drawRadius * sine;
  let y5 = y6 - drawRadius * halfComplementTangent * cosine;

  let x1 = x0 + (y3 - y2) * tangent;
  let x3 = x0 + (y3 - y0) * tangent;
  let x6 = x9 - (y3 - y0) * tangent;
  let x8 = x9 - (y3 - y2) * tangent;

  let x2 = x3 - drawRadius * halfComplementTangent * sine;
  let x4 = x3 + drawRadius * halfComplementTangent;
  let x5 = x6 - drawRadius * halfComplementTangent;
  let x7 = x6 + drawRadius * halfComplementTangent * sine;

  ctx.beginPath();
  ctx.moveTo(x4, y0);
  ctx.arcTo(x6, y0, x7, y1, drawRadius);
  ctx.arcTo(x9, y3, x8, y4, drawRadius);
  ctx.arcTo(x6, y6, x5, y6, drawRadius);
  ctx.arcTo(x3, y6, x2, y5, drawRadius);
  ctx.arcTo(x0, y3, x1, y2, drawRadius);
  ctx.arcTo(x3, y0, x4, y0, drawRadius);
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
