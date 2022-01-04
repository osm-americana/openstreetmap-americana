"use strict";

import * as ShieldDef from "./shield_defs.js";

function loadShield(ctx, shield) {
  var scaleCanvas = document.createElement("canvas");
  var scaleCtx = scaleCanvas.getContext("2d");
  var imgData = scaleCtx.createImageData(shield.data.width, shield.data.height);

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }
  scaleCtx.putImageData(imgData, 0, 0);

  ctx.putImageData(imgData, 0, 0);
}

var shields = {};
var shieldImages = [];
var shieldsLoaded = false;

function drawShieldText(ctx, ref, textLayout) {
  //Text color is set by fillStyle
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "bold " + textLayout.fontPx + "px sans-serif";

  ctx.fillText(ref, textLayout.xBaseline, textLayout.yBaseline);
}

function layoutShieldText(c, ctx, ref, padding) {
  var padding = padding || {};
  var padTop = padding.top || 0;
  var padBot = padding.bottom || 0;
  var padLeft = padding.left || 0;
  var padRight = padding.right || 0;

  ctx.font = "bold 48px sans-serif";
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

  ctx.font = "bold " + 48 * scale + "px sans-serif";
  metrics = ctx.measureText(ref);
  textHeight = metrics.actualBoundingBoxAscent;
  var marginY = (height - padTop - padBot - textHeight) / 2;

  return {
    xBaseline: xBaseline,
    yBaseline: c.height - padBot - marginY,
    fontPx: 48 * scale,
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

var colorLighten = null;

function drawRasterShields(c, ctx, network, ref) {
  var shieldDef = shields[network];
  var shield;
  var textLayout;

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shield = shieldDef.backgroundImage[i];
      c.width = shield.data.width;
      c.height = shield.data.height;
      textLayout = layoutShieldText(c, ctx, ref, shieldDef.padding);
      if (textLayout.fontPx > 48) {
        break;
      }
    }
  } else {
    shield = shieldDef.backgroundImage;
    c.width = shield.data.width;
    c.height = shield.data.height;
    textLayout = layoutShieldText(c, ctx, ref, shieldDef.padding);
  }

  colorLighten = shieldDef.colorLighten;

  //Special cases
  if (ref.length == 0) {
    if (network == "US:PA:Turnpike") {
      shield = shieldImages.shield40_us_pa_turnpike_noref;
      c.width = shield.data.width;
      c.height = shield.data.height;
    } else {
      return false;
    }
  }

  loadShield(ctx, shield);

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
          ctx.fillStyle = "red";
          break;
        case "Orange Belt":
          ctx.fillStyle = "orange";
          break;
        case "Yellow Belt":
          ctx.fillStyle = "yellow";
          break;
        case "Green Belt":
          ctx.fillStyle = "green";
          break;
        case "Blue Belt":
          ctx.fillStyle = "blue";
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

      var textLayout = layoutShieldText(c, ctx, ref, {
        left: 8,
        right: 8,
        top: 8,
        bottom: 8,
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

  shieldImages = map.style.imageManager.images;

  if (!shieldsLoaded) {
    shields = ShieldDef.loadShields(map.style.imageManager.images);
    shieldsLoaded = true;
  }

  var network_ref = id.split("_")[1];
  var network_ref_parts = network_ref.split("=");
  var network = network_ref_parts[0];
  var ref = network_ref_parts[1];

  var width = 40;
  var height = 40;

  var colorLighten = null;

  var c = document.createElement("canvas");

  var ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.mozImageSmoothingEnabled = true;
  ctx.webkitImageSmoothingEnabled = true;
  ctx.msImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var drawComplete = false;

  if (
    shields[network] != null &&
    typeof shields[network].backgroundImage !== "undefined"
  ) {
    drawComplete |= drawRasterShields(c, ctx, network, ref);
  }
  if (!drawComplete) {
    drawComplete |= drawShieldsToCanvas(c, ctx, network, ref, 2);
  }
  if (!drawComplete && ref != null && ref != "" && ref.length <= 4) {
    //Draw generic square shield
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 80, 80);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 80, 80);
    ctx.fillStyle = "black";
    var textLayout = layoutShieldText(c, ctx, ref, {
      left: 7,
      right: 7,
      top: 10,
      bottom: 15,
    });
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
    scaleCtx.fillStyle = colorLighten;
    scaleCtx.fillRect(0, 0, width * scaleW, height * scaleH);
    scaleCtx.globalCompositeOperation = "destination-atop";
    scaleCtx.drawImage(c, 0, 0);
  }

  //Update height to add banners
  //  height = scaleH * c.height;

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
