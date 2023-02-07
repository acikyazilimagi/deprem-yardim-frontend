import { LatLngBounds } from "leaflet";
import { create } from "zustand";
import {
  ClusterPopupData,
  MarkerData,
  CoordinatesURLParameters,
} from "../mocks/types";

interface MapState {
  popUpData: ClusterPopupData | null;
  drawerData: MarkerData | null;
  isDrawerOpen: boolean;
  coordinates?: any;
  actions: {
    toggleDrawer: () => void;
    setDrawerData: (data: MarkerData) => void;
    setPopUpData: (data: any) => void;
    setCoordinates: (data: LatLngBounds) => void;
  };
}

const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  coordinates: undefined,
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: MarkerData) => set(() => ({ drawerData: data })),
    setPopUpData: (data: any) => set(() => ({ popUpData: data })),
    setCoordinates: (data: any) =>
      set(() => ({
        coordinates: {
          ne_lat: `${data.getNorthEast().lat}`,
          ne_lng: `${data.getNorthEast().lng}`,
          sw_lat: `${data.getSouthWest().lat}`,
          sw_lng: `${data.getSouthWest().lng}`,
        },
      })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
export const usePopUpData = () => useMapStore((state) => state.popUpData);
export const useCoordinates = () => useMapStore((state) => state.coordinates);
