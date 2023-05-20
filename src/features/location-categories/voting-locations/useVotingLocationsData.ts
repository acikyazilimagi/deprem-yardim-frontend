import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useVotingLocations } from "./useVotingLocations";

export const useVotingLocationsData = () => {
  const { selectedDistrict, selectedCity } = useVotingLocations();
  const map = useMap();

  // city is changed: zoom into city
  useEffect(() => {
    if (!selectedCity) return;
    if (!("latitude" in selectedCity) || !("longitude" in selectedCity)) return;

    map.setView([selectedCity.latitude, selectedCity.longitude], 9, {
      animate: true,
    });
  }, [map, selectedCity]);

  // district is changed: zoom into district
  useEffect(() => {
    if (!selectedDistrict) return;
    if (!("latitude" in selectedDistrict) || !("longitude" in selectedDistrict))
      return;

    map.setView([selectedDistrict.latitude, selectedDistrict.longitude], 11, {
      animate: true,
    });
  }, [map, selectedDistrict]);
};
