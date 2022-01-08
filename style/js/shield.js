"use strict";

import * as ShieldDef from "./shield_defs.js";

const spriteUpscale = window.devicePixelRatio > 1 ? 1 : 2;

const fontSizeType = "px";
const fontSizeThreshold = 48;
const fontSizeMax = 48;

function loadShield(ctx, shield) {
  var scaleCanvas = document.createElement("canvas");
  var scaleCtx = scaleCanvas.getContext("2d");
  var imgData = scaleCtx.createImageData(shield.data.width, shield.data.height);

  scaleCtx.imageSmoothingQuality = "high";

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }

  scaleCtx.putImageData(imgData, 0, 0);

  ctx.scale(spriteUpscale, spriteUpscale);
  ctx.drawImage(scaleCanvas, 0, 0);
  ctx.scale(1 / spriteUpscale, 1 / spriteUpscale);
}

function drawShieldText(ctx, ref, textLayout) {
  //Text color is set by fillStyle
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "bold " + textLayout.fontPx + fontSizeType + " sans-serif";

  ctx.fillText(ref, textLayout.xBaseline, textLayout.yBaseline);
}

function layoutShieldText(c, ctx, ref, shieldBlank, padding) {
  var padding = padding || {};
  var padTop = padding.top || 0;
  var padBot = padding.bottom || 0;
  var padLeft = padding.left || 0;
  var padRight = padding.right || 0;

  if (shieldBlank != null) {
    c.width = shieldBlank.data.width * spriteUpscale;
    c.height = shieldBlank.data.height * spriteUpscale;
  }

  ctx.font = "bold " + fontSizeThreshold + fontSizeType + " sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  var metrics = ctx.measureText(ref);

  var width = c.width;
  var height = c.height;

  var textWidth = metrics.width;
  var textHeight = metrics.actualBoundingBoxAscent;

  var availHeight = height - padTop - padBot;
  var availWidth = width - padLeft - padRight;

  var xBaseline = padLeft + availWidth / 2;

  var scaleHeight = availHeight / textHeight;
  var scaleWidth = availWidth / textWidth;

  var scale = Math.min(scaleWidth, scaleHeight);

  var fontSize = Math.min(fontSizeMax, fontSizeThreshold * scale);

  ctx.font = "bold " + fontSize + fontSizeType + " sans-serif";
  metrics = ctx.measureText(ref);
  textHeight = metrics.actualBoundingBoxAscent;
  var marginY = (height - padTop - padBot - textHeight) / 2;

  return {
    xBaseline: xBaseline,
    yBaseline: c.height - padBot - marginY,
    fontPx: fontSize * scale,
  };
}

function drawBannerText(c, ctx, ref, bannerIndex) {
  //TODO copy code from shield ref drawing

  var metrics = ctx.measureText(ref);
  var textWidth = metrics.width;

  var textHeight = metrics.actualBoundingBoxAscent;

  var desiredWidth = c.width;
  var scaleWidth = desiredWidth / textWidth;

  var desiredHeight = c.height;
  var scaleHeight = desiredHeight / textHeight;
  var desiredRenderHeight = c.height / scaleHeight;
  scaleHeight = Math.min(scaleWidth, scaleHeight);

  var renderHeight = desiredHeight / scaleHeight;

  var vBaselineOffset = (desiredRenderHeight - renderHeight) / 2;

  ctx.scale(scaleWidth, scaleHeight);
  ctx.shadowColor = "white";
  ctx.shadowBlur = 10;
  ctx.fillText(ref, bannerIndex * 40, -1.8 * vBaselineOffset, 80);

  ctx.scale(1 / scaleWidth, 1 / scaleHeight);
}

let bannerSizeH = 40;

function drawBanners(c, banners) {
  var bannerHeight = banners.length * bannerSizeH;
  var canvas = document.createElement("canvas");
  canvas.width = c.width;
  canvas.height = c.height + bannerHeight;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(c, 0, bannerHeight);

  ctx.fillStyle = "black";
  for (var i = 0; i < banners.length; i++) {
    drawBannerText(c, ctx, banners[i], i);
  }

  return canvas;
}

