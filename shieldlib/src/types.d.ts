import { StyleImage, StyleImageMetadata } from "maplibre-gl";
export interface RouteDefinition {
  network: string;
  ref: string;
  name: string;
}
export interface ShieldDefinition {
  spriteBlank: string[];
  textColor: string;
  padding: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}
export type StringPredicate = (spriteID: string) => boolean;
export interface RouteParser {
  parse(spriteID: string): RouteDefinition;
  format(network: string, ref: string, name: string): string;
}
export interface SpriteProducer {
  getSprite(spriteID: string): StyleImage;
}
export interface SpriteConsumer {
  putSprite(
    spriteID: string,
    image: ImageData,
    options: Partial<StyleImageMetadata>,
    update: boolean
  ): void;
}
export type SpriteRepository = SpriteProducer & SpriteConsumer;
export interface ShieldDefinitions {
  shield: {
    [key: string]: ShieldDefinition;
  };
}
export interface DebugOptions {}
export interface ShieldOptions {
  bannerTextColor: string;
  bannerTextHaloColor: string;
  shieldFont: string;
  shieldSize: number;
}
export interface ShieldSpecification {
  networks: ShieldDefinitions;
  options: ShieldOptions;
}
export type Bounds = {
  width: number;
  height: number;
};
export type GfxFactory = (bounds: Bounds) => CanvasRenderingContext2D;
export interface GraphicsFactory {
  createGraphics(bounds: Bounds): CanvasRenderingContext2D;
  /**
   * Get pixel ratio MapLibre is using for icons based on devicePixelRatio (DPR).
   * MapLibre uses 2x sprites whenever DPR > 1 and 1x sprites otherwise.
   * So this function will always return 1 or 2 as appropriate based on DPR.
   */
  pixelRatio(): number;
}

export interface Dimension {
  width: number;
  height: number;
}
