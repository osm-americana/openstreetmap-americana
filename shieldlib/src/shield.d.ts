import { RouteDefinition } from "./types";

import { ShieldRenderingContext } from "./shield_renderer";

export function generateShieldCtx(
  renderContext: ShieldRenderingContext,
  routeDef: RouteDefinition
): CanvasRenderingContext2D;

export function storeNoShield(
  renderingContext: ShieldRenderingContext,
  id: string
): void;

export function missingIconLoader(
  renderContext: ShieldRenderingContext,
  routeDef: RouteDefinition,
  spriteID: string,
  update?: boolean
): void;

export function romanizeRef(ref: string): string;
