import {
  transposeImageData,
  AbstractShieldRenderer,
} from "@americana/maplibre-shield-generator";
import { Map, MapStyleImageMissingEvent, StyleImage } from "maplibre-gl";

export function missingIconHandler(
  shieldRenderer: AbstractShieldRenderer,
  map: Map,
  e: MapStyleImageMissingEvent
) {
  try {
    missingIconLoader(shieldRenderer, map, e);
  } catch (err) {
    console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
  }
}

export function missingIconLoader(
  shieldRenderer: AbstractShieldRenderer,
  map: Map,
  e: MapStyleImageMissingEvent
) {
  const sprite: string = e.id.split("\n")[1].split("=")[1];
  const color: string = e.id.split("\n")[2].split("=")[1];

  const sourceSprite: StyleImage = map.style.getImage(sprite);

  if (!sourceSprite) {
    console.error(`No such sprite ${sprite}`);
    return;
  }

  const width: number = sourceSprite.data.width;
  const height: number = sourceSprite.data.height;

  let ctx: CanvasRenderingContext2D = shieldRenderer.createGraphics({
    width,
    height,
  });
  transposeImageData(ctx, sourceSprite, 0, false, color);

  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce an icon for", JSON.stringify(e.id));
    ctx = shieldRenderer.createGraphics({ width: 1, height: 1 });
  }

  const imgData: ImageData = ctx.getImageData(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  );
  map.addImage(
    e.id,
    {
      width: ctx.canvas.width,
      height: ctx.canvas.height,
      data: imgData.data,
    },
    {
      pixelRatio: shieldRenderer.pixelRatio(),
    }
  );
}
