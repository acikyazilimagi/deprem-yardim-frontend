import useSWR from "swr";
import { useSingletonsStore } from "@/stores/singletonsStore";
import {
  serviceCategories,
  serviceChannels,
  useServiceFilter,
} from "./useServiceFilter";

export const useServicesData = () => {
  const { apiClient } = useSingletonsStore();
  const filter = useServiceFilter();

  const servicesReasons = filter.selectedCategories
    .map((category) => serviceCategories[category].reasons)
    .flat()
    .join(",");

  return useSWR(
    ["areas", servicesReasons],
    ([_, reasons]) => {
      return apiClient.fetchAreas({
        reasons,
        channels: serviceChannels,
      });
    },
    { revalidateOnFocus: false, keepPreviousData: true }
  );
};
