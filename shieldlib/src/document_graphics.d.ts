import { Bounds, GraphicsFactory } from "./types";
/**
 * Get the Maplibre pixel reation being used in this browser. This determines
 * which sprite sheet is used and whether or not to double dimensions on graphics draws.
 * @returns Returns either 1 or 2 for "1x" or "2x+" displays.
 */
export declare function getDOMPixelRatio(): 1 | 2;
export declare class DOMGraphicsFactory implements GraphicsFactory {
  createGraphics(bounds: Bounds): CanvasRenderingContext2D;
  pixelRatio(): number;
}
