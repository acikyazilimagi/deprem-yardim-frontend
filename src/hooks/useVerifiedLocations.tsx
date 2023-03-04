import { useChannelFilterMenuOption } from "@/stores/urlStore";
import { useLocation } from "./useLocation";

import {
  transformFoodResponse,
  transformBabalaResponse,
  transformAhbapResponse,
  transformHospitalResponse,
  transformTeleteyitResponse,
  transformSatelliteResponse,
  transformPharmacyResponse,
  transformSafePlaceResponse,
  transformTwitterResponse,
} from "@/services/responses";

export function useVerifiedLocations() {
  const channelFilter = useChannelFilterMenuOption();

  const foodLocations = useLocation(
    ["sicak_yemek", "adana_yemek", "malatya_yemek", "sahra_mutfak"],
    "yemek",
    {
      transformResponse: transformFoodResponse,
    }
  );

  const ahbapLocations = useLocation(["ahbap_location"], "ahbap", {
    transformResponse: transformAhbapResponse,
  });

  const hospitalLocations = useLocation(["hastahane_locations"], "hastane", {
    transformResponse: transformHospitalResponse,
  });

  const teleteyitLocations = useLocation(["teleteyit"], "teleteyit", {
    transformResponse: transformTeleteyitResponse,
  });

  const satelliteLocations = useLocation(["uydu"], "uydu", {
    transformResponse: transformSatelliteResponse,
  });

  const pharmacyLocations = useLocation(
    ["eczane_excel", "turk_eczane"],
    "eczane",
    { transformResponse: transformPharmacyResponse }
  );

  const safePlaceLocations = useLocation(
    ["guvenli_yerler_oteller"],
    "guvenli",
    { transformResponse: transformSafePlaceResponse }
  );

  const babalaLocations = useLocation(["babala"], "babala", {
    disable: !["babala", null].includes(channelFilter),
    transformResponse: transformBabalaResponse,
  });

  const twitterLocations = useLocation(["twitter"], "twitter", {
    disable: !["twitter", null].includes(channelFilter),
    transformResponse: transformTwitterResponse,
  });

  return {
    babalaLocations,
    twitterLocations,
    foodLocations,
    ahbapLocations,
    hospitalLocations,
    teleteyitLocations,
    satelliteLocations,
    pharmacyLocations,
    safePlaceLocations,
  };
}
