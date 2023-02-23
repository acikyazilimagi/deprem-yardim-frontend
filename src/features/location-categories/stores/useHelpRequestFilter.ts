import omit from "lodash.omit";
import { create } from "zustand";
import { FilterOptions } from "@/utils/filterTime";
import { categoryFilters } from "../category-filters";

export type HelpRequestFilters = Omit<typeof categoryFilters, "afetzede">;
export type HelpRequestCategory = keyof HelpRequestFilters;

interface State {
  isOpen: boolean;
  selectedCategories: HelpRequestCategory[];
  timestamp: number;
  actions: {
    setTimestamp: (_timestamp: number) => void;
    setSelectedCategories: (_selected: HelpRequestCategory[]) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const filters = omit(categoryFilters, "afetzede") as HelpRequestFilters;

export const useHelpRequestFilter = create<State>()((set) => ({
  isOpen: false,
  selectedCategories: ["barinma"],
  timestamp: FilterOptions[0].inMilliseconds,
  actions: {
    setTimestamp: (timestamp) => set(() => ({ timestamp })),
    setSelectedCategories: (selectedCategories) =>
      set(() => ({ selectedCategories })),
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
  },
}));
