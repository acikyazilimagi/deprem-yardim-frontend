import { areasURL } from "@/utils/urls";
import { LatLngBounds } from "leaflet";
import { create } from "zustand";

interface MapState {
  channelFilterMenuOption: null | string;
  coordinates?: any;
  url: URL;
  timeStamp?: number;
  reasoningFilterMenuOption: string | null;
  actions: {
    setTimeStamp: (timeStamp?: number) => void;
    setCoordinates: (data: LatLngBounds) => void;
    setURL: (url: URL) => void;
    setReasoningFilterMenuOption: (
      reasoningFilterMenuOption: string | null
    ) => void;
    setChannelFilterMenuOption: (
      reasoningFilterMenuOption: string | null
    ) => void;
  };
}

export const useURLStore = create<MapState>()((set) => ({
  channelFilterMenuOption: null,
  reasoningFilterMenuOption: null,
  timeStamp: undefined,
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
    setTimeStamp: (timeStamp) => set(() => ({ timeStamp })),
    setReasoningFilterMenuOption: (reasoningFilterMenuOption) =>
      set(() => ({ reasoningFilterMenuOption })),
    setChannelFilterMenuOption: (channelFilterMenuOption) =>
      set(() => ({ channelFilterMenuOption })),
  },
}));

export const useURLActions = () => useURLStore((state) => state.actions);
export const useCoordinates = () => useURLStore((state) => state.coordinates);
export const useReasoningFilterMenuOption = () =>
  useURLStore((state) => state.reasoningFilterMenuOption);
export const useURL = () => useURLStore((state) => state.url);
export const useTimeStamp = () => useURLStore((state) => state.timeStamp);

useURLStore.subscribe((state) => {
  if (!state.coordinates) return;

  const url = new URL(areasURL);
  const searchParams = new URLSearchParams(state.coordinates as any);
  searchParams.delete("eventType");

  const reasoningFilterMenuOption = state.reasoningFilterMenuOption;
  if (reasoningFilterMenuOption)
    searchParams.append("reason", reasoningFilterMenuOption);

  const channelFilterMenuOption = state.channelFilterMenuOption;
  if (channelFilterMenuOption)
    searchParams.append("channel", channelFilterMenuOption);

  if (state.timeStamp) searchParams.append("time_stamp", `${state.timeStamp}`);

  url.search = searchParams.toString();

  if (url.href == state.url.href) return;

  state.actions.setURL(url);
});
