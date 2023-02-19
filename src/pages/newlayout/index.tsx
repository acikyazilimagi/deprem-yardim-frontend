import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useDevice } from "@/stores/mapStore";
import {
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";
import dynamic from "next/dynamic";
import { Box, SxProps, Theme } from "@mui/material";
import { HelpViewComponent } from "../../newlayout/components/HelpViewComponent/HelpViewComponent";
import { CooldownButtonComponent } from "@/newlayout/components/CooldownButtonComponent/CooldownButtonComponent";
import { useMTMLView } from "@/newlayout/components/MTMLViewComponent/MTMLViewComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dataFetcher } from "@/services/dataFetcher";

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
interface IStyles {
  [key: string]: SxProps<Theme>;
}
// Development overlay container
const UIElementsOverlay = () => {
  return (
    <Box sx={styles.overlay}>
      <HelpViewComponent />
    </Box>
  );
};

interface INHome {
  reasons: string[];
}

const NHome = (props: INHome) => {
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();
  const { mapType } = useMTMLView();
  const device = useDevice();
  let dpr = 1;
  if (typeof window !== "undefined") {
    dpr = window.devicePixelRatio;
  }

  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&scale=${dpr}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;
  return (
    <main id="new-layout">
      <UIElementsOverlay />
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
        <MapControls
          filters={{
            reasons: props.reasons,
          }}
        />
        <TileLayer url={baseMapUrl} />
        <Box sx={styles.fixedMidBottom}>
          <CooldownButtonComponent />
        </Box>
      </Map>
    </main>
  );
};
export default NHome;

export async function getServerSideProps(context: any) {
  const checkQueryParams = JSON.stringify(context.query) === "{}";
  const res = await dataFetcher(`https://apigo.afetharita.com/reasons`);

  if (!checkQueryParams) {
    console.log(
      "context",
      JSON.stringify(context.query) === "{}",
      context.query
    );
    const query = new URLSearchParams(context.query);
    const URL = `https://apigo.afetharita.com/feeds/areas?extraParams=true&${query}`;
    const feedWithReasons = await dataFetcher(URL);
    console.log("feedWithReasons", feedWithReasons);
  }

  // Pass data to the page via props
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
      reasons: res.reasons,
    },
  };
}

const styles: IStyles = {
  overlay: (theme: Theme) => ({
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    top: "85px",
    left: "55px",
    zIndex: 1100,
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      top: "0px",
      left: "0px",
    },
  }),
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
