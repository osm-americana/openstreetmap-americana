import { StyleImage, StyleImageMetadata } from "maplibre-gl";

/** Defines the set of routes that a shield applies to */
export interface RouteDefinition {
  /** Only match routes with this network value */
  network: string;
  /** If set, only match routes with this ref value */
  ref?: string;
  /** If set, only match routes with this name value */
  name?: string;
}

/** Enforce a requirement that one field OR another field must be specified, but not both */
export type Exclusive<T, U> =
  | (T & { [P in keyof U]?: never })
  | (U & { [P in keyof T]?: never });

/** Parameters that apply to all types of shield definitions */
export interface ShieldDefinitionBase {
  /** Color of text drawn on a shield */
  textColor?: string;
  /** Color of banner text */
  bannerTextColor?: string;
  /** Color of banner text halo */
  bannerTextHaloColor?: string;
  /** Padding around shield text */
  padding?: BoxPadding;
  /** Algorithm for expanding text to fill a shield background */
  textLayout?: TextLayout;
  /** Banners to be drawn above a shield */
  banners?: string[];
  /** If true, no next should be drawn on this shield */
  notext?: boolean;
  /** Maximum size of shield text */
  maxFontSize?: number;
}

/**
 * Define how the renderer should draw the shield for various routes
 *
 * @example
 * const shieldsDefinition = {
 *     "US:I": {
 *         textColor: Color.shields.white,
 *         spriteBlank: ["shield_us_interstate_2", "shield_us_interstate_3"],
 *         textLayout: textConstraint("southHalfEllipse"),
 *         padding: {
 *             left: 4,
 *             right: 4,
 *             top: 6,
 *             bottom: 5,
 *         }
 *     };
 */
export type ShieldDefinition = Exclusive<
  { spriteBlank: string[] },
  { shapeBlank: ShapeDefinition }
> &
  ShieldDefinitionBase;

/** Define a shield which is created by drawing a shape, optionally with text on top */
export interface ShapeDefinition {
  /** Which shape to draw */
  drawFunc: string;
  /** Parameters for drawing the shape */
  params: ShapeBlankParams;
}

/** Rectangular padding values */
export interface BoxPadding {
  /** Minimum padding to the left of the text */
  left: number;
  /** Minimum padding to the right of the text */
  right: number;
  /** Minimum padding above the text */
  top: number;
  /** Minimum padding below the text */
  bottom: number;
}

/** Parameters for drawing shield shapes */
export interface ShapeBlankParams {
  /** Fill color of the shape */
  fillColor: string;
  /** Stroke (border) color */
  strokeColor: string;
  /** Width of the shape */
  rectWidth?: number;
  /** Radius of the shape's corners */
  radius?: number;
  /** Radius of the shape's first corner. This is used for shapes that can specify multiple radius values */
  radius1?: number;
  /** Radius of the shape's second corner. This is used for shapes that can specify multiple radius values */
  radius2?: number;
  /** Distance from top or bottom edge to vertices. Higher number means pointier top and/or bottom */
  yOffset?: number;
  /** Width of the shape's outline */
  outlineWidth?: number;
  /** Specify whether the pointy end of the shape is on top */
  pointUp?: boolean;
  /** Specify whether the short side of the shape is on top */
  shortSideUp?: boolean;
  /** Specify the angle at which the sides of the shape deviate from vertical. Higher number means pointier sides */
  sideAngle?: number;
}

/** Definition for laying out text on a shield background */
export interface TextLayout {
  constraintFunc: string;
  options?: TextLayoutParameters;
}

/** Options for text layout on a shield */
export interface TextLayoutParameters {
  radius: number;
}

/**
 * A predicate which determines whether to draw a shield for a particular sprite ID.
 * This allows the library to consume a subset of sprite IDs passed in from maplibre
 * while allowing other code to handle other sprite IDs.
 */
export type StringPredicate = (spriteID: string) => boolean;

/** RouteParser unpacks a route definition from a sprite image string */
export interface RouteParser {
  parse(spriteID: string): RouteDefinition;
  format(network: string, ref: string, name: string): string;
}

/** Retrieve a sprite graphic based on an ID */
export interface SpriteProducer {
  getSprite(spriteID: string): StyleImage;
}

/** Store a sprite graphic based on an ID */
export interface SpriteConsumer {
  putSprite(
    spriteID: string,
    image: ImageData,
    options: StyleImageMetadata,
    update: boolean
  ): void;
}

/** Respository that can store and retrieve sprite graphics */
export type SpriteRepository = SpriteProducer & SpriteConsumer;

/** Map of shield definitions that associates a network name to its rendering */
export interface ShieldDefinitions {
  shield: {
    [key: string]: ShieldDefinition;
  };
}

/** Additional debugging-only options */
export interface DebugOptions {
  /** If set, draw a colored box around shield text constraint */
  shieldTextBboxColor?: string;
}

/** Global options for shield rendering */
export interface ShieldOptions {
  /** Height of each specified banner above the shield */
  bannerHeight: number;
  /** Padding between each banner */
  bannerPadding: number;
  /** Color of text on the banner */
  bannerTextColor: string;
  /** Color of halo on text on the banner */
  bannerTextHaloColor: string;
  /** Browser font for banner text */
  shieldFont: string;
  /** Default shield size in pixels at 1x */
  shieldSize: number;
}

/**
 * A user-supplied specification for rendering shields
 *
 * @example
 *
 * const shieldsSpecification = {
 *     shields: {
 *         "US:I": {
 *             textColor: Color.shields.white,
 *             spriteBlank: ["shield_us_interstate_2", "shield_us_interstate_3"],
 *             textLayout: textConstraint("southHalfEllipse"),
 *             padding: {
 *                 left: 4,
 *                 right: 4,
 *                 top: 6,
 *                 bottom: 5,
 *             },
 *         }
 *     },
 *     options: {
 *         bannerTextColor: "#000",
 *         bannerTextHaloColor: "#FFF",
 *         bannerHeight: 9,
 *         bannerPadding: 1,
 *         shieldFont: '"sans-serif-condensed", "Arial Narrow", sans-serif',
 *         shieldSize: 20,
 *     }
 * };
 *
 */
export interface ShieldSpecification {
  /** Shield definitions */
  networks: ShieldDefinitions;
  /** Shield options */
  options: ShieldOptions;
}

/** Rectangular bounds, in scaled pixels */
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

export interface Dimension {
  width: number;
  height: number;
}
