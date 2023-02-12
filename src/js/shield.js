"use strict";

import config from "../config.js";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Gfx from "./screen_gfx.js";
import rgba from "color-rgba";

// Replaces `sourceVal` with `lightenVal` in inverse proportion to the brightness;
// i.e. white remains white, black becomes `lightenVal`, and anit-aliased pixels remain anit-aliased
function lightenedColor(sourceVal, lightenVal) {
  return 255 - (1 - sourceVal / 255) * (255 - lightenVal);
}

function loadPixel(source, dest, sourceOffset, destOffset, colorLighten) {
  //Red
  dest[destOffset] = colorLighten
    ? lightenedColor(source[sourceOffset], colorLighten[0])
    : source[sourceOffset];
  //Green
  dest[destOffset + 1] = colorLighten
    ? lightenedColor(source[sourceOffset + 1], colorLighten[1])
    : source[sourceOffset + 1];
  //Blue
  dest[destOffset + 2] = colorLighten
    ? lightenedColor(source[sourceOffset + 2], colorLighten[2])
    : source[sourceOffset + 2];
  //Alpha
  dest[destOffset + 3] = source[sourceOffset + 3];
}

function rgbaMatrix(colorLighten) {
  if (typeof colorLighten !== "undefined") {
    return rgba(colorLighten);
  }
  return null;
}

function loadSprite(ctx, shield, bannerCount, verticalReflect, colorLighten) {
  let imgData = ctx.createImageData(shield.data.width, shield.data.height);
  let yOffset = bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding;
  let lighten = rgbaMatrix(colorLighten);

  if (verticalReflect == null) {
    for (let i = 0; i < shield.data.data.length; i += 4) {
      loadPixel(shield.data.data, imgData.data, i, i, lighten);
    }
  } else {
    //4 bytes/px, copy in reverse vertical order.
    for (let y = 0; y < shield.data.height; y++) {
      for (let x = 0; x < shield.data.width; x++) {
        let destRow = shield.data.height - y - 1;
        let destIdx = (destRow * shield.data.width + x) * 4;
        let srcIdx = (y * shield.data.width + x) * 4;
        loadPixel(shield.data.data, imgData.data, srcIdx, destIdx, lighten);
      }
    }
  }

  ctx.putImageData(imgData, 0, yOffset);
}

function drawBannerPart(ctx, network, drawFunc) {
  var shieldDef = ShieldDef.shields[network];

  if (shieldDef == null || typeof shieldDef.modifiers == "undefined") {
    return ctx; //Unadorned shield
  }

  for (var i = 0; i < shieldDef.modifiers.length; i++) {
    drawFunc(ctx, shieldDef.modifiers[i], i);
  }

  return ctx;
}

function compoundShieldSize(dimension, bannerCount) {
  return {
    width: dimension.width,
    height:
      dimension.height +
      bannerCount * ShieldDef.bannerSizeH +
      ShieldDef.topPadding,
  };
}

export function isValidNetwork(network) {
  // On recreational route relations, network=* indicates the network's scope,
  // not the network itself.
  // https://github.com/ZeLonewolf/openstreetmap-americana/issues/94
  return !/^[lrni][chimpw]n$/.test(network);
}

export function isValidRef(ref) {
  return ref !== null && ref.length !== 0 && ref.length <= 6;
}

/**
 * Get the number of banner placards associated with this shield
 *
 * @param {*} shield - Shield definition
 * @returns the number of banner placards that need to be drawn
 */
export function getBannerCount(shield) {
  if (shield == null || typeof shield.modifiers == "undefined") {
    return 0; //Unadorned shield
  }
  return shield.modifiers.length;
}

/**
 * Retrieve the shield blank that goes with a particular route.  If there are
 * multiple shields for a route (different widths), it picks the best shield.
 *
 * @param {*} map - maplibre Map
 * @param {*} shieldDef - shield definition for this route
 * @param {*} routeDef - route tagging from OSM
 * @returns shield blank or null if no shield exists
 */
