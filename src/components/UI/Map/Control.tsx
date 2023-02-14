import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";
import type { Map, ControlOptions } from "leaflet";

type ButtonControlProps = {
  image?: string;
  title: string;
  onClick: () => void;
} & ControlOptions;

const _getControl = Control.extend({
  options: {
    position: "topleft",
    title: "",
    onClick: () => {},
  } as ButtonControlProps,
  onAdd: function (_map: Map) {
    const container = DomUtil.create("div", "leaflet-bar");
    const link = DomUtil.create("a", "", container);
    const { image, title } = this.options;

    link.setAttribute("title", title);
    link.setAttribute("href", "#");
    if (image) {
      link.style.backgroundImage = "url(/icons/stack-line.svg)";
    } else {
      link.innerText = title;
    }

    DomEvent.on(link, "mousedown dblclick", DomEvent.stopPropagation)
      .on(link, "click", DomEvent.stop)
      .on(link, "click", this._view, this);

    return container;
  },
  // eslint-disable-next-line no-unused-vars
  _view: function (this: { options: ButtonControlProps; _map: Map }) {
    this.options.onClick();
  },
});

const _createControl = (props: ButtonControlProps) => new _getControl(props);

export default createControlComponent<
  ReturnType<typeof _createControl>,
  ButtonControlProps
>(_createControl);
