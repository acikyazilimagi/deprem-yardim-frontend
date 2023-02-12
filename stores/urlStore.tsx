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
export const useChannelFilterMenuOption = () =>
  useURLStore((state) => state.channelFilterMenuOption);
