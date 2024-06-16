import { DebugOptions } from "@americana/maplibre-shield-generator/src/types.js";
import config from "./config.js";

export const debugOptions: DebugOptions = {};

if (config.SHIELD_TEXT_HALO_COLOR_OVERRIDE) {
  debugOptions.shieldTextHaloColor = config.SHIELD_TEXT_HALO_COLOR_OVERRIDE;
}

if (config.SHIELD_TEXT_BBOX_COLOR) {
  debugOptions.shieldTextBboxColor = config.SHIELD_TEXT_BBOX_COLOR;
}

export { debugOptions as default };
