import L from "leaflet";
import { useMapEvents as useLeafletMapEvents } from "react-leaflet";
import { EVENT_TYPES } from "@/types";
import { EXPAND_COORDINATE_BY_VALUE } from "@/utils/constants";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useURLActions } from "@/stores/urlStore";
import { useMapActions } from "@/stores/mapStore";

const expandCoordinatesBy = (coordinates: L.LatLngBounds, value: number) => {
  const { lat: neLat, lng: neLng } = coordinates.getNorthEast();
  const { lat: swLat, lng: swLng } = coordinates.getSouthWest();

  const northEast = L.latLng(neLat + value, neLng + value);
  const southWest = L.latLng(swLat - value, swLng - value);

  return L.latLngBounds(northEast, southWest);
};

export const useMapEvents = () => {
  const mapZoomLevelRef = useRef(0);
  const router = useRouter();
  const { setPopUpData, setEventType } = useMapActions();
  const { setCoordinates } = useURLActions();

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

      const queryParams = new Map<string, string>();
      queryParams.set("lat", _lat.toString());
      queryParams.set("lng", _lng.toString());
      queryParams.set("zoom", _zoomLevel.toString());
      const query = { ...router.query, ...Object.fromEntries(queryParams) };
      router.push({ query }, { query }, { shallow: true });
    },
    100
  );

  const map = useLeafletMapEvents({
    movestart: () => {
      setEventType("movestart");
    },
    moveend: () => {
      debounced(map.getBounds(), "moveend");
      setEventType("moveend");
    },
    zoomend: () => {
      debounced(map.getBounds(), "zoomend");
      setEventType("zoomend");

      const isZoomOut = mapZoomLevelRef.current > map.getZoom();
      if (isZoomOut) {
        setPopUpData(null);
      }
    },
    zoomstart: () => {
      setEventType("zoomstart");
      mapZoomLevelRef.current = map.getZoom();
    },
  });

  return map;
};
