import { APIChannel, RT } from "@/types";

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
