import omit from "lodash.omit";
import { create } from "zustand";
import { FilterOptions } from "@/utils/filterTime";
import { categoryFilters } from "../category-filters";
import { APIChannel } from "@/types";
import { getHashStorage } from "@/utils/zustand";
import { persist } from "zustand/middleware";

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

export const helpRequestFilters = omit(categoryFilters, "afetzede");
export const helpRequestChannels: APIChannel[] = ["twitter", "teyit_enkaz"];

export const useHelpRequestFilter = create<State>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedCategories: [
        "barinma",
        "elektronik",
        "yiyecek",
        "saglik",
        "lojistik",
        "giyecek",
        "genel",
        "guvenlik",
      ],
      timestamp: FilterOptions[0].inMilliseconds,
      actions: {
        setTimestamp: (timestamp) => set(() => ({ timestamp })),
        setSelectedCategories: (selectedCategories) =>
          set(() => ({ selectedCategories })),
        setIsOpen: (isOpen) => set(() => ({ isOpen })),
      },
    }),
    {
      name: "hrf",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);
