import type {
  StringPredicate,
  RouteParser,
} from "@americana/maplibre-shield-generator";

export const orderedRouteAttributes = ["network", "ref", "name", "color"];

export const shieldPredicate: StringPredicate = (imageID: string) =>
  imageID && imageID.startsWith("shield");

/**
 * Returns a structured representation of the given image name.
 *
 * @param name An image name in the format returned by `routeConcurrency`.
 * @return An object with the keys in `orderedRouteAttributes` plus the full image name in `imageName`.
 */
export function parseImageName(imageName) {
  let lines = imageName.split("\n");
  lines.shift(); // "shield"
  let parsed = Object.fromEntries(
    orderedRouteAttributes.map((a, i) => [a, lines[i]])
  );
  parsed.imageName = imageName;
  return parsed;
}

export const networkPredicate: StringPredicate = (network: string) =>
  // On recreational route relations, network=* indicates the network's scope,
  // not the network itself.
  // https://github.com/osm-americana/openstreetmap-americana/issues/94
  !/^[lrni][chimpw]n$/.test(network);

export const routeParser: RouteParser = {
  parse: (id: string) => {
    return parseImageName(id);
  },
  format: (network: string, ref: string, name: string) =>
    `shield\n${network}\n${ref}\n${name}\n`,
};
