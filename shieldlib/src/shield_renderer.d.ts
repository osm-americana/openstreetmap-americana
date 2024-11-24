import {
  Map,
  MapStyleImageMissingEvent,
  StyleImage,
  StyleImageMetadata,
} from "maplibre-gl";
import {
  Bounds,
  DebugOptions,
  GraphicsFactory,
  RouteParser,
  ShapeBlankParams,
  ShieldDefinitions,
  ShieldOptions,
  ShieldSpecification,
  SpriteRepository,
  StringPredicate,
} from "./types";
export declare class ShieldRenderingContext {
  shieldDef: ShieldDefinitions;
  options: ShieldOptions;
  debugOptions: DebugOptions;
  gfxFactory: GraphicsFactory;
  spriteRepo: SpriteRepository;
  private _emptySpriteCache;
  emptySprite(): CanvasRenderingContext2D;
  px(pixels: number): number;
  shieldSize(): number;
}
export declare type ShapeDrawFunction = (
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  params: ShapeBlankParams,
  ref: string
) => void;
export declare class AbstractShieldRenderer {
  private _shieldPredicate;
  private _networkPredicate;
  private _routeParser;
  private _renderContext;
  constructor(routeParser: RouteParser);
  protected setShields(shieldSpec: ShieldSpecification): void;
  debugOptions(debugOptions: DebugOptions): AbstractShieldRenderer;
  filterImageID(shieldPredicate: StringPredicate): AbstractShieldRenderer;
  filterNetwork(networkPredicate: StringPredicate): AbstractShieldRenderer;
  graphicsFactory(gfxFactory: GraphicsFactory): AbstractShieldRenderer;
  renderOnMaplibreGL(map: Map): AbstractShieldRenderer;
  renderOnRepository(repo: SpriteRepository): AbstractShieldRenderer;
  getStyleImageMissingHandler(): (e: MapStyleImageMissingEvent) => void;
  getGraphicForRoute(
    network: string,
    ref: string,
    name: string
  ): CanvasRenderingContext2D;
  emptySprite(): CanvasRenderingContext2D;
  createGraphics(bounds: Bounds): CanvasRenderingContext2D;
  pixelRatio(): number;
}
export declare class ShieldRenderer extends AbstractShieldRenderer {
  constructor(shieldSpec: ShieldSpecification, routeParser: RouteParser);
}
export declare class URLShieldRenderer extends AbstractShieldRenderer {
  constructor(shieldsURL: URL, routeParser: RouteParser);
  setShieldURL(shieldsURL: URL): Promise<void>;
}
export declare class InMemorySpriteRepository implements SpriteRepository {
  sprites: {};
  getSprite(spriteID: string): StyleImage;
  hasSprite(spriteID: string): boolean;
  putSprite(
    spriteID: string,
    image: ImageData,
    options: StyleImageMetadata,
    update: boolean
  ): void;
}
export {};
