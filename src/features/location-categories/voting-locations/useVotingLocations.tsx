import omit from "lodash.omit";
import { create } from "zustand";
import { getHashStorage } from "@/utils/zustand";
import { persist } from "zustand/middleware";
import cities from "@/data/tr-cities.json";
import cityDistricts from "@/data/tr-city-districts.json";

export type City = (typeof cities)[number];
export type District = (typeof cityDistricts)[number];

interface State {
  isOpen: boolean;
  selectedCity: City | Pick<City, "id"> | null;
  selectedDistrict: District | Pick<District, "id"> | null;
  selectedNeighborhoodId: number | null;
  selectedSchoolId: number | null;
  actions: {
    setSelectedNeighborhoodId: (_selectedNeighborhoodId: number | null) => void;
    setSelectedSchoolId: (_selectedSchoolId: number | null) => void;
    setIsOpen: (_isOpen: boolean) => void;
    setSelectedCity: (_selectedCity: City | Pick<City, "id"> | null) => void;
    setSelectedDistrict: (
      _selectedDistrict: District | Pick<District, "id"> | null
    ) => void;
  };
}

export const useVotingLocations = create<State>()(
  persist(
    (set) => ({
      isOpen: false,
      selectedCity: null,
      selectedDistrict: null,
      selectedNeighborhoodId: null,
      selectedSchoolId: null,
      actions: {
        setSelectedCity: (selectedCity) => set(() => ({ selectedCity })),
        setSelectedDistrict: (selectedDistrict) =>
          set(() => ({ selectedDistrict })),
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

useVotingLocations.subscribe((state, previousState) => {
  if (state.selectedCity?.id === previousState.selectedCity?.id) return;

  const city = cities.find((city) => city.id === state.selectedCity?.id);

  if (!city || city.id == previousState.selectedCity?.id) return;

  state.actions.setSelectedCity(city);

  state.actions.setSelectedDistrict(null);
  state.actions.setSelectedNeighborhoodId(null);
  state.actions.setSelectedSchoolId(null);
});

useVotingLocations.subscribe((state, previousState) => {
  if (!state.selectedCity?.id) return;

  if (state.selectedDistrict?.id == previousState.selectedDistrict?.id) return;

  const district = cityDistricts.find(
    (district) => district.id == state.selectedDistrict?.id
  );

  if (!district || district.id == previousState.selectedDistrict?.id) return;

  state.actions.setSelectedDistrict(district);

  state.actions.setSelectedNeighborhoodId(null);
  state.actions.setSelectedSchoolId(null);
});
