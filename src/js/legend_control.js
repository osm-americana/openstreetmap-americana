"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Label from "../constants/label.js";

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
      let anchor = [buttonRect.x + buttonRect.width / 2, buttonRect.y];
      this.open(anchor);
    });

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }

  /**
   * Opens the legend popup, positioning it to point at the given anchor point.
   *
   * @param anchor A screen coordinate for the popup to point to.
   */
  open(anchor) {
    this.close();

    let contents = this.getContents();
    let rows = contents.querySelectorAll(".legend-row");
    this._popup.setDOMContent(contents);

    let anchorCoordinate = this._map.unproject(anchor);
    this._popup.setLngLat(anchorCoordinate).addTo(this._map);

    this.prettifyNetworkLabels(rows);
  }

  /**
   * Closes the legend popup.
   */
  close() {
    this._popup.remove();
  }

  /**
   * Returns contents of the popup appropriate to the current viewport.
   *
   * @returns A DOM element representing the full contents of the popup.
   */
  getContents() {
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
    let rows = representativeImages
      .map((metadata) => this.getShieldRow(metadata.name, metadata.network))
      .filter((r) => r);

    let contents = document.getElementById("legend").content.cloneNode(true);
    let table = contents.querySelector("table");
    for (let row of rows) {
      table.appendChild(row);
    }

    return contents;
  }

  /**
   * Returns a table row representing a route shield.
   *
   * @param name The style image name.
   * @param network The `network=*` value associated with the style image.
   * @returns An HTML table row representing the route shield, or nothing if the style does not render the given network.
   */
  getShieldRow(name, network) {
    let styleImage = this._map.style.getImage(name);
    let img = this.getImageFromStyle(styleImage);
    if (!img) return;

    let template = document
      .getElementById("legend-row")
      .content.cloneNode(true);
    let row = template.querySelector("tr");
    row.dataset.network = network;

    row.querySelector(".preview").appendChild(img);

    let descriptionCell = row.querySelector(".description");
    let code = document.createElement("code");
    code.textContent = network;
    descriptionCell.appendChild(code);

    return row;
  }

  /**
   * Returns an HTML image element displaying the given style image.
   *
   * @param styleImage The style image to display.
   * @returns An HTML image element, or nothing if the style image is merely a spacer image.
   */
  getImageFromStyle(styleImage) {
    let userImage = styleImage.userImage;
    // Skip spacer images representing unsupported networks.
    if (userImage.width === 1 || userImage.height === 1) return;

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

    return img;
  }

  /**
   * Inserts human-readable descriptions in each of the given table rows.
   *
   * @param rows An array of table rows containing placeholders for descriptions.
   */
  async prettifyNetworkLabels(rows) {
    let networkMetadata = await this.getNetworkMetadata();
    if (!networkMetadata) return;

    for (let row of rows) {
      let network = row.dataset.network;
      let binding = networkMetadata[network];
      if (!binding) continue;

      let imageCell = row.querySelector(".preview");
      let img = imageCell.querySelector("img");
      img.remove();
      let link = document.createElement("a");
      link.href = binding.network.value;
      link.appendChild(img);
      imageCell.appendChild(link);

      let descriptionCell = row.querySelector(".description");
      descriptionCell.setAttribute("lang", binding.networkLabel["xml:lang"]);
      descriptionCell.textContent = binding.networkLabel.value;
    }
  }

  /**
   * Returns a mapping from `network=*` values to metadata about these values from Wikidata.
   */
  async getNetworkMetadata() {
    if (this._networkMetadata) {
      return this._networkMetadata;
    }

    let sparql = `
SELECT ?value ?network ?networkLabel WHERE {
  ?network wdt:P1282 ?tag.
  FILTER(REGEX(?tag, "^Tag:network="))
  BIND(SUBSTR(?tag, 13) AS ?value)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${Label.getLocales().join(
    ","
  )},en". }
}
ORDER BY ?value
`;
    let url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      sparql
    )}&format=json`;
    const response = await fetch(url);
    const json = await response.json();
    this._networkMetadata = Object.fromEntries(
      json.results.bindings.map((binding) => {
        return [binding.value.value, binding];
      })
    );
    return this._networkMetadata;
  }
}
