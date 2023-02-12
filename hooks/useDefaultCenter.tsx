import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  DEFAULT_ZOOM_MOBILE,
  localStorageKeys,
} from "@/components/UI/Map/utils";
import { useDevice } from "@/stores/mapStore";
import { LatLngExpression } from "leaflet";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDefaultCenter() {
  const [defaultCenter, setDefaultCenter] = useState(DEFAULT_CENTER);

  const router = useRouter();
  const { lat, lng } = router.query;

  useEffect(() => {
    if (lat && lng) {
      setDefaultCenter([parseFloat(lat as string), parseFloat(lng as string)]);

      return;
    }

    const savedURLSearchParams = new URLSearchParams(
      window.localStorage.getItem(localStorageKeys.coordinatesURL) || ""
    );
    if (savedURLSearchParams.has("lat") && savedURLSearchParams.has("lng")) {
      setDefaultCenter([
        parseFloat(savedURLSearchParams.get("lat")!),
        parseFloat(savedURLSearchParams.get("lng")!),
      ]);
    }
  }, []);

  return {
    defaultCenter,
  };
}
