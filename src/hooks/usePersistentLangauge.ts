import { NEXT_LOCALE_COOKIE } from "@/utils/constants";
import { getCookie, setCookie } from "@/utils/cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ONE_DAY = 24 * 7;

export function usePersistentLanguage(expiresIn: number = ONE_DAY) {
  const router = useRouter();

  useEffect(() => {
    const currentLocale = getCookie(NEXT_LOCALE_COOKIE);

    if (router.locale && currentLocale !== router.locale) {
      setCookie(NEXT_LOCALE_COOKIE, router.locale, "/", expiresIn);
    }
  }, [expiresIn, router.locale]);
}
