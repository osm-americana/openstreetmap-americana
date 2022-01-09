"use strict";

import * as ShieldDef from "./shield_defs.js";
import * as ShieldText from "./shield_text.js";
import * as Gfx from "./screen_gfx.js";

function loadShield(ctx, shield) {
  var scaleCanvas = document.createElement("canvas");
  var scaleCtx = scaleCanvas.getContext("2d");
  var imgData = scaleCtx.createImageData(shield.data.width, shield.data.height);

  scaleCtx.imageSmoothingQuality = "high";

  for (var i = 0; i < shield.data.data.length; i++) {
    imgData.data[i] = shield.data.data[i];
  }

  scaleCtx.putImageData(imgData, 0, 0);

  ctx.scale(Gfx.spriteUpscale, Gfx.spriteUpscale);
  ctx.drawImage(scaleCanvas, 0, 0);
  ctx.scale(1 / Gfx.spriteUpscale, 1 / Gfx.spriteUpscale);
}

function drawShieldText(ctx, ref, textLayout) {
  //Text color is set by fillStyle
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "bold " + textLayout.fontPx + Gfx.fontSizeType + " sans-serif";

  ctx.fillText(ref, textLayout.xBaseline, textLayout.yBaseline);
}

const bannerSizeH = 40;

function drawBannerText(ctx, ref, textLayout, bannerIndex) {
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = "bold " + textLayout.fontPx + Gfx.fontSizeType + " sans-serif";
  ctx.shadowColor = "white";
  ctx.shadowBlur = 10;

  //TODO figure out scaling issue

  textLayout = ShieldText.layoutShieldTextBbox(
    ctx,
    ref,
    {
      left: 3,
      right: 3,
      top: 1,
      bottom: 1,
    },
    { width: ctx.canvas.width, height: bannerSizeH }
  );

  //TODO draw text
  // ctx.fillText(ref, textLayout.xBaseline, textLayout.yBaseline);
}

function drawBanners(baseCtx, network) {
  var shieldDef = ShieldDef.shields[network];

  if (shieldDef == null || typeof shieldDef.modifiers == "undefined") {
    return baseCtx; //Unadorned shield
  }

  console.log(network);
  var banners = shieldDef.modifiers;

  var bannerHeight = banners.length * bannerSizeH;
  var canvas = document.createElement("canvas");
  canvas.width = baseCtx.canvas.width;
  canvas.height = baseCtx.canvas.height + bannerHeight;

  var ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";

  ctx.scale(Gfx.spriteUpscale, Gfx.spriteUpscale);
  ctx.drawImage(baseCtx.canvas, 0, bannerHeight);
  ctx.scale(1 / Gfx.spriteUpscale, 1 / Gfx.spriteUpscale);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, bannerHeight);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, bannerHeight);

  for (var i = 0; i < banners.length; i++) {
    drawBannerText(ctx, banners[i], i);
  }

  return ctx;
}

function drawRasterShields(ctx, network, ref) {
  var shieldDef = ShieldDef.shields[network];
  var shieldArtwork;
  var textLayout;

  if (Array.isArray(shieldDef.backgroundImage)) {
    for (var i = 0; i < shieldDef.backgroundImage.length; i++) {
      shieldArtwork = shieldDef.backgroundImage[i];

      Gfx.setCanvasWidth(ctx, shieldArtwork.data);
      textLayout = ShieldText.layoutShieldText(ctx, ref, shieldDef.padding);
      if (textLayout.fontPx > Gfx.fontSizeThreshold) {
        break;
      }
    }
  } else {
    shieldArtwork = shieldDef.backgroundImage;
    Gfx.setCanvasWidth(ctx, shieldArtwork.data);
    textLayout = ShieldText.layoutShieldText(ctx, ref, shieldDef.padding);
  }

  //Special cases
  if (ref.length == 0) {
    shieldArtwork = ShieldDef.getNoRefArtwork(network);

    if (shieldArtwork == null) {
      return false;
    }

    Gfx.setCanvasWidth(ctx, shieldArtwork.data);
  }

  loadShield(ctx, shieldArtwork);

  if (shieldDef.notext != true) {
    ctx.fillStyle = shieldDef.textColor;
    drawShieldText(ctx, ref, textLayout);
  }

  return true;
}

function drawShieldsToCanvas(ctx, network, ref) {
  //Default draw size
  ctx.canvas.width = 80;
  ctx.canvas.height = 80;

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

      Gfx.setCanvasWidth(ctx, { height: 80, width: 80 });

      var textLayout = ShieldText.layoutShieldTextBbox(ctx, ref, {
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

  var colorLighten = null;

  var c = document.createElement("canvas");

  var ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var drawComplete = false;

  if (ShieldDef.hasShieldArtwork(network)) {
    drawComplete |= drawRasterShields(ctx, network, ref);
    if (drawComplete) {
      colorLighten = ShieldDef.shieldLighten(network, ref);
    }
  }
  if (!drawComplete) {
    drawComplete |= drawShieldsToCanvas(ctx, network, ref, 2);
  }
  if (!drawComplete && ref != null && ref != "" && ref.length <= 4) {
    //Draw generic square shield

    Gfx.setCanvasWidth(ctx, { width: 80, height: 80 });

    var textLayout = ShieldText.layoutShieldText(ctx, ref, {
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

  //Add modifier plaques above shields
  ctx = drawBanners(ctx, network);

  var desiredHeight = 20 * window.devicePixelRatio;
  var scale = desiredHeight / ctx.canvas.height;

  var scaleCanvas = document.createElement("canvas");
  scaleCanvas.height = desiredHeight;
  scaleCanvas.width = ctx.canvas.width * scale;

  var scaleCtx = scaleCanvas.getContext("2d");
  scaleCtx.imageSmoothingQuality = "high";
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
