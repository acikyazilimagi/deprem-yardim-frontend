if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BASE_URL is not defined, change .env.sample filename to .env.development to fix it"
  );
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
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

export const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";
