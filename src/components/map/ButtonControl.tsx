import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";
import type { Map, ControlOptions } from "leaflet";

type ButtonControlProps = {
  classNames?: string;
  icon?: string;
  title: string;
  html?: string;
  onClick?: () => void;
} & ControlOptions;

const _getControl = Control.extend({
  options: { position: "topleft", title: "" } as ButtonControlProps,
  onAdd: function (_map: Map) {
    const { classNames, icon, html, title, onClick } = this.options;
    const container = DomUtil.create("div", classNames ?? "leaflet-bar");

    if (html) {
      container.innerHTML = html;
      return container;
    }

    const link = DomUtil.create("a", "", container);
    link.setAttribute("title", title);
    link.setAttribute("href", "#");
    if (icon) {
      link.style.backgroundImage = `url(/icons/${icon})`;
    } else {
      link.innerText = title;
    }

    if (onClick) {
      DomEvent.on(link, "mousedown dblclick", DomEvent.stopPropagation)
        .on(link, "click", DomEvent.stop)
        .on(link, "click", this._view, this);
    }

    return container;
  },
  // eslint-disable-next-line no-unused-vars
  _view: function (this: { options: ButtonControlProps; _map: Map }) {
    this.options.onClick?.();
  },
});

const _createControl = (props: ButtonControlProps) => new _getControl(props);

export default createControlComponent<
  ReturnType<typeof _createControl>,
  ButtonControlProps
>(_createControl);
