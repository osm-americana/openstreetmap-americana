/**
 * Recreational route relations use network=* for scope (nwn, lcn, …), not a
 * highway network id.
 * https://github.com/osm-americana/openstreetmap-americana/issues/94
 */
export const filterNetworks = /^[lrni][chimpw]n$/;
