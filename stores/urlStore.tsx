import {
  getReasoningFilter,
  initialReasoningFilter,
  ReasoningFilterMenuOption,
} from "@/components/UI/FilterMenu/FilterReasoningMenu";
import { areasURL } from "@/utils/urls";
import { LatLngBounds } from "leaflet";
import { create } from "zustand";

interface MapState {
  coordinates?: any;
  url: URL;
  reasoningFilterMenuOption: ReasoningFilterMenuOption;
  actions: {
    setCoordinates: (data: LatLngBounds) => void;
    setURL: (url: URL) => void;
    setReasoningFilterMenuOption: (
      reasoningFilterMenuOption: ReasoningFilterMenuOption
    ) => void;
  };
}

export const useURLStore = create<MapState>()((set) => ({
  reasoningFilterMenuOption: initialReasoningFilter,
  coordinates: undefined,
  url: new URL(areasURL),
  reason: "",
  actions: {
    setCoordinates: (data) =>
      set(() => ({
        coordinates: {
          ne_lat: data?.getNorthEast().lat,
          ne_lng: data?.getNorthEast().lng,
          sw_lat: data?.getSouthWest().lat,
          sw_lng: data?.getSouthWest().lng,
        },
      })),
    setURL: (url) => set(() => ({ url })),
    setReasoningFilterMenuOption: (reasoningFilterMenuOption) =>
      set(() => ({ reasoningFilterMenuOption: reasoningFilterMenuOption })),
  },
}));

export const useURLActions = () => useURLStore((state) => state.actions);
export const useCoordinates = () => useURLStore((state) => state.coordinates);
export const useReasoningFilterMenuOption = () =>
  useURLStore((state) => state.reasoningFilterMenuOption);

useURLStore.subscribe((state) => {
  const url = new URL(areasURL);
  const searchParams = new URLSearchParams(state.coordinates as any);
  searchParams.delete("eventType");

  const reasoningFilterMenuOption = getReasoningFilter(
    state.reasoningFilterMenuOption
  );
  if (reasoningFilterMenuOption)
    searchParams.append("reason", reasoningFilterMenuOption);

  url.search = searchParams.toString();

  if (url.href == state.url.href) return;

  state.actions.setURL(url);
});
