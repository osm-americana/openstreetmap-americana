import { transposeImageData } from "@americana/maplibre-shield-generator";

export function missingIconHandler(shieldRenderer, map, e) {
  try {
    missingIconLoader(shieldRenderer, map, e);
  } catch (err) {
    console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
  }
}

export function missingIconLoader(shieldRenderer, map, e) {
  var sprite = e.id.split("\n")[1].split("=")[1];
  var color = e.id.split("\n")[2].split("=")[1];

  var sourceSprite = map.style.getImage(sprite);

  var width = sourceSprite.data.width;
  var height = sourceSprite.data.height;

  var ctx = shieldRenderer.createGraphics({ width, height });
  transposeImageData(ctx, sourceSprite, 0, false, color);

  if (ctx == null) {
    // Want to return null here, but that gives a corrupted display. See #243
    console.warn("Didn't produce an icon for", JSON.stringify(e.id));
    ctx = shieldRenderer.createGraphics({ width: 1, height: 1 });
  }

  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
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
