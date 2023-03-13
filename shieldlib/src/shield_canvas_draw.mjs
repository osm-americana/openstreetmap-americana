"use strict";

/**
 * Shield blanks which are drawn rather built from raster shield blanks
 */

import * as ShieldText from "./shield_text.mjs";
import { loadCustomShields } from "./custom_shields.mjs";

const minGenericShieldWidth = 20;
const maxGenericShieldWidth = 34;
const genericShieldFontSize = 18;

export function computeWidth(r, params, ref, shape) {
  if (fixedWidthDefinitions[shape] !== undefined) {
    return r.px(fixedWidthDefinitions[shape]);
  }

  let rectWidth = params.rectWidth == undefined ? null : params.rectWidth;
  let angle = params.angle == undefined ? 0 : params.angle;
  let tangent = Math.tan(angle);

  if (rectWidth == null) {
    let shieldWidth =
      ShieldText.calculateTextWidth(r, ref, r.px(genericShieldFontSize)) +
      r.px(2);
    let minWidth = r.px(minGenericShieldWidth);

    //Shape-specific width adjustments
    switch (shape) {
      case "pentagon":
        let offset = params.offset == undefined ? 0 : params.offset;
        shieldWidth += ((r.shieldSize() - r.px(offset)) * tangent) / 2;
        break;
      case "trapezoid":
        shieldWidth += (r.shieldSize() * tangent) / 2;
        break;
      case "triangle":
        minWidth += r.px(2);
        break;
      case "diamond":
      case "hexagonHorizontal":
        minWidth += r.px(4);
        break;
    }

    return Math.max(
      minWidth,
      Math.min(r.px(maxGenericShieldWidth), shieldWidth)
    );
  } else {
    return r.px(rectWidth);
  }
}

function ellipse(r, ctx, params, ref) {
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;

  let width = computeWidth(r, params, ref);

  let lineWidth = r.px(1);
  let radiusX = width / 2 - lineWidth;
  let radiusY = r.shieldSize() / 2 - lineWidth;

  ctx.beginPath();

  ctx.ellipse(
    ctx.canvas.width / 2,
    r.shieldSize() / 2,
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

  return width;
}

export function blank(r, ref) {
  var shieldWidth =
    ShieldText.calculateTextWidth(r, ref, r.px(genericShieldFontSize)) +
    r.px(2);
  var width = Math.max(
    r.px(minGenericShieldWidth),
    Math.min(r.px(maxGenericShieldWidth), shieldWidth)
  );
  return r.gfxFactory.createGraphics({
    width: width,
    height: r.shieldSize(),
  });
}

export function roundedRectangle(r, ctx, params, ref) {
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let width = computeWidth(r, params, ref);

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);

  let x0 = lineWidth;
  let x1 = lineWidth + drawRadius;
  let x2 = width - lineWidth - drawRadius;
  let x3 = width - lineWidth;

  let y0 = lineWidth;
  let y1 = lineWidth + drawRadius;
  let y2 = r.shieldSize() - lineWidth - drawRadius;
  let y3 = r.shieldSize() - lineWidth;

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

  return width;
}

function escutcheon(r, ctx, params, ref) {
  let offset = params.offset == undefined ? 0 : params.offset;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let width = computeWidth(r, params, ref);

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);
  let drawOffset = r.px(offset);

  let x0 = lineWidth;
  let x5 = width - lineWidth;

  let y0 = lineWidth;
  let y5 = r.shieldSize() - lineWidth;

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

  return width;
}

function fishhead(r, ctx, params, ref) {
  let pointUp = params.pointUp == undefined ? false : params.pointUp;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let angleSign = pointUp ? -1 : 1;

  let width = computeWidth(r, params, ref);

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;

  let x0 = lineWidth;
  let x8 = width - lineWidth;

  let y0 = pointUp ? r.shieldSize() - lineWidth : lineWidth;
  let y6 = pointUp ? lineWidth : r.shieldSize() - lineWidth;

  let x1 = x0 + r.px(1);
  let x2 = x0 + r.px(2.5);
  let x4 = (x0 + x8) / 2;
  let x6 = x8 - r.px(2.5);
  let x7 = x8 - r.px(1);
  let y1 = y0 + angleSign * r.px(2);
  let y2 = y0 + angleSign * r.px(4.5);
  let y3 = y0 + angleSign * r.px(7);
  let y4 = y6 - angleSign * r.px(6);
  let y5 = y6 - angleSign * r.px(1);

  let x3 = (x0 + x4) / 2;
  let x5 = (x4 + x8) / 2;

  ctx.beginPath();
  ctx.moveTo(x4, y6);
  ctx.bezierCurveTo(x3, y5, x0, y4, x0, y3);
  ctx.bezierCurveTo(x0, y2, x1, y1, x2, y0);
  ctx.lineTo(x6, y0);
  ctx.bezierCurveTo(x7, y1, x8, y2, x8, y3);
  ctx.bezierCurveTo(x8, y4, x5, y5, x4, y6);
  ctx.closePath();

  ctx.lineWidth = lineThick;
  ctx.fillStyle = fill;
  ctx.fill();

  if (outline != null) {
    ctx.strokeStyle = outline;
    ctx.stroke();
  }
}

