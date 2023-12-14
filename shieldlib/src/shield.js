"use strict";

import * as ShieldText from "./shield_text";
import * as ShieldDraw from "./shield_canvas_draw";
import * as Gfx from "./screen_gfx";
import {
  drawBanners,
  drawBannerHalos,
  getBannerCount,
} from "./shield_banner";

function compoundShieldSize(r, dimension, bannerCount) {
  return {
    width: dimension.width,
    height:
      dimension.height +
      bannerCount * r.px(r.options.bannerHeight + r.options.bannerPadding),
  };
}

export function isValidRef(ref) {
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
function getRasterShieldBlank(r, shieldDef, routeDef) {
  var shieldArtwork = null;
  var textLayout;
  var bannerCount = 0;
  var bounds;

  if (Array.isArray(shieldDef.spriteBlank)) {
    for (var i = 0; i < shieldDef.spriteBlank.length; i++) {
      shieldArtwork = r.spriteRepo.getSprite(shieldDef.spriteBlank[i]);

      bounds = compoundShieldSize(r, shieldArtwork.data, bannerCount);
      textLayout = ShieldText.layoutShieldTextFromDef(
        r,
        routeDef.ref,
        shieldDef,
        bounds
      );
      if (textLayout.fontPx > r.px(Gfx.fontSizeThreshold)) {
        break;
      }
    }
  } else {
    shieldArtwork = r.spriteRepo.getSprite(shieldDef.spriteBlank);
  }

  return shieldArtwork;
}

function textColor(shieldDef) {
  if (shieldDef != null && typeof shieldDef.textColor != "undefined") {
    return shieldDef.textColor;
  }
  return "black";
}

function getDrawFunc(shieldDef) {
  if (typeof shieldDef.shapeBlank != "undefined") {
    return (r, ctx, ref) =>
      ShieldDraw.draw(
        r,
        shieldDef.shapeBlank.drawFunc,
        ctx,
        shieldDef.shapeBlank.params,
        ref
      );
  }
  return ShieldDraw.blank;
}

function drawShield(r, ctx, shieldDef, routeDef) {
  let bannerCount = getBannerCount(shieldDef);
  let yOffset = bannerCount * r.px(r.options.bannerHeight);

  //Shift canvas to draw shield below banner
  ctx.save();
  ctx.translate(0, yOffset);
  let drawFunc = getDrawFunc(shieldDef);
  drawFunc(r, ctx, routeDef.ref);
  ctx.restore();
}

function getDrawHeight(r, shieldDef) {
  if (typeof shieldDef.shapeBlank != "undefined") {
    return ShieldDraw.shapeHeight(r, shieldDef.shapeBlank.drawFunc);
  }
  return r.shieldSize();
}

function drawShieldText(r, ctx, shieldDef, routeDef) {
  var bannerCount = getBannerCount(shieldDef);
  var shieldBounds = null;

  var shieldArtwork = getRasterShieldBlank(r, shieldDef, routeDef);
  let yOffset = bannerCount * r.px(r.options.bannerHeight);

  if (shieldArtwork == null) {
    ctx.translate(0, yOffset);
    let drawFunc = getDrawFunc(shieldDef);
    drawFunc(r, ctx, routeDef.ref);
    ctx.translate(0, -yOffset);

    shieldBounds = {
      width: ctx.canvas.width,
      height: getDrawHeight(r, shieldDef),
    };
  } else {
    shieldBounds = {
      width: shieldArtwork.data.width,
      height: shieldArtwork.data.height,
    };
  }

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

  textLayout.yBaseline += bannerCount * r.px(r.options.bannerHeight);

  if (typeof r.options.SHIELD_TEXT_HALO_COLOR_OVERRIDE !== "undefined") {
    ctx.strokeStyle = options.SHIELD_TEXT_HALO_COLOR_OVERRIDE;
    ShieldText.drawShieldHaloText(r, ctx, routeDef.ref, textLayout);
  } else if (shieldDef.textHaloColor) {
    ctx.strokeStyle = shieldDef.textHaloColor;
    ShieldText.drawShieldHaloText(r, ctx, routeDef.ref, textLayout);
  }

  ctx.fillStyle = textColor(shieldDef);
  ShieldText.renderShieldText(r, ctx, routeDef.ref, textLayout);

  if (r.options.SHIELD_TEXT_BBOX_COLOR) {
    ctx.strokeStyle = r.options.SHIELD_TEXT_BBOX_COLOR; //TODO move to debugOptions
    ctx.lineWidth = r.px(1);
    ctx.strokeRect(
      r.px(shieldDef.padding.left - 0.5),
      bannerCount * r.px(r.options.bannerHeight) +
        r.px(shieldDef.padding.top - 0.5),
      shieldBounds.width -
        r.px(shieldDef.padding.left + shieldDef.padding.right - 1),
      shieldBounds.height -
        r.px(shieldDef.padding.top + shieldDef.padding.bottom - 1)
    );
  }

  return ctx;
}

export function missingIconLoader(r, routeDef, spriteID, update) {
  let ctx = generateShieldCtx(r, routeDef);
  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce a shield for", JSON.stringify(routeDef));
    ctx = r.gfxFactory.createGraphics({ width: 1, height: 1 });
  }
  storeSprite(r, spriteID, ctx, update);
}

function storeSprite(r, id, ctx, update) {
  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  r.spriteRepo.putSprite(
    id,
    {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      data: imgData.data,
    },
    r.px(1),
    update
  );
}

export function storeNoShield(r, id) {
  storeSprite(r, id, r.emptySprite());
}

function refForDefs(routeDef, shieldDef) {
  // Handle special case for manually-applied abbreviations
  if (
    shieldDef.refsByName &&
    routeDef.name &&
    shieldDef.refsByName[routeDef.name]
  ) {
    return shieldDef.refsByName[routeDef.name];
  }
  return routeDef.ref;
}

function getShieldDef(shields, routeDef) {
  var shieldDef = shields[routeDef.network];

  if (routeDef == null) {
    return null;
  }

  if (shieldDef == null) {
    // Default to plain black text with halo and no background shield
    console.debug("Generic shield for", JSON.stringify(routeDef));
    return isValidRef(routeDef.ref) ? shields.default : null;
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
export function romanizeRef(ref) {
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

function getDrawnShieldBounds(r, shieldDef, ref) {
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

export function generateShieldCtx(r, routeDef) {
  let shieldDef = getShieldDef(r.shieldDef, routeDef);

  if (shieldDef == null) {
    return null;
  }

  routeDef.ref = refForDefs(routeDef, shieldDef);

  //Determine overall shield+banner dimensions
  let bannerCount = getBannerCount(shieldDef);

  let sourceSprite = getRasterShieldBlank(r, shieldDef, routeDef);

  let width = r.shieldSize();
  let height = r.shieldSize();

  if (sourceSprite == null) {
    if (typeof shieldDef.shapeBlank != "undefined") {
      let bounds = getDrawnShieldBounds(r, shieldDef, routeDef.ref);
      width = bounds.width;
      height = bounds.height;
    }
  } else {
    width = sourceSprite.data.width;
    height = sourceSprite.data.height;
  }

  let bannerHeight = bannerCount * r.px(r.options.bannerHeight);
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

  if (sourceSprite == null) {
    drawShield(r, ctx, shieldDef, routeDef);
  } else {
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
  drawShieldText(r, ctx, shieldDef, routeDef);

  // Add modifier plaque text
  drawBanners(r, ctx, shieldDef);

  return ctx;
}
