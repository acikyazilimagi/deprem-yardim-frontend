import { APIChannel } from "@/types";
import { getHashStorage } from "@/utils/zustand";
import omit from "lodash.omit";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoryFilters } from "../category-filters";

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

export const serviceCategories = omit(
  categoryFilters,
  "afetzede"
) as ServiceFilters;

export const serviceChannels: APIChannel[] = [
  "ahbap_location",
  "sicak_yemek",
  "hastahane_locations",
  "teleteyit",
  "uydu",
  "sahra_mutfak",
  "turk_eczane",
  "eczane_excel",
  "guvenli_yerler_oteller",
  "babala",
  "adana_yemek",
  "malatya_yemek",
  "depremio",
  "teyit_yardim",
];

export const useServiceFilter = create<State>()(
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
      actions: {
        setSelectedCategories: (selectedCategories) =>
          set(() => ({ selectedCategories })),
        setIsOpen: (isOpen) => set(() => ({ isOpen })),
      },
    }),
    {
      name: "sf",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);
