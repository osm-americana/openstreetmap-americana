"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Label from "../constants/label.js";

import * as PlaceLayers from "../layer/place.js";
import * as HighwayShieldLayers from "../layer/highway_shield.js";

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
      anchor: "bottom-left",
      maxWidth: "30em",
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
    let contents = document.getElementById("legend").content.cloneNode(true);

    let placeFeatures = this._map.queryRenderedFeatures({
      layers: [
        PlaceLayers.village.id,
        PlaceLayers.town.id,
        PlaceLayers.city.id,
      ],
    });
    let placeClasses = [
      { value: "city", description: "Large city" },
      { value: "town", description: "Town" },
      { value: "village", description: "Small village" },
    ];
    let placeLabels = [];
    for (let placeClass of placeClasses) {
      placeClass.feature = placeFeatures.find(
        (f) => f.properties.class === placeClass.value && !f.properties.capital
      );
      if (placeClass.feature) {
        placeLabels.push(placeClass);
      }
    }
    let capitalRanks = [
      { value: 2, description: "National capital" },
      { value: 3, description: "Regional capital" },
      { value: 4, description: "State/provincial capital" },
    ];
    for (let rank of capitalRanks) {
      rank.feature = placeFeatures.find(
        (f) => f.properties.capital === rank.value
      );
      if (rank.feature) {
        placeLabels.push(rank);
      }
    }
    let placeLabelRows = placeLabels.map((label) => {
      let template = document
        .getElementById("legend-row")
        .content.cloneNode(true);
      let row = template.querySelector("tr");

      let layer = label.feature.layer;
      let imageName = layer.layout["icon-image"].name;
      let iconSize = layer.layout["icon-size"];
      let styleImage = this._map.style.getImage(imageName);
      let img = this.getImageFromStyle(styleImage, iconSize);
      let previewCell = row.querySelector(".preview");
      previewCell.appendChild(img);

      let span = document.createElement("span");
      span.textContent = layer.layout["text-field"].sections[0].text;
      let padding = `calc(${layer.layout["text-radial-offset"]}em - ${
        img.width / 2
      }px)`;
      Object.assign(span.style, {
        color: layer.paint["text-color"],
        fontWeight: "bold",
        fontSize: `${layer.layout["text-size"]}px`,
        paddingLeft: padding,
        verticalAlign: "middle",
      });
      previewCell.appendChild(span);

      let descriptionCell = row.querySelector(".description");
      descriptionCell.textContent = label.description;

      return row;
    });
    let placeSection = contents.querySelector("#legend-section-places");
    if (placeLabelRows.length) {
      placeSection.querySelector("tbody").replaceChildren(...placeLabelRows);
    } else {
      placeSection.remove();
    }

    let shieldFeatures = this._map.queryRenderedFeatures({
      layers: [HighwayShieldLayers.shield.id],
    });
    let images = shieldFeatures
      .flatMap((f) => f.layer.layout["text-field"].sections)
      .filter((s) => s.image && s.image)
      .map((s) => {
        let name = s.image.name;
        let network = name.split("\n")[1].match(/^(.+?)=/)[1];
        let country = network.match(/^(\w+):/)?.[1];
        return { name, network, country };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
    let networks = new Set();
    let countries = new Set();
    let shieldRows = [];
    let countryNames = new Intl.DisplayNames(Label.getLocales(), {
      type: "region",
    });
    for (let metadata of images) {
      if (networks.has(metadata.network)) continue;

      let row = this.getShieldRow(metadata.name, metadata.network);
      if (!row) continue;

      if (!countries.has(metadata.country)) {
        let template = document
          .getElementById("legend-rowgroup")
          .content.cloneNode(true);
        let row = template.querySelector("tr");
        let name = metadata.country
          ? countryNames.of(metadata.country)
          : metadata.country;
        row.querySelector("th").textContent = name;
        shieldRows.push(row);
      }
      shieldRows.push(row);
      networks.add(metadata.network);
      countries.add(metadata.country);
    }

    let shieldSection = contents.querySelector("#legend-section-shields");
    if (shieldRows.length) {
      shieldSection.querySelector("tbody").replaceChildren(...shieldRows);
      let sourceLink = shieldSection.querySelector(".legend-source a");
      sourceLink.href = `https://query.wikidata.org/embed.html#${encodeURIComponent(
        this.getNetworkMetadataQuery()
      )}`;
    } else {
      shieldSection.remove();
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
   * @param iconSize The size factor to apply to the width and height of the image.
   * @returns An HTML image element, or nothing if the style image is merely a spacer image.
   */
  getImageFromStyle(styleImage, iconSize = 1) {
    let userImage = styleImage.userImage;
    // Skip spacer images representing unsupported networks.
    if (userImage?.width === 1 || userImage?.height === 1) return;

    let imageData = new ImageData(
      userImage?.data || new Uint8ClampedArray(styleImage.data.data),
      userImage?.width || styleImage.data.width,
      userImage?.height || styleImage.data.height
    );

    let canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
    let img = new Image(
      (imageData.width * iconSize) / ShieldDraw.PXR,
      (imageData.height * iconSize) / ShieldDraw.PXR
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

    let url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      this.getNetworkMetadataQuery()
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

  /**
   * Returns the Wikidata Query Service SPARQL query for network metadata.
   */
  getNetworkMetadataQuery() {
    let locales = Label.getLocales().join(",");
    return `
SELECT ?value ?network ?networkLabel WHERE {
  ?network wdt:P1282 ?tag.
  FILTER(REGEX(?tag, "^Tag:network="))
  BIND(SUBSTR(?tag, 13) AS ?value)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${locales},en". }
}
ORDER BY ?value
`;
  }
}
