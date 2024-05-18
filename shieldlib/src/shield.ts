"use strict";

import * as ShieldText from "./shield_text";
import * as ShieldDraw from "./shield_canvas_draw";
import * as Gfx from "./screen_gfx";
import { drawBanners, drawBannerHalos, getBannerCount } from "./shield_banner";
import { ShieldRenderingContext } from "./shield_renderer";
import {
  Dimension,
  RouteDefinition,
  ShieldDefinition,
  ShieldDefinitions,
} from "./types";
import { TextPlacement } from "./shield_text";
import { StyleImage } from "maplibre-gl";

function compoundShieldSize(
  r: ShieldRenderingContext,
  dimension: Dimension,
  bannerCount: number
): Dimension {
  return {
    width: dimension.width,
    height:
      dimension.height +
      bannerCount * r.px(r.options.bannerHeight + r.options.bannerPadding),
  };
}

export function isValidRef(ref: string): boolean {
  return ref !== null && ref.length !== 0 && ref.length <= 6;
}

/**
 * Retrieve the shield blank that goes with a particular route.  If there are
 * multiple shields for a route (different widths), it picks the best shield.
 *
 * @param {*} r - render context
 * @param {*} shieldDef - shield definition for this route
 * @param {*} routeDef - route tagging from OSM
 * @returns shield blank or null if no shield exists
 */
function getRasterShieldBlank(
  r: ShieldRenderingContext,
  shieldDef: ShieldDefinition,
  routeDef: RouteDefinition
): StyleImage {
  let shieldArtwork = null;
  let textPlacement: TextPlacement;
  let bannerCount: number = 0;
  let bounds: Dimension;

  if (Array.isArray(shieldDef.spriteBlank)) {
    for (var i = 0; i < shieldDef.spriteBlank.length; i++) {
      shieldArtwork = r.spriteRepo.getSprite(shieldDef.spriteBlank[i]);

      bounds = compoundShieldSize(r, shieldArtwork.data, bannerCount);
      textPlacement = ShieldText.layoutShieldTextFromDef(
        r,
        routeDef.ref,
        shieldDef,
        bounds
      );
      if (textPlacement.fontPx > r.px(Gfx.fontSizeThreshold)) {
        break;
      }
    }
  } else {
    shieldArtwork = r.spriteRepo.getSprite(shieldDef.spriteBlank);
  }

  return shieldArtwork;
}

function textColor(shieldDef: ShieldDefinition): string {
  if (shieldDef != null && typeof shieldDef.textColor != "undefined") {
    return shieldDef.textColor;
  }
  return "black";
}

function getDrawFunc(
  shieldDef: ShieldDefinition
): (
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  ref: string
) => void {
  if (typeof shieldDef.shapeBlank != "undefined") {
    return (
      r: ShieldRenderingContext,
      ctx: CanvasRenderingContext2D,
      ref: string
    ) =>
      ShieldDraw.draw(
        r,
        shieldDef.shapeBlank.drawFunc,
        ctx,
        shieldDef.shapeBlank.params,
        ref
      );
  }
  console.warn(`Draw function not defined in:\n${shieldDef}`);
  return (
    r: ShieldRenderingContext,
    ctx: CanvasRenderingContext2D,
    ref: string
  ) => {};
}

function getDrawHeight(
  r: ShieldRenderingContext,
  shieldDef: ShieldDefinition
): number {
  if (typeof shieldDef.shapeBlank != "undefined") {
    return ShieldDraw.shapeHeight(r, shieldDef.shapeBlank.drawFunc);
  }
  return r.shieldSize();
}

