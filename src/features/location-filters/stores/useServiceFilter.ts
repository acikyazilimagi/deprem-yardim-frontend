import omit from "lodash.omit";
import { create } from "zustand";
import { categoryFilters } from "../category-filters";
import Router from "next/router";

export type ServiceFilters = Omit<typeof categoryFilters, "afetzede">;
export type ServiceCategory = keyof ServiceFilters;

interface State {
  isOpen: boolean;
  selectedCategories: ServiceCategory[];
  actions: {
    setSelectedCategories: (_selected: ServiceCategory[]) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const filters = omit(categoryFilters, "afetzede") as ServiceFilters;

export const useServiceFilter = create<State>()((set) => ({
  isOpen: false,
  selectedCategories: ["barinma"],
  actions: {
    setSelectedCategories: (selectedCategories) => {
      // TODO: refactor out into a util function
      const query = {
        ...Router.query,
        sf_c: selectedCategories.join(","),
      };
      Router.push({ query }, { query }, { shallow: true });
      set(() => ({ selectedCategories }));
    },
    setIsOpen: (isOpen) => set(() => ({ isOpen })),
  },
}));
