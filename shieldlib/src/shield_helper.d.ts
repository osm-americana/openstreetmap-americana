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
  yOffset: number,
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
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function trapezoidUpShield(
  sideAngle: number,
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
  yOffset: number,
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function homePlateDownShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function homePlateUpShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius1: number,
  radius2: number,
  rectWidth: number
): ShieldDefinition;

export declare function hexagonVerticalShield(
  yOffset: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function hexagonHorizontalShield(
  sideAngle: number,
  fillColor: string,
  strokeColor: string,
  textColor: string,
  radius: number,
  rectWidth: number
): ShieldDefinition;

export declare function octagonVerticalShield(
  yOffset: number,
  sideAngle: number,
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
  banners: string[],
  bannerColor?: string
): ShieldDefinition;
