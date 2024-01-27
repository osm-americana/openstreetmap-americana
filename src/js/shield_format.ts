import type {
  StringPredicate,
  RouteParser,
} from "@americana/maplibre-shield-generator";

import { parseImageName } from "../layer/highway_shield.js";

export const shieldPredicate: StringPredicate = (imageID: string) =>
  imageID && imageID.startsWith("shield");

export const networkPredicate: StringPredicate = (network: string) =>
  // On recreational route relations, network=* indicates the network's scope,
  // not the network itself.
  // https://github.com/ZeLonewolf/openstreetmap-americana/issues/94
  !/^[lrni][chimpw]n$/.test(network);

export const routeParser: RouteParser = {
  parse: (id: string) => {
    return parseImageName(id);
  },
  format: (network: string, ref: string, name: string) =>
    `shield\n${network}\n${ref}\n${name}\n`,
};
