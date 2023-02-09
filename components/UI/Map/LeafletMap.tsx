import Map from "@/components/UI/Map/Map";
import { EVENT_TYPES, MarkerData } from "@/mocks/types";
import { useDevice, useMapActions, useMarkerData } from "@/stores/mapStore";
import { EXPAND_COORDINATE_BY_VALUE } from "@/utils/constants";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { css, Global } from "@emotion/react";
import L, { latLng, latLngBounds } from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useMemo, useRef } from "react";
import { TileLayer, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";
import { Tags } from "../Tag/Tag.types";
import {
  DEFAULT_CENTER,
  DEFAULT_IMPORTANCY,
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
  DEFAULT_ZOOM,
  DEFAULT_ZOOM_MOBILE,
} from "./utils";
import { LatLngExpression } from "leaflet";
import LayerControl, { Point } from "./LayerControl";

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

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
  const device = useDevice();

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
        maxZoom={18}
      >
        <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
        <MapEvents />
        <LayerControl points={points} data={data} />

        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />
      </Map>
    </>
  );
}

export default React.memo(LeafletMap);
