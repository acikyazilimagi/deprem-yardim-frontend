import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useMTMLView } from "@/newlayout/components/MTMLViewComponent/MTMLViewComponent";
import { useDevice } from "@/stores/mapStore";
import {
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/UI/Map/utils";
import { CooldownButtonComponent } from "@/newlayout/components/CooldownButtonComponent/CooldownButtonComponent";
import Map from "@/components/UI/Map/Map";
import MapControls from "./MapControls";
import { TileLayer, useMap } from "react-leaflet";
import { Box } from "@mui/material";
import { GenericClusterGroup } from "@/components/UI/Map/GenericClusterGroup";
import { ChannelData } from "@/types";
import { useRouter } from "next/router";
import { useMapEvents } from "@/hooks/useMapEvents";
import { useURLActions } from "@/stores/urlStore";
import { Dispatch, SetStateAction, useEffect } from "react";
import { usePrevious } from "@/hooks/usePrevious";
import { isValidReasons } from "@/utils/isValidReasons";
import { getFetchAreaBounds } from "@/utils/getFetchAreaBounds";
import { useSingletonsStore } from "@/stores/singletonsStore";
import { MapClusterStyle } from "@/components/UI/Map/MapClusterStyle";

type EventProps = {
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

const MapEvents = ({ setLocations }: EventProps) => {
  const map = useMap();
  const router = useRouter();
  const queryReasons = router.query.reasons as string | undefined;
  const prevReasons = usePrevious(queryReasons);
  const bounds = map.getBounds();
  const { apiClient } = useSingletonsStore();

  useEffect(() => {
    if (isValidReasons(queryReasons) && prevReasons !== queryReasons) {
      apiClient
        .fetchAreas({
          reasons: queryReasons,
          bound: getFetchAreaBounds(bounds),
        })
        .then(setLocations);
    }
  }, [apiClient, prevReasons, queryReasons, bounds, setLocations]);
  useMapEvents();
  return null;
};

type ContentProps = {
  reasons: string[];
  locations: ChannelData[];
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

export const MapContent = ({
  reasons,
  locations,
  setLocations,
}: ContentProps) => {
  const { mapType } = useMTMLView();
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();
  const { setCoordinates } = useURLActions();
  const device = useDevice();
  const router = useRouter();

  const onMarkerClick = (_e: any, markerData: ChannelData) => {
    const query = { ...router.query, id: markerData.reference };
    router.push({ query }, { query });
  };

  const dpr = window.devicePixelRatio;
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&scale=${dpr}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

  return (
    <>
      <MapClusterStyle />
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
        whenReady={(map: any) => {
          setTimeout(() => {
            setCoordinates(map.target.getBounds());
            map.target.invalidateSize();
          }, 100);
        }}
        preferCanvas
        maxBoundsViscosity={1}
        maxZoom={18}
      >
        <MapEvents setLocations={setLocations} />
        <MapControls filters={{ reasons }} />
        <TileLayer url={baseMapUrl} />

        <GenericClusterGroup data={locations} onMarkerClick={onMarkerClick} />

        <Box sx={styles.fixedMidBottom}>
          <CooldownButtonComponent setLocations={setLocations} />
        </Box>
      </Map>
    </>
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
