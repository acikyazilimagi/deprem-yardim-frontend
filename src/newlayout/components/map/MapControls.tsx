import React from "react";
import ButtonControl from "./ButtonControl";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { AttributionControl } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { useHelpView } from "@/newlayout/components/HelpViewComponent/HelpViewComponent";
import { HelpOutline } from "@mui/icons-material";
import {
  MapTypeMapLayerViewComponent,
  useMTMLView,
} from "../MTMLViewComponent/MTMLViewComponent";

const MapControls: React.FC = () => {
  const helpView = useHelpView();
  const mtmlView = useMTMLView();
  return (
    <>
      <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
      <ButtonControl
        position="topleft"
        title="?"
        onClick={() => helpView.toggle(!helpView.isOpen)}
      >
        <HelpOutline />
      </ButtonControl>
      <Control position="bottomleft">
        <MapTypeMapLayerViewComponent />
      </Control>
      <ButtonControl
        position="bottomleft"
        title="Layers"
        onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
        icon="/icons/stack-line.svg"
      />
      <Control position="topright">Buttons...</Control>
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
