import { FilterOptions } from "@/utils/filterTime";
import { create } from "zustand";

interface State {
  isOpen: boolean;
  timestamp: number;
  actions: {
    setTimestamp: (_timestamp: number) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const useDisasterVictimFilter = create<State>()((set) => ({
  isOpen: false,
  timestamp: FilterOptions[0].inMilliseconds,
  actions: {
    setTimestamp: (timestamp) => set(() => ({ timestamp })),
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
  },
}));
