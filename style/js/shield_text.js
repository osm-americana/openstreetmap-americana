"use strict";

import * as Gfx from "./screen_gfx.js";
import * as ShieldDef from "./shield_defs.js";

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldText(text, padding, bounds) {
  var padding = padding || {};
  var padTop = padding.top || 0;
  var padBot = padding.bottom || 0;
  var padLeft = padding.left || 0;
  var padRight = padding.right || 0;

  //Temporary canvas for text measurment
  var ctx = Gfx.getGfxContext(bounds);

  ctx.font = Gfx.shieldFont(Gfx.fontSizeThreshold);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var metrics = ctx.measureText(text);

  var width = bounds.width;
  var height = bounds.height;

  var textWidth = metrics.width;
  var textHeight = metrics.actualBoundingBoxDescent;

  var availHeight = height - padTop - padBot;
  var availWidth = width - padLeft - padRight;

  var xBaseline = padLeft + availWidth / 2;

  var scaleHeight = availHeight / textHeight;
  var scaleWidth = availWidth / textWidth;

  var scale = Math.min(scaleWidth, scaleHeight);

  var fontSize = Math.min(Gfx.fontSizeMax, Gfx.fontSizeThreshold * scale);

  ctx.font = Gfx.shieldFont(fontSize);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  metrics = ctx.measureText(text);
  textHeight = metrics.actualBoundingBoxDescent;

  var scaledHeight = textHeight * scale;

  var yBaseline = padTop + (availHeight - scaledHeight) / 2;

  return {
    xBaseline: xBaseline,
    yBaseline: yBaseline,
    fontPx: fontSize * scale,
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
    { width: ctx.canvas.width, height: ShieldDef.bannerSizeH }
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
