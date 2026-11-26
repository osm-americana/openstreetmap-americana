import {
  isSchemaShieldId,
  routeParserFromSchema,
  type StringPredicate,
  type RouteParser,
} from "@americana/maplibre-shield-generator";

export const shieldPredicate: StringPredicate = (imageID: string) =>
  Boolean(imageID) && isSchemaShieldId("openmaptiles", imageID);

export const networkPredicate: StringPredicate = (network: string) =>
  // On recreational route relations, network=* indicates the network's scope,
  // not the network itself.
  // https://github.com/osm-americana/openstreetmap-americana/issues/94
  !/^[lrni][chimpw]n$/.test(network);

const schemaParser = routeParserFromSchema("openmaptiles");

/**
 * OpenMapTiles route parser that always returns string fields.
 * The schema helper omits empty ref/name; Americana's shield defs treat "" as
 * "no ref" rather than undefined.
 */
export const routeParser: RouteParser = {
  parse: (imageID: string) => {
    const route = schemaParser.parse(imageID);
    return {
      network: route.network ?? "",
      ref: route.ref ?? "",
      name: route.name ?? "",
    };
  },
  format: (network: string, ref: string, name: string) =>
    schemaParser.format(network, ref, name),
};
