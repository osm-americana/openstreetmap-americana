"use strict";

import * as Gfx from "./screen_gfx.js";
import { ShieldRenderingContext } from "./shield_renderer.js";
import {
  BoxPadding,
  Dimension,
  ShieldDefinition,
  TextLayout,
  TextLayoutParameters,
} from "./types.js";

const VerticalAlignment = {
  Middle: "middle",
  Top: "top",
  Bottom: "bottom",
} as const;

type VerticalAlignmentType =
  (typeof VerticalAlignment)[keyof typeof VerticalAlignment];

type TextLayoutScaler = (
  availSize: Dimension,
  textSize: Dimension,
  options?: TextLayoutParameters
) => TextTransform;

interface TextTransform {
  scale: number;
  valign: VerticalAlignmentType;
}

export interface TextPlacement {
  xBaseline: number;
  yBaseline: number;
  fontPx: number;
}

let noPadding: BoxPadding = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

function ellipseScale(spaceBounds: Dimension, textBounds: Dimension): number {
  //Math derived from https://mathworld.wolfram.com/Ellipse-LineIntersection.html
  var a = spaceBounds.width;
  var b = spaceBounds.height;

  var x0 = textBounds.width;
  var y0 = textBounds.height;

  return (a * b) / Math.sqrt(a * a * y0 * y0 + b * b * x0 * x0);
}

function ellipseTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension
): TextTransform {
  return {
    scale: ellipseScale(spaceBounds, textBounds),
    valign: VerticalAlignment.Middle,
  };
}

function southHalfEllipseTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension
): TextTransform {
  return {
    scale: ellipseScale(spaceBounds, {
      //Turn ellipse 90 degrees
      height: textBounds.width / 2,
      width: textBounds.height,
    }),
    valign: VerticalAlignment.Top,
  };
}

function rectTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension
): TextTransform {
  var scaleHeight = spaceBounds.height / textBounds.height;
  var scaleWidth = spaceBounds.width / textBounds.width;

  return {
    scale: Math.min(scaleWidth, scaleHeight),
    valign: VerticalAlignment.Middle,
  };
}

function roundedRectTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension,
  options: TextLayoutParameters
): TextTransform {
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

function diamondTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension
): TextTransform {
  let a = spaceBounds.width;
  let b = spaceBounds.height;

  let x0 = textBounds.width;
  let y0 = textBounds.height;

  return {
    scale: (a * b) / (b * x0 + a * y0),
    valign: VerticalAlignment.Middle,
  };
}

function triangleDownTextConstraint(
  spaceBounds: Dimension,
  textBounds: Dimension
): TextTransform {
  return {
    scale: diamondTextConstraint(spaceBounds, textBounds).scale,
    valign: VerticalAlignment.Top,
  };
}

