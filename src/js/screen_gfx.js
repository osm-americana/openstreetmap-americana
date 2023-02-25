"use strict";

import rgba from "color-rgba";

const fontFamily = '"sans-serif-condensed", "Arial Narrow", sans-serif';
export const shieldFont = (size) => `bold ${size}px ${fontFamily}`;
export const fontSizeThreshold = 12;

var gfxFactory = getDocumentGfxContext;

export function setGfxFactory(factory) {
  gfxFactory = factory;
}

export function getGfxContext(bounds) {
  return gfxFactory(bounds);
}

export function getDocumentGfxContext(bounds) {
  var ctx = document.createElement("canvas").getContext("2d");
  var ctx = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingQuality = "high";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.canvas.width = bounds.width;
  ctx.canvas.height = bounds.height;
  return ctx;
}

/**
 * Get pixel ratio MapLibre is using for icons based on devicePixelRatio (DPR).
 * MapLibre uses 2x sprites whenever DPR > 1 and 1x sprites otherwise.
 * So this function will always return 1 or 2 as appropriate based on DPR.
 */
export function getPixelRatio() {
  return (typeof window !== "undefined" && window.devicePixelRatio) > 1 ? 2 : 1;
}

// Replaces `sourceVal` with `lightenVal` in inverse proportion to the brightness;
// i.e. white remains white, black becomes `lightenVal`, and anit-aliased pixels remain anit-aliased
export function lightenedColor(sourceVal, lightenVal) {
  return 255 - (1 - sourceVal / 255) * (255 - lightenVal);
}

export function copyPixel(
  source,
  dest,
  sourceOffset,
  destOffset,
  colorLighten
) {
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

export function rgbaMatrix(colorLighten) {
  if (typeof colorLighten !== "undefined") {
    return rgba(colorLighten);
  }
  return null;
}

export function copyImageData(
  ctx,
  sourceImage,
  yOffset,
  verticalReflect,
  colorLighten
) {
  let imgData = ctx.createImageData(
    sourceImage.data.width,
    sourceImage.data.height
  );
  let lighten = rgbaMatrix(colorLighten);

  if (!verticalReflect) {
    for (let i = 0; i < sourceImage.data.data.length; i += 4) {
      copyPixel(sourceImage.data.data, imgData.data, i, i, lighten);
    }
  } else {
    //4 bytes/px, copy in reverse vertical order.
    for (let y = 0; y < sourceImage.data.height; y++) {
      for (let x = 0; x < sourceImage.data.width; x++) {
        let destRow = sourceImage.data.height - y - 1;
        let destIdx = (destRow * sourceImage.data.width + x) * 4;
        let srcIdx = (y * sourceImage.data.width + x) * 4;
        copyPixel(
          sourceImage.data.data,
          imgData.data,
          srcIdx,
          destIdx,
          lighten
        );
      }
    }
  }

  ctx.putImageData(imgData, 0, yOffset);
}
