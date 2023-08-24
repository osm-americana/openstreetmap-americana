import { ShieldDefinition, TextLayout } from "./types";

export declare function roundedRectTextConstraint(radius: number): TextLayout;
export declare function textConstraint(fxn: string): TextLayout;
export declare function ovalShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): ShieldDefinition;

export declare function circleShield(
  fillColor: string,
  strokeColor: string,
  textColor: string
): ShieldDefinition;

export declare function roundedRectShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number,
  radius: number
): ShieldDefinition;

export declare function escutcheonDownShield(
  offset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function fishheadDownShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): ShieldDefinition;

export declare function triangleDownShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function trapezoidDownShield(
  angle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
);

export declare function trapezoidUpShield(
  angle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function diamondShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function pentagonUpShield(
  offset: number,
  angle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function homePlateDownShield(
  offset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function homePlateUpShield(
  offset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function hexagonVerticalShield(
  offset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

/**
 * Draws a shield with a horizontally-aligned hexagon background
 *
 * @param {*} angle - Angle (in degrees) at which sides deviate from vertical
 * @param {*} fillColor - Color of hexagon background fill
 * @param {*} strokeColor - Color of hexagon outline stroke
 * @param {*} textColor - Color of text (defaults to strokeColor)
 * @param {*} radius - Corner radius of hexagon (defaults to 2)
 * @param {*} rectWidth - Width of hexagon (defaults to variable-width)
 * @returns a shield definition object
 */
export declare function hexagonHorizontalShield(
  angle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function octagonVerticalShield(
  offset: number,
  angle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function pillShield(
  fillColor: string,
  strokeColor: string,
  textColor: string,
  rectWidth: number
): ShieldDefinition;

export function banneredShield(
  baseDef: ShieldDefinition,
  banners: string[]
): ShieldDefinition;
