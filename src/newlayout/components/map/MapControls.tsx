import React from "react";
import ButtonControl from "./ButtonControl";
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
import { LocaleSwitchComponent } from "../LocaleSwitchComponent/LocaleSwitchComponent";

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
            borderRadius: "12px",
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
        <Button variant="contained">Afetzede Bul</Button>
        <Button variant="contained">Yardim Talepleri</Button>
        <Button variant="contained">Hizmetler</Button>
      </Control>
      <Control position="bottomright">
        <LocaleSwitchComponent />
      </Control>
      <Control position="bottomright">
        <AttributionComponent />
      </Control>
    </>
  );
};

export default MapControls;
