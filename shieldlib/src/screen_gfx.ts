import { StyleImage } from "maplibre-gl";

import rgba from "color-rgba";

const defaultFontFamily = '"sans-serif-condensed", "Arial Narrow", sans-serif';
export const shieldFont = (size: string, fontFamily: string) =>
  `bold ${size}px ${fontFamily || defaultFontFamily}`;
export const fontSizeThreshold = 12;

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

export function transposeImageData(
  destination: CanvasRenderingContext2D,
  source: StyleImage,
  yOffset: number,
  verticalReflect: boolean,
  colorLighten: string,
  colorDarken: string
): void {
  let imgData = destination.createImageData(
    source.data.width,
    source.data.height
  );

  let pixelCopyFn =
    colorLighten || colorDarken ? copyAndRecolorPixel : copyPixel;

  let lighten = colorLighten ? rgba(colorLighten) : rgba("#000");
  let darken = colorDarken ? rgba(colorDarken) : rgba("#fff");

  if (!verticalReflect) {
    for (let i = 0; i < source.data.data.length; i += 4) {
      pixelCopyFn(source.data.data, imgData.data, i, i, lighten, darken);
    }
  } else {
    //4 bytes/px, copy in reverse vertical order.
    for (let y = 0; y < source.data.height; y++) {
      for (let x = 0; x < source.data.width; x++) {
        let destRow = source.data.height - y - 1;
        let destIdx = (destRow * source.data.width + x) * 4;
        let srcIdx = (y * source.data.width + x) * 4;
        pixelCopyFn(
          source.data.data,
          imgData.data,
          srcIdx,
          destIdx,
          lighten,
          darken
        );
      }
    }
  }

  destination.putImageData(imgData, 0, yOffset);
}
