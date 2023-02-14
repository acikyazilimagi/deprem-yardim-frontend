export const BASE_URL = "https://apigo.afetharita.com";
export const EXPAND_COORDINATE_BY_VALUE = 0.02;
export const REQUEST_THROTTLING_INITIAL_SEC = 10;

// IMPORTANT: UPDATE THIS WHEN YOU ADD A NEW CHANNEL
// REQUIRED FOR ERROR HANDLING
export const CHANNEL_COUNT = 5;

export const CHANNEL_AHBAP_TYPES: Record<string, string> = {
  "1507": "Hayvanlar İçin Ücretsiz Tedavi",
  "1826": "Güvenli Noktalar",
  "1602": "Konaklama - Beslenme",
};

export const AHBAP_LOCATIONS_URL =
  BASE_URL + "/feeds/areas?channel=ahbap_location&extraParams=true";

export const HOSPITAL_LOCATIONS_URL =
  BASE_URL + "/feeds/areas?channel=hastahane_locations&extraParams=true";

export const FOOD_URL =
  BASE_URL + "/feeds/areas?channel=sicak_yemek&extraParams=true";

export const TELETEYIT_URL =
  BASE_URL + "/feeds/areas?channel=teleteyit&extraParams=true";

export const SATELLITE_URL =
  BASE_URL + "/feeds/areas?channel=uydu&extraParams=true";
export const SAHRA_KITCHEN_URL =
  BASE_URL + "/feeds/areas?channel=sahra_mutfak&extraParams=true";

export const PHARMACY_URL =
  BASE_URL + "/feeds/areas?channel=turk_eczane,eczane_excel&extraParams=true";
