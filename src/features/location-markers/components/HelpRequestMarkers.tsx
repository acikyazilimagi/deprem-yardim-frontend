import { useRouter } from "next/router";
import { useSingletonsStore } from "../../../stores/singletonsStore";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import { dateDifferenceSeconds } from "@/utils/filterTime";
import { ChannelData } from "@/types";
import { useState } from "react";
import { GenericClusterGroup } from "@/components/Map/Cluster/GenericClusterGroup";
import { categoryFilters } from "@/features/location-filters/category-filters";
import { DataCategory } from "../../../services/ApiClient";
const REQUEST_DEBOUNCE_TIME = 500; //ms

type Props = {
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};
export const HelpRequestMarkers = ({ onMarkerClick }: Props) => {
  // data fetching, maybe refactor out into a hook?
  const router = useRouter();
  const { apiClient } = useSingletonsStore();

  const helpRequestTime = router.query.hrf_t as string | undefined;
  const helpRequestCategory = router.query.hrf_c as string | undefined;
  const [helpRequestLocations, setHelpRequestLocations] = useState<
    ChannelData[]
  >([]);

  const helpRequestDebounce = useDebounce(
    [helpRequestTime, helpRequestCategory],
    REQUEST_DEBOUNCE_TIME
  );

  useSWR(
    // sends request when some item has changed below
    ["areas", ...helpRequestDebounce],
    () => {
      // FIXME: we should send request below condition is true. consider alternative way to inercept it. like enabled: bool in react-query.
      let timestamp: string | undefined = undefined;
      let reasons: string | undefined = undefined;
      let channels: string | undefined = undefined;

      if (helpRequestTime && helpRequestTime.split(",").length == 2) {
        const [timestampStr, dateStr] = helpRequestTime.split(",");
        timestamp = dateDifferenceSeconds(
          parseInt(dateStr),
          parseInt(timestampStr)
        ).toString();
      }
      if (helpRequestCategory || helpRequestCategory == "") {
        const categories = helpRequestCategory.split(",") as DataCategory[];
        reasons = categories
          .map((category) => {
            return categoryFilters[category].reasons.join(",");
          })
          .join(",");

        channels = categories
          .map((category) => {
            return categoryFilters[category].channels.join(",");
          })
          .join(",");
      }
      if (reasons) {
        return apiClient.fetchAreas({ reasons, channels, timestamp });
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data: ChannelData[] | undefined) => {
        setHelpRequestLocations(data ?? []);
      },
    }
  );

  return (
    <GenericClusterGroup
      data={helpRequestLocations}
      onMarkerClick={onMarkerClick}
    />
  );
};
