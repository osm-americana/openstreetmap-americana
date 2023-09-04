import { StyleImage } from "maplibre-gl";

/**
 * Defines the set of routes that a shield applies to
 */
export interface RouteDefinition {
  /**
   * Only match routes with this network value
   */
  network: string;

  /**
   * If set, only match routes with this ref value
   */
  ref?: string;

  /**
   * If set, only match routes with this name value
   */
  name?: string;
}

/**
 * Enforce a requirement that one field OR another field must be specified, but not both.
 */
export type Exclusive<T, U> =
  | (T & { [P in keyof U]?: never })
  | (U & { [P in keyof T]?: never });

/**
 * Parameters that apply to all types of shield definitions
 */
export interface ShieldDefinitionBase {
  textColor?: string;
  padding?: BoxPadding;
  textLayout?: TextLayout;
  banners?: string[];
  notext?: boolean;
}

/**
 * Define how the renderer should draw the shield for a particular route
 */
export type ShieldDefinition = Exclusive<
  { spriteBlank: string[] },
  { shapeBlank: ShapeDefinition }
> &
  ShieldDefinitionBase;

/**
 * Define a shield which is created by drawing a shape, optionally with text on top
 */
export interface ShapeDefinition {
  drawFunc: string;
  params: ShapeBlankParams;
}

/**
 * Rectangular padding values
 */
export interface BoxPadding {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Parameters for drawing shield shapes
 */
export interface ShapeBlankParams {
  fillColor: string;
  strokeColor: string;
  rectWidth?: number;
  radius?: number;
  radius1?: number;
  radius2?: number;
  offset?: number;
  outlineWidth?: number;
  pointUp?: boolean;
  shortSideUp?: boolean;
  angle?: number;
}

/**
 * Parameters for laying out text on a shield background
 */
export interface TextLayout {
  constraintFunc: string;
  options?: {
    radius: number;
  };
}

/**
 * A predicate which determines whether to draw a shield for a particular sprite ID.
 * This allows the library to consume a subset of sprite IDs passed in from maplibre
 * while allowing other code to handle other sprite IDs.
 */
export type StringPredicate = (spriteID: string) => boolean;

/**
 * RouteParser unpacks a route definition from a sprite image string.
 */
export interface RouteParser {
  parse(spriteID: string): RouteDefinition;
  format(network: string, ref: string, name: string): string;
}

/**
 * Retrieve a sprite graphic based on an ID.
 */
export interface SpriteProducer {
  getSprite(spriteID: string): StyleImage;
}

/**
 * Store a sprite graphic based on an ID.
 */
export interface SpriteConsumer {
  putSprite(spriteID: string, image: ImageData, pixelRatio: number): void;
}

/**
 * Respository that can store and retrieve sprite graphics.
 */
export type SpriteRepository = SpriteProducer & SpriteConsumer;

/**
 * A map of shield definitions that associates a network name to its rendering
 */
export interface ShieldDefinitions {
  shield: {
    [key: string]: ShieldDefinition;
  };
}

export interface DebugOptions {}

/**
 * Global options for shield rendering
 */
export interface ShieldOptions {
  bannerHeight: number;
  bannerPadding: number;
  bannerTextColor: string;
  bannerTextHaloColor: string;
  shieldFont: string;
  shieldSize: number;
}

/**
 * A user-supplied specification for rendering shields
 */
export interface ShieldSpecification {
  networks: ShieldDefinitions;
  options: ShieldOptions;
}

/**
 * Rectangular bounds, in scaled pixels
 */
export type Bounds = {
  width: number;
  height: number;
};

export interface GraphicsFactory {
  createGraphics(bounds: Bounds): CanvasRenderingContext2D;
  /**
   * Get pixel ratio MapLibre is using for icons based on devicePixelRatio (DPR).
   * MapLibre uses 2x sprites whenever DPR > 1 and 1x sprites otherwise.
   * So this function will always return 1 or 2 as appropriate based on DPR.
   */
  pixelRatio(): number;
}
