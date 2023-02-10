import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { useCallback, MouseEvent, KeyboardEvent } from "react";
import { LeafletMouseEvent } from "leaflet";

export function useMapClickHandlers() {
  const { toggleDrawer, setDrawerData, setPopUpData } = useMapActions();

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClusterClick = useCallback(
    (markers: MarkerData[]) => {
      setPopUpData({
        count: markers.length ?? 0,
        baseMarker: markers[0],
        markers: [],
      });
    },
    [setPopUpData]
  );

  return { handleMarkerClick, handleClusterClick };
}
