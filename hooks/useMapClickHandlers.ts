import { MarkerData } from "@/mocks/types";
import { setMarkerData, useMapActions, useMarkerData } from "@/stores/mapStore";
import { useCallback, MouseEvent, KeyboardEvent } from "react";
import { LeafletMouseEvent } from "leaflet";
import * as localForage from "localforage";
import { localForageKeys } from "@/components/UI/Map/utils";

export function useMapClickHandlers() {
  const { toggleDrawer, setDrawerData, setPopUpData } = useMapActions();
  const allMarkers = useMarkerData();

  const handleMarkerClick = useCallback(
    (
      event: KeyboardEvent | MouseEvent | LeafletMouseEvent,
      markerData?: MarkerData
    ) => {
      if (event.type === "keydown" && (event as KeyboardEvent).key !== "Escape")
        return;

      toggleDrawer();

      if (markerData) {
        setDrawerData(markerData);
      }
      localForage
        .getItem(localForageKeys.markersVisited)
        .then(function (markerVisitedMap) {
          // @ts-ignore
          markerVisitedMap[markerData?.reference] = true;
          localForage.setItem(localForageKeys.markersVisited, markerVisitedMap);

          const changedMarkerIndex = allMarkers.findIndex(
            (marker) => marker.reference === markerData?.reference
          );

          if (changedMarkerIndex !== -1) {
            const finalArr = allMarkers;
            // @ts-ignore
            finalArr[changedMarkerIndex] = {
              reference: markerData?.reference,
              geometry: markerData?.geometry,
              isVisited: true,
            };

            setMarkerData(finalArr);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClusterClick = useCallback(
    (markers: MarkerData[], count: number = 0) => {
      setPopUpData({
        count,
        baseMarker: markers[0],
        markers: [],
      });
    },
    [setPopUpData]
  );

  return { handleMarkerClick, handleClusterClick };
}
