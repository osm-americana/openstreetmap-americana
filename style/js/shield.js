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

  //Special cases
  if (ref.length == 0) {
    return ShieldDef.getNoRefArtwork(network);
  }

  if (typeof shieldDef == "undefined") {
    return null;
  }

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shieldArtwork = shieldDef.backgroundImage[i];
      bounds = compoundShieldSize(shieldArtwork.data, bannerCount);
      textLayout = ShieldText.layoutShieldText(ref, shieldDef.padding, bounds);
      if (textLayout.fontPx > Gfx.fontSizeThreshold) {
        break;
      }
    }
  } else {
    shieldArtwork = shieldDef.backgroundImage;
  }

  return shieldArtwork;
}

function drawShield(network, ref) {
  var shieldDef = ShieldDef.shields[network];
  var ctx = null;
  var textColor = "black";
  var bannerCount = 0;
  var padding = null;

  if (shieldDef == null) {
    if (ref == "") {
      return null;
    }

    //Generic shield
    ctx = ShieldDraw.square();
    shieldBounds = {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
    };
    padding = {
      left: 4,
      right: 4,
      top: 18,
      bottom: 18,
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

  if (shieldDef != null && typeof shieldDef.textColor != "undefined") {
    textColor = shieldDef.textColor;
  }

  if (shieldDef == null || shieldDef.notext != true) {
    var textLayout = ShieldText.layoutShieldText(ref, padding, shieldBounds);

    textLayout.yBaseline += bannerCount * ShieldDef.bannerSizeH;

    ctx.fillStyle = textColor;
    ShieldText.drawShieldText(ctx, ref, textLayout);
  }

  return ctx;
}

//Space between concurrent shields
const spacer_size = 15;

export function missingIconLoader(map, e) {
  var id = e.id;

  if (id == "shield_") {
    return;
  }

  if (id == "spacer") {
    map.addImage(id, {
      width: spacer_size,
      height: spacer_size,
      data: new Uint8Array(4 * spacer_size * spacer_size),
    });
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

  var scale = window.devicePixelRatio / 4;

  var scaleCtx = Gfx.getGfxContext({
    width: ctx.canvas.width * scale,
    height: ctx.canvas.height * scale,
  });

  scaleCtx.scale(scale, scale);
  scaleCtx.drawImage(ctx.canvas, 0, 0);

  if (colorLighten != null) {
    scaleCtx.globalCompositeOperation = "lighten";
    scaleCtx.fillStyle = colorLighten;
    scaleCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    scaleCtx.globalCompositeOperation = "destination-atop";
    scaleCtx.drawImage(ctx.canvas, 0, 0);
  }

  var imgData = scaleCtx.getImageData(
    0,
    0,
    scaleCtx.canvas.width,
    scaleCtx.canvas.height
  );

  map.addImage(
    id,
    {
      width: scaleCtx.canvas.width,
      height: scaleCtx.canvas.height,
      data: imgData.data,
    },
    {
      pixelRatio: window.devicePixelRatio,
    }
  );
}
