import { create } from "zustand";

interface MapState {
  isDrawerOpen: boolean;
  actions: {
    toggleDrawer: () => void;
  };
}

const useMapStore = create<MapState>()((set) => ({
  isDrawerOpen: false,
  actions: {
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  },
}));

export const useIsDrawerOpen = () => useMapStore((state) => state.isDrawerOpen);
export const useMapActions = () => useMapStore((state) => state.actions);
