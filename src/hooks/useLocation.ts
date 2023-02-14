import { useState } from "react";
import useSWR from "swr";
import { useSetError } from "@/stores/errorStore";
import { dataFetcher } from "@/services/dataFetcher";
import { PartialDataError } from "@/errors";
import dJSON from "dirty-json";

// @fdemir code begin =======
type HandleLocationResponseOptions = {
  getExtraParams?: any;
};

const handleLocationResponse = (
  data: any,
  setLocations: any,
  options: HandleLocationResponseOptions = {}
) => {
  if (!data) return;

  const features = data.results.map((item: any) => {
    let extra_params = {};
    try {
      extra_params = dJSON.parse(
        item.extra_parameters?.replaceAll("nan", false)
      );

      if (options?.getExtraParams) {
        extra_params = {
          ...extra_params,
          ...options.getExtraParams(item),
        };
      }
    } catch (error) {
      console.error(error);
    }

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: item.loc?.reverse(),
      },
      properties: extra_params,
    };
  });

  setLocations(features);
};
// @fdemir code end =======

export default function useLocation(
  url: any,
  channelName: string,
  options: HandleLocationResponseOptions = {}
) {
  const [locations, setLocations] = useState<any[]>([]);

  const setError = useSetError();
  const setChannelError = (error: any) => {
    setError({ [channelName]: error });
  };

  useSWR(url, dataFetcher, {
    onSuccess: (data) => handleLocationResponse(data, setLocations, options),
    onError: () => {
      setChannelError(new PartialDataError());
    },
  });

  return locations;
}
