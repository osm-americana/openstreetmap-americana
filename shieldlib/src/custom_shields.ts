"use strict";

import * as ShieldDraw from "./shield_canvas_draw";
import { ShieldRenderingContext } from "./shield_renderer";
import { ShapeBlankParams } from "./types";

// Special case for Allegheny, PA Belt System
export function paBelt(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  params: ShapeBlankParams
): number {
  ShieldDraw.roundedRectangle(r, ctx, {
    fillColor: "white",
    strokeColor: "black",
    outlineWidth: 1,
    radius: 2,
    rectWidth: 20,
  });

  let fillColor = params.fillColor;

  let lineWidth = r.px(0.5);
  let diameter = r.shieldSize() / 3 - lineWidth;
  ctx.beginPath();
  ctx.arc(
    r.shieldSize() / 2,
    r.shieldSize() / 2,
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
  return 20;
}

// Special case for Branson color-coded routes
export function bransonRoute(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  params: ShapeBlankParams
): number {
  ShieldDraw.roundedRectangle(r, ctx, {
    fillColor: "#006747",
    strokeColor: "white",
    outlineWidth: 1,
    radius: 2,
    rectWidth: 20,
  });

  let fillColor = params.fillColor;

  let lineWidth = r.px(0.5);
  let x = 0.15 * r.shieldSize() + lineWidth;
  let width = 0.7 * r.shieldSize() - 2 * lineWidth;

  let y = 0.4 * r.shieldSize() + lineWidth;
  let height = 0.45 * r.shieldSize() - 2 * lineWidth;

  ctx.beginPath();
  ctx.rect(x, y, width, height);

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = params.strokeColor;
  ctx.fill();

  ctx.lineWidth = lineWidth;
  ctx.stroke();
  return 20;
}

export function loadCustomShields() {
  ShieldDraw.registerDrawFunction("branson", bransonRoute, 20);
  ShieldDraw.registerDrawFunction("paBelt", paBelt, 20);
}
