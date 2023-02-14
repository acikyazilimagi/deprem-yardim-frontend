import Map from "@/components/UI/Map/Map";
import { EVENT_TYPES, MarkerData } from "@/mocks/types";
import {
  useDevice,
  useIsDrawerOpen,
  useMapActions,
  useMapType,
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
import { memo, useEffect, useMemo, useRef } from "react";
import { TileLayer, useMapEvents } from "react-leaflet";
import { useDebouncedCallback } from "use-debounce";
import { Tags } from "../Tag/Tag.types";
import {
  DEFAULT_IMPORTANCY,
  DEFAULT_MIN_ZOOM_DESKTOP,
  DEFAULT_MIN_ZOOM_MOBILE,
  localStorageKeys,
  safeGetLocalStorage,
  safeSetLocalStorage,
} from "./utils";
import LayerControl, { Point } from "./LayerControl";
import ViewControl from "./ViewControl";
import { useURLActions } from "@/stores/urlStore";
import useDefaultZoom from "@/hooks/useDefaultZoom";
import useDefaultCenter from "@/hooks/useDefaultCenter";

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
  const id = router.query["id"];
  const locale = router.locale;

  useEffect(() => {
    const localCoordinatesURL = safeGetLocalStorage(
      localStorageKeys.coordinatesURL
    );

    if (localCoordinatesURL) {
      if (id) {
        window.history.replaceState(
          {
            ...window.history.state,
            as: `/${locale}?${localCoordinatesURL}`,
            url: `/?${localCoordinatesURL}`,
          },
          "",
          `?${localCoordinatesURL}&id=${id}`
        );
      } else {
        window.history.replaceState(
          {
            ...window.history.state,
            as: `/${locale}?${localCoordinatesURL}`,
            url: `/?${localCoordinatesURL}`,
          },
          "",
          "?" + localCoordinatesURL
        );
      }
    }

    return () => {
      const coordinatesURL = window.location.hash;
      safeSetLocalStorage(localStorageKeys.coordinatesURL, coordinatesURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounced = useDebouncedCallback(
    (value: L.LatLngBounds, eventType: EVENT_TYPES) => {
      const zoomLevel = map.getZoom();
      let localCoordinates = value;

      // https://github.com/acikkaynak/deprem-yardim-frontend/issues/368
      const shouldExpandCoordinates =
        zoomLevel === 18 ||
        zoomLevel === 17 ||
        zoomLevel === 16 ||
        zoomLevel === 15;

      if (shouldExpandCoordinates) {
        localCoordinates = expandCoordinatesBy(
          localCoordinates,
          EXPAND_COORDINATE_BY_VALUE
        );
      }
      setCoordinates(localCoordinates);
      setEventType(eventType);
      const _lat = localCoordinates.getCenter().lat;
      const _lng = localCoordinates.getCenter().lng;
      const _zoomLevel = zoomLevel;

      const locationWithZoomLevel = new URLSearchParams();
      locationWithZoomLevel.append("lat", _lat.toString());
      locationWithZoomLevel.append("lng", _lng.toString());
      locationWithZoomLevel.append("zoom", _zoomLevel.toString());
      if (id) {
        locationWithZoomLevel.append("id", id.toString());
      }
      const query = locationWithZoomLevel.toString();
      safeSetLocalStorage(localStorageKeys.coordinatesURL, query);

      router.push(
        { query },
        { query },
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

interface ILeafletMap {
  ahbap: any[];
  hospital: any[];
  food: any[];
  teleteyit: any[];
  satellite: any[];
  sahra_kitchen: any[];
  pharmacy: any[];
}

function LeafletMap(props: ILeafletMap) {
  const { setCoordinates } = useURLActions();
  const router = useRouter();
  const data = useMarkerData();
  const isOpen = useIsDrawerOpen();
  const mapType = useMapType();
  const { toggleDrawer, setDrawerData, setEventType } = useMapActions();
  const { defaultZoom } = useDefaultZoom();
  const { defaultCenter } = useDefaultCenter();

  const points: Point[] = useMemo(
    () =>
      data.map((marker: MarkerData) => [
        marker.geometry.location.lat,
        marker.geometry.location.lng,
        DEFAULT_IMPORTANCY,
      ]),
    [data]
  );
  const { lat, lng, id } = router.query;
  const device = useDevice();
  const isIdExists = id;

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
        isVisited: false,
      };
      toggleDrawer();
      setDrawerData(tempDrawerData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const baseMapUrl = `https://mt0.google.com/vt/lyrs=${mapType}&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`;

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
        maxBounds={bounds}
        maxBoundsViscosity={1}
        maxZoom={18}
      >
        <ResetViewControl title="Sıfırla" icon="url(/icons/circular.png)" />
        <ViewControl
          onClick={() => {
            setDrawerData(null);
            toggleDrawer();
          }}
        />
        <MapEvents />
        <LayerControl
          points={points}
          data={data}
          food={props.food}
          ahbap={props.ahbap}
          hospital={props.hospital}
          teleteyit={props.teleteyit}
          satellite={props.satellite}
          sahra_kitchen={props.sahra_kitchen}
          pharmacy={props.pharmacy}
        />
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />
        <TileLayer url={baseMapUrl} />
      </Map>
    </>
  );
}

export default memo(LeafletMap);
