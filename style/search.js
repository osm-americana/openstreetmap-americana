"use strict";

let searchInput = document.getElementById("geocoder-search-input");

searchInput.addEventListener("input", search);
searchInput.addEventListener("keydown", arrowNavigate);

var liveResults = document.getElementById("geocoder-live-results");
var divMap = document.getElementById("map");
var resultSelectIndex = -1;
var resultGeometry = [];
var resultPoint = [];

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

  console.log(bbox);
  console.log(center);

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
  console.log(p);
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
  searchQuery.searchParams.set("lat", position.lat);
  searchQuery.searchParams.set("lon", position.lng);
  searchQuery.searchParams.set("q", e.target.value);

  fetch(searchQuery)
    .then((response) => response.json())
    .then((data) => geocoderResponse(data));
}

function arrowNavigate(e) {
  let priorIndex = resultSelectIndex;

  switch (e.keyCode) {
    case 38:
      // up arrow
      resultSelectIndex--;
      break;
    case 40:
      // down arrow
      resultSelectIndex++;
      break;
    case 13:
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
    liveResults.children.item(priorIndex).className = "gc-result-item";
  }
  if (resultSelectIndex >= 0) {
    liveResults.children.item(resultSelectIndex).className =
      "gc-result-item-selected";
  }
}
