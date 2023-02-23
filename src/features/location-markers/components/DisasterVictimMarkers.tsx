import { useRouter } from "next/router";
import { useSingletonsStore } from "../../../stores/singletonsStore";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import { dateDifferenceSeconds } from "@/utils/filterTime";
import { ChannelData } from "@/types";
import { useState } from "react";
import { GenericClusterGroup } from "@/components/Map/Cluster/GenericClusterGroup";
import { categoryFilters } from "@/features/location-filters/category-filters";
const REQUEST_DEBOUNCE_TIME = 500; //ms

type Props = {
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};
export const DisasterVictimMarkers = ({ onMarkerClick }: Props) => {
  // const { t } = useTranslation("home");

  // data fetching, maybe refactor out into a hook?
  const router = useRouter();
  const { apiClient } = useSingletonsStore();
  const disasterVictimTime = router.query.dvf_t as string | undefined;
  const [disasterVictimLocations, setDisasterVictimLocations] = useState<
    ChannelData[]
  >([]);
  const disasterVictimDebounce = useDebounce(
    [disasterVictimTime],
    REQUEST_DEBOUNCE_TIME
  );
  useSWR(
    // sends request when some item has changed below
    ["areas", ...disasterVictimDebounce],
    () => {
      // FIXME: we should send request below condition is true. consider alternative way to inercept it. like enabled: bool in react-query.
      if (disasterVictimTime && disasterVictimTime.split(",").length == 2) {
        const [timestampStr, dateStr] = disasterVictimTime.split(",");
        return apiClient.fetchAreas({
          reasons: categoryFilters.afetzede.reasons.join(","),
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
        setDisasterVictimLocations(data ?? []);
      },
    }
  );

  return (
    <GenericClusterGroup
      data={disasterVictimLocations}
      onMarkerClick={onMarkerClick}
    />
  );
};