// Warning!!! Hack!!!
function isRunningInWebKit(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const userAgent = window.navigator.userAgent;
  return /WebKit/i.test(userAgent) && !/Chrome/i.test(userAgent);
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
export function layoutShieldText(
  r: ShieldRenderingContext,
  text: string,
  padding: BoxPadding,
  bounds: Dimension,
  textLayoutDef: TextLayout,
  maxFontSize: number = 14
): TextPlacement {
  let padTop = r.px(padding.top) || 0;
  let padBot = r.px(padding.bottom) || 0;
  let padLeft = r.px(padding.left) || 0;
  let padRight = r.px(padding.right) || 0;

  let maxFont = r.px(maxFontSize);
  //Temporary canvas for text measurment
  let ctx: CanvasRenderingContext2D = r.gfxFactory.createGraphics(bounds);

  ctx.font = Gfx.shieldFont(Gfx.fontSizeThreshold, r.options.shieldFont);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  let metrics: TextMetrics = ctx.measureText(text);

  let textWidth: number =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight);
  let textHeight: number =
    Math.abs(metrics.actualBoundingBoxDescent) +
    Math.abs(metrics.actualBoundingBoxAscent);

  //Adjust for excess descender text height across browsers
  textHeight *= 0.9;

  //Adjust for excess text height measured in Webkit engine specifically
  if (isRunningInWebKit()) {
    textHeight *= 0.54;
  }

  let availHeight: number = bounds.height - padTop - padBot;
  let availWidth: number = bounds.width - padLeft - padRight;

  let xBaseline: number = padLeft + availWidth / 2;

  let textLayoutFunc = drawTextFunctions[textLayoutDef.constraintFunc];

  let spaceAvail: Dimension = { height: availHeight, width: availWidth };
  let measuredTextBounds: Dimension = { height: textHeight, width: textWidth };

  let textConstraint: TextTransform = textLayoutFunc(
    spaceAvail,
    measuredTextBounds,
    textLayoutDef.options
  );

  //If size-to-fill shield text is too big, shrink it
  var fontSize = Math.min(
    maxFont,
    Gfx.fontSizeThreshold * textConstraint.scale
  );

  ctx.font = Gfx.shieldFont(fontSize, r.options.shieldFont);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  metrics = ctx.measureText(text);
  textHeight =
    Math.abs(metrics.actualBoundingBoxDescent) +
    Math.abs(metrics.actualBoundingBoxAscent);

  let yBaseline: number;

  switch (textConstraint.valign) {
    case VerticalAlignment.Top:
      yBaseline = padTop + metrics.actualBoundingBoxAscent;
      break;
    case VerticalAlignment.Bottom:
      yBaseline =
        padTop + availHeight - textHeight + metrics.actualBoundingBoxAscent;
      break;
    case VerticalAlignment.Middle:
    default:
      yBaseline = padTop + (availHeight - textHeight) / 2;
      break;
  }

  return {
    xBaseline,
    yBaseline,
    fontPx: fontSize,
  };
}

const defaultDefForLayout: Partial<ShieldDefinition> = {
  padding: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  shapeBlank: {
    drawFunc: "rect",
    params: {
      fillColor: "white",
      strokeColor: "black",
    },
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
export function layoutShieldTextFromDef(
  r: ShieldRenderingContext,
  text: string,
  def: Partial<ShieldDefinition>,
  bounds: Dimension
): TextPlacement {
  //FIX
  if (def == null) {
    def = defaultDefForLayout;
  }

  var padding = def.padding || noPadding;

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
export function renderShieldText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  textLayout: TextPlacement
): void {
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
export function drawShieldHaloText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  textLayout: TextPlacement
): void {
  //Stroke color is set by strokeStyle
  configureShieldText(r, ctx, textLayout);

  ctx.shadowColor = ctx.strokeStyle.toString();
  ctx.shadowBlur = 0;
  ctx.lineWidth = r.px(2);

  ctx.strokeText(text, textLayout.xBaseline, textLayout.yBaseline);
  ctx.shadowColor = null;
  ctx.shadowBlur = null;
}

function configureShieldText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  textLayout: TextPlacement
): void {
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = Gfx.shieldFont(textLayout.fontPx, r.options.shieldFont);
}

export function calculateTextWidth(
  r: ShieldRenderingContext,
  text: string,
  fontSize: number
): number {
  var ctx = r.emptySprite(); //dummy canvas
  ctx.font = Gfx.shieldFont(fontSize, r.options.shieldFont);
  return Math.ceil(ctx.measureText(text).width);
}

//Register text draw functions
const drawTextFunctions = {};

/**
 * Invoked by a style to implement a custom draw function
 *
 * @param {*} name name of the function as referenced by the shield definition
 * @param {*} fxn callback to the implementing function. Takes two parameters, ref and options
 */
function registerDrawTextFunction(name: string, fxn: TextLayoutScaler): void {
  drawTextFunctions[name] = fxn;
}

//Built-in draw functions (standard shapes)
registerDrawTextFunction("diamond", diamondTextConstraint);
registerDrawTextFunction("ellipse", ellipseTextConstraint);
registerDrawTextFunction("rect", rectTextConstraint);
registerDrawTextFunction("roundedRect", roundedRectTextConstraint);
registerDrawTextFunction("southHalfEllipse", southHalfEllipseTextConstraint);
registerDrawTextFunction("triangleDown", triangleDownTextConstraint);
