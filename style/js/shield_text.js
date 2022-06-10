"use strict";

import * as Gfx from "./screen_gfx.js";
import * as ShieldDef from "./shield_defs.js";

export const PXR = Gfx.getPixelRatio();

const VerticalAlignment = {
  Middle: "middle",
  Top: "top",
  Bottom: "bottom",
};

function ellipseScale(spaceBounds, textBounds) {
  //Math derived from https://mathworld.wolfram.com/Ellipse-LineIntersection.html
  var a = spaceBounds.width;
  var b = spaceBounds.height;

  var x0 = textBounds.width;
  var y0 = textBounds.height;

  return (a * b) / Math.sqrt(a * a * y0 * y0 + b * b * x0 * x0);
}

export function ellipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, textBounds),
    valign: VerticalAlignment.Middle,
  };
}

export function southHalfellipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, {
      //Turn ellipse 90 degrees
      height: textBounds.width / 2,
      width: textBounds.height,
    }),
    valign: VerticalAlignment.Top,
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

export function roundedRectTextConstraint(spaceBounds, textBounds, radius) {
  if (radius < 8) {
    //Shrink space bounds so that corners hit the arcs
    return rectTextConstraint(
      {
        width: spaceBounds.width - radius * (2 - Math.sqrt(2)),
        height: spaceBounds.height - radius * (2 - Math.sqrt(2)),
      },
      textBounds
    );
  } else {
    return ellipseTextConstraint(spaceBounds, textBounds);
  }
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

  var yBaseline;

  switch (textConstraint.valign) {
    case VerticalAlignment.Top:
      yBaseline = padTop;
      break;
    case VerticalAlignment.Bottom:
      yBaseline = padTop + availHeight - textHeight;
      break;
    case VerticalAlignment.Middle:
    default:
      yBaseline = padTop + (availHeight - textHeight) / 2;
      break;
  }

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
  var maxFontSize = 14; // default max size

  if (typeof def.textLayoutConstraint != "undefined") {
    textLayoutFunc = def.textLayoutConstraint;
  }

  if (typeof def.maxFontSize != "undefined") {
    maxFontSize = Math.min(maxFontSize, def.maxFontSize); // shield definition cannot set max size higher than default
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
    height: ShieldDef.bannerSizeH - ShieldDef.bannerPadding,
  });

  ctx.fillStyle = "black";

  ctx.font = Gfx.shieldFont(textLayout.fontPx);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";

  ctx.fillText(
    text,
    textLayout.xBaseline,
    textLayout.yBaseline +
      bannerIndex * ShieldDef.bannerSizeH -
      ShieldDef.bannerPadding +
      ShieldDef.topPadding
  );
}

/**
 * Draw drop shadow for text on a modifier plate above a shield
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerHaloText(ctx, text, bannerIndex) {
  var textLayout = layoutShieldTextFromDef(text, null, {
    width: ctx.canvas.width,
    height: ShieldDef.bannerSizeH - ShieldDef.bannerPadding,
  });

  ctx.shadowColor = "rgba(250, 246, 242, 1)";
  ctx.strokeStyle = ctx.shadowColor;
  ctx.font = Gfx.shieldFont(textLayout.fontPx);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2 * PXR;

  ctx.strokeText(
    text,
    textLayout.xBaseline,
    textLayout.yBaseline +
      bannerIndex * ShieldDef.bannerSizeH -
      ShieldDef.bannerPadding +
      ShieldDef.topPadding
  );
  ctx.shadowColor = null;
  ctx.shadowBlur = null;
}

export function calculateTextWidth(text, fontSize) {
  var ctx = Gfx.getGfxContext({ width: 1, height: 1 }); //dummy canvas
  ctx.font = Gfx.shieldFont(fontSize);
  return ctx.measureText(text).width;
}
