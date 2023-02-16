import { useState } from "react";
import useSWR from "swr";
import { useSetError } from "@/stores/errorStore";
import { dataFetcher } from "@/services/dataFetcher";
import { PartialDataError } from "@/errors";
import dJSON from "dirty-json";
import { APIChannel, APIResponse, Channel, ChannelData } from "@/types";
import { BASE_URL } from "@/utils/constants";

// @fdemir code begin =======
type HandleLocationResponseOptions = {
  transformResponse: (_res: APIResponse & { extraParams: any }) => ChannelData;
};

const parseExtraParams = (extraParamsStr?: string) => {
  if (!extraParamsStr) return {};
  return dJSON.parse<string, any>(extraParamsStr?.replaceAll("nan", ""));
};

export const parseChannelData = (
  item: APIResponse,
  options: HandleLocationResponseOptions
): ChannelData => {
  let extraParams = {};
  try {
    extraParams = parseExtraParams(item.extra_parameters);
  } catch (error) {
    console.error(error);
  }
  return options.transformResponse({ ...item, extraParams });
};

const transformAPIResponse = (
  data: APIResponse[],
  options: HandleLocationResponseOptions
): ChannelData[] => {
  return data.map((item) => parseChannelData(item, options));
};
// @fdemir code end =======

const generateURL = (apiChannels: APIChannel[]) => {
  return (
    BASE_URL + `/feeds/areas?channel=${apiChannels.join(",")}&extraParams=true`
  );
};

export default function useLocation(
  apiChannels: APIChannel[],
  channelName: Channel,
  options: HandleLocationResponseOptions
) {
  const [locations, setLocations] = useState<ChannelData[]>([]);

  const url = generateURL(apiChannels);

  const setError = useSetError();
  const setChannelError = (error: Error) => {
    setError({ [channelName]: error });
  };

  useSWR<{ results: APIResponse[] }>(url, dataFetcher, {
    onSuccess: (data) => {
      if (!data) return;

      const transformedProps = transformAPIResponse(data.results, options);
      setLocations(transformedProps);
    },
    onError: () => {
      setChannelError(new PartialDataError());
    },
  });

  return locations;
}
