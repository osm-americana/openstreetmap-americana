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
  console.log("RESULT!");
  let bbox = resultGeometry[index];
  let center = resultPoint[index];
  resultSelectIndex = -1;
  resultGeometry = [];
  resultPoint = [];
  liveResults.innerHTML = "";

  //Clear search box
  searchInput.value = "";
  searchInput.blur();
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

function geocoderResultEntry(result, index) {
  let p = result.properties;

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

  return `
      <div class="gc-result-item" id="gc-result-item-${index}">
        <div class="gc-result-category">${p.type}</div>
        <div class="gc-result-name">${name}</div>
        <div class="gc-result-description">${description}</div>
      </div>
    `;
}

function geocoderResponse(data) {
  liveResults.innerHTML = "";

  for (var i = 0; i < data.features.length; i++) {
    resultGeometry[i] = data.features[i].properties.extent;
    resultPoint[i] = data.features[i].geometry.coordinates;
    liveResults.innerHTML += geocoderResultEntry(data.features[i], i);
    document.getElementById(`gc-result-item-${i}`).onclick = function () {
      goToResult(i);
    };
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
  let searchQuery =
    "https://photon.komoot.io/api/?q=" +
    encodeURIComponent(e.target.value) +
    "&lat=" +
    position.lat +
    "&lon=" +
    position.lng +
    "&limit=3";

  fetch(searchQuery)
    .then((response) => response.json())
    .then((data) => geocoderResponse(data));
}

function arrowNavigate(e) {
  e = e || window.event;

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
