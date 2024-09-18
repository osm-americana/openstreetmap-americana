export class HillshadeControl {
  constructor({ layerId }) {
    this._layerId = layerId;
  }

  _onClick = () => {
    if (this._map.getLayoutProperty(this._layerId, "visibility") == "none") {
      this._map.setLayoutProperty(this._layerId, "visibility", "visible");
      this._button.classList.add("maplibregl-ctrl-terrain-enabled");
      this._button.title = "Disable terrain";
    } else {
      this._map.setLayoutProperty(this._layerId, "visibility", "none");
      this._button.classList.remove("maplibregl-ctrl-terrain-enabled");
      this._button.title = "Enable terrain";
    }
  };

  onAdd(map) {
    this._map = map;

    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this._button = document.createElement("button");
    this._button.className = "maplibregl-ctrl-terrain";
    this._button.classList.add("maplibregl-ctrl-terrain-enabled");
    this._button.title = "Disable terrain";
    this._button.addEventListener("click", this._onClick);
    this._container.append(this._button);

    const span = document.createElement("span");
    span.className = "maplibregl-ctrl-icon";
    span.setAttribute("aria-hidden", "true");
    this._button.append(span);

    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }
}
