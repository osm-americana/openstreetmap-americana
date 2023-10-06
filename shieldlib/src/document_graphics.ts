import { Bounds, GraphicsFactory } from "./types";

/**
 * Get the Maplibre pixel reation being used in this browser. This determines
 * which sprite sheet is used and whether or not to double dimensions on graphics draws.
 * @returns Returns either 1 or 2 for "1x" or "2x+" displays.
 */
export function getDOMPixelRatio(): 1 | 2 {
  return (typeof window !== "undefined" && window.devicePixelRatio) > 1 ? 2 : 1;
}

export class DOMGraphicsFactory implements GraphicsFactory {
  createGraphics(bounds: Bounds): CanvasRenderingContext2D {
    var ctx = document.createElement("canvas").getContext("2d");
    var ctx = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingQuality = "high";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.canvas.width = bounds.width;
    ctx.canvas.height = bounds.height;
    return ctx;
  }
  pixelRatio(): number {
    return getDOMPixelRatio();
  }
}
