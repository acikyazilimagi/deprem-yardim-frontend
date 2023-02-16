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
import { Button, Stack } from "@mui/material";
import { LocaleSwitchComponent } from "../LocaleSwitchComponent/LocaleSwitchComponent";
import SearchIcon from "@mui/icons-material/Search";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
import Diversity1Icon from "@mui/icons-material/Diversity1";
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
        <Stack display={"flex"} direction={"row"} columnGap={2}>
          <Button
            sx={{ backgroundColor: "#ffffff" }}
            color="inherit"
            variant="outlined"
            startIcon={<SearchIcon />}
          >
            Afetzede Bul
          </Button>
          <Button
            sx={{ backgroundColor: "#ffffff" }}
            color="inherit"
            variant="outlined"
            startIcon={<WifiTetheringErrorIcon />}
          >
            Yardim Talepleri
          </Button>
          <Button
            sx={{ backgroundColor: "#ffffff" }}
            color="inherit"
            variant="outlined"
            startIcon={<Diversity1Icon />}
          >
            Hizmetler
          </Button>
        </Stack>
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
