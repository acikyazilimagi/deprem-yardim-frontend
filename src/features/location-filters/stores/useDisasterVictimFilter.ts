import { FilterOptions } from "@/utils/filterTime";
import { create } from "zustand";
import Router from "next/router";

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
    setTimestamp: (timestamp) => {
      // TODO: refactor out into a util function
      const query = {
        ...Router.query,
        dvf_t: [timestamp, Date.now().toString()].join(","),
      };
      Router.push({ query }, { query }, { shallow: true });
      set(() => ({ timestamp }));
    },
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
  },
}));
