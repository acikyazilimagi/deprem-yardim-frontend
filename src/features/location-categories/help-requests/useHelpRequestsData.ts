import useSWR from "swr";
import { useSingletonsStore } from "@/stores/singletonsStore";
import { dateDifferenceSeconds } from "@/utils/date";
import {
  helpRequestChannels,
  helpRequestFilters,
  useHelpRequestFilter,
} from "./useHelpRequestFilter";

export const useHelpRequestsData = () => {
  const { apiClient } = useSingletonsStore();
  const filter = useHelpRequestFilter();

  const helpRequestReasons = filter.selectedCategories
    .map((category) => helpRequestFilters[category].reasons)
    .flat()
    .join(",");

  return useSWR(
    ["areas", helpRequestReasons, filter.timestamp],
    ([_, reasons, timestamp]) => {
      return apiClient.fetchAreas({
        reasons,
        channels: helpRequestChannels,
        timestamp:
          timestamp > 0
            ? dateDifferenceSeconds(Date.now(), timestamp)
            : undefined,
      });
    },
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};
