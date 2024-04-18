import {
  Map as MapLibre,
  MapStyleImageMissingEvent,
  StyleImage,
  StyleImageMetadata,
} from "maplibre-gl";
import {
  Bounds,
  DebugOptions,
  GraphicsFactory,
  RouteDefinition,
  RouteParser,
  ShapeBlankParams,
  ShieldDefinitions,
  ShieldOptions,
  ShieldSpecification,
  SpriteRepository,
  StringPredicate,
} from "./types";
import {
  storeNoShield,
  missingIconLoader,
  generateShieldCtx,
} from "./shield.js";
import { DOMGraphicsFactory } from "./document_graphics";

export class ShieldRenderingContext {
  shieldDef: ShieldDefinitions;
  options: ShieldOptions;
  debugOptions: DebugOptions;
  gfxFactory: GraphicsFactory;
  spriteRepo: SpriteRepository;
  private _emptySpriteCache: CanvasRenderingContext2D;

  public emptySprite(): CanvasRenderingContext2D {
    if (!this._emptySpriteCache) {
      this._emptySpriteCache = this.gfxFactory.createGraphics({
        width: 1,
        height: 1,
      });
    }
    return this._emptySpriteCache;
  }
  public px(pixels: number): number {
    return pixels * this.gfxFactory.pixelRatio();
  }
  public shieldSize(): number {
    return this.px(this.options.shieldSize);
  }
}

export type ShapeDrawFunction = (
  r: ShieldRenderingContext,
  ctx: CanvasRenderingContext2D,
  params: ShapeBlankParams,
  ref?: string
) => number;

class MaplibreGLSpriteRepository implements SpriteRepository {
  map: MapLibre;
  constructor(map: MapLibre) {
    this.map = map;
  }
  getSprite(spriteID: string): StyleImage {
    return this.map.style.getImage(spriteID);
  }
  putSprite(
    spriteID: string,
    image: ImageData,
    options: StyleImageMetadata,
    update: boolean
  ): void {
    if (update && this.map.listImages().includes(spriteID)) {
      this.map.removeImage(spriteID);
      this.map.addImage(spriteID, image);
    } else {
      this.map.addImage(spriteID, image, options);
    }
  }
}

/** Base class for shield renderers. Shield renderers use a builder pattern to configure its options. */
export class AbstractShieldRenderer {
  private _shieldPredicate: StringPredicate = () => true;
  private _networkPredicate: StringPredicate = () => true;
  private _routeParser: RouteParser;
  private _fontSpec: string;
  private _map: MapLibre;
  private _fontsLoaded: boolean = false;
  /** Cache images that are loaded before fonts so they can be re-rendered later */
  private _preFontImageCache: Map<string, RouteDefinition> = new Map();

  /** @hidden */
  private _renderContext: ShieldRenderingContext;
  private _shieldDefCallbacks = [];

  /** Create a shield renderer */
  constructor(routeParser: RouteParser) {
    this._routeParser = routeParser;
    this._renderContext = new ShieldRenderingContext();
    this._renderContext.gfxFactory = new DOMGraphicsFactory();
  }

  /** Specify which shields to draw and with what graphics */
  protected setShields(shieldSpec: ShieldSpecification) {
    this._renderContext.options = shieldSpec.options;
    this._renderContext.shieldDef = shieldSpec.networks;
    this._fontSpec = "1em " + shieldSpec.options.shieldFont;
    console.log("ShieldJSON loaded");
    if (this._map) {
      this.reloadShieldsOnFontLoad();
    }
    this._shieldDefCallbacks.forEach((callback) =>
      callback(shieldSpec.networks)
    );
  }

  private onFontsLoaded() {
    this._fontsLoaded = true;
    if (this._preFontImageCache.size == 0) {
      return;
    }
    console.log("Re-processing shields with loaded fonts");

    // Loop through each previously-loaded shield and re-render it
    for (let [id, routeDef] of this._preFontImageCache.entries()) {
      missingIconLoader(this._renderContext, routeDef, id, true);
    }

    this._preFontImageCache.clear();
    this._map.redraw();
  }

  /** Get the shield definitions */
  public getShieldDefinitions(): ShieldDefinitions {
    return this._renderContext.shieldDef;
  }

  /** Set debugging options */
  public debugOptions(debugOptions: DebugOptions): AbstractShieldRenderer {
    this._renderContext.debugOptions = debugOptions;
    return this;
  }

  /** Set which unhandled sprite IDs this renderer handles */
  public filterImageID(
    shieldPredicate: StringPredicate
  ): AbstractShieldRenderer {
    this._shieldPredicate = shieldPredicate;
    return this;
  }

  /** Set which network values this renderer handles */
  public filterNetwork(
    networkPredicate: StringPredicate
  ): AbstractShieldRenderer {
    this._networkPredicate = networkPredicate;
    return this;
  }

  /** Set which graphics context to draw shields to */
  public graphicsFactory(gfxFactory: GraphicsFactory): AbstractShieldRenderer {
    this._renderContext.gfxFactory = gfxFactory;
    return this;
  }

