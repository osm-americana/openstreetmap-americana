"use strict";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Gfx from "./screen_gfx.js";

function loadShield(ctx, shield, bannerCount) {
  var drawCtx = Gfx.getGfxContext(shield.data);
  var imgData = drawCtx.createImageData(shield.data.width, shield.data.height);

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }

  drawCtx.putImageData(imgData, 0, 0);

  ctx.drawImage(drawCtx.canvas, 0, bannerCount * ShieldDef.bannerSizeH);
}

function drawBanners(ctx, network) {
  var shieldDef = ShieldDef.shields[network];

  if (shieldDef == null || typeof shieldDef.modifiers == "undefined") {
    return ctx; //Unadorned shield
  }

  ctx.fillStyle = "black";

  for (var i = 0; i < shieldDef.modifiers.length; i++) {
    ShieldText.drawBannerText(ctx, shieldDef.modifiers[i], i);
  }

  return ctx;
}

function compoundShieldSize(dimension, bannerCount) {
  return {
    width: dimension.width,
    height: dimension.height + bannerCount * ShieldDef.bannerSizeH,
  };
}

function isValidRef(ref) {
  if (ref == null || ref.length == 0 || ref.length > 5) {
    return false;
  }
  return true;
}

/**
 * Retrieve the shield blank that goes with a particular route.  If there are
 * multiple shields for a route (different widths), it picks the best shield.
 *
 * @param {*} network - route network
 * @param {*} ref - route number
 * @returns shield blank or null if no shield exists
 */
function getRasterShieldBlank(network, ref) {
  var shieldDef = ShieldDef.shields[network];
  var shieldArtwork = null;
  var textLayout;
  var bannerCount = 0;
  var bounds;
  var textLayoutFunc = ShieldText.rectTextConstraint;

  if (typeof shieldDef == "undefined") {
    return null;
  }

  if (typeof shieldDef.textLayoutConstraint != "undefined") {
    textLayoutFunc = shieldDef.textLayoutConstraint;
  }

  //Special cases
  if (!isValidRef(ref)) {
    if (typeof shieldDef.norefImage != "undefined") {
      return shieldDef.norefImage;
    }
    return null;
  }

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shieldArtwork = shieldDef.backgroundImage[i];

      bounds = compoundShieldSize(shieldArtwork.data, bannerCount);
      textLayout = ShieldText.layoutShieldTextFromDef(ref, shieldDef, bounds);
      if (textLayout.fontPx > Gfx.fontSizeThreshold * Gfx.getPixelRatio()) {
        break;
      }
    }
  } else {
    shieldArtwork = shieldDef.backgroundImage;
  }

  return shieldArtwork;
}

function textColor(shieldDef) {
  if (shieldDef != null && typeof shieldDef.textColor != "undefined") {
    return shieldDef.textColor;
  }
  return "black";
}

function drawShield(network, ref) {
  var shieldDef = ShieldDef.shields[network];
  var ctx = null;
  var bannerCount = 0;
  var padding = null;

  if (shieldDef == null) {
    if (ref == "") {
      return null;
    }

    //Draw generic rectangular shield
    ctx = ShieldDraw.rectangle(ref);

    shieldBounds = {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
    };
    shieldDef = {
      padding: {
        left: 2,
        right: 2,
        top: 1,
        bottom: 2,
      },
      maxFontSize: 16,
    };
  } else {
    bannerCount = ShieldDef.getBannerCount(shieldDef);
    padding = shieldDef.padding;

    var shieldArtwork = getRasterShieldBlank(network, ref);
    var compoundBounds = null;
    var shieldBounds = null;

    if (shieldArtwork == null) {
      if (typeof shieldDef.backgroundDraw != "undefined") {
        ctx = shieldDef.backgroundDraw(ref);
        compoundBounds = compoundShieldSize(ctx, bannerCount);
        shieldBounds = {
          width: ctx.canvas.width,
          height: ctx.canvas.height,
        };
      } else {
        return null;
      }
    } else {
      compoundBounds = compoundShieldSize(shieldArtwork.data, bannerCount);
      ctx = Gfx.getGfxContext(compoundBounds);
      loadShield(ctx, shieldArtwork, bannerCount);
      shieldBounds = {
        width: shieldArtwork.data.width,
        height: shieldArtwork.data.height,
      };
    }
  }

  if (!isValidRef(ref)) {
    if ("norefImage" in shieldDef || "backgroundDraw" in shieldDef) {
      //Valid shield with no ref to draw
      return ctx;
    }
    //No ref to draw, therefore draw nothing
    return null;
  }

  if (shieldDef.notext == true) {
    //If the shield definition says not to draw a ref, ignore ref
    return ctx;
  }

  //The ref is valid and we're supposed to draw it
  var textLayout = ShieldText.layoutShieldTextFromDef(
    ref,
    shieldDef,
    shieldBounds
  );

  textLayout.yBaseline += bannerCount * ShieldDef.bannerSizeH;

  ctx.fillStyle = textColor(shieldDef);
  ShieldText.drawShieldText(ctx, ref, textLayout);

  return ctx;
}

export function missingIconLoader(map, e) {
  var id = e.id;

  if (id == "shield_") {
    return;
  }

  var network_ref = id.split("_")[1];
  var network_ref_parts = network_ref.split("=");
  var network = network_ref_parts[0];
  var ref = network_ref_parts[1];

  var colorLighten = ShieldDef.shieldLighten(network, ref);

  var ctx = drawShield(network, ref);

  if (ctx == null) {
    //Does not meet the criteria to draw a shield
    return;
  }

  //Add modifier plaques above shields
  drawBanners(ctx, network);

  // Swap black with a different color for certain shields.
  // The secondary canvas is necessary here for some reason. Without it,
  // the recolored shield gets an opaque instead of transparent background.
  if (colorLighten != null) {
    let colorCtx = Gfx.getGfxContext(ctx.canvas);
    colorCtx.drawImage(ctx.canvas, 0, 0);
    colorCtx.globalCompositeOperation = "lighten";
    colorCtx.fillStyle = colorLighten;
    colorCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    colorCtx.globalCompositeOperation = "destination-atop";
    colorCtx.drawImage(ctx.canvas, 0, 0);
    ctx = colorCtx;
  }

  var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  map.addImage(
    id,
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