function getRasterShieldBlank(map, shieldDef, routeDef) {
  var shieldArtwork = null;
  var textLayout;
  var bannerCount = 0;
  var bounds;

  //Special case where there's a defined fallback shield when no ref is tagged
  //Example: PA Turnpike
  if (!isValidRef(routeDef.ref) && "norefImage" in shieldDef) {
    return map.style.getImage(shieldDef.norefImage);
  }

  if (Array.isArray(shieldDef.spriteBlank)) {
    for (var i = 0; i < shieldDef.spriteBlank.length; i++) {
      shieldArtwork = map.style.getImage(shieldDef.spriteBlank[i]);

      bounds = compoundShieldSize(shieldArtwork.data, bannerCount);
      textLayout = ShieldText.layoutShieldTextFromDef(
        routeDef.ref,
        shieldDef,
        bounds
      );
      if (textLayout.fontPx > Gfx.fontSizeThreshold * Gfx.getPixelRatio()) {
        break;
      }
    }
  } else {
    shieldArtwork = map.style.getImage(shieldDef.spriteBlank);
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
  if (typeof shieldDef.canvasDrawnBlank != "undefined") {
    return (ctx, ref) =>
      ShieldDraw.draw(
        shieldDef.canvasDrawnBlank.drawFunc,
        ctx,
        shieldDef.canvasDrawnBlank.params,
        ref
      );
  }
  return ShieldDraw.blank;
}

export function drawShield(ctx, shieldDef, routeDef) {
  let bannerCount = getBannerCount(shieldDef);
  let yOffset = bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding;

  //Shift canvas to draw shield below banner
  ctx.save();
  ctx.translate(0, yOffset);
  let drawFunc = getDrawFunc(shieldDef);
  drawFunc(ctx, routeDef.ref);
  ctx.restore();
}

function getDrawHeight(shieldDef) {
  if (typeof shieldDef.canvasDrawnBlank != "undefined") {
    return ShieldDraw.shapeHeight(shieldDef.canvasDrawnBlank.drawFunc);
  }
  return ShieldDraw.CS;
}

function drawShieldText(ctx, map, shieldDef, routeDef) {
  var bannerCount = getBannerCount(shieldDef);
  var shieldBounds = null;

  var shieldArtwork = getRasterShieldBlank(map, shieldDef, routeDef);
  let yOffset = bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding;

  if (shieldArtwork == null) {
    ctx.translate(0, yOffset);
    let drawFunc = getDrawFunc(shieldDef);
    drawFunc(ctx, routeDef.ref);
    ctx.translate(0, -yOffset);

    shieldBounds = {
      width: ctx.canvas.width,
      height: getDrawHeight(shieldDef),
    };
  } else {
    shieldBounds = {
      width: shieldArtwork.data.width,
      height: shieldArtwork.data.height,
    };
  }

  if (
    (!isValidRef(routeDef.ref) && "norefImage" in shieldDef) ||
    (shieldDef.notext && "spriteBlank" in shieldDef)
  ) {
    //Pictoral shield with no ref to draw
    return ctx;
  }

  if (shieldDef.notext) {
    //If the shield definition says not to draw a ref, ignore ref
    return ctx;
  }

  //The ref is valid and we're supposed to draw it
  var textLayout = ShieldText.layoutShieldTextFromDef(
    routeDef.ref,
    shieldDef,
    shieldBounds
  );

  textLayout.yBaseline +=
    bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding;

  if (config.SHIELD_TEXT_HALO_COLOR_OVERRIDE) {
    ctx.strokeStyle = config.SHIELD_TEXT_HALO_COLOR_OVERRIDE;
    ShieldText.drawShieldHaloText(ctx, routeDef.ref, textLayout);
  } else if (shieldDef.textHaloColor) {
    ctx.strokeStyle = shieldDef.textHaloColor;
    ShieldText.drawShieldHaloText(ctx, routeDef.ref, textLayout);
  }

  ctx.fillStyle = textColor(shieldDef);
  ShieldText.drawShieldText(ctx, routeDef.ref, textLayout);

  if (config.SHIELD_TEXT_BBOX_COLOR) {
    ctx.strokeStyle = config.SHIELD_TEXT_BBOX_COLOR;
    ctx.lineWidth = ShieldDraw.PXR;
    ctx.strokeRect(
      (shieldDef.padding.left - 0.5) * ShieldDraw.PXR,
      bannerCount * ShieldDef.bannerSizeH +
        ShieldDef.topPadding +
        (shieldDef.padding.top - 0.5) * ShieldDraw.PXR,
      shieldBounds.width -
        (shieldDef.padding.left + shieldDef.padding.right - 1) * ShieldDraw.PXR,
      shieldBounds.height -
        (shieldDef.padding.top + shieldDef.padding.bottom - 1) * ShieldDraw.PXR
    );
  }

  return ctx;
}

export function missingIconHandler(map, e) {
  try {
    missingIconLoader(map, e);
  } catch (err) {
    console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
  }
}

export function missingIconLoader(map, e) {
  let ctx = generateShieldCtx(map, e.id);
  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce a shield for", JSON.stringify(e.id));
    ctx = Gfx.getGfxContext({ width: 1, height: 1 });
  }
  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  map.addImage(
    e.id,
    {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      data: imgData.data,
    },
    {
      pixelRatio: ShieldDraw.PXR,
    }
  );
}

