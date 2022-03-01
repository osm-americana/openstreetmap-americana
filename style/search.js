"use strict";

import * as maplibregl from "maplibre-gl";

var searchInput;
var liveResults;

var resultSelectIndex = -1;
var resultGeometry = [];
var resultPoint = [];

var lastSearchRequest;

function collapseArray(arr, delimiter) {
  return arr
    .filter(function (x) {
      return x !== undefined && x != "";
    })
    .join(delimiter);
}

function goToResult(index) {
  let bbox = resultGeometry[index];
  let center = resultPoint[index];
  resultSelectIndex = -1;
  resultGeometry = [];
  resultPoint = [];
  liveResults.innerHTML = "";

  //Clear search box
  searchInput.value = "";
  map.getCanvas().focus();

  //Zoom map to search result
  if (bbox != undefined) {
    map.fitBounds(bbox);
  } else {
    map.setCenter({ lat: center[1], lon: center[0] });
  }
}

//Re-map silly results from photon
function mapResultToDescription(type, key, value) {
  switch (type) {
    case "house":
      switch (key) {
        case "highway":
          switch (value) {
            case "bus_stop":
              return value;
            default:
              return "road";
          }
        case "aeroway":
          switch (value) {
            case "aerodrome":
              return "airport";
            default:
              return value;
          }
        case "railway":
          return `train ${value}`;
        case "man_made":
        case "tourism":
        case "amenity":
        case "leisure":
          return value;
        case "office":
        default:
          return key;
      }
    case "district":
    case "locality":
      switch (key) {
        case "landuse":
          return `${value} area`;
        default:
          return value;
      }
    case "tunnel":
      return key;
  }
  return type;
}

function geocoderResultEntry(result) {
  let p = result.properties;
  let type = mapResultToDescription(p.type, p.osm_key, p.osm_value).replaceAll(
    "_",
    " "
  );

  let addr = collapseArray([p.housenumber, p.street], " ");
  let name = p.name;

  if (name == undefined) {
    name = addr;
    addr = undefined;
  }

  let description = collapseArray(
    [addr, p.city, p.county, p.state, p.country],
    ", "
  );

  let item = document.createElement("div");
  item.className = "gc-result-item";

  let itemCategory = document.createElement("div");
  itemCategory.className = "gc-result-category";
  itemCategory.innerText = type;
  let itemName = document.createElement("div");
  itemName.className = "gc-result-name";
  itemName.innerText = name;
  let itemDescription = document.createElement("div");
  itemDescription.className = "gc-result-description";
  itemDescription.innerText = description;

  item.appendChild(itemCategory);
  item.appendChild(itemName);
  item.appendChild(itemDescription);

  return item;
}

function geocoderResponse(data) {
  liveResults.innerHTML = "";

  for (let i = 0; i < data.features.length; i++) {
    resultGeometry[i] = data.features[i].properties.extent;
    resultPoint[i] = data.features[i].geometry.coordinates;
    let result = geocoderResultEntry(data.features[i]);
    liveResults.appendChild(result);
    result.onclick = (e) => goToResult(i);
  }
}

function search(e) {
  let queryTerm = e.target.value;
  resultSelectIndex = -1;
  if (queryTerm.length < 3) {
    liveResults.innerHTML = "";
    return;
  }

  let position = map.getCenter();
  let searchQuery = new URL("https://photon.komoot.io/api/?limit=3");
  console.log(map.getZoom());

  //Low zoom: generate "generic" search results
  //High zoom: generate location-specific search results
  if (map.getZoom() > 5) {
    searchQuery.searchParams.set("lat", position.lat);
    searchQuery.searchParams.set("lon", position.lng);
  }

  searchQuery.searchParams.set("q", e.target.value);

  doSearch(searchQuery);
}

async function doSearch(searchQuery) {
  //Abort prior search in progress
  lastSearchRequest?.abort();
  const controller = new AbortController();
  lastSearchRequest = controller;

  try {
    const response = await fetch(searchQuery, { signal: controller.signal });
    const data = await response.json();

    if (controller.signal.aborted) {
      return;
    }
    geocoderResponse(data);
  } catch (e) {
    if (e instanceof DOMException) {
      //Do nothing; this is normal when search result is aborted by an
      //additional keystroke
    }
  }
}

function arrowNavigate(e) {
  if (e.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  let priorIndex = resultSelectIndex;

  switch (e.code) {
    case "ArrowUp":
      // up arrow
      resultSelectIndex--;
      e.preventDefault();
      break;
    case "ArrowDown":
      // down arrow
      resultSelectIndex++;
      e.preventDefault();
      break;
    case "Enter":
      let navIndex = resultSelectIndex < 0 ? 0 : resultSelectIndex;

      goToResult(navIndex);
      return;
    default:
      return;
  }

  if (resultSelectIndex >= liveResults.children.length) {
    resultSelectIndex = liveResults.children.length - 1;
  }
  if (resultSelectIndex < -1) {
    resultSelectIndex = -1;
  }

  if (priorIndex >= 0) {
    liveResults.children[priorIndex].classList.remove(
      "gc-result-item-selected"
    );
  }
  if (resultSelectIndex >= 0) {
    liveResults.children[resultSelectIndex].classList.add(
      "gc-result-item-selected"
    );
  }
}

export class PhotonSearchControl extends maplibregl.Evented {
  constructor() {
    super();
  }

  onAdd(map) {
    this._map = map;

    searchInput = document.createElement("input");
    searchInput.id = "geocoder-search-input";
    searchInput.type = "search";
    searchInput.placeholder = "Search";
    searchInput.autocomplete = "off";
    searchInput.addEventListener("input", search);
    searchInput.addEventListener("keydown", arrowNavigate);

    var form = document.createElement("form");
    form.appendChild(searchInput);

    liveResults = document.createElement("div");
    liveResults.id = "geocoder-live-results";

    this._container = document.createElement("div");
    this._container.id = "geocoder-search-panel";
    this._container.className = "maplibregl-ctrl";
    this._container.appendChild(form);
    this._container.appendChild(liveResults);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
