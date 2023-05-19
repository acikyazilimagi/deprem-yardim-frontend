import { usePrevious } from "@/hooks/usePrevious";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useVotingLocations } from "./useVotingLocations";

import cities from "@/data/tr-cities.json";
import cityDistricts from "@/data/tr-city-districts.json";

export const useVotingLocationsData = () => {
  const { selectedCityId, selectedDistrictId, actions } = useVotingLocations();
  const map = useMap();

  const previousSelectedCityId = usePrevious(selectedCityId);
  // city is changed: zoom into city and reset everything
  useEffect(() => {
    if (selectedCityId && previousSelectedCityId !== selectedCityId) {
      const city = cities.find((city) => city.id === selectedCityId);
      if (city) {
        map.setView([city.latitude, city.longitude], 9, {
          animate: true,
        });
        actions.setSelectedDistrictId(null);
        actions.setSelectedNeighborhoodId(null);
        actions.setSelectedSchoolId(null);
      }
    }
  }, [selectedCityId, previousSelectedCityId, map, actions]);

  const prevDistrictId = usePrevious(selectedDistrictId);
  // district is changed: zoom into district & reset neighborhood and school
  useEffect(() => {
    if (selectedDistrictId && prevDistrictId !== selectedDistrictId) {
      const district = cityDistricts.find(
        (district) => district.id === selectedDistrictId
      );
      if (district) {
        map.setView([district.latitude, district.longitude], 11, {
          animate: true,
        });
        actions.setSelectedNeighborhoodId(null);
        actions.setSelectedSchoolId(null);
      }
    }
  }, [actions, map, prevDistrictId, selectedDistrictId]);
};
