import { DEFAULT_ZOOM } from "@/components/Map/utils";
import { getHashStorage } from "@/utils/zustand";
import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_CENTER } from "../components/Map/utils";

type Coordinates = { lat: number; lng: number };

interface State {
  coordinates: Coordinates;
  zoom: number;
  actions: {
    setCoordinates: (_data: Coordinates) => void;
    setZoom: (_zoom: number) => void;
  };
}

export const useMapGeographyStore = create<State>()(
  persist(
    (set) => ({
      coordinates: {
        lat: DEFAULT_CENTER[0],
        lng: DEFAULT_CENTER[1],
      },
      zoom: DEFAULT_ZOOM,
      actions: {
        setCoordinates: (coordinates) => set(() => ({ coordinates })),
        setZoom: (zoom) => set(() => ({ zoom })),
      },
    }),
    {
      name: "mg",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);
