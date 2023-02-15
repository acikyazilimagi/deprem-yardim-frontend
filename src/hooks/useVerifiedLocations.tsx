import {
  FOOD_URL,
  AHBAP_LOCATIONS_URL,
  HOSPITAL_LOCATIONS_URL,
  TELETEYIT_URL,
  SATELLITE_URL,
  SAHRA_KITCHEN_URL,
  PHARMACY_URL,
  SAFE_PLACES_URL,
} from "@/utils/constants";
import useLocation from "./useLocation";

// TODO: PUT THESE HOOKS INTO THEIR OWN FILES
const getSahraExtraParams = (item: any) => ({
  icon: "images/icon-14.png",
  id: item.id,
  properties: item.properties,
  reason: item.reason,
});

const getPharmacyExtraParams = (item: any) => ({
  icon: "images/icon-15.png",
  id: item.id,
  properties: item.properties,
  reason: item.reason,
  verified: item.is_location_verified,
});

// TODO: Remove this hook and use hooks defined above in relevant components
export function useVerifiedLocations() {
  const foodLocations = useLocation(FOOD_URL, "food");
  const ahbapLocations = useLocation(AHBAP_LOCATIONS_URL, "ahbap");
  const hospitalLocations = useLocation(HOSPITAL_LOCATIONS_URL, "hospital", {
    getExtraParams: () => ({ icon: "images/icon-10.png" }),
  });
  const teleteyitLocations = useLocation(TELETEYIT_URL, "teleteyit", {
    getExtraParams: () => ({ icon: "images/icon-12.png" }),
  });
  const satelliteLocations = useLocation(SATELLITE_URL, "satellite", {
    getExtraParams: () => ({ icon: "images/icon-13.png" }),
  });
  const sahraKitchenLocations = useLocation(SAHRA_KITCHEN_URL, "sahraKitchen", {
    getExtraParams: getSahraExtraParams,
  });
  const pharmacyLocations = useLocation(PHARMACY_URL, "pharmacy", {
    getExtraParams: getPharmacyExtraParams,
  });
  const safePlaceLocations = useLocation(SAFE_PLACES_URL, "safePlace", {
    getExtraParams: () => ({ icon: "images/icon-16.png" }),
  });

  return {
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safePlaceLocations,
  };
}
