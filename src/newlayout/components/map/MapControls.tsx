import React from "react";
import ButtonControl from "./ButtonControl";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import Control from "react-leaflet-custom-control";
import { useHelpView } from "@/newlayout/components/HelpViewComponent/HelpViewComponent";
import { HelpOutline } from "@mui/icons-material";
import {
  MapTypeMapLayerViewComponent,
  useMTMLView,
} from "../MTMLViewComponent/MTMLViewComponent";
import { MapType } from "../MTMLViewComponent/types";
import { LayerButton } from "@/components/UI/Drawer/components/LayerButton";

const typeImages: Record<MapType, string> = {
  [MapType.Default]: "default",
  [MapType.Satellite]: "satellite",
  [MapType.Terrain]: "terrain",
};

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
      <Control
        position="bottomleft"
        container={{
          className: "leaflet-bar",
          style: {
            background: "white",
          },
        }}
      >
        <LayerButton
          onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
          image={typeImages[mtmlView.mapType]}
          checked={false}
        />
      </Control>
      <Control position="topright">Buttons...</Control>
      <ButtonControl
        position="bottomright"
        title="Language"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <Control position="bottomright">
        <a href="./cerez.pdf" target="_blank">
          cookie
        </a>
        •
        <a href="./gizlilik.pdf" target="_blank">
          privacy
        </a>
        •<a>data</a>•<a>leaflet</a>
      </Control>
    </>
  );
};

export default MapControls;
