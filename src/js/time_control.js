import { Timescope } from "timescope";

export class TimeControl {
  _update() {
    if (this._map._timescope) {
      // this._map._timescope.setTime(this._map.date);
    }
  }

  _onTimeChanged(event) {
    const time = event.value;
    if (time) {
      const date = new Date(time.mul(1000).number());
      this._map.date = date;
    }
  }

  onAdd(map) {
    this._map = map;

    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this._container.id = "maplibregl-ctrl-time";

    Promise.resolve(map.style.loaded() || map.once("styledata")).then(() => {
      map._timescope = new Timescope({
        target: "#maplibregl-ctrl-time",
        style: {
          width: "50vw",
        },
        timeRange: [new Date("1800-01-01"), null],
        time: null,
        zoom: -20,
        tracks: {
          timeAxis: {
            timeFormat: ({ time }) =>
              new Date(time.mul(1000).number()).toLocaleDateString(),
          },
        },
      });
      map._timescope.on("timechanged", (event) => this._onTimeChanged(event));
    });
    this._map.on("americana.datechanged", () => this._update());

    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map._timescope.dispose();
    this._map.off("americana.datechanged");
    this._map = undefined;
  }
}
