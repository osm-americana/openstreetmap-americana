"use strict";

import rgba from "color-rgba";

const nonLatinFonts =
  '"Noto Naskh Arabic", "Noto Sans Armenian", "Noto Sans Georgian"';
const fontFamily = `"sans-serif-condensed", "Arial Narrow", ${nonLatinFonts}, sans-serif`;
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

// Replaces `sourceVal` with a blend of `lightenVal` and `darkenVal` proportional to the brightness;
// i.e. white becomes `darkenVal`, black becomes `lightenVal`, and anit-aliased pixels remain anit-aliased
export function blendedColorVal(sourceVal, lightenVal, darkenVal) {
  return (
    255 -
    (sourceVal / 255) * (255 - darkenVal) -
    (1 - sourceVal / 255) * (255 - lightenVal)
  );
}

export function copyPixel(source, dest, sourceOffset, destOffset) {
  //Red
  dest[destOffset] = source[sourceOffset];
  //Green
  dest[destOffset + 1] = source[sourceOffset + 1];
  //Blue
  dest[destOffset + 2] = source[sourceOffset + 2];
  //Alpha
  dest[destOffset + 3] = source[sourceOffset + 3];
}

export function copyAndRecolorPixel(
  source,
  dest,
  sourceOffset,
  destOffset,
  colorLighten,
  colorDarken
) {
  //Red
  dest[destOffset] = blendedColorVal(
    source[sourceOffset],
    colorLighten[0],
    colorDarken[0]
  );
  //Green
  dest[destOffset + 1] = blendedColorVal(
    source[sourceOffset + 1],
    colorLighten[1],
    colorDarken[1]
  );
  //Blue
  dest[destOffset + 2] = blendedColorVal(
    source[sourceOffset + 2],
    colorLighten[2],
    colorDarken[2]
  );
  //Alpha
  dest[destOffset + 3] = source[sourceOffset + 3];
}

export function copyImageData(
  ctx,
  sourceImage,
  yOffset,
  verticalReflect,
  colorLighten,
  colorDarken
) {
  let imgData = ctx.createImageData(
    sourceImage.data.width,
    sourceImage.data.height
  );

  let pixelCopyFn =
    colorLighten || colorDarken ? copyAndRecolorPixel : copyPixel;

  let lighten = colorLighten ? rgba(colorLighten) : rgba("#000");
  let darken = colorDarken ? rgba(colorDarken) : rgba("#fff");

  if (!verticalReflect) {
    for (let i = 0; i < sourceImage.data.data.length; i += 4) {
      pixelCopyFn(sourceImage.data.data, imgData.data, i, i, lighten, darken);
    }
  } else {
    //4 bytes/px, copy in reverse vertical order.
    for (let y = 0; y < sourceImage.data.height; y++) {
      for (let x = 0; x < sourceImage.data.width; x++) {
        let destRow = sourceImage.data.height - y - 1;
        let destIdx = (destRow * sourceImage.data.width + x) * 4;
        let srcIdx = (y * sourceImage.data.width + x) * 4;
        pixelCopyFn(
          sourceImage.data.data,
          imgData.data,
          srcIdx,
          destIdx,
          lighten,
          darken
        );
      }
    }
  }

  ctx.putImageData(imgData, 0, yOffset);
}
