import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MapState {
  visitedMarkers: Record<number, number>;
  setVisited: (_id: number) => void;
  isVisited: (_id: number) => boolean;
}

export const useVisitedMarkersStore = create<MapState>()(
  persist(
    (set, get) => ({
      visitedMarkers: {},
      setVisited: (id: number) => {
        const visitedMarkers = get().visitedMarkers;
        set({ visitedMarkers: { ...visitedMarkers, [id]: id } });
      },
      isVisited: (id: number) => {
        return !!get().visitedMarkers[id];
      },
    }),
    {
      name: "visitedMarkers",
    }
  )
);
