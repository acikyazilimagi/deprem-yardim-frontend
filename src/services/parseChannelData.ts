import { APIResponse } from "@/types";
import {
  parseAhbapResponse,
  parseBabalaResponse,
  parseDepremIOResponse,
  parseFoodResponse,
  parsePharmacyResponse,
} from "./responses";

export const parseChannelData = ((item: APIResponse) => {
  switch (item.channel) {
    case "eczane_excel":
    case "turk_eczane":
      return parsePharmacyResponse(item);
    case "sahra_mutfak":
    case "sicak_yemek":
    case "malatya_yemek":
    case "adana_yemek":
      return parseFoodResponse(item);
    case "ahbap_location":
      return parseAhbapResponse(item);
    case "babala":
    case "Babala":
      return parseBabalaResponse(item);
    case "depremio":
      return parseDepremIOResponse(item);
    case "teyit_yardim":
    case "guvenli_yerler_oteller":
    case "hastahane_locations":
    case "teleteyit":
    case "uydu":
    case "twitter":
    case "teyit_enkaz":
      return { foo: "bar" } as const;
  }
}) satisfies (_item: APIResponse) => {}; // to make sure all channels are covered
