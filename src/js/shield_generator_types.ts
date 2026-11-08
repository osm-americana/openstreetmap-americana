/**
 * Local copies of shield-generator types used by Americana.
 *
 * The published `@americana/maplibre-shield-generator` package does not yet
 * ship TypeScript declaration files. Replace these with package imports once
 * typings are published.
 */
export interface DebugOptions {
  shieldTextBboxColor?: string;
  shieldTextHaloColor?: string;
}

export interface ShieldOptions {
  bannerHeight: number;
  bannerPadding: number;
  bannerTextColor: string;
  bannerTextHaloColor: string;
  shieldFont: string;
  shieldSize: number;
}

export interface ShieldDefinitions {
  [network: string]: unknown;
}

export interface ShieldSpecification {
  networks: ShieldDefinitions;
  options: ShieldOptions;
}
