import Map from "@/components/UI/Map/Map";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { EVENT_TYPES, MarkerData } from "@/mocks/types";
import { useDevice, useMapActions, useMarkerData } from "@/stores/mapStore";
import { EXPAND_COORDINATE_BY_VALUE } from "@/utils/constants";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { css, Global } from "@emotion/react";
import { HeatmapLayerFactory } from "@vgrid/react-leaflet-heatmap-layer";
import L, { latLng, latLngBounds } from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, {
  Fragment,
  MouseEvent,
  useCallback,
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
import { LatLngExpression } from "leaflet";

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
        background-color: ${tag.color}DE;
        border: ${tag.color} 2px solid;
        color: #212121;
        width: 36px;
        height: 36px;
        opacity: 0.9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
  `
  )}
`;

const MapEvents = () => {
  const mapZoomLevelRef = useRef(0);
  const router = useRouter();
  const { setCoordinates, setPopUpData } = useMapActions();

  const debounced = useDebouncedCallback(
    (value: L.LatLngBounds, eventType: EVENT_TYPES) => {
      const zoomLevel = map.getZoom();

      let localCoordinates = value;

      // https://github.com/acikkaynak/deprem-yardim-frontend/issues/368
      if (zoomLevel === 18) {
        localCoordinates = expandCoordinatesBy(
          localCoordinates,
          EXPAND_COORDINATE_BY_VALUE
        );
      }

      setCoordinates(localCoordinates, eventType);
      router.push({
        hash: `#lat=${localCoordinates.getCenter().lat}&lng=${
          localCoordinates.getCenter().lng
        }&zoom=${zoomLevel}`,
      });
    },
    1000
  );

  const map = useMapEvents({
    moveend: () => debounced(map.getBounds(), "moveend"),
    zoomend: () => {
      debounced(map.getBounds(), "zoomend");

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

const expandCoordinatesBy = (coordinates: L.LatLngBounds, value: number) => {
  const { lat: neLat, lng: neLng } = coordinates.getNorthEast();
  const { lat: swLat, lng: swLng } = coordinates.getSouthWest();

  const northEast = L.latLng(neLat + value, neLng + value);
  const southWest = L.latLng(swLat - value, swLng - value);

  return L.latLngBounds(northEast, southWest);
};

const corners = {
  southWest: latLng(34.325514, 28.939165),
  northEast: latLng(41.57364, 42.770324),
};

const bounds = latLngBounds(corners.southWest, corners.northEast);

function LeafletMap() {
  const { setCoordinates } = useMapActions();
  const { asPath } = useRouter();
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

  const longitudeExtractor = useCallback((p: Point) => p[1], []);
  const latitudeExtractor = useCallback((p: Point) => p[0], []);
  const intensityExtractor = useCallback((p: Point) => p[2], []);
  const device = useDevice();

  const { handleClusterClick, handleMarkerClick } = useMapClickHandlers();

  // to set default center and zoom level from url
  const defaultCenter: LatLngExpression =
    asPath.includes("lat=") && asPath.includes("lng=")
      ? [
          parseFloat(asPath.split("lat=")[1].split("&")[0]),
          parseFloat(asPath.split("lng=")[1].split("&")[0]),
        ]
      : DEFAULT_CENTER;

  const defaultZoom = asPath.includes("zoom=")
    ? parseFloat(asPath.split("zoom=")[1].split("&")[0])
    : device === "desktop"
    ? DEFAULT_ZOOM
    : DEFAULT_ZOOM_MOBILE;

  return (
    <>
      <Global styles={GlobalClusterStyle} />
      <MapLegend />

      <Map
        center={defaultCenter}
        zoom={defaultZoom}
        minZoom={
          device === "desktop"
            ? DEFAULT_MIN_ZOOM_DESKTOP
            : DEFAULT_MIN_ZOOM_MOBILE
        }
        zoomSnap={0.25}
        zoomDelta={0.5}
        whenReady={(map: any) =>
          setCoordinates(map.target.getBounds(), "ready")
        }
        preferCanvas
        maxBounds={bounds}
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
          useLocalExtrema={false}
        />
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
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
