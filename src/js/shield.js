"use strict";

import config from "../config.js";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Gfx from "./screen_gfx.js";

function loadShield(ctx, shield, bannerCount, verticalReflect) {
  var drawCtx = Gfx.getGfxContext(shield.data);
  var imgData = drawCtx.createImageData(shield.data.width, shield.data.height);

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }

  drawCtx.putImageData(imgData, 0, 0);

  if (verticalReflect == null) {
    ctx.drawImage(
      drawCtx.canvas,
      0,
      bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding
    );
  } else {
    ctx.save();
    ctx.scale(1, -1);
    ctx.drawImage(
      drawCtx.canvas,
      0,
      bannerCount * ShieldDef.bannerSizeH +
        ShieldDef.topPadding -
        drawCtx.canvas.height -
        2 * ShieldDraw.PXR
    );
    ctx.restore();
  }
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
 * @param {*} sprites - sprite sheet
 * @param {*} shieldDef - shield definition for this route
 * @param {*} routeDef - route tagging from OSM
 * @returns shield blank or null if no shield exists
 */
function getRasterShieldBlank(sprites, shieldDef, routeDef) {
  var shieldArtwork = null;
  var textLayout;
  var bannerCount = 0;
  var bounds;

  //Special case where there's a defined fallback shield when no ref is tagged
  //Example: PA Turnpike
  if (!isValidRef(routeDef.ref) && "norefImage" in shieldDef) {
    return sprites[shieldDef.norefImage];
  }

  if (Array.isArray(shieldDef.spriteBlank)) {
    for (var i = 0; i < shieldDef.spriteBlank.length; i++) {
      shieldArtwork = sprites[shieldDef.spriteBlank[i]];

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
    shieldArtwork = sprites[shieldDef.spriteBlank];
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
    return (ref) =>
      ShieldDraw.draw(
        shieldDef.canvasDrawnBlank.drawFunc,
        shieldDef.canvasDrawnBlank.params,
        ref
      );
  }
  return ShieldDraw.blank;
}

/**
 * Creates a graphics context of the correct size to hold the shield and banner.
 * @param {*} shieldDef shield definition
 * @param {*} routeDef route definition
 * @returns a blank graphics context
 */
function generateBlankGraphicsContext(sprites, shieldDef, routeDef) {
  var bannerCount = getBannerCount(shieldDef);
  var shieldArtwork = getRasterShieldBlank(sprites, shieldDef, routeDef);
  var compoundBounds = null;

  if (shieldArtwork == null) {
    let drawFunc = getDrawFunc(shieldDef);
    let drawnShieldCtx = drawFunc(routeDef.ref);
    compoundBounds = compoundShieldSize(drawnShieldCtx.canvas, bannerCount);
  } else {
    compoundBounds = compoundShieldSize(shieldArtwork.data, bannerCount);
  }

  return Gfx.getGfxContext(compoundBounds);
}

function drawShield(ctx, sprites, shieldDef, routeDef) {
  var bannerCount = getBannerCount(shieldDef);

  var shieldArtwork = getRasterShieldBlank(sprites, shieldDef, routeDef);

  if (shieldArtwork == null) {
    let drawFunc = getDrawFunc(shieldDef);
    let drawnShieldCtx = drawFunc(routeDef.ref);

    ctx.drawImage(
      drawnShieldCtx.canvas,
      0,
      bannerCount * ShieldDef.bannerSizeH + ShieldDef.topPadding
    );
  } else {
    loadShield(ctx, shieldArtwork, bannerCount, shieldDef.verticalReflect);
  }

  return ctx;
}

function drawShieldText(ctx, sprites, shieldDef, routeDef) {
  var bannerCount = getBannerCount(shieldDef);
  var shieldBounds = null;

  var shieldArtwork = getRasterShieldBlank(sprites, shieldDef, routeDef);

  if (shieldArtwork == null) {
    let drawFunc = getDrawFunc(shieldDef);
    let drawnShieldCtx = drawFunc(routeDef.ref);

    shieldBounds = {
      width: drawnShieldCtx.canvas.width,
      height: drawnShieldCtx.canvas.height,
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

function getShieldDef(routeDef) {
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

function getRouteDef(id) {
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

export function generateShieldCtx(map, id) {
  let sprites = map.style.imageManager.images;
  let routeDef = getRouteDef(id);
  let shieldDef = getShieldDef(routeDef);

  if (shieldDef == null) {
    return null;
  }

  // Swap black with a different color for certain shields.
  // The secondary canvas is necessary here for some reason. Without it,
  // the recolored shield gets an opaque instead of transparent background.
  var colorLighten = shieldDef.colorLighten;

  // Handle special case for manually-applied abbreviations
  if (routeDef.ref === "" && shieldDef.refsByWayName) {
    routeDef.ref = shieldDef.refsByWayName[routeDef.wayName];
  }

  var ctx = generateBlankGraphicsContext(sprites, shieldDef, routeDef);

  // Add the halo around modifier plaque text
  drawBannerPart(ctx, routeDef.network, ShieldText.drawBannerHaloText);

  // Draw the shield
  if (colorLighten) {
    // Draw a color-composited version of the shield and shield text
    let shieldCtx = generateBlankGraphicsContext(sprites, shieldDef, routeDef);
    drawShield(shieldCtx, sprites, shieldDef, routeDef);

    let colorCtx = generateBlankGraphicsContext(sprites, shieldDef, routeDef);
    drawShield(colorCtx, sprites, shieldDef, routeDef);
    colorCtx.drawImage(ctx.canvas, 0, 0);
    colorCtx.globalCompositeOperation = "lighten";
    colorCtx.fillStyle = colorLighten;
    colorCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    colorCtx.globalCompositeOperation = "destination-atop";
    colorCtx.drawImage(shieldCtx.canvas, 0, 0);

    ctx.drawImage(colorCtx.canvas, 0, 0);
  } else {
    // Draw the shield
    drawShield(ctx, sprites, shieldDef, routeDef);
  }

  // Draw the shield text
  drawShieldText(ctx, sprites, shieldDef, routeDef);

  // Add modifier plaque text
  drawBannerPart(ctx, routeDef.network, ShieldText.drawBannerText);

  return ctx;
}
