export const BASE_URL = "https://apigo.afetharita.com";
export const EXPAND_COORDINATE_BY_VALUE = 0.001;
export const REQUEST_THROTTLING_INITIAL_SEC = 9999;

export const CHANNEL_AHBAP_TYPES: Record<string, string> = {
  "1507": "Hayvanlar İçin Ücretsiz Tedavi",
  "1826": "Güvenli Noktalar",
  "1602": "Konaklama - Beslenme",
};

export const AHBAP_LOCATIONS_URL =
  BASE_URL + "/feeds/areas?channel=ahbap_location&extraParams=true";
