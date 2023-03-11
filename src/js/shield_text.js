"use strict";

import * as Color from "../constants/color.js";
import * as Gfx from "./screen_gfx.js";
import * as ShieldDef from "./shield_defs.js";

export const PXR = Gfx.getPixelRatio();

function ellipseScale(spaceBounds, textBounds) {
  //Math derived from https://mathworld.wolfram.com/Ellipse-LineIntersection.html
  var a = spaceBounds.width;
  var b = spaceBounds.height;

  var x0 = textBounds.width;
  var y0 = textBounds.height;

  return (a * b) / Math.sqrt(a * a * y0 * y0 + b * b * x0 * x0);
}

function ellipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, textBounds),
  };
}

function southHalfEllipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, {
      //Turn ellipse 90 degrees
      height: textBounds.width / 2,
      width: textBounds.height,
    }),
  };
}

function rectTextConstraint(spaceBounds, textBounds) {
  var scaleHeight = spaceBounds.height / textBounds.height;
  var scaleWidth = spaceBounds.width / textBounds.width;

  return {
    scale: Math.min(scaleWidth, scaleHeight),
  };
}

function roundedRectTextConstraint(spaceBounds, textBounds, options) {
  //Shrink space bounds so that corners hit the arcs
  let constraintRadius = 2;
  if (options !== undefined && options.radius !== undefined) {
    constraintRadius = options.radius;
  }

  return rectTextConstraint(
    {
      width: spaceBounds.width - constraintRadius * (2 - Math.sqrt(2)),
      height: spaceBounds.height - constraintRadius * (2 - Math.sqrt(2)),
    },
    textBounds
  );
}

function emHeightForFontSize(fontSize) {
  return (fontSize * 3) / 4;
}

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @param {*} textLayoutDef - algorithm definition for text scaling
 * @param {*} maxFontSize - maximum font size
 * @returns JOSN object containing (X,Y) draw position and font size
 */
function layoutShieldText(text, padding, bounds, textLayoutDef, maxFontSize) {
  const PXR = Gfx.getPixelRatio();

  var padTop = padding.top * PXR || 0;
  var padBot = padding.bottom * PXR || 0;
  var padLeft = padding.left * PXR || 0;
  var padRight = padding.right * PXR || 0;

  var maxFont = maxFontSize * PXR;
  var fontSize = Gfx.fontSizeThreshold;

  var textWidth = calculateTextWidth(text, fontSize);
  var textHeight = emHeightForFontSize(fontSize);

  var availHeight = bounds.height - padTop - padBot;
  var availWidth = bounds.width - padLeft - padRight;

  var xBaseline = padLeft + availWidth / 2;

  let textLayoutFunc = drawTextFunctions[textLayoutDef.constraintFunc];

  let textConstraint = textLayoutFunc(
    { height: availHeight, width: availWidth },
    { height: textHeight, width: textWidth },
    textLayoutDef.options
  );

  //If size-to-fill shield text is too big, shrink it
  fontSize = Math.min(maxFont, Gfx.fontSizeThreshold * textConstraint.scale);
  textHeight = emHeightForFontSize(fontSize);

  // some browsers, but not others, round off the `y` parameter of `ctx.fillText`, so do it manually for consistency
  var yBaseline = Math.round(
    padTop + (availHeight - textHeight) / 2 + textHeight
  );

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

  var textLayoutDef = {
    constraintFunc: "rect",
  };

  var maxFontSize = 14; // default max size

  if (typeof def.textLayout != "undefined") {
    textLayoutDef = def.textLayout;
  }

  if (typeof def.maxFontSize != "undefined") {
    maxFontSize = Math.min(maxFontSize, def.maxFontSize); // shield definition cannot set max size higher than default
  }

  return layoutShieldText(text, padding, bounds, textLayoutDef, maxFontSize);
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
  ctx.textBaseline = "alphabetic";
  ctx.font = Gfx.shieldFont(textLayout.fontPx);

  ctx.fillText(text, textLayout.xBaseline, textLayout.yBaseline);
}

/**
 * Draw drop shadow for text on a shield
 *
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} textLayout - location to draw text
 */
export function drawShieldHaloText(ctx, text, textLayout) {
  //Stroke color is set by strokeStyle
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = Gfx.shieldFont(textLayout.fontPx);

  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2 * PXR;

  ctx.strokeText(text, textLayout.xBaseline, textLayout.yBaseline);
  ctx.shadowColor = null;
  ctx.shadowBlur = null;
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
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";

  ctx.fillText(
    text,
    textLayout.xBaseline,
    textLayout.yBaseline +
      bannerIndex * ShieldDef.bannerSizeH -
      ShieldDef.bannerPadding
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

  (ctx.shadowColor = Color.backgroundFill), (ctx.strokeStyle = ctx.shadowColor);
  ctx.font = Gfx.shieldFont(textLayout.fontPx);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2 * PXR;

  ctx.strokeText(
    text,
    textLayout.xBaseline,
    textLayout.yBaseline +
      bannerIndex * ShieldDef.bannerSizeH -
      ShieldDef.bannerPadding
  );
  ctx.shadowColor = null;
  ctx.shadowBlur = null;
}

export function calculateTextWidth(text, fontSize) {
  var ctx = Gfx.getGfxContext({ width: 1, height: 1 }); //dummy canvas
  ctx.font = Gfx.shieldFont(fontSize);
  return Math.ceil(ctx.measureText(text).width);
}

export function drawText(name, options, ref) {
  return drawTextFunctions[name](options, ref);
}

//Register text draw functions
const drawTextFunctions = {};

/**
 * Invoked by a style to implement a custom draw function
 *
 * @param {*} name name of the function as referenced by the shield definition
 * @param {*} fxn callback to the implementing function. Takes two parameters, ref and options
 */
function registerDrawTextFunction(name, fxn) {
  drawTextFunctions[name] = fxn;
}

//Built-in draw functions (standard shapes)
registerDrawTextFunction("ellipse", ellipseTextConstraint);
registerDrawTextFunction("rect", rectTextConstraint);
registerDrawTextFunction("roundedRect", roundedRectTextConstraint);
registerDrawTextFunction("southHalfEllipse", southHalfEllipseTextConstraint);
