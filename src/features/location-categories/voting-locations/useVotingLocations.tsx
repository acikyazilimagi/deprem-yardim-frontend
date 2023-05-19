import omit from "lodash.omit";
import { create } from "zustand";
import { getHashStorage } from "@/utils/zustand";
import { persist } from "zustand/middleware";

interface State {
  isOpen: boolean;
  selectedCityId: number | null;
  selectedDistrictId: number | null;
  selectedNeighborhoodId: number | null;
  selectedSchoolId: number | null;
  actions: {
    setSelectedCityId: (_selectedCityId: number | null) => void;
    setSelectedDistrictId: (_selectedDistrictId: number | null) => void;
    setSelectedNeighborhoodId: (_selectedNeighborhoodId: number | null) => void;
    setSelectedSchoolId: (_selectedSchoolId: number | null) => void;
    setIsOpen: (_isOpen: boolean) => void;
  };
}

export const useVotingLocations = create<State>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedCityId: null,
      selectedDistrictId: null,
      selectedNeighborhoodId: null,
      selectedSchoolId: null,
      actions: {
        setSelectedCityId: (selectedCityId) => set(() => ({ selectedCityId })),
        setSelectedDistrictId: (selectedDistrictId) =>
          set(() => ({ selectedDistrictId })),
        setSelectedNeighborhoodId: (selectedNeighborhoodId) =>
          set(() => ({ selectedNeighborhoodId })),
        setSelectedSchoolId: (selectedSchoolId) =>
          set(() => ({ selectedSchoolId })),
        setIsOpen: (isOpen) => set(() => ({ isOpen })),
      },
    }),
    {
      name: "voting-locations",
      getStorage: () => getHashStorage(),
      partialize: (state) => ({ ...omit(state, "actions") }),
    }
  )
);
