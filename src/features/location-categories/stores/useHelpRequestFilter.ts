import omit from "lodash.omit";
import { create } from "zustand";
import { FilterOptions, TimeOption } from "@/utils/filterTime";
import { categoryFilters } from "../category-filters";

export type HelpRequestFilters = Omit<typeof categoryFilters, "afetzede">;
export type HelpRequestCategory = keyof HelpRequestFilters;

interface State {
  isOpen: boolean;
  selectedCategories: HelpRequestCategory[];
  selectedTime: TimeOption;
  actions: {
    setTimestamp: (_selectedTime: TimeOption) => void;
    setSelectedCategories: (_selected: HelpRequestCategory[]) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const filters = omit(categoryFilters, "afetzede") as HelpRequestFilters;

export const useHelpRequestFilter = create<State>()((set) => ({
  isOpen: false,
  selectedCategories: ["barinma"],
  selectedTime: FilterOptions[0].value,
  actions: {
    setTimestamp: (selectedTime) => set(() => ({ selectedTime })),
    setSelectedCategories: (selectedCategories) =>
      set(() => ({ selectedCategories })),
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
  },
}));
