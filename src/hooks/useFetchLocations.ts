import { ChannelData } from "@/types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSingletonsStore } from "@/stores/singletonsStore";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useLoading } from "@/stores/loadingStore";
import { dateDifferenceSeconds } from "../utils/filterTime";

const REQUEST_DEBOUNCE_TIME = 500; //ms

export const useFetchLocations = (
  updaterFunction: Dispatch<SetStateAction<ChannelData[]>>
) => {
  const router = useRouter();
  const { apiClient } = useSingletonsStore();
  const { showLoading } = useLoading();

  const disasterVictimTime = router.query.dvf_t as string | undefined;

  const disasterVictimDebounce = useDebounce(
    [disasterVictimTime],
    REQUEST_DEBOUNCE_TIME
  );

  // we want all these requests to have the same key so that any mutation on this key
  // will revalidate all locations (i.e. intended behaviour of scan area button)

  const { isLoading: isDvfLoading } = useSWR(
    // sends request when some item has changed below
    ["areas", ...disasterVictimDebounce],
    () => {
      // FIXME: we should send request below condition is true. consider alternative way to inercept it. like enabled: bool in react-query.
      if (disasterVictimTime && disasterVictimTime.split(",").length == 2) {
        const [timestampStr, dateStr] = disasterVictimTime.split(",");
        return apiClient.fetchAreas({
          reasons: "enkaz,kurtarma",
          channels: "twitter,babala",
          timestamp: dateDifferenceSeconds(
            parseInt(dateStr),
            parseInt(timestampStr)
          ).toString(),
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
    showLoading(isDvfLoading);
  }, [isDvfLoading, showLoading]);
};