function drawShieldText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  shieldDef: ShieldDefinition,
  routeDef: RouteDefinition,
  shieldBounds: Dimension
): CanvasRenderingContext2D {
  if (shieldDef.notext) {
    //If the shield definition says not to draw a ref, ignore ref
    return ctx;
  }

  //The ref is valid and we're supposed to draw it
  var textLayout = ShieldText.layoutShieldTextFromDef(
    r,
    routeDef.ref,
    shieldDef,
    shieldBounds
  );

  if (typeof r.debugOptions?.shieldTextHaloColor !== "undefined") {
    ctx.strokeStyle = r.debugOptions.shieldTextHaloColor;
    ShieldText.drawShieldHaloText(r, ctx, routeDef.ref, textLayout);
  } else if (shieldDef.textHaloColor) {
    ctx.strokeStyle = shieldDef.textHaloColor;
    ShieldText.drawShieldHaloText(r, ctx, routeDef.ref, textLayout);
  }

  ctx.fillStyle = textColor(shieldDef);
  ShieldText.renderShieldText(r, ctx, routeDef.ref, textLayout);

  if (r.debugOptions?.shieldTextBboxColor) {
    ctx.strokeStyle = r.debugOptions.shieldTextBboxColor;
    ctx.lineWidth = r.px(1);
    ctx.strokeRect(
      r.px(shieldDef.padding.left - 0.5),
      r.px(shieldDef.padding.top - 0.5),
      shieldBounds.width -
        r.px(shieldDef.padding.left + shieldDef.padding.right - 1),
      shieldBounds.height -
        r.px(shieldDef.padding.top + shieldDef.padding.bottom - 1)
    );
  }

  return ctx;
}

export function missingIconLoader(
  r: ShieldRenderingContext,
  routeDef: RouteDefinition,
  spriteID: string,
  update: boolean
): void {
  let ctx = generateShieldCtx(r, routeDef);
  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce a shield for", JSON.stringify(routeDef));
    ctx = r.gfxFactory.createGraphics({ width: 1, height: 1 });
  }
  storeSprite(r, spriteID, ctx, update);
}

function storeSprite(
  r: ShieldRenderingContext,
  id: string,
  ctx: CanvasRenderingContext2D,
  update: boolean
): void {
  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  r.spriteRepo.putSprite(
    id,
    {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      data: imgData.data,
    },
    { pixelRatio: r.px(1) },
    update
  );
}

export function storeNoShield(r: ShieldRenderingContext, id: string): void {
  storeSprite(r, id, r.emptySprite(), false);
}

function refForDefs(routeDef: RouteDefinition, shieldDef: ShieldDefinition) {
  // Handle special case for manually-applied abbreviations
  if (shieldDef.ref) {
    return shieldDef.ref;
  }
  if (
    shieldDef.refsByName &&
    routeDef.name &&
    shieldDef.refsByName[routeDef.name]
  ) {
    return shieldDef.refsByName[routeDef.name];
  }
  return routeDef.ref;
}

function getShieldDef(
  shields: ShieldDefinitions,
  routeDef: RouteDefinition
): ShieldDefinition {
  if (!shields) {
    //This occurs if the ShieldJSON is loaded from the network and hasn't loaded yet.
    return null;
  }

  var shieldDef = shields[routeDef.network];

  if (routeDef == null) {
    return null;
  }

  if (shieldDef == null) {
    // Default to plain black text with halo and no background shield
    console.debug("Generic shield for", JSON.stringify(routeDef));

    return isValidRef(routeDef.ref) ? shields["default"] : null;
  }

  var ref = refForDefs(routeDef, shieldDef);

  if (shieldDef.overrideByRef) {
    shieldDef = {
      ...shieldDef,
      ...shieldDef.overrideByRef[ref],
    };
  }

  if (shieldDef.overrideByName) {
    shieldDef = {
      ...shieldDef,
      ...shieldDef.overrideByName[routeDef.name || ""],
    };
  }

  //Special case where there's a defined fallback shield when no ref is tagged
  //Example: PA Turnpike
  if (!isValidRef(ref) && "noref" in shieldDef) {
    shieldDef = shieldDef.noref;
    // noref implies notext
    shieldDef.notext = true;
  }

  //Determine whether a route without a ref gets drawn
  if (
    !isValidRef(ref) &&
    !shieldDef.notext &&
    !shieldDef.ref &&
    !(shieldDef.refsByName && routeDef.name)
  ) {
    return null;
  }

  return shieldDef;
}

/**
 * Reformats an alphanumeric ref as Roman numerals, preserving any alphabetic
 * suffix.
 */
