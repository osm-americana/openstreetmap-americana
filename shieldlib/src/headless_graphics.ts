import { Bounds, GraphicsFactory } from "./types";
import { createCanvas } from "canvas";

export class HeadlessGraphicsFactory implements GraphicsFactory {
  private _type: "pdf" | "svg";
  constructor(type: "pdf" | "svg") {
    this._type = type;
  }
  createGraphics(bounds: Bounds): CanvasRenderingContext2D {
    let canvas = createCanvas(bounds.width, bounds.height, this._type);
    let ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    return ctx as any as CanvasRenderingContext2D;
  }
  pixelRatio(): number {
    return 1;
  }
}
