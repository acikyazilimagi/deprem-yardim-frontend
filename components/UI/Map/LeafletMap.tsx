import Map from "@/components/UI/Map/Map";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { MarkerData } from "@/mocks/types";
import { useDevice, useMapActions, useMarkerData } from "@/stores/mapStore";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { css, Global } from "@emotion/react";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import L, { latLng, latLngBounds } from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import React, {
  Fragment,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Marker, MarkerProps, TileLayer, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";
import { findTagByClusterCount, Tags } from "../Tag/Tag.types";
import {
  DEFAULT_CENTER,
  DEFAULT_IMPORTANCY,
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
  DEFAULT_ZOOM,
  DEFAULT_ZOOM_MOBILE,
} from "./utils";

type Point = [number, number, number];

const HeatmapLayer = React.memo(HeatmapLayerFactory<Point>());

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

type ExtendedMarkerProps = MarkerProps & {
  markerData: MarkerData;
};

function ExtendedMarker({ ...props }: ExtendedMarkerProps) {
  return <Marker {...props} />;
}

const GlobalClusterStyle = css`
  ${Object.values(Tags).map(
    (tag) => `
    .leaflet-custom-cluster-${tag.id} {
      .cluster-inner {
        background-color: ${tag.color};
        box-shadow: 0 0 5px 2px ${tag.color};
        width: 30px;
        height: 30px;
        opacity: 0.9;
      }
    }
  `
  )}
`;

const MapEvents = () => {
  const mapZoomLevelRef = useRef(0);
  const { setCoordinates, setPopUpData } = useMapActions();

  const debounced = useDebouncedCallback((value: any) => {
    setCoordinates(value);
  }, 1000);

  const map = useMapEvents({
    moveend: () => debounced(map.getBounds()),
    zoomend: () => {
      debounced(map.getBounds());

      const isZoomOut = mapZoomLevelRef.current > map.getZoom();
      if (isZoomOut) {
        setPopUpData(null);
      }
    },
    zoomstart: () => {
      mapZoomLevelRef.current = map.getZoom();
    },
  });

  return null;
};

const corners = {
  southWest: latLng(37.541514855366735, 36.87200546264649),
  northEast: latLng(37.621505963424795, 36.968050003051765),
};

const bounds = latLngBounds(corners.southWest, corners.northEast);

function LeafletMap() {
  const { setCoordinates } = useMapActions();
  const data = useMarkerData();
  const points: Point[] = useMemo(
    () =>
      data.map((marker: MarkerData) => [
        marker.geometry.location.lat,
        marker.geometry.location.lng,
        DEFAULT_IMPORTANCY,
      ]),
    [data]
  );

  useEffect(() => {
    setCoordinates(bounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  const device = useDevice();

  const { handleClusterClick, handleMarkerClick } = useMapClickHandlers();

  return (
    <>
      <Global styles={GlobalClusterStyle} />
      <MapLegend />

      <Map
        center={DEFAULT_CENTER}
        zoom={device === "desktop" ? DEFAULT_ZOOM : DEFAULT_ZOOM_MOBILE}
        minZoom={
          device === "desktop"
            ? DEFAULT_MIN_ZOOM_DESKTOP
            : DEFAULT_MIN_ZOOM_MOBILE
        }
        zoomDelta={0.5}
        zoomSnap={0.25}
        preferCanvas
        maxBoundsViscosity={1}
      >
        <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
        <MapEvents />
        {/* <ImpactedCities /> */}
        <HeatmapLayer
          fitBoundsOnUpdate
          radius={15}
          points={points}
          longitudeExtractor={longitudeExtractor}
          latitudeExtractor={latitudeExtractor}
          intensityExtractor={intensityExtractor}
        />
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
          bounds={bounds}
        />
        <MarkerClusterGroup
          // @ts-expect-error
          onClick={handleClusterClick}
          // @ts-expect-error
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            const tag = findTagByClusterCount(count);

            return L.divIcon({
              html: `<div class="cluster-inner"><span>${count}</span></div>`,
              className: `leaflet-marker-icon marker-cluster leaflet-interactive leaflet-custom-cluster-${tag.id}`,
            });
          }}
        >
          {data.map((marker: MarkerData) => (
            <Fragment key={marker.place_id}>
              <ExtendedMarker
                key={marker.place_id}
                position={[
                  marker.geometry.location.lat,
                  marker.geometry.location.lng,
                ]}
                eventHandlers={{
                  click: (e) => {
                    handleMarkerClick(e as any as MouseEvent, marker);
                  },
                }}
                markerData={marker}
              />
            </Fragment>
          ))}
        </MarkerClusterGroup>
      </Map>
    </>
  );
}

export default React.memo(LeafletMap);
