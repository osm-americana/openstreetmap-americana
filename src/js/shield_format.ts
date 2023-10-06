import type {
  StringPredicate,
  RouteParser,
} from "@americana/maplibre-shield-generator";

export const shieldPredicate: StringPredicate = (imageID: string) =>
  imageID && imageID.startsWith("shield");

export const networkPredicate: StringPredicate = (network: string) =>
  // On recreational route relations, network=* indicates the network's scope,
  // not the network itself.
  // https://github.com/ZeLonewolf/openstreetmap-americana/issues/94
  !/^[lrni][chimpw]n$/.test(network);

export const routeParser: RouteParser = {
  parse: (id: string) => {
    //Americana format is `${shield}\n${network}=${ref}\n${name}`
    let id_parts: string[] = id.split("\n");
    let network_ref = id_parts[1].split("=");

    return {
      network: network_ref[0],
      ref: network_ref[1],
      name: id_parts[2],
    };
  },
  format: (network: string, ref: string, name: string) =>
    `shield\n${network}=${ref}\n${name}`,
};
