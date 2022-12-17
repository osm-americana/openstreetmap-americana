"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Label from "../constants/label.js";

import * as PlaceLayers from "../layer/place.js";
import * as LanduseLayers from "../layer/landuse.js";
import * as HighwayShieldLayers from "../layer/highway_shield.js";
import * as AerowayLayers from "../layer/aeroway.js";

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
      let anchor = [buttonRect.x, buttonRect.y];
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

    document.getElementById("legend-container").scrollTop = 0;
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
    let template = document.getElementById("legend").content.cloneNode(true);

    let sections = [
      {
        name: "Populated places",
        entries: [...PlaceLayers.legendEntries, ...LanduseLayers.legendEntries],
        layers: [...PlaceLayers.legendLayers, ...LanduseLayers.legendLayers],
      },
      {
        name: "Route markers",
        rows: this.getShieldRows(),
        source: "Wikidata",
        sourceURL: `https://query.wikidata.org/embed.html#${encodeURIComponent(
          this.getNetworkMetadataQuery()
        )}`,
      },
      {
        name: "Aviation",
        entries: AerowayLayers.legendEntries,
        layers: AerowayLayers.legendLayers,
      },
    ];
    for (let data of sections) {
      let section = this.getSection(data);
      if (!section) continue;

      let container = template.getElementById("legend-container");
      container.appendChild(section);

      if (data.source) {
        let sourceCell = template.querySelector(".legend-source");
        sourceCell.textContent = "Source: ";

        let sourceLink = document.createElement("a");
        sourceLink.href = data.sourceURL;
        sourceLink.textContent = data.source;
        sourceCell.append(sourceLink);
      }
    }

    return template;
  }

  /**
   * Returns the section representing the given data.
   */
  getSection(data) {
    let template = document
      .getElementById("legend-section")
      .content.cloneNode(true);
    template.querySelector("summary").textContent = data.name;

    let rows = data.rows;
    if (!rows && data.entries) {
      let matchedEntries = this.matchEntries(data.entries, data.layers);
      rows = matchedEntries.map((entry) => this.getRowForEntry(entry));
    }
    if (!rows.length) return;

    template.querySelector("tbody").replaceChildren(...rows);
    if (!data.source) {
      template.querySelector("tfoot").remove();
    }
    return template.querySelector(".legend-section");
  }

  /**
   * Returns the given array of legend entries after populating each entry with
   * a representative feature from the given layers.
   */
  matchEntries(entries, layers) {
    let features = this._map.queryRenderedFeatures({ layers });
    let matchedEntries = [];
    for (let entry of entries) {
      let feature = features.find((feature) => {
        return Object.entries(entry.properties).every(
          ([key, expectedValue]) => {
            if (!expectedValue) {
              return !(key in feature.properties);
            }
            return feature.properties[key] === expectedValue;
          }
        );
      });
      if (feature) {
        matchedEntries.push(Object.assign(entry, { feature }));
      }
    }
    return matchedEntries;
  }

  /**
   * Returns a table row illustrating the given entry.
   */
  getRowForEntry(entry) {
    let layerType = entry.feature.layer.type;
    let templateID =
      layerType === "symbol" ? "legend-row-symbol" : "legend-row-swatch";
    let template = document.getElementById(templateID).content.cloneNode(true);
    let row = template.querySelector("tr");

    if (layerType === "symbol") {
      let iconCell = row.querySelector(".icon");
      let img = this.getIconImageFromSymbol(entry.feature);
      if (img) {
        iconCell.appendChild(img);
      }

      let labelCell = row.querySelector(".label");
      let label = this.getTextLabelFromSymbol(entry.feature);
      if (label) {
        labelCell.appendChild(label);
      }
    } else {
      let swatchCell = row.querySelector(".swatch");
      let swatch = this.getSwatchFromFill(entry.feature);
      if (swatch) {
        swatchCell.appendChild(swatch);
      }
    }

    let descriptionCell = row.querySelector(".description");
    descriptionCell.textContent = entry.description;

    return row;
  }

  /**
   * Returns an HTML image element that resembles the icon of the given feature
   * from a symbol layer.
   */
  getIconImageFromSymbol(symbol) {
    let imageName = symbol.layer.layout["icon-image"].name;
    let iconSize = symbol.layer.layout["icon-size"];
    let styleImage = this._map.style.getImage(imageName);
    let img = this.getImageFromStyle(styleImage, iconSize);
    return img;
  }

  /**
   * Returns an HTML block element that resembles the text of the given feature
   * from a symbol layer.
   */
  getTextLabelFromSymbol(symbol) {
    let label = document.createElement("div");
    label.textContent = symbol.layer.layout["text-field"].sections[0].text;
    let weight = symbol.layer.layout["text-font"]?.[0]?.endsWith("Bold")
      ? "bold"
      : "normal";
    Object.assign(label.style, {
      color: symbol.layer.paint["text-color"],
      fontWeight: weight,
      fontSize: `${symbol.layer.layout["text-size"] || 16}px`,
      letterSpacing: `${symbol.layer.layout["text-letter-spacing"]}em`,
      lineHeight: `${symbol.layer.layout["text-line-height"] || 1.2}em`,
      verticalAlign: "middle",
      width: `${symbol.layer.layout["text-max-width"] || 10}em`,
    });
    return label;
  }

  /**
   * Returns an HTML block element that resembles the given fill from a fill
   * layer.
   */
  getSwatchFromFill(fill) {
    let swatch = document.createElement("div");
    Object.assign(swatch.style, {
      backgroundColor: fill.layer.paint["fill-color"],
      display: "inline-block",
      height: "1em",
      verticalAlign: "middle",
      width: "4em",
    });
    return swatch;
  }

  /**
   * Returns table rows illustrating route shields.
   */
  getShieldRows() {
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
    let shieldRowsByCountry = {};
    let otherShieldRows = [];
    let countryNames = new Intl.DisplayNames(Label.getLocales(), {
      type: "region",
    });
    for (let metadata of images) {
      if (networks.has(metadata.network)) continue;

      let row = this.getShieldRow(metadata.name, metadata.network);
      if (!row) continue;

      if (metadata.country) {
        if (!(metadata.country in shieldRowsByCountry)) {
          shieldRowsByCountry[metadata.country] = [];
        }
        shieldRowsByCountry[metadata.country].push(row);
        countries.add(metadata.country);
      } else {
        otherShieldRows.push(row);
      }
      networks.add(metadata.network);
    }

    let sortedCountries = [...countries]
      .map((code) => {
        let name = countryNames.of(code) ?? code;
        return { code, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    if (otherShieldRows.length) {
      sortedCountries.push({ code: "*", name: "Other" });
      shieldRowsByCountry["*"] = otherShieldRows;
    }
    let shieldRows = [];
    for (let country of sortedCountries) {
      if (sortedCountries.length > 1) {
        let template = document
          .getElementById("legend-rowgroup")
          .content.cloneNode(true);
        let groupRow = template.querySelector("tr");
        groupRow.querySelector("th").textContent = country.name;
        shieldRows.push(groupRow);
      }

      shieldRows.push(...shieldRowsByCountry[country.code]);
    }
    return shieldRows;
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
      .getElementById("legend-row-symbol")
      .content.cloneNode(true);
    let row = template.querySelector("tr");
    row.dataset.network = network;

    row.querySelector(".icon").appendChild(img);

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

  purgeNetworkMetadata() {
    delete this._networkMetadata;
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
