import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useDevice } from "@/stores/mapStore";
import {
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { HelpViewComponent } from "../../newlayout/components/HelpViewComponent/HelpViewComponent";
import { useMTMLView } from "@/newlayout/components/MTMLViewComponent/MTMLViewComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Map = dynamic(() => import("@/newlayout/components/map/Map"), {
  ssr: false,
});
const MapControls = dynamic(
  () => import("@/newlayout/components/map/MapControls"),
  {
    ssr: false,
  }
);

// Development overlay container
const UIElementsOverlay = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: "20px",
        zIndex: 90000,
        pointerEvents: "none",
      }}
    >
      <HelpViewComponent />
    </Box>
  );
};

const NHome = () => {
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();
  const { mapType } = useMTMLView();
  const device = useDevice();
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;
  return (
    <>
      <UIElementsOverlay />
      <Map
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
        whenReady={(map: any) => {
          setTimeout(() => {
            map.target.invalidateSize();
          }, 100);
        }}
      >
        <MapControls />
        <TileLayer url={baseMapUrl} />
      </Map>
    </>
  );
};
export default NHome;

export async function getServerSideProps(context: any) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}
