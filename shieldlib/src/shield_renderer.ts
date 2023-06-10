import { Map, MapStyleImageMissingEvent, StyleImage } from "maplibre-gl";
import {
  Bounds,
  DebugOptions,
  GraphicsFactory,
  RouteDefinition,
  RouteParser,
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

class MaplibreGLSpriteRepository implements SpriteRepository {
  map: Map;
  constructor(map: Map) {
    this.map = map;
  }
  getSprite(spriteID: string): StyleImage {
    return this.map.style.getImage(spriteID);
  }
  putSprite(spriteID: string, image: ImageData, pixelRatio: number): void {
    this.map.addImage(spriteID, image, { pixelRatio: pixelRatio });
  }
}

class AbstractShieldRenderer {
  private _shieldPredicate: StringPredicate = () => true;
  private _networkPredicate: StringPredicate = () => true;
  private _routeParser: RouteParser;
  private _renderContext: ShieldRenderingContext;
  private _shieldDefCallbacks = [];

  constructor(routeParser: RouteParser) {
    this._routeParser = routeParser;
    this._renderContext = new ShieldRenderingContext();
    this._renderContext.gfxFactory = new DOMGraphicsFactory();
  }

  protected setShields(shieldSpec: ShieldSpecification) {
    this._renderContext.options = shieldSpec.options;
    this._renderContext.shieldDef = shieldSpec.networks;
    this._shieldDefCallbacks.forEach((callback) =>
      callback(shieldSpec.networks)
    );
  }

  public getShieldDefinitions(): ShieldDefinitions {
    return this._renderContext.shieldDef;
  }

  public debugOptions(debugOptions: DebugOptions): AbstractShieldRenderer {
    this._renderContext.debugOptions = debugOptions;
    return this;
  }

  public filterImageID(
    shieldPredicate: StringPredicate
  ): AbstractShieldRenderer {
    this._shieldPredicate = shieldPredicate;
    return this;
  }

  public filterNetwork(
    networkPredicate: StringPredicate
  ): AbstractShieldRenderer {
    this._networkPredicate = networkPredicate;
    return this;
  }

  public graphicsFactory(gfxFactory: GraphicsFactory): AbstractShieldRenderer {
    this._renderContext.gfxFactory = gfxFactory;
    return this;
  }

  public renderOnMaplibreGL(map: Map): AbstractShieldRenderer {
    this.renderOnRepository(new MaplibreGLSpriteRepository(map));
    map.on("styleimagemissing", this.getStyleImageMissingHandler());
    return this;
  }

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

  public renderOnRepository(repo: SpriteRepository): AbstractShieldRenderer {
    if (!this._renderContext.spriteRepo) {
      this._renderContext.spriteRepo = repo;
    }
    return this;
  }

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
        routeDef.spriteID = e.id; //Original ID so we can store the sprite
        this._renderContext.debugOptions = this.debugOptions;
        if (routeDef) {
          missingIconLoader(this._renderContext, routeDef);
        }
      } catch (err) {
        console.error(`Exception while loading image ‘${e?.id}’:\n`, err);
      }
    };
  }

  public getGraphicForRoute(network: string, ref: string, name: string) {
    return generateShieldCtx(this._renderContext, {
      network,
      ref,
      name,
      spriteID: this._routeParser.format(network, ref, name),
    });
  }

  public emptySprite(): CanvasRenderingContext2D {
    return this._renderContext.emptySprite();
  }

  public createGraphics(bounds: Bounds) {
    return this._renderContext.gfxFactory.createGraphics(bounds);
  }

  public pixelRatio(): number {
    return this._renderContext.px(1);
  }
}

export class ShieldRenderer extends AbstractShieldRenderer {
  constructor(shieldSpec: ShieldSpecification, routeParser: RouteParser) {
    super(routeParser);
    this.setShields(shieldSpec);
  }
}

export class URLShieldRenderer extends AbstractShieldRenderer {
  constructor(shieldsURL: URL, routeParser: RouteParser) {
    super(routeParser);
    this.setShieldURL(shieldsURL);
  }

  public async setShieldURL(shieldsURL: URL) {
    await fetch(shieldsURL)
      .then((res) => res.json())
      .then((json) => super.setShields(json))
      .catch((err) => console.error(err));
  }
}

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
