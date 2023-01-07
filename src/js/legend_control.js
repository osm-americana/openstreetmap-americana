"use strict";

import * as ShieldDraw from "./shield_canvas_draw.js";
import * as Label from "../constants/label.js";
import * as ShieldDef from "./shield_defs.js";

import * as LegendConfig from "./legend_config.js";
import * as HighwayShieldLayers from "../layer/highway_shield.js";

import * as maplibregl from "maplibre-gl";

const maxPopupWidth = 30; /* em */

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
      maxWidth: `${maxPopupWidth}em`,
      offset: [0, -4],
    });
    button.addEventListener("click", () => {
      if (this._popup.isOpen()) {
        this.close();
        return;
      }

      // A popup is normally anchored on a geographic location, but we just want
      // it to point to the button.
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
   * Call this method whenever the page's language changes.
   */
  onLanguageChange() {
    this.close();
    this.purgeNetworkMetadata();
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

    let shieldSection = this.sections.find((s) => s.id === "shields");
    shieldSection.rows = this.getShieldRows();
    shieldSection.sourceURL = `https://query.wikidata.org/embed.html#${encodeURIComponent(
      this.getNetworkMetadataQuery()
    )}`;

    for (let data of this.sections) {
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
      let entries = data.entries
        .map((e) => this.getMatchedEntry(e))
        .filter((m) => m);
      rows = entries.map((e) => this.getRowForEntry(e)).filter((r) => r);
    }
    if (!rows.length) return;

    template.querySelector("tbody").replaceChildren(...rows);
    if (!data.source) {
      template.querySelector("tfoot").remove();
    }
    return template.querySelector(".legend-section");
  }

  /**
   * Returns a copy of the given entry populated with a representative visible
   * feature.
   */
  getMatchedEntry(entry) {
    // Query the map for rendered (including transparent) features in the
    // current viewport that meet the entry's criteria.
    let features = this._map.queryRenderedFeatures({
      layers: entry.layers,
      filter: entry.filter,
    });
    let mainFeature = features[0];
    if (!mainFeature) return;

    // Copy the entry, adding the first match, which is from the topmost layer.
    let matchedEntry = { feature: mainFeature };
    Object.assign(matchedEntry, entry);

    if (
      mainFeature.layer.type === "fill" ||
      mainFeature.layer.type === "fill-extrusion"
    ) {
      // Pair a fill (extrusion) layer's polygon with some polygon rendered as
      // an outline.
      matchedEntry.fill = mainFeature;
      matchedEntry.stroke = features.find(
        (f) => f.id === mainFeature.id && f.layer.type === "line"
      );
    } else if (mainFeature.layer.type === "line") {
      // Pair a line layer's linestring with some polygon rendered as a fill.
      matchedEntry.fill = features.find(
        (f) =>
          f.id === mainFeature.id &&
          (f.layer.type === "fill" || f.layer.type === "fill-extrusion")
      );
      if (matchedEntry.fill) {
        matchedEntry.stroke = mainFeature;
      } else {
        // Collect the other linestrings needed to render the entry (casing
        // etc.).
        matchedEntry.lines = [];
        let layers = new Set();
        for (let feature of features) {
          // Ignore other features that happen to match the criteria so that the
          // entry depicts only a single feature.
          if (feature.id !== mainFeature.id || feature.layer.type !== "line")
            continue;
          // If we've already seen the layer, then this feature represents
          // another slice of the feature in another tile.
          if (layers.has(feature.layer.id)) continue;
          layers.add(feature.layer.id);
          // Populate the array of lines in reverse order, because SVG renders
          // elements according to the painter's algorithm.
          matchedEntry.lines.unshift(feature);
        }
      }
    }

    return matchedEntry;
  }

  /**
   * Returns a table row illustrating the given entry.
   */
  getRowForEntry(entry) {
    // Choose an HTML template that will display as much information about the
    // entry as possible.
    let templateID = "legend-row-symbol";
    if (entry.lines) {
      templateID = "legend-row-line";
    } else if (entry.fill) {
      templateID = "legend-row-swatch";
    }
    let template = document.getElementById(templateID).content.cloneNode(true);
    let row = template.querySelector("tr");

    // Populate the template's swatch etc. with an illustration of the matching
    // feature.
    if (entry.fill) {
      let swatchCell = row.querySelector(".swatch");
      Object.assign(
        swatchCell.style,
        this.getSwatchStyle(entry.fill, entry.stroke)
      );
    } else if (entry.lines) {
      let lineCell = row.querySelector(".line");
      this.populateLineCell(lineCell, entry.lines);
    } else if (entry.feature) {
      let labelCell = row.querySelector(".label");
      this.populateTextLabelFromSymbol(labelCell, entry.feature);

      let iconCell = row.querySelector(".icon");
      let img = this.getIconImageFromSymbol(entry.feature);
      if (img) {
        iconCell.appendChild(img);
      } else {
        iconCell.remove();
        labelCell.setAttribute("colspan", 2);
      }
    } else {
      return;
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
    let imageName = symbol.layer.layout["icon-image"]?.name;
    if (!imageName) return;

    let iconSize = symbol.layer.layout["icon-size"];
    let styleImage = this._map.style.getImage(imageName);
    let img = this.getImageFromStyle(styleImage, iconSize);
    return img;
  }

  /**
   * Populates an HTML block element to resemble the text of the given feature
   * from a symbol layer.
   */
  populateTextLabelFromSymbol(container, symbol) {
    let textField = symbol.layer.layout["text-field"];
    if (!textField) return;

    // Assume a formatted text field has only one text section. If this isn't
    // formatted text, fall back to string interpolation syntax.
    container.textContent =
      textField.sections?.[0].text ??
      textField.replace(
        /\{(\w+)\}/g,
        (match, prop) => symbol.properties[prop] ?? match
      );

    // The fontstack name obscures the original font names. Look for words that
    // conventionally indicate a weight or style.
    let fontWeight = symbol.layer.layout["text-font"]?.[0]?.match(/\bBold\b/)
      ? "bold"
      : "normal";
    let fontStyle = symbol.layer.layout["text-font"]?.[0]?.match(/\bItalic\b/)
      ? "italic"
      : "normal";

    // Force labels to be right-aligned if paired with an icon, which will be in
    // the column to the right.
    let justification = symbol.layer.layout["text-justify"] || "center";
    if (symbol.layer.layout["icon-image"]) {
      justification = "right";
    }

    // Simulate a text outline by compositing shadows in four directions.
    // -webkit-text-stroke won't work because it eats into the text fill.
    let shadowOffset = symbol.layer.paint["text-halo-width"] ?? 0;
    let haloColor = symbol.layer.paint["text-halo-color"] || "black";
    let haloBlur = symbol.layer.paint["text-halo-blur"] ?? 0;
    let textShadows = [-shadowOffset, shadowOffset].flatMap((x) =>
      [-shadowOffset, shadowOffset].map(
        (y) => `${haloColor} ${x}px ${y}px ${haloBlur}px`
      )
    );

    Object.assign(container.style, {
      color: symbol.layer.paint["text-color"],
      fontWeight,
      fontStyle,
      fontSize: `${symbol.layer.layout["text-size"] ?? 16}px`,
      letterSpacing: `${symbol.layer.layout["text-letter-spacing"]}em`,
      lineHeight: `${symbol.layer.layout["text-line-height"] ?? 1.2}em`,
      maxWidth: "10vw", // prevent label column from taking over popup
      textAlign: justification === "auto" ? "right" : justification,
      textShadow: textShadows.join(", "),
      textTransform: symbol.layer.layout["text-transform"],
      verticalAlign: "middle",
      width: `${symbol.layer.layout["text-max-width"] ?? 10}em`,
    });
  }

  /**
   * Returns style properties resembling the given fill and line.
   */
  getSwatchStyle(fill, stroke) {
    let fillColor =
      fill?.layer.paint["fill-color"] ||
      fill?.layer.paint["fill-extrusion-color"];
    let fillOpacity = fill?.layer.paint["fill-opacity"];
    if (fillColor && fillOpacity) {
      let opacity = fillOpacity ?? fillColor.a ?? 1;
      fillColor = `rgba(${(fillColor.r * 255) / opacity}, ${
        (fillColor.g * 255) / opacity
      }, ${(fillColor.b * 255) / opacity}, ${opacity})`;
    }
    let borderStyle = "solid";
    if (stroke?.layer.paint["line-dasharray"]) {
      // Just give an idea of the outline being dashed.
      borderStyle = "dashed";
    } else if (fill?.layer.paint["fill-extrusion-height"]) {
      // Assume the only fill extrusion layers are for buildings and that the
      // height is fixed to a small value.
      borderStyle = "outset";
    }
    return {
      backgroundColor: fillColor,
      borderColor:
        stroke?.layer.paint["line-color"] || fillColor || "transparent",
      borderStyle: borderStyle,
      borderWidth: `${stroke?.layer.paint["line-width"] ?? 1}px`,
      opacity: fill?.layer.paint["fill-extrusion-opacity"] ?? 1,
    };
  }

  /**
   * Populates the given table cell with SVG elements depicting a line.
   */
  populateLineCell(cell, lineFeatures) {
    let getLineWidth = (f) => {
      let width = f.layer.paint["line-width"] ?? 1;
      let gapWidth = f.layer.paint["line-gap-width"];
      // Round the stroke width up to one point to ensure legibility.
      return Math.max(
        1 / ShieldDraw.PXR,
        gapWidth ? width * 2 + gapWidth : width
      );
    };
    let lineWidths = lineFeatures.map(getLineWidth);
    let height = Math.max(...lineWidths);

    let svg = cell.querySelector("svg");
    svg.style.height = `${Math.ceil(height)}px`;

    for (let feature of lineFeatures) {
      let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("y1", `${height / 2}px`);
      line.setAttribute("y2", `${height / 2}px`);
      line.setAttribute("x2", "100%");

      // line-dasharray is measured in multiples of line-width, whereas
      // stroke-dasharray is measured in pixels.
      let simpleLineWidth = feature.layer.paint["line-width"] ?? 1;
      let dashArray = feature.layer.paint["line-dasharray"]?.from.map(
        (d) => d * simpleLineWidth
      );

      Object.assign(line.style, {
        opacity: feature.layer.paint["line-opacity"] ?? 1,
        stroke: feature.layer.paint["line-color"] || fillColor,
        strokeDasharray: dashArray?.join(" "),
        strokeWidth: getLineWidth(feature),
      });

      svg.appendChild(line);
    }
  }

  /**
   * Returns table rows illustrating route shields.
   */
  getShieldRows() {
    // Query the map for rendered shield symbols in the current viewport.
    let shieldFeatures = this._map.queryRenderedFeatures({
      layers: [HighwayShieldLayers.shield.id],
    });

    // Extract all the image sections embedded in the symbols and map them to
    // image metadata (image names and parsed networks and route numbers).
    let images = shieldFeatures
      .flatMap((f) => f.layer.layout["text-field"].sections)
      .filter((s) => s.image && s.image)
      .map((s) => HighwayShieldLayers.parseImageName(s.image.name));

    // Unique the images by network.
    let imagesByNetwork = {};
    let unrecognizedNetworks = new Set();
    for (let image of images) {
      if (!(image.network in imagesByNetwork)) {
        imagesByNetwork[image.network] = { overridesByRef: {} };
      }
      let networkImages = imagesByNetwork[image.network];

      let shieldDef = ShieldDef.shields[image.network];
      if (image.ref && shieldDef?.overrideByRef?.[image.ref]) {
        // Store a different image for each override in the shield definition.
        if (!networkImages.overridesByRef[image.ref]) {
          networkImages.overridesByRef[image.ref] = image.imageName;
        }
      } else if (!networkImages.ref && image.ref) {
        // Store the numbered variant of a shield if required by the shield
        // definition.
        networkImages.ref = image.imageName;
      } else if (!networkImages.noRef && !image.ref) {
        // Store the unnumbered variant of a shield if required by the shield
        // definition.
        networkImages.noRef = image.imageName;
      }

      if (!shieldDef) {
        // Keep all unrecognized networks separate so we don't miss them when
        // sorting the networks by the order in the shield definitions.
        unrecognizedNetworks.add(image.network);
      }
    }

    // For each country, populate an array with shield metadata in the same
    // order as in the shield definitions, appending all the unrecognized
    // networks sorted in alphabetical order.
    let networks = [
      ...Object.keys(ShieldDef.shields),
      ...[...unrecognizedNetworks.values()].sort(),
    ];
    let countries = new Set();
    let shieldRowsByCountry = {};
    let otherShieldRows = [];
    for (let network of networks) {
      // Skip shield definitions for which no shield is currently visible.
      if (!(network in imagesByNetwork)) continue;

      // Get all the relevant images, sorted from generic to specialized.
      let images = imagesByNetwork[network];
      let sortedImages = [
        images.noRef,
        images.ref,
        ...Object.values(images.overridesByRef),
      ].filter((i) => i);

      let row = this.getShieldRow(network, sortedImages);
      if (!row) continue;

      // Extract an ISO 3166-1 alpha-2 country code from the network.
      // OpenMapTiles synthesizes fake networks in some countries.
      let country = network
        .match(/^(?:omt-)?(\w\w)(?:[-:]|$)/)?.[1]
        ?.toUpperCase();
      if (country) {
        if (!(country in shieldRowsByCountry)) {
          shieldRowsByCountry[country] = [];
        }
        shieldRowsByCountry[country].push(row);
        countries.add(country);
      } else {
        otherShieldRows.push(row);
      }
    }

    // Map country codes to localized names and sort the lists of networks by
    // those names.
    let locales = Label.getLocales();
    let countryNames = new Intl.DisplayNames(locales, {
      type: "region",
    });
    let sortedCountries = [...countries]
      .map((code) => {
        let name = countryNames.of(code) ?? code;
        return { code, name };
      })
      .sort((a, b) => a.name.localeCompare(b.name, locales[0]));

    // List any network without a country code first as an international
    // network.
    if (otherShieldRows.length) {
      sortedCountries.unshift({ code: "*", name: "International" });
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
   * @param network The `network=*` value associated with the style images.
   * @param names An array of style image names.
   * @returns An HTML table row representing the route shield, or nothing if the style does not render the given network.
   */
  getShieldRow(network, names) {
    let images = names
      .map((n) => this._map.style.getImage(n))
      .map((i) => this.getImageFromStyle(i))
      .filter((i) => i);
    if (!images.length) return;

    let template = document
      .getElementById("legend-row-symbol")
      .content.cloneNode(true);
    let row = template.querySelector("tr");
    row.dataset.network = network;

    row.querySelector(".icon").replaceChildren(...images);

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

    // Wrap the style image's raw data as an image data buffer. Images generated
    // at runtime are stored in a different property than images hard-coded in
    // the spritesheet.
    let imageData = new ImageData(
      userImage?.data || new Uint8ClampedArray(styleImage.data.data),
      userImage?.width || styleImage.data.width,
      userImage?.height || styleImage.data.height
    );

    // Draw the image onto a canvas of the same size.
    let canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    let ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);

    // Embed the canvas in an HTML image of the same size.
    let img = new Image(
      (imageData.width * iconSize) / ShieldDraw.PXR,
      (imageData.height * iconSize) / ShieldDraw.PXR
    );
    img.src = canvas.toDataURL("image/png");
    img.className = "shield";

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

    // If any synthesized British networks are visible, also query Wikidata for
    // descriptions of those networks.
    for (let row of rows) {
      let network = row.dataset.network;
      if (network?.startsWith("omt-gb-")) {
        let ukNetworkMetadata = await this.getUKNetworkMetadata();
        Object.assign(networkMetadata, ukNetworkMetadata);
        break;
      }
    }

    let locales = Label.getLocales();
    let languageNames = new Intl.DisplayNames(locales, {
      type: "language",
    });

    // Wikidata labels are normally lowercased so that they can appear in any
    // context. Convert them to sentence case for consistency with the rest of
    // the legend.
    let toSentenceCase = (lowerCase, locale) =>
      lowerCase[0].toLocaleUpperCase(locale) + lowerCase.substring(1);
    for (let row of rows) {
      let network = row.dataset.network;
      let binding = networkMetadata[network];
      if (!binding) continue;

      let descriptionCell = row.querySelector(".description");

      let link = document.createElement("a");
      link.href = binding.network.value;
      link.target = "_blank";
      let locale = binding.networkLabel["xml:lang"];
      link.textContent = toSentenceCase(binding.networkLabel.value, locale);
      if (locale) {
        link.setAttribute("lang", locale);
        descriptionCell.replaceChildren(link);

        if (locale.match(/^\w+/)?.[0] !== locales[0].match(/^\w+/)?.[0]) {
          let languageTag = document.createElement("span");
          languageTag.className = "language";
          languageTag.textContent = languageNames.of(locale);
          descriptionCell.appendChild(document.createTextNode(" "));
          descriptionCell.appendChild(languageTag);
        }
      } else {
        descriptionCell.querySelector("code").replaceChildren(link);
      }
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
   * Returns a mapping from OpenMapTiles synthesized `network=*` values to
   * metadata about these values from Wikidata.
   */
  async getUKNetworkMetadata() {
    if (this._ukNetworkMetadata) {
      return this._ukNetworkMetadata;
    }

    let url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      this.getNetworkMetadataQuery("GB")
    )}&format=json`;
    const response = await fetch(url);
    const json = await response.json();
    this._ukNetworkMetadata = Object.fromEntries(
      json.results.bindings.map((binding) => {
        return [binding.value.value, binding];
      })
    );
    return this._ukNetworkMetadata;
  }

  purgeNetworkMetadata() {
    delete this._networkMetadata;
    delete this._ukNetworkMetadata;
  }

  /**
   * Returns the Wikidata Query Service SPARQL query for network metadata.
   *
   * @param region ISO 3166-1 alpha-2 country code.
   */
  getNetworkMetadataQuery(region) {
    let locales = Label.getLocales().join(",");
    let triple,
      filter = "",
      bind = "";
    if (region === "GB") {
      triple =
        "?network wdt:P361 wd:Q115856945; p:P528 [ ps:P528 ?value; pq:P972 wd:Q110613756 ]";
    } else {
      triple = "?network wdt:P1282 ?tag";
      filter = `FILTER(REGEX(?tag, "^Tag:network="))`;
      bind = "BIND(SUBSTR(?tag, 13) AS ?value)";
    }
    return `
SELECT ?value ?network ?networkLabel WHERE {
  ${triple}.
  ${filter}
  ${bind}
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${locales},en". }
}
ORDER BY ?value
`;
  }
}