  /** Set which MaplibreGL map to handle shields for */
  public renderOnMaplibreGL(map: MapLibre): AbstractShieldRenderer {
    this._map = map;
    if (this._fontSpec) {
      this.reloadShieldsOnFontLoad();
    }
    this.renderOnRepository(new MaplibreGLSpriteRepository(map));
    map.on("styleimagemissing", this.getStyleImageMissingHandler());
    return this;
  }

  private reloadShieldsOnFontLoad(): void {
    if (!this._fontsLoaded && !document.fonts.check(this._fontSpec)) {
      document.fonts.load(this._fontSpec).then(() => this.onFontsLoaded());
    } else {
      this._fontsLoaded = true;
    }
  }

  /** Set a callback that fires when shield definitions are loaded */
  public onShieldDefLoad(
    callback: (shields: ShieldDefinitions) => void
  ): AbstractShieldRenderer {
    if (this._renderContext.shieldDef) {
      callback(this._renderContext.shieldDef);
    } else {
      this._shieldDefCallbacks.push(callback);
    }
    return this;
  }

  /** Set the storage location for existing and generated sprite images */
  public renderOnRepository(repo: SpriteRepository): AbstractShieldRenderer {
    if (!this._renderContext.spriteRepo) {
      this._renderContext.spriteRepo = repo;
    }
    return this;
  }

  /**
   * Get the handler function for styleimagemissing event calls
   *
   * See [MapStyleImageMissingEvent](https://maplibre.org/maplibre-gl-js/docs/API/types/maplibregl.MapStyleImageMissingEvent/) for more details.
   **/
  public getStyleImageMissingHandler() {
    return (e: MapStyleImageMissingEvent) => {
      try {
        if (!this._shieldPredicate(e.id)) {
          return;
        }
        let routeDef: RouteDefinition = this._routeParser.parse(e.id);
        if (!this._networkPredicate(routeDef.network)) {
          storeNoShield(this._renderContext, e.id);
          return;
        }
        if (routeDef) {
          if (!this._fontsLoaded && routeDef.ref) {
            this._preFontImageCache.set(e.id, routeDef);
          }
          missingIconLoader(this._renderContext, routeDef, e.id, false);
        }
      } catch (err) {
        console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
      }
    };
  }

  /** Get the graphic for a specified route */
  public getGraphicForRoute(network: string, ref: string, name: string) {
    return generateShieldCtx(this._renderContext, {
      network,
      ref,
      name,
    });
  }

  /** Get a blank route shield sprite in the default size */
  public emptySprite(): CanvasRenderingContext2D {
    return this._renderContext.emptySprite();
  }

  /** Get a blank route shield graphics context in a specified size */
  public createGraphics(bounds: Bounds): CanvasRenderingContext2D {
    return this._renderContext.gfxFactory.createGraphics(bounds);
  }

  /** Get the current pixel ration (1x/2x) */
  public pixelRatio(): number {
    return this._renderContext.px(1);
  }
}

/**
 * A shield renderer configured from a JSON specification
 *
 * @example
 *
 * const shields = {
 *     "US:I": {
 *         textColor: Color.shields.white,
 *         spriteBlank: ["shield_us_interstate_2", "shield_us_interstate_3"],
 *         textLayout: textConstraint("southHalfEllipse"),
 *         padding: {
 *             left: 4,
 *             right: 4,
 *             top: 6,
 *             bottom: 5,
 *         },
 *     }
 * };
 *
 * const shieldRenderer = new ShieldRenderer(shields, routeParser)
 *     .filterImageID(shieldPredicate)
 *     .filterNetwork(networkPredicate)
 *     .renderOnMaplibreGL(map)
 *     .onShieldDefLoad((shields) => afterShieldRendererLoads(shields)); //Post config
 */
export class ShieldRenderer extends AbstractShieldRenderer {
  constructor(shieldSpec: ShieldSpecification, routeParser: RouteParser) {
    super(routeParser);
    this.setShields(shieldSpec);
  }
}

/**
 * A shield renderer configured from a URL containing a JSON specification
 *
 * @example
 *
 * const shieldRenderer = new URLShieldRenderer("shields.json", routeParser)
 *     .filterImageID(shieldPredicate)
 *     .filterNetwork(networkPredicate)
 *     .renderOnMaplibreGL(map)
 *     .onShieldDefLoad((shields) => afterShieldRendererLoads(shields)); //Post config
 **/
export class URLShieldRenderer extends AbstractShieldRenderer {
  constructor(
    /** URL containing the JSON shield definition */
    shieldsURL: URL,
    /** Function that extracts route identification from a sprite string */
    routeParser: RouteParser
  ) {
    super(routeParser);
    this.setShieldURL(shieldsURL);
  }

  /** Set the URL containing the shield specification */
  private async setShieldURL(shieldsURL: URL) {
    await fetch(shieldsURL)
      .then((res) => res.json())
      .then((json) => super.setShields(json))
      .catch((err) => console.error(err));
  }
}

/** @hidden Used for testing */
export class InMemorySpriteRepository implements SpriteRepository {
  sprites = {};
  public getSprite(spriteID: string): StyleImage {
    return this.sprites[spriteID];
  }
  public hasSprite(spriteID: string): boolean {
    return spriteID in this.sprites;
  }
  public putSprite(spriteID: string, image: ImageData): void {
    this.sprites[spriteID] = image;
  }
}

const localRepo = new InMemorySpriteRepository();