function triangle(r, ctx, params, ref) {
  let pointUp = params.pointUp == undefined ? false : params.pointUp;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let angleSign = pointUp ? -1 : 1;

  let width = computeWidth(r, params, ref, "triangle");

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);

  let x0 = lineWidth;
  let x8 = width - lineWidth;
  let y0 = pointUp ? r.shieldSize() - lineWidth : lineWidth;
  let y5 = pointUp ? lineWidth : r.shieldSize() - lineWidth;

  let x2 = x0 + drawRadius;
  let x4 = (x0 + x8) / 2;
  let x6 = x8 - drawRadius;
  let y1 = y0 + angleSign * drawRadius;

  let angle = Math.atan((x4 - x2) / Math.abs(y5 - drawRadius - y1));
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let halfTangent = Math.tan(angle / 2);
  let halfComplementTangent = Math.tan(Math.PI / 4 - angle / 2);

  let x1 = x2 - drawRadius * cosine;
  let x3 = x4 - drawRadius * halfComplementTangent;
  let x5 = x4 + drawRadius * halfComplementTangent;
  let x7 = x6 + drawRadius * cosine;
  let y2 = y1 + angleSign * drawRadius * halfTangent;
  let y3 = y1 + angleSign * drawRadius * sine;
  let y4 = y5 - angleSign * drawRadius * (1 - sine);

  ctx.beginPath();
  ctx.moveTo(x4, y5);
  ctx.arcTo(x3, y5, x1, y3, drawRadius);
  ctx.arcTo(x0, y2, x0, y1, drawRadius);
  ctx.arcTo(x0, y0, x2, y0, drawRadius);
  ctx.arcTo(x8, y0, x8, y1, drawRadius);
  ctx.arcTo(x8, y2, x7, y3, drawRadius);
  ctx.arcTo(x5, y5, x4, y5, drawRadius);
  ctx.closePath();

  ctx.lineWidth = lineThick;
  ctx.fillStyle = fill;
  ctx.fill();

  if (outline != null) {
    ctx.strokeStyle = outline;
    ctx.stroke();
  }

  return width;
}

function trapezoid(r, ctx, params, ref) {
  let shortSideUp =
    params.shortSideUp == undefined ? false : params.shortSideUp;
  let angle = params.angle == undefined ? 0 : params.angle;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;
  let angleSign = shortSideUp ? -1 : 1;

  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

  let width = computeWidth(r, params, ref, "trapezoid");

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);

  let x0 = lineWidth;
  let x9 = width - lineWidth;
  let y0 = shortSideUp ? r.shieldSize() - lineWidth : lineWidth;
  let y3 = shortSideUp ? lineWidth : r.shieldSize() - lineWidth;

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

  return width;
}

function diamond(r, ctx, params, ref) {
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let height = shapeHeight(r, "diamond");
  let width = computeWidth(r, params, ref, "diamond");

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);

  let x0 = lineWidth;
  let x8 = width - lineWidth;
  let y0 = lineWidth;
  let y8 = height - lineWidth;

  let x4 = (x0 + x8) / 2;
  let y4 = (y0 + y8) / 2;

  let angle = Math.atan((x4 - drawRadius - x0) / (y8 - drawRadius - y4));
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let halfTangent = Math.tan(angle / 2);
  let halfComplementTangent = Math.tan(Math.PI / 4 - angle / 2);

  let x1 = x0 + drawRadius * (1 - cosine);
  let x2 = x4 - drawRadius * cosine;
  let x3 = x4 - drawRadius * halfComplementTangent;
  let x5 = x4 + drawRadius * halfComplementTangent;
  let x6 = x4 + drawRadius * cosine;
  let x7 = x8 - drawRadius * (1 - cosine);

  let y1 = y0 + drawRadius * (1 - sine);
  let y2 = y4 - drawRadius * sine;
  let y3 = y4 - drawRadius * halfTangent;
  let y5 = y4 + drawRadius * halfTangent;
  let y6 = y4 + drawRadius * sine;
  let y7 = y8 - drawRadius * (1 - sine);

  ctx.beginPath();
  ctx.moveTo(x4, y8);
  ctx.arcTo(x3, y8, x1, y6, drawRadius);
  ctx.arcTo(x0, y5, x0, y4, drawRadius);
  ctx.arcTo(x0, y3, x2, y1, drawRadius);
  ctx.arcTo(x3, y0, x4, y0, drawRadius);
  ctx.arcTo(x5, y0, x7, y2, drawRadius);
  ctx.arcTo(x8, y3, x8, y4, drawRadius);
  ctx.arcTo(x8, y5, x6, y7, drawRadius);
  ctx.arcTo(x5, y8, x4, y8, drawRadius);
  ctx.closePath();

  ctx.lineWidth = lineThick;
  ctx.fillStyle = fill;
  ctx.fill();

  if (outline != null) {
    ctx.strokeStyle = outline;
    ctx.stroke();
  }
  return width;
}

