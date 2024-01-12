import { shieldFont } from "./screen_gfx";
import { ShieldRenderingContext } from "./shield_renderer";
import { TextPlacement, layoutShieldText } from "./shield_text";
import { Dimension, ShieldDefinition, TextLayout } from "./types";

let bannerLayout: TextLayout = {
  constraintFunc: "rect",
};

/**
 * Add modifier plaque text
 *
 * @param r - Shield rendering context
 * @param ctx - Canvas drawing context
 * @param shieldDef - Shield definition
 */
export function drawBanners(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  shieldDef: ShieldDefinition
) {
  if (shieldDef.bannerTextColor) {
    ctx.fillStyle = shieldDef.bannerTextColor;
  } else {
    ctx.fillStyle = r.options.bannerTextColor;
  }
  drawBannerPart(r, ctx, shieldDef, drawBannerText);
}

/**
 * Add the halo around modifier plaque text
 *
 * @param r - Shield rendering context
 * @param ctx - Canvas drawing context
 * @param shieldDef - Shield definition
 */
export function drawBannerHalos(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  shieldDef: ShieldDefinition
) {
  if (shieldDef.bannerTextHaloColor) {
    ctx.strokeStyle = ctx.shadowColor = shieldDef.bannerTextHaloColor;
  } else {
    ctx.strokeStyle = ctx.shadowColor = r.options.bannerTextHaloColor;
  }
  drawBannerPart(r, ctx, shieldDef, drawBannerHaloText);
}

type BannerDrawComponentFunction = (
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  bannerIndex: number
) => void;

function drawBannerPart(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  shieldDef: ShieldDefinition,
  drawFunc: BannerDrawComponentFunction
): void {
  if (shieldDef == null || typeof shieldDef.banners == "undefined") {
    return; //Unadorned shield
  }

  for (var i = 0; i < shieldDef.banners.length; i++) {
    drawFunc(r, ctx, shieldDef.banners[i], i);
  }
}

/**
 * Get the number of banner placards associated with this shield
 *
 * @param shield - Shield definition
 * @returns the number of banner placards that need to be drawn
 */
export function getBannerCount(shield: ShieldDefinition): number {
  if (shield == null || typeof shield.banners == "undefined") {
    return 0; //Unadorned shield
  }
  return shield.banners.length;
}

/**
 * Draw text on a modifier plate above a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  bannerIndex: number
): void {
  drawBannerTextComponent(r, ctx, text, bannerIndex, true);
}

/**
 * Draw drop shadow for text on a modifier plate above a shield
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 */
export function drawBannerHaloText(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  bannerIndex: number
): void {
  drawBannerTextComponent(r, ctx, text, bannerIndex, false);
}

/**
 * Banners are composed of two components: text on top, and a shadow beneath.
 *
 * @param {*} r - rendering context
 * @param {*} ctx - graphics context to draw to
 * @param {*} text - text to draw
 * @param {*} bannerIndex - plate position to draw, 0=top, incrementing
 * @param {*} textComponent - if true, draw the text.  If false, draw the halo
 */
function drawBannerTextComponent(
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  text: string,
  bannerIndex: number,
  textComponent: boolean
): void {
  const bannerPadding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  let bannerBounds: Dimension = {
    width: ctx.canvas.width,
    height: r.px(r.options.bannerHeight - r.options.bannerPadding),
  };

  let textLayout: TextPlacement = layoutShieldText(
    r,
    text,
    bannerPadding,
    bannerBounds,
    bannerLayout
  );

  ctx.font = shieldFont(textLayout.fontPx, r.options.shieldFont);
  ctx.textBaseline = "top";
  ctx.textAlign = "center";

  if (textComponent) {
    ctx.fillText(
      text,
      textLayout.xBaseline,
      textLayout.yBaseline +
        bannerIndex * r.px(r.options.bannerHeight + r.options.bannerPadding)
    );
  } else {
    ctx.shadowBlur = 0;
    ctx.lineWidth = r.px(2);
    ctx.strokeText(
      text,
      textLayout.xBaseline,
      textLayout.yBaseline +
        bannerIndex * r.px(r.options.bannerHeight + r.options.bannerPadding)
    );

    ctx.shadowColor = null;
    ctx.shadowBlur = null;
  }
}
