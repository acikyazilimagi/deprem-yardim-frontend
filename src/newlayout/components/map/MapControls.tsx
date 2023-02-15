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
import { AttributionComponent } from "../AttributionComponent/AttributionComponent";
import { LayerButton } from "@/components/UI/Drawer/components/LayerButton";
import { Button } from "@mui/material";

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
      <Control position="topright">
        <Button variant="outlined">Afetzede Bul</Button>
        <Button variant="outlined">Yardim Talepleri</Button>
        <Button variant="outlined">Hizmetler</Button>
      </Control>
      <ButtonControl
        position="bottomright"
        title="Language"
        onClick={() => {}}
        icon="/icons/stack-line.svg"
      />
      <Control position="bottomright">
        <AttributionComponent />
      </Control>
    </>
  );
};

export default MapControls;