function pentagon(r, ctx, params, ref) {
  let pointUp = params.pointUp == undefined ? true : params.pointUp;
  let offset = params.offset == undefined ? 0 : params.offset;
  let angle = params.angle == undefined ? 0 : params.angle;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius1 = params.radius1 == undefined ? 0 : params.radius1;
  let radius2 = params.radius2 == undefined ? 0 : params.radius2;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let angleSign = pointUp ? -1 : 1;
  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

  let width = computeWidth(r, params, ref, "pentagon");

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius1 = r.px(radius1);
  let drawRadius2 = r.px(radius2);
  let drawOffset = r.px(offset);

  let x0 = lineWidth;
  let x8 = width - lineWidth;
  let y0 = pointUp ? r.shieldSize() - lineWidth : lineWidth;
  let y3 = pointUp ? lineWidth : r.shieldSize() - lineWidth;

  let y2 = y3 - angleSign * drawOffset;

  let x2 = x0 + angleSign * (y2 - y0) * tangent;
  let x4 = (x0 + x8) / 2;
  let x6 = x8 - angleSign * (y2 - y0) * tangent;

  let offsetAngle = Math.atan(drawOffset / (x4 - x0));

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
  return width;
}

function hexagonVertical(r, ctx, params, ref) {
  let offset = params.offset == undefined ? 0 : params.offset;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let width = computeWidth(r, params, ref);

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);
  let drawOffset = r.px(offset);

  let x0 = lineWidth;
  let x2 = width - lineWidth;
  let y0 = lineWidth;
  let y5 = r.shieldSize() - lineWidth;

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
  return width;
}

function hexagonHorizontal(r, ctx, params, ref) {
  let angle = params.angle == undefined ? 0 : params.angle;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);
  let halfComplementTangent = Math.tan(Math.PI / 4 - angle / 2);

  let width = computeWidth(r, params, ref, "hexagonHorizontal");

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);

  let x0 = lineWidth;
  let x9 = width - lineWidth;
  let y0 = lineWidth;
  let y6 = r.shieldSize() - lineWidth;

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
  return width;
}

function octagonVertical(r, ctx, params, ref) {
  let offset = params.offset == undefined ? 0 : params.offset;
  let angle = params.angle == undefined ? 0 : params.angle;
  let fill = params.fillColor == undefined ? "white" : params.fillColor;
  let outline = params.strokeColor == undefined ? "black" : params.strokeColor;
  let radius = params.radius == undefined ? 0 : params.radius;
  let outlineWidth = params.outlineWidth == undefined ? 1 : params.outlineWidth;

  let sine = Math.sin(angle);
  let cosine = Math.cos(angle);
  let tangent = Math.tan(angle);

  let width = computeWidth(r, params, ref);

  let lineThick = r.px(outlineWidth);
  let lineWidth = lineThick / 2;
  let drawRadius = r.px(radius);
  let drawOffset = r.px(offset);

  let x0 = lineWidth;
  let x10 = width - lineWidth;
  let y0 = lineWidth;
  let y10 = r.shieldSize() - lineWidth;

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
  return width;
}

export function shapeHeight(r, name) {
  switch (name) {
    case "diamond":
      return r.shieldSize() + r.px(4);
    default:
      return r.shieldSize();
  }
}

export function draw(r, name, ctx, options, ref) {
  return drawFunctions[name](r, ctx, options, ref);
}

//Register draw functions
const drawFunctions = {};

//Register fixed width values
const fixedWidthDefinitions = {};

/**
 * Invoked by a style to implement a custom draw function
 *
 * @param {*} name name of the function as referenced by the shield definition
 * @param {*} fxn callback to the implementing function. Takes two parameters, ref and options
 * @param {*} fixedWidth if set, indicates that this function draws to a fixed width
 */
export function registerDrawFunction(name, fxn, fixedWidth) {
  drawFunctions[name] = fxn;
  if (fixedWidth !== undefined) {
    fixedWidthDefinitions[name] = fixedWidth;
  }
}

//Built-in draw functions (standard shapes)
registerDrawFunction("diamond", diamond);
registerDrawFunction("ellipse", ellipse);
registerDrawFunction("escutcheon", escutcheon);
registerDrawFunction("fishhead", fishhead);
registerDrawFunction("hexagonVertical", hexagonVertical);
registerDrawFunction("hexagonHorizontal", hexagonHorizontal);
registerDrawFunction("octagonVertical", octagonVertical);
registerDrawFunction("pentagon", pentagon);
registerDrawFunction("roundedRectangle", roundedRectangle);
registerDrawFunction("trapezoid", trapezoid);
registerDrawFunction("triangle", triangle);

//Built-in custom draw functions (weird stuff)
loadCustomShields();
