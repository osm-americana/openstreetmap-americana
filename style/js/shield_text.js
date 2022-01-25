"use strict";

import * as Gfx from "./screen_gfx.js";
import * as ShieldDef from "./shield_defs.js";

export function ellipseTextConstraint(spaceBounds, textBounds) {
  var a = spaceBounds.height;
  var b = spaceBounds.width;

  var x0 = textBounds.width;
  var y0 = textBounds.height;

  return (a * b) / Math.sqrt(a * a * y0 * y0 + b * b * x0 * x0);
}

export function rectTextConstraint(spaceBounds, textBounds) {
  var scaleHeight = spaceBounds.height / textBounds.height;
  var scaleWidth = spaceBounds.width / textBounds.width;

  return Math.min(scaleWidth, scaleHeight);
}

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @param {*} textLayoutFunc - algorithm for text scaling
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldText(text, padding, bounds, textLayoutFunc) {
  const PXR = Gfx.getPixelRatio();
  var padding = padding || {};
  var padTop = padding.top * PXR || 0;
  var padBot = padding.bottom * PXR || 0;
  var padLeft = padding.left * PXR || 0;
  var padRight = padding.right * PXR || 0;

  //Temporary canvas for text measurment
  var ctx = Gfx.getGfxContext(bounds);

  ctx.font = Gfx.shieldFont(Gfx.fontSizeThreshold);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var metrics = ctx.measureText(text);

  var textWidth = metrics.width;
  var textHeight = metrics.actualBoundingBoxDescent;

  var availHeight = bounds.height - padTop - padBot;
  var availWidth = bounds.width - padLeft - padRight;

  var xBaseline = padLeft + availWidth / 2;

  var scale = textLayoutFunc(
    { height: availHeight, width: availWidth },
    { height: textHeight, width: textWidth }
  );

  var fontSize = Gfx.fontSizeThreshold * scale;

  ctx.font = Gfx.shieldFont(fontSize);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  metrics = ctx.measureText(text);
  textHeight = metrics.actualBoundingBoxDescent;

  var yBaseline = padTop + (availHeight - textHeight) / 2;

  return {
    xBaseline: xBaseline,
    yBaseline: yBaseline,
    fontPx: fontSize,
  };
}

/**
 * Draw text on a shield
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} textLayout - location to draw text
 */
export function drawShieldText(ctx, text, textLayout) {
  //Text color is set by fillStyle
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = Gfx.shieldFont(textLayout.fontPx);

  ctx.fillText(text, textLayout.xBaseline, textLayout.yBaseline);
}

/**
 * Draw text on a modifier plate above a shield
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerText(ctx, text, bannerIndex) {
  var textLayout = layoutShieldText(
    text,
    {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    { width: ctx.canvas.width, height: ShieldDef.bannerSizeH },
    rectTextConstraint
  );

  ctx.textBaseline = "top";
  ctx.font = Gfx.shieldFont(textLayout.fontPx);
  ctx.shadowColor = "white";
  ctx.shadowBlur = 10;

  ctx.fillText(
    text,
    textLayout.xBaseline,
    textLayout.yBaseline + bannerIndex * ShieldDef.bannerSizeH
  );
}
