"use strict";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
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

  var banners = shieldDef.modifiers;

  var bannerHeight = banners.length * ShieldDef.bannerSizeH;
  var canvas = document.createElement("canvas");
  canvas.width = ctx.canvas.width;
  canvas.height = ctx.canvas.height + bannerHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, bannerHeight);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, bannerHeight);

  ctx.fillStyle = "black";

  for (var i = 0; i < banners.length; i++) {
    ShieldText.drawBannerText(ctx, banners[i], i);
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

function drawRasterShields(network, ref) {
  var shieldDef = ShieldDef.shields[network];
  if (shieldDef == null) {
    return null;
  }

  var bannerCount = ShieldDef.getBannerCount(shieldDef);

  var shieldArtwork = getRasterShieldBlank(network, ref);
  if (shieldArtwork == null) {
    return null;
  }
  var bounds = compoundShieldSize(shieldArtwork.data, bannerCount);
  var textLayout = ShieldText.layoutShieldText(
    ref,
    shieldDef.padding,
    shieldArtwork.data
  );

  textLayout.yBaseline += bannerCount * ShieldDef.bannerSizeH;

  var ctx = Gfx.getGfxContext(bounds);
  loadShield(ctx, shieldArtwork, bannerCount);

  if (shieldDef.notext != true) {
    ctx.fillStyle = shieldDef.textColor;
    ShieldText.drawShieldText(ctx, ref, textLayout);

    //Below: font size debugging (magenta padding)
    /*
    ctx.fillStyle = "#FF00FF80";
    ctx.fillRect(0, 0, ctx.canvas.width, shieldDef.padding.top);
    ctx.fillRect(0, 0, shieldDef.padding.left, ctx.canvas.width);
    ctx.fillRect(
      0,
      ctx.canvas.height - shieldDef.padding.top,
      ctx.canvas.width,
      shieldDef.padding.top
    );
    ctx.fillRect(
      ctx.canvas.width - shieldDef.padding.right,
      0,
      shieldDef.padding.right,
      ctx.canvas.height
    );
    */
    //Above: font size debugging
  }

  return ctx;
}

function drawShieldsToCanvas(network, ref, bannerSize) {
  //TODO implement banners

  var ctx = null;
  var squareBounds = { width: 80, height: 80 };

  switch (network) {
    case "US:PA:Belt":
      ctx = Gfx.getGfxContext(squareBounds);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 80, 80);
      ctx.lineWidth = 8;
      ctx.strokeStyle = "black";
      ctx.strokeRect(0, 0, 80, 80);

      ctx.beginPath();
      ctx.arc(40, 40, 22, 0, 2 * Math.PI, false);

      switch (ref) {
        case "Red Belt":
          ctx.fillStyle = "#b01c2e";
          break;
        case "Orange Belt":
          ctx.fillStyle = "#d97300";
          break;
        case "Yellow Belt":
          ctx.fillStyle = "#f7d117";
          break;
        case "Green Belt":
          ctx.fillStyle = "#006b54";
          break;
        case "Blue Belt":
          ctx.fillStyle = "#003882";
          break;
        default:
          return null;
      }

      ctx = Gfx.getGfxContext(squareBounds);
      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "black";
      ctx.stroke();
      break;

    //Circle shields
    case "US:DE":
    case "US:IA":
    case "US:MS":
    case "US:NJ":
    case "US:VA:Secondary":
      if (ref == null || ref.length == 0) {
        return null;
      }

      ctx = Gfx.getGfxContext(squareBounds);
      ctx.beginPath();
      ctx.arc(40, 40, 37.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.lineWidth = 5;
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.fillStyle = "black";

      var textLayout = ShieldText.layoutShieldText(
        ref,
        {
          left: 11,
          right: 11,
          top: 11,
          bottom: 11,
        },
        squareBounds
      );
      ShieldText.drawShieldText(ctx, ref, textLayout);
      break;
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

  var ctx = drawRasterShields(network, ref);

  if (ctx == null) {
    ctx = drawShieldsToCanvas(network, ref, 0);
  }

  if (ctx == null && ref != "" && ref.length <= 4) {
    //Draw generic square shield

    var squareBounds = { width: 80, height: 80 };

    var textLayout = ShieldText.layoutShieldText(
      ref,
      {
        left: 7,
        right: 7,
        top: 18,
        bottom: 18,
      },
      squareBounds
    );

    ctx = Gfx.getGfxContext(squareBounds);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 80, 80);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 80, 80);
    ctx.fillStyle = "black";

    ShieldText.drawShieldText(ctx, ref, textLayout);
  }

  if (ctx == null) {
    //Does not meet the criteria to draw a shield
    return;
  }

  //Add modifier plaques above shields
  drawBanners(ctx, network);

  if (ctx == null) {
    console.log("OOPS A");
  }
  if (ctx.canvas == null) {
    console.log("OOPS B " + network + "=" + ref);
  }

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
