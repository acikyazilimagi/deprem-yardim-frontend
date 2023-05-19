import { usePrevious } from "@/hooks/usePrevious";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useVotingLocations } from "./useVotingLocations";

import cities from "@/data/tr-cities.json";

export const useVotingLocationsData = () => {
  const { selectedCityId, actions } = useVotingLocations();
  const map = useMap();

  const previousSelectedCityId = usePrevious(selectedCityId);

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
};
