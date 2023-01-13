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

export function escutcheon(
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
  let x5 = width - lineWidth;

  let y0 = lineWidth;
  let y5 = CS - lineWidth;

  let x1 = x0 + drawRadius;
  let x3 = (x0 + x5) / 2;
  let y1 = y0 + drawRadius;
  let y2 = y5 - drawOffset;

  let x2 = (2 * x0 + x3) / 3;
  let x4 = (x3 + 2 * x5) / 3;
  let y3 = (y2 + y5) / 2;

  let y4 = (y3 + 2 * y5) / 3;

  ctx.beginPath();
  ctx.moveTo(x3, y5);
  ctx.bezierCurveTo(x2, y4, x0, y3, x0, y2);
  ctx.arcTo(x0, y0, x1, y0, drawRadius);
  ctx.arcTo(x5, y0, x5, y1, drawRadius);
  ctx.lineTo(x5, y2);
  ctx.bezierCurveTo(x5, y3, x4, y4, x3, y5);
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
  shortSideUp,
  angle,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  let angleSign = shortSideUp ? -1 : 1;
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) +
      2 * PXR +
      (CS * tangent) / 2;
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
  let x9 = width - lineWidth;
  let y0 = shortSideUp ? CS - lineWidth : lineWidth;
  let y3 = shortSideUp ? lineWidth : CS - lineWidth;

  let y1 = y0 + angleSign * drawRadius * (1 + sine);
  let y2 = y3 - angleSign * drawRadius * (1 - sine);

  let x1 = x0 + (y1 - y0) * tangent;
  let x2 = x1 + drawRadius * cosine;
  let x3 = x0 + angleSign * (y2 - y0) * tangent;
  let x4 = x0 + angleSign * (y3 - y0) * tangent;
  let x5 = x3 + angleSign * drawRadius * cosine;
  let x6 = width - x4;
  let x7 = width - x3;
  let x8 = width - x2;

  ctx.beginPath();
  ctx.moveTo(x8, y0);
  ctx.arcTo(x9, y0, x7, y2, drawRadius);
  ctx.arcTo(x6, y3, x5, y3, drawRadius);
  ctx.arcTo(x4, y3, x1, y1, drawRadius);
  ctx.arcTo(x0, y0, x8, y0, drawRadius);
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

