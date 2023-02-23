import { useRouter } from "next/router";
import { useSingletonsStore } from "../../../stores/singletonsStore";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import { ChannelData } from "@/types";
import { useState } from "react";
import { GenericClusterGroup } from "@/components/Map/Cluster/GenericClusterGroup";
import { categoryFilters } from "@/features/location-filters/category-filters";
import { DataCategory, apiServiceChannels } from "../../../services/ApiClient";
const REQUEST_DEBOUNCE_TIME = 500; //ms

type Props = {
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};
export const ServicesMarkers = ({ onMarkerClick }: Props) => {
  // data fetching, maybe refactor out into a hook?
  const router = useRouter();
  const { apiClient } = useSingletonsStore();

  const servicesCategory = router.query.sf_c as string | undefined;
  const [servicesLocations, setServicesLocations] = useState<ChannelData[]>([]);

  const servicesDebounce = useDebounce(
    [servicesCategory],
    REQUEST_DEBOUNCE_TIME
  );

  useSWR(
    // sends request when some item has changed below
    ["areas", ...servicesDebounce],
    () => {
      // FIXME: we should send request below condition is true. consider alternative way to inercept it. like enabled: bool in react-query.
      let reasons: string | undefined = undefined;
      let channels: string | undefined = undefined;

      if (servicesCategory || servicesCategory == "") {
        const categories = servicesCategory.split(",") as DataCategory[];
        reasons = categories
          .map((category) => {
            return categoryFilters[category].reasons.join(",");
          })
          .join(",");

        // channels = categories
        //   .map((category) => {
        //     return categoryFilters[category].channels.join(",");
        //   })
        //   .join(",");
        channels = apiServiceChannels.join(","); // TODO: change later
      }
      if (reasons) {
        return apiClient.fetchAreas({ reasons, channels });
      }
    },
    {
      revalidateOnFocus: false,
      onSuccess: (data: ChannelData[] | undefined) => {
        setServicesLocations(data ?? []);
      },
    }
  );

  return (
    <GenericClusterGroup
      data={servicesLocations}
      onMarkerClick={onMarkerClick}
    />
  );
};
