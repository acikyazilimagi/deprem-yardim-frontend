import { create } from "zustand";
import {
  ClusterPopupData,
  MarkerData,
  DeviceType,
  EVENT_TYPES,
} from "../mocks/types";

interface MapState {
  eventType?: EVENT_TYPES;
  popUpData: ClusterPopupData | null;
  drawerData: MarkerData | null;
  isDrawerOpen: boolean;
  device: DeviceType;
  markerData: MarkerData[];
  actions: {
    toggleDrawer: () => void;
    setDrawerData: (data: MarkerData) => void;
    setPopUpData: (data: ClusterPopupData | null) => void;
    setDevice: (device: DeviceType) => void;
    setMarkerData: (data: MarkerData[]) => void;
    setEventType: (eventType: EVENT_TYPES) => void;
  };
}

export const useMapStore = create<MapState>()((set) => ({
  eventType: undefined,
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  device: "desktop",
  markerData: [],
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: MarkerData) => set(() => ({ drawerData: data })),
    setPopUpData: (data: ClusterPopupData | null) =>
      set(() => ({ popUpData: data })),
    setDevice: (device: DeviceType) => set(() => ({ device })),
    setMarkerData: (markerData: MarkerData[]) => set(() => ({ markerData })),
    setEventType: (eventType) => set(() => ({ eventType })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useDevice = () => useMapStore((state) => state.device);
export const useMarkerData = () => useMapStore((state) => state.markerData);
export const useEventType = () => useMapStore((state) => state.eventType);

export const setMarkerData = useMapStore.getState().actions.setMarkerData;
