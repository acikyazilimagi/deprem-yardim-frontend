import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useMTMLView } from "@/newlayout/components/MTMLViewComponent/MTMLViewComponent";
import { useDevice } from "@/stores/mapStore";
import {
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";
import { CooldownButtonComponent } from "@/newlayout/components/CooldownButtonComponent/CooldownButtonComponent";
import Map from "./Map";
import MapControls from "./MapControls";
import { TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import { GenericClusterGroup } from "@/components/UI/Map/GenericClusterGroup";
import { ChannelData } from "@/types";

type Props = {
  reasons: string[];
  locations: ChannelData[];
};

export const MapContent = ({ reasons, locations }: Props) => {
  const { mapType } = useMTMLView();
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();
  const device = useDevice();

  const dpr = window.devicePixelRatio;
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&scale=${dpr}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

  return (
    <Map
      zoomControl={false}
      attributionControl={false}
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
    >
      <MapControls filters={{ reasons }} />
      <TileLayer url={baseMapUrl} />

      <GenericClusterGroup
        data={locations}
        onMarkerClick={(...args) => {
          console.log(...args);
        }}
      />

      <Box sx={styles.fixedMidBottom}>
        <CooldownButtonComponent />
      </Box>
    </Map>
  );
};

const styles = {
  fixedMidBottom: () => ({
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    height: "110px",
    zIndex: 1030,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  }),
};
