"use strict";

import * as Color from "../constants/color.js";
import * as ShieldDraw from "./shield_canvas_draw.js";

// Special case for Allegheny, PA Belt System, documented in CONTRIBUTE.md
export function paBelt(ctx, params) {
  ShieldDraw.roundedRectangle(ctx, {
    fillColor: Color.shields.white,
    strokeColor: Color.shields.black,
    outlineWidth: 1,
    radius: 2,
    rectWidth: 20,
  });

  let fillColor = params.fillColor;

  let lineWidth = 0.5 * ShieldDraw.PXR;
  let diameter = ShieldDraw.CS / 3 - lineWidth;
  ctx.beginPath();
  ctx.arc(
    ShieldDraw.CS / 2,
    ShieldDraw.CS / 2,
    diameter,
    0,
    2 * Math.PI,
    false
  );

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = params.strokeColor;
  ctx.fill();

  ctx.lineWidth = lineWidth;
  ctx.stroke();
  return ctx;
}

// Special case for Branson color-coded routes, documented in CONTRIBUTE.md
export function bransonRoute(ctx, params) {
  ShieldDraw.roundedRectangle(ctx, {
    fillColor: Color.shields.green,
    strokeColor: Color.shields.white,
    outlineWidth: 1,
    radius: 2,
    rectWidth: 20,
  });

  let fillColor = params.fillColor;

  let lineWidth = 0.5 * ShieldDraw.PXR;
  let x = 0.15 * ShieldDraw.CS + lineWidth;
  let width = 0.7 * ShieldDraw.CS - 2 * lineWidth;

  let y = 0.4 * ShieldDraw.CS + lineWidth;
  let height = 0.45 * ShieldDraw.CS - 2 * lineWidth;

  ctx.beginPath();
  ctx.rect(x, y, width, height);

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = params.strokeColor;
  ctx.fill();

  ctx.lineWidth = lineWidth;
  ctx.stroke();
  return ctx;
}

export function loadCustomShields() {
  ShieldDraw.registerDrawFunction("branson", bransonRoute);
  ShieldDraw.registerDrawFunction("paBelt", paBelt);
}
