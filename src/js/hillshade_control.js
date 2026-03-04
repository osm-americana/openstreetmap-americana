export class HillshadeControl {
  _updateButton() {
    if (this._map.shadesHills) {
      this._button.classList.add("maplibregl-ctrl-terrain-enabled");
      this._button.title = "Disable terrain";
    } else {
      this._button.classList.remove("maplibregl-ctrl-terrain-enabled");
      this._button.title = "Enable terrain";
    }
  }

  _onClick = () => {
    this._map.shadesHills = !this._map.shadesHills;
    this._updateButton();
  };

  onAdd(map) {
    this._map = map;

    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";

    this._button = document.createElement("button");
    this._button.className = "maplibregl-ctrl-terrain";
    this._map.on("americana.terrain", () => this._updateButton());
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
    this._map.off("americana.terrain");
    this._map = undefined;
  }
}
