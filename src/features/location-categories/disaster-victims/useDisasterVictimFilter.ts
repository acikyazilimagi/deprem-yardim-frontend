import { APIChannel } from "@/types";
import { FilterOptions } from "@/utils/filterTime";
import { getHashStorage } from "@/utils/zustand";
import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoryFilters } from "../category-filters";

interface State {
  isOpen: boolean;
  timestamp: number;
  actions: {
    setTimestamp: (_timestamp: number) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const disasterVictimFilters = { afetzede: categoryFilters.afetzede };
export const disasterVictimChannels: APIChannel[] = ["twitter", "teyit_enkaz"];

export const useDisasterVictimFilter = create<State>()(
  persist(
    (set) => ({
      isOpen: false,
      timestamp: FilterOptions[0].inMilliseconds,
      actions: {
        setTimestamp: (timestamp) => set(() => ({ timestamp })),
        setIsOpen: (isOpen) => set(() => ({ isOpen })),
      },
    }),
    {
      name: "dvf",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);
