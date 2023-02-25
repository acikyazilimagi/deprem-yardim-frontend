import useSWR from "swr";
import { useSingletonsStore } from "@/stores/singletonsStore";
import {
  disasterVictimChannels,
  disasterVictimFilters,
  useDisasterVictimFilter,
} from "./useDisasterVictimFilter";
import { dateDifferenceSeconds } from "@/utils/date";

export const useDisasterVictimsData = () => {
  const { apiClient } = useSingletonsStore();
  const filter = useDisasterVictimFilter();

  return useSWR(
    ["areas", filter.timestamp],
    ([_, timestamp]) => {
      const { reasons } = disasterVictimFilters.afetzede;

      return apiClient.fetchAreas({
        reasons: reasons.join(","),
        channels: disasterVictimChannels,
        timestamp:
          timestamp > 0
            ? dateDifferenceSeconds(Date.now(), timestamp)
            : undefined,
      });
    },
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};
