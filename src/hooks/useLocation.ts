import { useState } from "react";
import useSWR from "swr";
import { useSetError } from "@/stores/errorStore";
import { dataFetcher } from "@/services/dataFetcher";
import { PartialDataError } from "@/errors";
import dJSON from "dirty-json";
import { APIChannel, APIResponse, Channel, ChannelData, RT } from "@/types";
import { BASE_URL } from "@/utils/constants";

type HandleLocationResponseOptions = {
  transformResponse: RT;
};

const parseExtraParams = (extraParamsStr: string) => {
  return dJSON.parse<string, ChannelData["properties"]>(
    extraParamsStr?.replaceAll("nan", "")
  );
};

export const parseChannelData = (
  item: APIResponse,
  options: HandleLocationResponseOptions
): ChannelData | undefined => {
  let extraParams: ChannelData["properties"] | undefined;
  try {
    extraParams = parseExtraParams(item.extra_parameters);
  } catch (error) {
    console.error(error);
  }
  return options.transformResponse({ ...item, extraParams });
};

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

      const transformedProps = data.results
        .map((item) => parseChannelData(item, options))
        .filter(Boolean) as ChannelData[];

      setLocations(transformedProps);
    },
    onError: () => {
      setChannelError(new PartialDataError());
    },
  });

  return locations;
}