function drawRasterShields(c, ctx, network, ref) {
  var shieldDef = ShieldDef.shields[network];
  var shieldArtwork;
  var textLayout;

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shieldArtwork = shieldDef.backgroundImage[i];
      textLayout = layoutShieldText(
        c,
        ctx,
        ref,
        shieldArtwork,
        shieldDef.padding
      );
      if (textLayout.fontPx > fontSizeThreshold) {
        break;
      }
    }
  } else {
    shieldArtwork = shieldDef.backgroundImage;
    textLayout = layoutShieldText(
      c,
      ctx,
      ref,
      shieldArtwork,
      shieldDef.padding
    );
  }

  //Special cases
  if (ref.length == 0) {
    shieldArtwork = ShieldDef.getNoRefArtwork(network);

    if (shieldArtwork == null) {
      return false;
    }

    c.width = shieldArtwork.data.width * spriteUpscale;
    c.height = shieldArtwork.data.height * spriteUpscale;
  }

  loadShield(ctx, shieldArtwork);

  if (shieldDef.notext != true) {
    ctx.fillStyle = shieldDef.textColor;
    drawShieldText(ctx, ref, textLayout);
  }
  /*
  if (typeof shieldDef.modifiers !== "undefined") {
    c = drawBanners(c, shieldDef.modifiers);
  }
  */
  return true;
}

function drawShieldsToCanvas(c, ctx, network, ref) {
  //Default draw size
  c.width = 80;
  c.height = 80;

  switch (network) {
    case "US:PA:Belt":
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
          return;
      }

      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "black";
      ctx.stroke();
      return true;

    //Circle shields
    case "US:DE":
    case "US:IA":
    case "US:MS":
    case "US:NJ":
    case "US:VA:Secondary":
      if (ref == null || ref.length == 0) {
        return false;
      }

      ctx.beginPath();
      ctx.arc(40, 40, 37.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.lineWidth = 5;
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.fillStyle = "black";

      var textLayout = layoutShieldText(c, ctx, ref, null, {
        left: 11,
        right: 11,
        top: 11,
        bottom: 11,
      });
      drawShieldText(ctx, ref, textLayout);

      return true;
  }
  return false;
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

  var colorLighten = null;

  var c = document.createElement("canvas");

  var ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var drawComplete = false;

  if (ShieldDef.hasShieldArtwork(network)) {
    drawComplete |= drawRasterShields(c, ctx, network, ref);
    if (drawComplete) {
      colorLighten = ShieldDef.shieldLighten(network, ref);
    }
  }
  if (!drawComplete) {
    drawComplete |= drawShieldsToCanvas(c, ctx, network, ref, 2);
  }
  if (!drawComplete && ref != null && ref != "" && ref.length <= 4) {
    //Draw generic square shield

    c.width = 80;
    c.height = 80;

    var textLayout = layoutShieldText(c, ctx, ref, null, {
      left: 7,
      right: 7,
      top: 18,
      bottom: 18,
    });

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 80, 80);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 80, 80);
    ctx.fillStyle = "black";

    drawShieldText(ctx, ref, textLayout);

    drawComplete = true;
  }

  if (!drawComplete) {
    //Does not meet the criteria to draw a shield
    return;
  }

  var desiredHeight = 20 * window.devicePixelRatio;
  var scale = desiredHeight / c.height;

  var scaleCanvas = document.createElement("canvas");
  scaleCanvas.height = desiredHeight;
  scaleCanvas.width = c.width * scale;

  var scaleCtx = scaleCanvas.getContext("2d");
  scaleCtx.scale(scale, scale);
  scaleCtx.drawImage(c, 0, 0);

  if (colorLighten != null) {
    scaleCtx.globalCompositeOperation = "lighten";
    scaleCtx.imageSmoothingQuality = "high";
    scaleCtx.fillStyle = colorLighten;
    scaleCtx.fillRect(0, 0, c.width, c.height);
    scaleCtx.globalCompositeOperation = "destination-atop";
    scaleCtx.drawImage(c, 0, 0);
  }

  var imgData = scaleCtx.getImageData(
    0,
    0,
    scaleCanvas.width,
    scaleCanvas.height
  );

  map.addImage(
    id,
    {
      width: scaleCanvas.width,
      height: scaleCanvas.height,
      data: imgData.data,
    },
    {
      pixelRatio: window.devicePixelRatio,
    }
  );
}
