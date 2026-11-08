import { createCanvas } from "canvas";

/**
 * Headless canvas factory for Node scripts/tests.
 *
 * Kept local because exporting this from
 * `@americana/maplibre-shield-generator`'s main entry pulls `canvas` into
 * browser bundles. Prefer importing from the package once it exposes a
 * dedicated Node entry point.
 */
export class HeadlessGraphicsFactory {
  private _type?: "pdf" | "svg";
  constructor(type?: "pdf" | "svg") {
    this._type = type;
  }
  createGraphics(bounds: { width: number; height: number }) {
    let canvas = this._type
      ? createCanvas(bounds.width, bounds.height, this._type)
      : createCanvas(bounds.width, bounds.height);
    let ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    return ctx as unknown as CanvasRenderingContext2D;
  }
  pixelRatio(): number {
    return 1;
  }
}
