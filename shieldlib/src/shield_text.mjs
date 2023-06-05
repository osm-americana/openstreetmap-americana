"use strict";

import * as Gfx from "./screen_gfx.js";

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

function ellipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, textBounds),
    valign: VerticalAlignment.Middle,
  };
}

function southHalfEllipseTextConstraint(spaceBounds, textBounds) {
  return {
    scale: ellipseScale(spaceBounds, {
      //Turn ellipse 90 degrees
      height: textBounds.width / 2,
      width: textBounds.height,
    }),
    valign: VerticalAlignment.Top,
  };
}

function rectTextConstraint(spaceBounds, textBounds) {
  var scaleHeight = spaceBounds.height / textBounds.height;
  var scaleWidth = spaceBounds.width / textBounds.width;

  return {
    scale: Math.min(scaleWidth, scaleHeight),
    valign: VerticalAlignment.Middle,
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

function diamondTextConstraint(spaceBounds, textBounds) {
  let a = spaceBounds.width;
  let b = spaceBounds.height;

  let x0 = textBounds.width;
  let y0 = textBounds.height;

  return {
    scale: (a * b) / (b * x0 + a * y0),
    valign: VerticalAlignment.Middle,
  };
}

function triangleDownTextConstraint(spaceBounds, textBounds) {
  return {
    scale: diamondTextConstraint(spaceBounds, textBounds).scale,
    valign: VerticalAlignment.Top,
  };
}

/**
 * Determines the position and font size to draw text so that it fits within
 * a bounding box.
 *
 * @param {*} r - rendering context
 * @param {*} text - text to draw
 * @param {*} padding - top/bottom/left/right padding around text
 * @param {*} bounds - size of the overall graphics area
 * @param {*} textLayoutDef - algorithm definition for text scaling
 * @param {*} maxFontSize - maximum font size
 * @returns JOSN object containing (X,Y) draw position and font size
 */
function layoutShieldText(
  r,
  text,
  padding,
  bounds,
  textLayoutDef,
  maxFontSize
) {
  var padTop = r.px(padding.top) || 0;
  var padBot = r.px(padding.bottom) || 0;
  var padLeft = r.px(padding.left) || 0;
  var padRight = r.px(padding.right) || 0;

  var maxFont = r.px(maxFontSize);
  //Temporary canvas for text measurment
  var ctx = r.gfxFactory.createGraphics(bounds);

  ctx.font = Gfx.shieldFont(Gfx.fontSizeThreshold, r.options.shieldFont);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var metrics = ctx.measureText(text);

  var textWidth = metrics.width;
  var textHeight = metrics.actualBoundingBoxDescent;

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
  var fontSize = Math.min(
    maxFont,
    Gfx.fontSizeThreshold * textConstraint.scale
  );

  ctx.font = Gfx.shieldFont(fontSize, r.options.shieldFont);
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
 * @param {*} r - rendering context
 * @param {*} text - text to draw
 * @param {*} def - shield definition
 * @param {*} bounds - size of the overall graphics area
 * @returns JOSN object containing (X,Y) draw position and font size
 */
export function layoutShieldTextFromDef(r, text, def, bounds) {
  //FIX
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

  return layoutShieldText(r, text, padding, bounds, textLayoutDef, maxFontSize);
}

/**
 * Draw text on a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} textLayout - location to draw text
 */
export function renderShieldText(r, ctx, text, textLayout) {
  //Text color is set by fillStyle
  configureShieldText(r, ctx, textLayout);

  ctx.fillText(text, textLayout.xBaseline, textLayout.yBaseline);
}

/**
 * Draw drop shadow for text on a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} textLayout - location to draw text
 */
export function drawShieldHaloText(r, ctx, text, textLayout) {
  //Stroke color is set by strokeStyle
  configureShieldText(r, ctx, textLayout);

  ctx.shadowColor = ctx.strokeStyle;
  ctx.shadowBlur = 0;
  ctx.lineWidth = r.px(2);

  ctx.strokeText(text, textLayout.xBaseline, textLayout.yBaseline);
  ctx.shadowColor = null;
  ctx.shadowBlur = null;
}

function configureShieldText(r, ctx, textLayout) {
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = Gfx.shieldFont(textLayout.fontPx, r.options.shieldFont);
}

/**
 * Draw text on a modifier plate above a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerText(r, ctx, text, bannerIndex) {
  drawBannerTextComponent(r, ctx, text, bannerIndex, true);
}

/**
 * Draw drop shadow for text on a modifier plate above a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerHaloText(r, ctx, text, bannerIndex) {
  drawBannerTextComponent(r, ctx, text, bannerIndex, false);
}

/**
 * Banners are composed of two components: text on top, and a shadow beneath.
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 * @param {*} textComponent - if true, draw the text.  If false, draw the halo
 */
function drawBannerTextComponent(r, ctx, text, bannerIndex, textComponent) {
  const bannerPadding = {
    padding: {
      top: r.options.bannerPadding,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  var textLayout = layoutShieldTextFromDef(r, text, bannerPadding, {
    width: ctx.canvas.width,
    height: r.px(r.options.bannerHeight - r.options.bannerPadding),
  });

  ctx.font = Gfx.shieldFont(textLayout.fontPx, r.options.shieldFont);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";

  if (textComponent) {
    ctx.fillStyle = r.options.bannerTextColor;
    ctx.fillText(
      text,
      textLayout.xBaseline,
      textLayout.yBaseline +
        bannerIndex * r.px(r.options.bannerHeight - r.options.bannerPadding)
    );
  } else {
    ctx.strokeStyle = ctx.shadowColor = r.options.bannerTextHaloColor;
    ctx.shadowBlur = 0;
    ctx.lineWidth = r.px(2);
    ctx.strokeText(
      text,
      textLayout.xBaseline,
      textLayout.yBaseline +
        bannerIndex * r.px(r.options.bannerHeight - r.options.bannerPadding)
    );

    ctx.shadowColor = null;
    ctx.shadowBlur = null;
  }
}

export function calculateTextWidth(r, text, fontSize) {
  var ctx = r.emptySprite(); //dummy canvas
  ctx.font = Gfx.shieldFont(fontSize, r.options.shieldFont);
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
registerDrawTextFunction("diamond", diamondTextConstraint);
registerDrawTextFunction("ellipse", ellipseTextConstraint);
registerDrawTextFunction("rect", rectTextConstraint);
registerDrawTextFunction("roundedRect", roundedRectTextConstraint);
registerDrawTextFunction("southHalfEllipse", southHalfEllipseTextConstraint);
registerDrawTextFunction("triangleDown", triangleDownTextConstraint);