export function romanizeRef(ref: string): string {
  let number = parseInt(ref, 10);
  if (isNaN(number)) {
    return ref;
  }

  let roman =
    "M".repeat(number / 1000) +
    "D".repeat((number % 1000) / 500) +
    "C".repeat((number % 500) / 100) +
    "L".repeat((number % 100) / 50) +
    "X".repeat((number % 50) / 10) +
    "V".repeat((number % 10) / 5) +
    "I".repeat(number % 5);
  roman = roman
    .replace("DCCCC", "CM")
    .replace("CCCC", "CD")
    .replace("LXXXX", "XC")
    .replace("XXXX", "XL")
    .replace("VIIII", "IX")
    .replace("IIII", "IV");
  return roman + ref.slice(number.toString().length);
}

function getDrawnShieldBounds(
  r: ShieldRenderingContext,
  shieldDef: ShieldDefinition,
  ref: string
): Dimension {
  let width = Math.max(
    r.shieldSize(),
    ShieldDraw.computeWidth(
      r,
      shieldDef.shapeBlank.params,
      ref,
      shieldDef.shapeBlank.drawFunc
    )
  );
  let height = ShieldDraw.shapeHeight(r, shieldDef.shapeBlank.drawFunc);

  return { width, height };
}

function bannerAreaHeight(
  r: ShieldRenderingContext,
  bannerCount: number
): number {
  if (bannerCount === 0) {
    return 0;
  }
  return (
    bannerCount * r.px(r.options.bannerHeight) +
    //No padding after last banner
    (bannerCount - 1) * r.px(r.options.bannerPadding)
  );
}

export function generateShieldCtx(
  r: ShieldRenderingContext,
  routeDef: RouteDefinition
): CanvasRenderingContext2D {
  let shieldDef: ShieldDefinition = getShieldDef(r.shieldDef, routeDef);

  if (shieldDef == null) {
    return null;
  }

  routeDef.ref = refForDefs(routeDef, shieldDef);

  //Determine overall shield+banner dimensions
  let bannerCount = getBannerCount(shieldDef);

  let sourceSprite = getRasterShieldBlank(r, shieldDef, routeDef);

  let width = r.shieldSize();
  let height = r.shieldSize();

  let shieldBounds = null;

  if (sourceSprite == null) {
    if (typeof shieldDef.shapeBlank != "undefined") {
      let bounds = getDrawnShieldBounds(r, shieldDef, routeDef.ref);
      width = bounds.width;
      height = bounds.height;
    }
    shieldBounds = {
      width: width,
      height: getDrawHeight(r, shieldDef),
    };
  } else {
    width = sourceSprite.data.width;
    height = sourceSprite.data.height;
    shieldBounds = { width, height };
  }

  let bannerHeight = bannerAreaHeight(r, bannerCount);
  height += bannerHeight;

  //Generate empty canvas sized to the graphic
  let ctx = r.gfxFactory.createGraphics({ width, height });

  // Convert numbering systems. Normally alternative numbering systems should be
  // tagged directly in ref=*, but some shields use different numbering systems
  // for aesthetic reasons only.
  if (routeDef.ref && shieldDef.numberingSystem === "roman") {
    routeDef.ref = romanizeRef(routeDef.ref);
  }

  // Add the halo around modifier plaque text
  drawBannerHalos(r, ctx, shieldDef);

  //Shift canvas to draw shield below banner
  ctx.save();
  ctx.translate(0, bannerHeight);

  if (sourceSprite == null) {
    let drawFunc = getDrawFunc(shieldDef);
    drawFunc(r, ctx, routeDef.ref);
  } else {
    //This is a raw copy, so the yOffset (bannerHeight) is needed
    Gfx.transposeImageData(
      ctx,
      sourceSprite,
      bannerHeight,
      shieldDef.verticalReflect,
      shieldDef.colorLighten,
      shieldDef.colorDarken
    );
  }

  // Draw the shield text
  drawShieldText(r, ctx, shieldDef, routeDef, shieldBounds);

  ctx.restore();

  // Add modifier plaque text
  drawBanners(r, ctx, shieldDef);

  return ctx;
}
