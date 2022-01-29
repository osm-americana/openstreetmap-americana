"use strict";

import * as Gfx from "./screen_gfx.js";
import * as ShieldDef from "./shield_defs.js";

const VerticalAlignment = {
  Middle: "middle",
  Top: "top",
  Bottom: "bottom",
};

export function ellipseTextConstraint(spaceBounds, textBounds) {
  var a = spaceBounds.height;
  var b = spaceBounds.width;

  var x0 = textBounds.width;
  var y0 = textBounds.height;

  return {
    scale: (a * b) / Math.sqrt(a * a * y0 * y0 + b * b * x0 * x0),
    valign: VerticalAlignment.Middle,
  };
}

export function rectTextConstraint(spaceBounds, textBounds) {
  var scaleHeight = spaceBounds.height / textBounds.height;
  var scaleWidth = spaceBounds.width / textBounds.width;

  return {
    scale: Math.min(scaleWidth, scaleHeight),
    valign: VerticalAlignment.Middle,
  };
}

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @param {*} textLayoutFunc - algorithm for text scaling
 * @param {*} maxFontSize - maximum font size
 * @returns JOSN object containing (X,Y) draw position and font size
 */
function layoutShieldText(text, padding, bounds, textLayoutFunc, maxFontSize) {
  const PXR = Gfx.getPixelRatio();

  var padTop = padding.top * PXR || 0;
  var padBot = padding.bottom * PXR || 0;
  var padLeft = padding.left * PXR || 0;
  var padRight = padding.right * PXR || 0;

  var maxFont = maxFontSize * PXR;
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

  var textConstraint = textLayoutFunc(
    { height: availHeight, width: availWidth },
    { height: textHeight, width: textWidth }
  );

  //If size-to-fill shield text is too big, shrink it
  var fontSize = Math.min(
    maxFont,
    Gfx.fontSizeThreshold * textConstraint.scale
  );

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

const defaultDefForLayout = {
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} text - text to draw
 * @param {*} def - shield definition
 * @param {*} bounds - size of the overall graphics area
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldTextFromDef(text, def, bounds) {
  if (def == null) {
    def = defaultDefForLayout;
  }

  var padding = def.padding || {};

  var textLayoutFunc = rectTextConstraint;
  var maxFontSize = 100; //By default, no max size

  if (typeof def.textLayoutConstraint != "undefined") {
    textLayoutFunc = def.textLayoutConstraint;
  }

  if (typeof def.maxFontSize != "undefined") {
    maxFontSize = def.maxFontSize;
  }

  return layoutShieldText(text, padding, bounds, textLayoutFunc, maxFontSize);
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
  var textLayout = layoutShieldTextFromDef(text, null, {
    width: ctx.canvas.width,
    height: ShieldDef.bannerSizeH,
  });

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
