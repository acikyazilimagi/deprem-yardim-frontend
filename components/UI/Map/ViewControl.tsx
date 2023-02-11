import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil, DomEvent } from "leaflet";
import type { Map, ControlOptions } from "leaflet";
import { i18n } from "next-i18next";

type ViewControlProps = {
  onClick: () => void;
} & ControlOptions;

const _getControl = Control.extend({
  options: { position: "topleft" },
  onAdd: function (_map: Map) {
    const container = DomUtil.create("div", "leaflet-bar");
    const link = DomUtil.create("a", "", container);
    // @ts-ignore
    link.setAttribute("title", i18n?.t("home:viewControls.layers")?.toString());
    link.setAttribute("href", "#");
    link.style.backgroundImage = "url(/icons/stack-line.svg)";

    DomEvent.on(link, "mousedown dblclick", DomEvent.stopPropagation)
      .on(link, "click", DomEvent.stop)
      .on(link, "click", this._view, this);

    return container;
  },
  // eslint-disable-next-line no-unused-vars
  _view: function (this: { options: ViewControlProps; _map: Map }) {
    this.options.onClick();
  },
});

const _createControl = (props: ViewControlProps) => new _getControl(props);

export default createControlComponent<
  ReturnType<typeof _createControl>,
  ViewControlProps
>(_createControl);
