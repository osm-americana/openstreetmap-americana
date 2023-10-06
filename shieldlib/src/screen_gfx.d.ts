import { StyleImage } from "maplibre-gl";
export declare const shieldFont: (size: string, fontFamily: string) => string;
export declare const fontSizeThreshold = 12;
export declare function blendedColorVal(
  sourceVal: any,
  lightenVal: any,
  darkenVal: any
): number;
export declare function copyPixel(
  source: any,
  dest: any,
  sourceOffset: any,
  destOffset: any
): void;
export declare function copyAndRecolorPixel(
  source: any,
  dest: any,
  sourceOffset: any,
  destOffset: any,
  colorLighten: any,
  colorDarken: any
): void;
export declare function transposeImageData(
  destination: CanvasRenderingContext2D,
  source: StyleImage,
  yOffset: number,
  verticalReflect: boolean,
  colorLighten: string,
  colorDarken: string
): void;
