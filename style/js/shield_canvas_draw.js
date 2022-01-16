"use strict";

/**
 * Shield blanks which are drawn rather built from raster shield blanks
 */

import * as Gfx from "./screen_gfx.js";

var squareBounds = { width: 80, height: 80 };

export function paBelt(ref) {
  var ctx = Gfx.getGfxContext(squareBounds);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 80, 80);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, 80, 80);

  ctx.beginPath();
  ctx.arc(40, 40, 22, 0, 2 * Math.PI, false);

  switch (ref) {
    case "Red Belt":
      ctx.fillStyle = "#b01c2e";
      break;
    case "Orange Belt":
      ctx.fillStyle = "#d97300";
      break;
    case "Yellow Belt":
      ctx.fillStyle = "#f7d117";
      break;
    case "Green Belt":
      ctx.fillStyle = "#006b54";
      break;
    case "Blue Belt":
      ctx.fillStyle = "#003882";
      break;
    default:
      return null;
  }

  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.stroke();
  return ctx;
}

export function circle(fill, outline) {
  var ctx = Gfx.getGfxContext(squareBounds);
  ctx.beginPath();
  ctx.arc(40, 40, 37.5, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.lineWidth = 5;
  ctx.strokeStyle = outline;
  ctx.stroke();
  return ctx;
}

export function square() {
  var ctx = Gfx.getGfxContext(squareBounds);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 80, 80);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, 80, 80);
  ctx.fillStyle = "black";
  return ctx;
}
