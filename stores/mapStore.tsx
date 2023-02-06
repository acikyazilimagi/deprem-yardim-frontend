import { create } from "zustand";
import { MarkerData } from "../mocks/types";

interface MapState {
  drawerData: MarkerData | null;
  isDrawerOpen: boolean;
  actions: {
    toggleDrawer: () => void;
    setDrawerData: (data: MarkerData) => void;
  };
}

const useMapStore = create<MapState>()((set) => ({
  drawerData: null,
  isDrawerOpen: false,
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    setDrawerData: (data: MarkerData) => set(() => ({ drawerData: data })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useDrawerData = () => useMapStore((state) => state.drawerData);
export const useMapActions = () => useMapStore((state) => state.actions);
