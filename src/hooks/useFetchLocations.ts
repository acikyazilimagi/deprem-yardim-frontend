// import { useMap } from "react-leaflet";
import { ChannelData } from "@/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { isValidReasons } from "@/utils/isValidReasons";
// import { getFetchAreaBounds } from "@/utils/getFetchAreaBounds";
import { useSingletonsStore } from "@/stores/singletonsStore";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useLoading } from "@/stores/loadingStore";

const REQUEST_DEBOUNCE_TIME = 500; //ms

const useFetchLocations = (
  updaterFunction: Dispatch<SetStateAction<ChannelData[]>>
) => {
  // const map = useMap();
  const router = useRouter();
  const queryReasons = router.query.reasons as string | undefined;
  // const bounds = map.getBounds();
  const { apiClient } = useSingletonsStore();
  const { showLoading } = useLoading();

  const debouncedParams = useDebounce([queryReasons], REQUEST_DEBOUNCE_TIME);

  const { isLoading } = useSWR(
    // sends request when some item has changed at the below
    ["areas", ...debouncedParams],
    () => {
      // FIXME: we should send request below condition is true. consider alternative way to inercept it. like enabled: bool in react-query.
      if (isValidReasons(queryReasons)) {
        return apiClient.fetchAreas({
          reasons: queryReasons as string,
          // TOFIX: add back later after backend changes
          // bound: getFetchAreaBounds(bounds),
        });
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data: ChannelData[] | undefined) => {
        updaterFunction(data ?? []);
      },
    }
  );

  useEffect(() => {
    showLoading(isLoading);
  }, [isLoading, showLoading]);
};

export { useFetchLocations };
