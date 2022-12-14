"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";

import * as maplibregl from "maplibre-gl";

export default class LegendControl {
  onAdd(map) {
    this._map = map;

    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    this._container.style.clear = "none";

    let controlGroup = document.createElement("div");
    controlGroup.className = "maplibregl-ctrl-group";
    this._container.appendChild(controlGroup);

    let button = document.createElement("button");
    button.textContent = "Legend";
    button.style.width = "5em";
    controlGroup.appendChild(button);

    this._popup = new maplibregl.Popup({
      closeOnMove: true,
      maxWidth: "25em",
      offset: [0, -4],
    });
    button.addEventListener("click", () => {
      if (this._popup.isOpen()) {
        this.close();
        return;
      }

      let buttonRect = button.getClientRects()[0];
      let anchor = map.unproject([
        buttonRect.x + buttonRect.width / 2,
        buttonRect.y,
      ]);
      this.open(anchor);
    });

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  open(anchor) {
    this.close();

    let contents = document.createElement("div");

    let caption = document.createElement("h2");
    caption.textContent = "Legend";
    contents.appendChild(caption);

    let features = this._map.queryRenderedFeatures({
      layers: ["highway_shield"],
    });
    let images = features
      .flatMap((f) => f.layer.layout["text-field"].sections)
      .filter((s) => s.image && s.image)
      .map((s) => {
        let name = s.image.name;
        let network = name.split("\n")[1].match(/^(.+?)=/)[1];
        return { name, network };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
    let networks = new Set();
    let representativeImages = [];
    for (let image of images) {
      if (networks.has(image.network)) continue;
      representativeImages.push(image);
      networks.add(image.network);
    }
    let rows = representativeImages.map((metadata) => {
      let userImage = this._map.style.getImage(metadata.name).userImage;
      let imageData = new ImageData(
        userImage.data,
        userImage.width,
        userImage.height
      );
      let canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      let ctx = canvas.getContext("2d");
      ctx.putImageData(imageData, 0, 0);
      let img = new Image(
        imageData.width / ShieldDraw.PXR,
        imageData.height / ShieldDraw.PXR
      );
      img.src = canvas.toDataURL("image/png");
      let row = document.createElement("tr");
      let imageCell = document.createElement("td");
      imageCell.setAttribute("align", "center");
      imageCell.appendChild(img);
      row.appendChild(imageCell);
      let dfnCell = document.createElement("td");
      let code = document.createElement("code");
      code.textContent = metadata.network;
      dfnCell.appendChild(code);
      row.appendChild(dfnCell);
      return row;
    });
    let table = document.createElement("table");
    for (let row of rows) {
      table.appendChild(row);
    }
    contents.appendChild(table);

    this._popup.setDOMContent(contents);
    this._popup.setLngLat(anchor).addTo(this._map);
  }

  close() {
    this._popup.remove();
  }
}
