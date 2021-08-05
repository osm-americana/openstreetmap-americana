// Naming conventions:
// clr = color, wd = width, lyr = layer
// moto = motorway
// link = motorway_link
// tun = tunnel, brg = bridge
// case = casing

function filterRoad(roadClass, ramp, brunnel) {
  return [
    "all",
    brunnel == null
      ? ["!in", "brunnel", "bridge", "tunnel"]
      : ["==", "brunnel", brunnel],
    ["==", "class", roadClass],
    [ramp ? "==" : "!=", "ramp", 1],
  ];
}

var defRoad = {
  type: "line",
  layout: layoutRoad,
  source: "openmaptiles",
  "source-layer": "transportation",
};

var lyrMoto = layerClone(defRoad, "moto");
lyrMoto.paint = roadPaint(clrMoto, wdMoto);
lyrMoto.filter = filterRoad("motorway", false, null);
lyrMoto.minzoom = minzoomMoto;

var lyrMotoCase = layerClone(lyrMoto, "moto_case");
lyrMotoCase.paint = roadPaint(clrMotoCase, wdMotoCase);

var lyrMotoBrg = layerClone(defRoad, "moto_brg");
lyrMotoBrg.paint = roadPaint(clrMoto, wdMoto);
lyrMotoBrg.filter = filterRoad("motorway", false, "bridge");
lyrMotoBrg.minzoom = minzoomMoto;

var lyrMotoBrgCase = layerClone(lyrMotoBrg, "moto_brg_case");
lyrMotoBrgCase.paint = roadPaint(clrMotoBridgeCase, wdMotoCase);

var lyrMotoTun = layerClone(defRoad, "moto_tun");
lyrMotoTun.paint = roadPaint(clrMotoTun, wdMoto);
lyrMotoTun.filter = filterRoad("motorway", false, "tunnel");
lyrMotoTun.minzoom = minzoomMoto;

var lyrMotoTunCase = layerClone(lyrMotoTun, "moto_tun_case");
lyrMotoTunCase.paint = tunCasePaint(clrMotoTunCase, wdMotoCase);

var lyrMotoLink = layerClone(defRoad, "moto_link");
lyrMotoLink.paint = roadPaint(clrMoto, wdMotoLink);
lyrMotoLink.filter = filterRoad("motorway", true, null);
lyrMotoLink.minzoom = minzoomMotoLink;

var lyrMotoLinkCase = layerClone(lyrMotoLink, "moto_link_case");
lyrMotoLinkCase.paint = roadPaint(clrMotoCase, wdMotoLinkCase);

var lyrMotoLinkBrg = layerClone(defRoad, "moto_link_brg");
lyrMotoLinkBrg.paint = roadPaint(clrMoto, wdMotoLink);
lyrMotoLinkBrg.filter = filterRoad("motorway", true, "bridge");
lyrMotoLinkBrg.minzoom = minzoomMotoLink;

var lyrMotoLinkBrgCase = layerClone(lyrMotoLinkBrg, "moto_link_brg_case");
lyrMotoLinkBrgCase.paint = {
//TODO move to constants
    "line-color": clrMotoCaseLowZoom.concat(
      minzoomBrunnel + 3,
      `hsl(${hueMoto}, 71%, 10%)`
    ),
    "line-width": wdMotoLinkCase,
    "line-blur": 0.5,
  };

var lyrMotoLinkTun = layerClone(defRoad, "moto_link_tun");
lyrMotoLinkTun.paint = roadPaint(clrMotoTun, wdMotoLink);
lyrMotoLinkTun.filter = filterRoad("motorway", true, "tunnel");
lyrMotoLinkTun.minzoom = minzoomMotoLink;

var lyrMotoLinkTunCase = layerClone(lyrMotoLinkTun, "moto_link_tun_case");
lyrMotoTunCase.paint = tunCasePaint(clrMotoTunCase, wdMotoLinkCase);

var lyrMotoLabel = {
  id: "road_label",
  type: "symbol",
  paint: {
    "text-color": "#333",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.5,
    "text-halo-width": 1,
  },
  filter: ["all", ["==", "class", "motorway"]],
  layout: {
    "text-font": ["Metropolis Light"],
    "text-size": 12,
    "text-field": "{name:latin} {name:nonlatin}",
    "text-anchor": "bottom",
    "text-offset": [0, 0.2],
    "symbol-placement": "line",
  },
  source: "openmaptiles",
  "source-layer": "transportation_name",
};