export function pentagon(
  pointUp,
  offset,
  angle,
  fill,
  outline,
  ref,
  radius1,
  radius2,
  outlineWidth,
  rectWidth
) {
  let angleSign = pointUp ? -1 : 1;
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

  if (rectWidth == null) {
    var shieldWidth =
      ShieldText.calculateTextWidth(ref, genericShieldFontSize) +
      2 * PXR +
      ((CS - offset * PXR) * tangent) / 2;
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
  let drawRadius1 = radius1 * PXR;
  let drawRadius2 = radius2 * PXR;
  let drawOffset = offset * PXR;

  let x0 = lineWidth;
  let x8 = width - lineWidth;
  let y0 = pointUp ? CS - lineWidth : lineWidth;
  let y3 = pointUp ? lineWidth : CS - lineWidth;

  let y2 = y3 - angleSign * drawOffset;

  let x2 = x0 + angleSign * (y2 - y0) * tangent;
  let x4 = (x0 + x8) / 2;
  let x6 = x8 - angleSign * (y2 - y0) * tangent;

  let offsetAngle = Math.atan(drawOffset / (x4 - x0));
  let offsetSine = Math.sin(offsetAngle);
  let offsetCosine = Math.cos(offsetAngle);

  let halfComplementAngle1 = (Math.PI / 2 - offsetAngle + angle) / 2;
  let halfComplementTangent1 = Math.tan(halfComplementAngle1);

  let halfComplementAngle2 = (Math.PI / 2 - angle) / 2;
  let halfComplementTangent2 = Math.tan(halfComplementAngle2);

  let x1 = x0 + drawRadius1 * halfComplementTangent1 * sine;
  let x3 = x2 + drawRadius2 * halfComplementTangent2;
  let x5 = x6 - drawRadius2 * halfComplementTangent2;
  let x7 = x8 - drawRadius1 * halfComplementTangent1 * sine;
  let y1 = y2 - angleSign * drawRadius1 * halfComplementTangent1 * cosine;

  ctx.beginPath();
  ctx.moveTo(x4, y3);
  ctx.arcTo(x0, y2, x1, y1, drawRadius1);
  ctx.arcTo(x2, y0, x3, y0, drawRadius2);
  ctx.lineTo(x5, y0);
  ctx.arcTo(x6, y0, x7, y1, drawRadius2);
  ctx.arcTo(x8, y2, x4, y3, drawRadius1);
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
  let x2 = width - lineWidth;
  let y0 = lineWidth;
  let y5 = CS - lineWidth;

  let x1 = (x0 + x2) / 2;
  let y1 = y0 + drawOffset;
  let y4 = y5 - drawOffset;

  let drawOffsetTangent =
    drawRadius * Math.tan(Math.PI / 4 - Math.asin(drawOffset / (x1 - x0)) / 2);
  let y2 = y1 + drawOffsetTangent;
  let y3 = y4 - drawOffsetTangent;

  ctx.beginPath();
  ctx.moveTo(x1, y5);
  ctx.arcTo(x0, y4, x0, y3, drawRadius);
  ctx.arcTo(x0, y1, x1, y0, drawRadius);
  ctx.lineTo(x1, y0);
  ctx.arcTo(x2, y1, x2, y2, drawRadius);
  ctx.arcTo(x2, y4, x1, y5, drawRadius);
  ctx.lineTo(x1, y5);
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
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);
  let halfComplementTangent = Math.tan(Math.PI / 4 - angle / 2);

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

export function octagonVertical(
  offset,
  angle,
  fill,
  outline,
  ref,
  radius,
  outlineWidth,
  rectWidth
) {
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

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
  let x10 = width - lineWidth;
  let y0 = lineWidth;
  let y10 = CS - lineWidth;

  let x1 = x0 + drawRadius * tangent * sine;
  let x5 = (x0 + x10) / 2;
  let x9 = x10 - drawRadius * tangent * sine;
  let y2 = y0 + drawOffset;
  let y5 = (y0 + y10) / 2;
  let y8 = y10 - drawOffset;

  let x3 = x0 + (y5 - y2) * tangent;
  let x7 = x10 - (y5 - y2) * tangent;
  let y4 = y5 - drawRadius * tangent * cosine;
  let y6 = y5 + drawRadius * tangent * cosine;

  let offsetAngle = Math.atan(drawOffset / (x5 - x3));
  let offsetSine = Math.sin(offsetAngle);
  let offsetCosine = Math.cos(offsetAngle);

  let halfComplementAngle = (Math.PI / 2 - angle - offsetAngle) / 2;
  let halfComplementCosine = Math.cos(halfComplementAngle);

  let dx =
    (drawRadius * Math.cos(angle + halfComplementAngle)) / halfComplementCosine;
  let dy =
    (drawRadius * Math.sin(angle + halfComplementAngle)) / halfComplementCosine;

  let x2 = x3 + dx - drawRadius * cosine;
  let x4 = x3 + dx - drawRadius * offsetSine;
  let x6 = x7 - dx + drawRadius * offsetSine;
  let x8 = x7 - dx + drawRadius * cosine;
  let y1 = y2 + dy - drawRadius * offsetCosine;
  let y3 = y2 + dy - drawRadius * sine;
  let y7 = y8 - dy + drawRadius * sine;
  let y9 = y8 - dy + drawRadius * offsetCosine;

  ctx.beginPath();
  ctx.moveTo(x5, y10);
  ctx.arcTo(x3, y8, x2, y7, drawRadius);
  ctx.arcTo(x0, y5, x1, y4, drawRadius);
  ctx.arcTo(x3, y2, x4, y1, drawRadius);
  ctx.lineTo(x5, y0);
  ctx.arcTo(x7, y2, x8, y3, drawRadius);
  ctx.arcTo(x10, y5, x9, y6, drawRadius);
  ctx.arcTo(x7, y8, x6, y9, drawRadius);
  ctx.lineTo(x5, y10);
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