export function getShieldDef(routeDef) {
  if (routeDef == null) {
    return null;
  }

  var shieldDef = ShieldDef.shields[routeDef.network];

  if (shieldDef == null) {
    // Default to plain black text with halo and no background shield
    console.debug("Generic shield for", JSON.stringify(routeDef));
    return isValidNetwork(routeDef.network) && isValidRef(routeDef.ref)
      ? ShieldDef.shields.default
      : null;
  }

  if (shieldDef.overrideByRef) {
    shieldDef = {
      ...shieldDef,
      ...shieldDef.overrideByRef[routeDef.ref],
    };
  }

  //Determine whether a route without a ref gets drawn
  if (
    !isValidRef(routeDef.ref) &&
    !shieldDef.notext &&
    !("norefImage" in shieldDef) &&
    !(shieldDef.refsByWayName && routeDef.wayName)
  ) {
    return null;
  }

  return shieldDef;
}

export function getRouteDef(id) {
  if (id == "shield_") {
    return null;
  }

  var network_ref = id.split("\n")[1];
  var network_ref_parts = network_ref.split("=");
  var network = network_ref_parts[0];
  var ref = network_ref_parts[1];
  var wayName = id.split("\n")[2];

  return {
    network: network,
    ref: ref,
    wayName: wayName,
  };
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

export function getDrawnShieldBounds(shieldDef, ref) {
  let width = Math.max(
    ShieldDraw.CS,
    ShieldDraw.computeWidth(
      shieldDef.canvasDrawnBlank.params,
      ref,
      shieldDef.canvasDrawnBlank.drawFunc
    )
  );
  let height = ShieldDraw.shapeHeight(shieldDef.canvasDrawnBlank.drawFunc);
  return { width, height };
}

export function generateShieldCtx(map, id) {
  let routeDef = getRouteDef(id);
  let shieldDef = getShieldDef(routeDef);

  if (shieldDef == null) {
    return null;
  }

  // Handle special case for manually-applied abbreviations
  if (routeDef.ref === "" && shieldDef.refsByWayName) {
    routeDef.ref = shieldDef.refsByWayName[routeDef.wayName];
  }

  //Determine overall shield+banner dimensions
  let bannerCount = getBannerCount(shieldDef);

  let shieldArtwork = getRasterShieldBlank(map, shieldDef, routeDef);

  let width = ShieldDraw.CS;
  let height = ShieldDraw.CS;

  if (shieldArtwork == null) {
    if (typeof shieldDef.canvasDrawnBlank != "undefined") {
      let bounds = getDrawnShieldBounds(shieldDef, routeDef.ref);
      width = bounds.width;
      height = bounds.height;
    }
  } else {
    width = shieldArtwork.data.width;
    height = shieldArtwork.data.height;
  }

  height += bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding;

  //Generate empty canvas sized to the graphic
  let ctx = Gfx.getGfxContext({ width, height });

  // Convert numbering systems. Normally alternative numbering systems should be
  // tagged directly in ref=*, but some shields use different numbering systems
  // for aesthetic reasons only.
  if (routeDef.ref && shieldDef.numberingSystem === "roman") {
    routeDef.ref = romanizeRef(routeDef.ref);
  }

  // Add the halo around modifier plaque text
  drawBannerPart(ctx, routeDef.network, ShieldText.drawBannerHaloText);

  if (shieldArtwork == null) {
    drawShield(ctx, shieldDef, routeDef);
  } else {
    loadSprite(
      ctx,
      shieldArtwork,
      bannerCount,
      shieldDef.verticalReflect,
      shieldDef.colorLighten
    );
  }

  // Draw the shield text
  drawShieldText(ctx, map, shieldDef, routeDef);

  // Add modifier plaque text
  drawBannerPart(ctx, routeDef.network, ShieldText.drawBannerText);

  return ctx;
}
