import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";
import { useMTMLView } from "@/components/MTMLView/MTMLView";
import { useDevice, useMapActions } from "@/stores/mapStore";
import {
  DEFAULT_IMPORTANCY,
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
} from "@/components/Map/utils";
import { CooldownButtonComponent } from "@/components/Button/Cooldown";
import { Map } from "@/components/Map/Map";
import MapControls from "./Controls/index";
import { TileLayer } from "react-leaflet";
import { Box } from "@mui/material";
import { GenericClusterGroup } from "@/components/Map/Cluster/GenericClusterGroup";
import { ChannelData } from "@/types";
import { useRouter } from "next/router";
import { useMapEvents } from "@/hooks/useMapEvents";
import { useURLActions } from "@/stores/urlStore";
import { Dispatch, SetStateAction, memo, useMemo } from "react";
import { MapClusterStyle } from "@/components/Map/Cluster/ClusterStyle";
import { latLng, latLngBounds } from "leaflet";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import { MapLayer } from "../MTMLView/types";
const HeatmapLayer = memo(HeatmapLayerFactory<Point>());

type EventProps = {
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

const MapEvents = ({ setLocations }: EventProps) => {
  useFetchLocations(setLocations);
  useMapEvents();
  return null;
};

type LayerControlProps = {
  locations: ChannelData[];
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};

export type Point = [number, number, number];

const longitudeExtractor = (p: Point) => p[1];
const latitudeExtractor = (p: Point) => p[0];
const intensityExtractor = (p: Point) => p[2];

const LayerControl = ({ locations, onMarkerClick }: LayerControlProps) => {
  const { mapLayers } = useMTMLView();
  const points = useMemo(
    () =>
      locations.map(
        (item) =>
          [
            item.geometry.location.lng,
            item.geometry.location.lat,
            DEFAULT_IMPORTANCY,
          ] as Point
      ),
    [locations]
  );

  return (
    <>
      {mapLayers.map((layer, idx) => {
        if (layer === MapLayer.Heatmap) {
          return (
            <HeatmapLayer
              key={idx}
              fitBoundsOnUpdate
              radius={15}
              points={points}
              longitudeExtractor={longitudeExtractor}
              latitudeExtractor={latitudeExtractor}
              intensityExtractor={intensityExtractor}
              useLocalExtrema={false}
            />
          );
        }
        return (
          <GenericClusterGroup
            key={idx}
            data={locations}
            onMarkerClick={onMarkerClick}
          />
        );
      })}
    </>
  );
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
  const { setEventType } = useMapActions();
  const device = useDevice();
  const router = useRouter();

  const onMarkerClick = (_e: any, markerData: ChannelData) => {
    const query = { ...router.query, id: markerData.reference };
    router.push({ query }, { query });
  };

  const mapBoundaries = {
    southWest: latLng(34.025514, 25.584519),
    northEast: latLng(42.211024, 44.823563),
  };

  const bounds = latLngBounds(mapBoundaries.southWest, mapBoundaries.northEast);

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
            setEventType("ready");
            map.target.invalidateSize();
          }, 100);
        }}
        preferCanvas
        maxBoundsViscosity={1}
        maxBounds={bounds}
        maxZoom={18}
      >
        <MapEvents setLocations={setLocations} />
        <MapControls filters={{ reasons }} />
        <TileLayer url={baseMapUrl} />
        <LayerControl locations={locations} onMarkerClick={onMarkerClick} />
      </Map>
      <Box sx={styles.fixedMidBottom}>
        <CooldownButtonComponent />
      </Box>
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
