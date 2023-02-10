import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { useCallback, MouseEvent, KeyboardEvent } from "react";

export function useMapClickHandlers() {
  const { toggleDrawer, setDrawerData, setPopUpData } = useMapActions();

  const handleMarkerClick = useCallback(
    (event: KeyboardEvent | MouseEvent, markerData?: MarkerData) => {
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
    (e: any) => {
      const markers = e.layer.getAllChildMarkers();
      setPopUpData({
        count: markers.length ?? 0,
        baseMarker: markers[0].options.markerData,
        markers: markers,
      });
    },
    [setPopUpData]
  );

  return { handleMarkerClick, handleClusterClick };
}
