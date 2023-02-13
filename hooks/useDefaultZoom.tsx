import {
  DEFAULT_ZOOM,
  DEFAULT_ZOOM_MOBILE,
  localStorageKeys,
  safeGetLocalStorage,
} from "@/components/UI/Map/utils";
import { useDevice } from "@/stores/mapStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDefaultZoom() {
  const [defaultZoom, setDefaultZoom] = useState(DEFAULT_ZOOM);

  const device = useDevice();
  const router = useRouter();
  const { zoom } = router.query;

  useEffect(() => {
    if (zoom) {
      setDefaultZoom(parseFloat(zoom as string));

      return;
    }

    const savedZoomValue = new URLSearchParams(
      safeGetLocalStorage(localStorageKeys.coordinatesURL) ?? ""
    )?.get("zoom");
    if (savedZoomValue) {
      setDefaultZoom(parseFloat(savedZoomValue));

      return;
    }

    if (device == "mobile") {
      setDefaultZoom(DEFAULT_ZOOM_MOBILE);
    }
  }, []);

  return {
    defaultZoom,
  };
}
