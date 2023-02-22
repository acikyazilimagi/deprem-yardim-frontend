import { useChannelFilterMenuOption } from "@/stores/urlStore";
import { APIChannel, RT } from "@/types";
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
  transformTeyitEnkazResponse,
  transformTeyitYardimResponse,
  transformDepremIOResponse,
} from "@/services/responses";

export const transformers: Record<APIChannel, RT> = {
  ahbap_location: transformAhbapResponse as RT,
  eczane_excel: transformPharmacyResponse as RT,
  guvenli_yerler_oteller: transformSafePlaceResponse as RT,
  hastahane_locations: transformHospitalResponse as RT,
  sahra_mutfak: transformFoodResponse as RT,
  sicak_yemek: transformFoodResponse as RT,
  teleteyit: transformTeleteyitResponse as RT,
  turk_eczane: transformPharmacyResponse as RT,
  uydu: transformSatelliteResponse as RT,
  twitter: transformTwitterResponse as RT,
  babala: transformBabalaResponse as RT,
  teyit_enkaz: transformTeyitEnkazResponse as RT,
  depremio: transformDepremIOResponse as RT,
  teyit_yardim: transformTeyitYardimResponse as RT,
  malatya_yemek: transformFoodResponse as RT,
  adana_yemek: transformFoodResponse as RT,
};

export function useVerifiedLocations() {
  const channelFilter = useChannelFilterMenuOption();

  const foodLocations = useLocation(
    ["sicak_yemek", "adana_yemek", "malatya_yemek", "sahra_mutfak"],
    "yemek",
    {
      transformResponse: transformFoodResponse as RT,
    }
  );

  const ahbapLocations = useLocation(["ahbap_location"], "ahbap", {
    transformResponse: transformAhbapResponse as RT,
  });

  const hospitalLocations = useLocation(["hastahane_locations"], "hastane", {
    transformResponse: transformHospitalResponse as RT,
  });

  const teleteyitLocations = useLocation(["teleteyit"], "teleteyit", {
    transformResponse: transformTeleteyitResponse as RT,
  });

  const satelliteLocations = useLocation(["uydu"], "uydu", {
    transformResponse: transformSatelliteResponse as RT,
  });

  const pharmacyLocations = useLocation(
    ["eczane_excel", "turk_eczane"],
    "eczane",
    { transformResponse: transformPharmacyResponse as RT }
  );

  const safePlaceLocations = useLocation(
    ["guvenli_yerler_oteller"],
    "guvenli",
    { transformResponse: transformSafePlaceResponse as RT }
  );

  const babalaLocations = useLocation(["babala"], "babala", {
    disable: !["babala", null].includes(channelFilter),
    transformResponse: transformBabalaResponse as RT,
  });

  const twitterLocations = useLocation(["twitter"], "twitter", {
    disable: !["twitter", null].includes(channelFilter),
    transformResponse: transformTwitterResponse as RT,
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
