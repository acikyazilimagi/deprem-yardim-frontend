import { create } from "zustand";
import { ClusterPopupData, MarkerData } from "../mocks/types";

interface MapState {
  popUpData: ClusterPopupData | null;
  drawerData: MarkerData | null;
  isDrawerOpen: boolean;
  actions: {
    toggleDrawer: () => void;
    setDrawerData: (data: MarkerData) => void;
    setPopUpData: (data: any) => void;
  };
}

const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  popUpData: null,
  isDrawerOpen: false,
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: MarkerData) => set(() => ({ drawerData: data })),
    setPopUpData: (data: any) => set(() => ({ popUpData: data })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
