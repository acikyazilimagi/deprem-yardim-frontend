import React from "react";
import ButtonControl from "./ButtonControl";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { AttributionControl } from "react-leaflet";
import Control from "react-leaflet-custom-control";

const MapControls: React.FC = () => {
  return (
    <>
      <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
      <ButtonControl
        position="bottomleft"
        title="Layers"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Disaster Survivors"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Demands"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <ButtonControl
        position="topright"
        title="Services"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <AttributionControl />
      <Control position="bottomright">
        <a href="./cerez.pdf" target="_blank">
          cookie
        </a>
        •
        <a href="./gizlilik.pdf" target="_blank">
          privacy
        </a>
        •<a>data</a>
      </Control>
      <ButtonControl
        position="bottomright"
        title="Language"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
    </>
  );
};

export default MapControls;
