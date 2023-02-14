import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useDevice } from "@/stores/mapStore";
import {
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";

import dynamic from "next/dynamic";
import { Box, FormControlLabel, Switch } from "@mui/material";
import {
  useHelpView,
  HelpViewComponent,
} from "../../newlayout/components/HelpViewComponent/HelpViewComponent";

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Map = dynamic(() => import("@/components/UI/Map/Map"), {
  ssr: false,
});

// Development toggle menu for overlays
const DevelopmentToggleMenu = () => {
  const helpView = useHelpView();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 90000,
      }}
    >
      <FormControlLabel
        control={
          <Switch checked={helpView.isOpen} onChange={helpView.toggle} />
        }
        label="Show HelpView"
      />
      <FormControlLabel
        control={
          <Switch checked={helpView.isOpen} onChange={helpView.toggle} />
        }
        label="Show HelpView"
      />
      <FormControlLabel
        control={
          <Switch checked={helpView.isOpen} onChange={helpView.toggle} />
        }
        label="Show HelpView"
      />
      <FormControlLabel
        control={
          <Switch checked={helpView.isOpen} onChange={helpView.toggle} />
        }
        label="Show HelpView"
      />
    </Box>
  );
};

// Development overlay container
const UIElementsOverlay = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 90000,
        padding: "1em",
        width: "100%",
        height: "100%",
      }}
    >
      <HelpViewComponent />
    </Box>
  );
};

const NHome = () => {
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();
  const device = useDevice();
  return (
    <>
      <UIElementsOverlay />
      <DevelopmentToggleMenu />
      <>
        <Map
          center={defaultCenter}
          zoom={defaultZoom}
          minZoom={
            device === "desktop"
              ? DEFAULT_MIN_ZOOM_DESKTOP
              : DEFAULT_MIN_ZOOM_MOBILE
          }
          zoomSnap={1}
          zoomDelta={1}
          preferCanvas
          maxBoundsViscosity={1}
          maxZoom={18}
          whenReady={(map: any) => {
            setTimeout(() => {
              map.target.invalidateSize();
            }, 100);
          }}
        >
          <TileLayer
            url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
          />
        </Map>
      </>
    </>
  );
};
export default NHome;
