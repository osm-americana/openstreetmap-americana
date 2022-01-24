"use strict";

/**
 * Shield blanks which are drawn rather built from raster shield blanks
 */

import * as Gfx from "./screen_gfx.js";

export const PXR = Gfx.getPixelRatio();

// Canvas size in pixels.  Used for width and height of square canvas.
const CS = 20 * PXR

var squareBounds = { width: CS, height: CS };


export function paBelt(ref) {
  var ctx = square();

  let lineWidth = 1 * PXR
  let diameter = CS/3 - lineWidth
  ctx.beginPath();
  ctx.arc(CS/2, CS/2, diameter, 0, 2 * Math.PI, false);

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

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "black";
  ctx.stroke();
  return ctx;
}

export function circle(fill, outline) {
  var ctx = Gfx.getGfxContext(squareBounds);
  let lineWidth = 1 * PXR
  let diameter = CS/2 - lineWidth
  ctx.beginPath();
  ctx.arc(CS/2, CS/2, diameter, 0, 2 * Math.PI, false);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = outline;
  ctx.stroke(); 
  return ctx;
}

export function square() {
  var ctx = Gfx.getGfxContext(squareBounds);
  let lineWidth = 1 * PXR
  let rectSize = CS - lineWidth
  ctx.fillStyle = "white";
  ctx.fillRect(lineWidth/2, lineWidth/2, rectSize, rectSize);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "black";
  ctx.strokeRect(lineWidth/2, lineWidth/2, rectSize, rectSize);
  ctx.fillStyle = "black";
  return ctx;
}
