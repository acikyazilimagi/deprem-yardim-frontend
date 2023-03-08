import { AhbapData, parseAhbapResponse } from "./ahbap";
import { BabalaData, parseBabalaResponse } from "./babala";
import { DepremIOData, parseDepremIOResponse } from "./depremio";
import { FoodData, parseFoodResponse } from "./food";
import { HospitalData, parseHospitalResponse } from "./hospital";
import { PharmacyData, parsePharmacyResponse } from "./pharmacy";
import { SafePlaceData, parseSafePlaceResponse } from "./safe-place";
import { SatelliteData, parseSatelliteResponse } from "./satellite";
import { TeleteyitData } from "./teleteyit";
import { TeyitEnkazData } from "./teyit-enkaz";
import { TeyitYardimData } from "./teyit-yardim";
import { TwitterData } from "./twitter";

export type {
  FoodData,
  BabalaData,
  AhbapData,
  HospitalData,
  TeleteyitData,
  SatelliteData,
  PharmacyData,
  SafePlaceData,
  TwitterData,
  TeyitEnkazData,
  TeyitYardimData,
  DepremIOData,
};
export {
  parseAhbapResponse,
  parseBabalaResponse,
  parseDepremIOResponse,
  parseFoodResponse,
  parseHospitalResponse,
  parsePharmacyResponse,
  parseSafePlaceResponse,
  parseSatelliteResponse,
  // parseTeleteyitResponse,
  // parseTeyitEnkazResponse,
  // parseTeyitYardimResponse,
  // parseTwitterResponse,
};
