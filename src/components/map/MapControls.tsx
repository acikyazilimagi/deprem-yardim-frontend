import React from "react";
import ButtonControl from "./ButtonControl";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { AttributionControl } from "react-leaflet";

const MapControls: React.FC = () => {
  const attribution = `
    <a href="./cerez.pdf" target="_blank">
      cookie
    </a>
    •
    <a href="./gizlilik.pdf" target="_blank">
      privacy
    </a>
    •
    <a>data</a>
  `;
  return (
    <>
      <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
      <ButtonControl
        position="bottomleft"
        title="Layers"
        onClick={() => {}}
        icon="stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Disaster Survivors"
        onClick={() => {}}
        icon="stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Demands"
        onClick={() => {}}
        icon="stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Services"
        onClick={() => {}}
        icon="stack-line.svg"
      />
      <AttributionControl />
      <ButtonControl
        classNames="leaflet-control-attribution"
        position="bottomright"
        title="Attribution"
        html={attribution}
      />
      <ButtonControl
        position="bottomright"
        title="Language"
        onClick={() => {}}
        icon="stack-line.svg"
      />
    </>
  );
};

export default MapControls;
