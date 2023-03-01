import { useState } from "react";
import useSWR from "swr";
import { useSetError } from "@/stores/errorStore";
import { dataFetcher } from "@/services/dataFetcher";
import { PartialDataError } from "@/errors";
import dJSON from "dirty-json";
import {
  APIChannel,
  APIResponse,
  ClientChannel,
  ChannelData,
  RT,
} from "@/types";
import { areasURL } from "@/utils/urls";
import { useReasoningFilterMenuOption, useTimeStamp } from "@/stores/urlStore";

const parseExtraParams = (extraParamsStr: string) => {
  return dJSON.parse<string, ChannelData["properties"]>(
    extraParamsStr?.replaceAll("nan", "")
  );
};

type HandleLocationResponseOptions = {
  disable?: boolean;
  transformResponse: RT;
};

export function useLocation(
  apiChannels: APIChannel[],
  channelName: ClientChannel,
  options: HandleLocationResponseOptions
) {
  const [locations, setLocations] = useState<ChannelData[]>([]);

  const reasoningFilter = useReasoningFilterMenuOption();
  const timeFilter = useTimeStamp();

  const url = generateURL(apiChannels, reasoningFilter, timeFilter);

  const setError = useSetError();
  const setChannelError = (error: Error) => {
    setError({ [channelName]: error });
  };

  useSWR<{ results: APIResponse[] }>(
    options.disable ? null : url,
    dataFetcher,
    {
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
    }
  );

  return locations;
}

export const parseChannelData = (
  item: APIResponse,
  options: HandleLocationResponseOptions
): ChannelData | undefined => {
  let extraParams: ChannelData["properties"] | undefined;
  try {
    if (typeof item.extra_parameters === "string") {
      extraParams = parseExtraParams(
        item.extra_parameters.replaceAll(/\\"/g, '"')
      );
    }
  } catch (error) {
    console.error(error);
  }
  return options.transformResponse({ ...item, extraParams });
};

const generateURL = (
  apiChannels: APIChannel[],
  reason: string | null,
  timestamp: number | undefined
) => {
  const url = new URL(areasURL);
  const searchParams = new URLSearchParams();

  searchParams.append("channel", apiChannels.join(","));

  if (reason) searchParams.append("reason", reason);
  if (timestamp) searchParams.append("time_stamp", timestamp.toString());

  url.search = searchParams.toString();

  return decodeURIComponent(url.toString());
};
