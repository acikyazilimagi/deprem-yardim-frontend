import Map from "@/components/UI/Map/Map";
import { EVENT_TYPES, MarkerData } from "@/mocks/types";
import {
  useDevice,
  useIsDrawerOpen,
  useMapActions,
  useMarkerData,
} from "@/stores/mapStore";
import { EXPAND_COORDINATE_BY_VALUE } from "@/utils/constants";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import { css, Global } from "@emotion/react";
import L, { latLng, latLngBounds } from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo, useRef, useState } from "react";
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
  localStorageKeys,
} from "./utils";
import { LatLngExpression } from "leaflet";
import LayerControl, { Point } from "./LayerControl";
import { useURLActions, useURLStore } from "@/stores/urlStore";

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
  const { setPopUpData, setEventType } = useMapActions();
  const { setCoordinates } = useURLActions();
  const { url } = useURLStore();

  useEffect(() => {
    const localURLParameters = window.localStorage.getItem(
      localStorageKeys.coordinatesURL
    );
    if (localURLParameters) {
      window.history.replaceState(
        {
          ...window.history.state,
          as: window.location.origin,
          url: window.location.origin,
        },
        "",
        localURLParameters
      );
    }

    return () => {
      const coordinatesURL = window.location.hash;
      window.localStorage.setItem(
        localStorageKeys.coordinatesURL,
        coordinatesURL
      );
    };
  }, []);

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

      setEventType(eventType);
      setCoordinates(localCoordinates);

      const query = url.searchParams;
      query.append('zoom', map.getZoom().toString())
      window.localStorage.setItem(localStorageKeys.coordinatesURL, url.search);
      router.push(
        { query: query.toString() },
        { query: query.toString() },
        {
          shallow: true,
        }
      );
    },
    100
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
  const [defaultZoom, setDefaultZoom] = useState(DEFAULT_ZOOM);
  const { setCoordinates } = useURLActions();
  const { setEventType } = useMapActions();
  const router = useRouter();
  const data = useMarkerData();
  const isOpen = useIsDrawerOpen();
  const { toggleDrawer, setDrawerData } = useMapActions();
  const device = useDevice();

  const points: Point[] = useMemo(
    () =>
      data.map((marker: MarkerData) => [
        marker.geometry.location.lat,
        marker.geometry.location.lng,
        DEFAULT_IMPORTANCY,
      ]),
    [data]
  );
  const { lat, lng, zoom, id } = router.query;

  const localCoordinatesURL = window.localStorage.getItem(
    localStorageKeys.coordinatesURL
  );

  const defaultCenter: LatLngExpression =
    lat && lng
      ? [parseFloat(lat as string), parseFloat(lng as string)]
      : localCoordinatesURL
      ? [
          parseFloat(localCoordinatesURL.split("lat=")[1].split("&")[0]),
          parseFloat(localCoordinatesURL.split("lng=")[1].split("&")[0]),
        ]
      : DEFAULT_CENTER;

  useEffect(() => {
    const zoomFromQuery = Number(zoom);
    if (zoomFromQuery) {
      setDefaultZoom(zoomFromQuery);
      return;
    }

    const zoomParamFromURL = localCoordinatesURL
      ?.split("zoom=")?.[1]
      ?.split("&")?.[0];
    if (zoomParamFromURL) {
      setDefaultZoom(parseFloat(zoomParamFromURL));
      return;
    }

    if (device == "mobile") {
      setDefaultZoom(DEFAULT_ZOOM_MOBILE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isIdExists = !!id;

  useEffect(() => {
    if (isIdExists && !isOpen) {
      const tempDrawerData = {
        reference: Number(id as string),
        geometry: {
          location: {
            lat: parseFloat(lat as string),
            lng: parseFloat(lng as string),
          },
        },
      };
      toggleDrawer();
      setDrawerData(tempDrawerData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        whenReady={(map: any) => {
          setTimeout(() => {
            setEventType("ready");
            setCoordinates(map.target.getBounds());
            map.target.invalidateSize();
          }, 100);
        }}
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

export default memo(LeafletMap);
