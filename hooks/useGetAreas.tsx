import { MaintenanceError, PartialDataError } from "@/errors";
import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { DataLite } from "@/mocks/TypesAreasEndpoint";
import { dataFetcher } from "@/services/dataFetcher";
import { useEventType, setMarkerData } from "@/stores/mapStore";
import {
  useChannelFilterMenuOption,
  useCoordinates,
  useReasoningFilterMenuOption,
  useTimeStamp,
} from "@/stores/urlStore";
import { REQUEST_THROTTLING_INITIAL_SEC } from "@/utils/constants";
import { dataTransformerLite } from "@/utils/dataTransformer";
import { areasURL } from "@/utils/urls";
import { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "@/components/base/Snackbar";
import useSWR from "swr";
import { useTranslation } from "next-i18next";

export function useGetAreas() {
  const [sendRequest, setSendRequest] = useState(false);
  const [shouldFetchNextOption, setShouldFetchNextOption] =
    useState<boolean>(false);
  const [slowLoading, setSlowLoading] = useState(false);
  const [url, setURL] = useState(new URL(areasURL));
  const [error, setError] = useState<Error | null>(null);

  const eventType = useEventType();
  const coordinates = useCoordinates();
  const timeStamp = useTimeStamp();
  const reasoning = useReasoningFilterMenuOption();
  const channel = useChannelFilterMenuOption();

  const { t } = useTranslation(["common"]);

  const { enqueueWarning } = useSnackbar();

  useEffect(() => {
    error && enqueueWarning(t("common:errors.partialData"));
    // ts-expect-error adding enqueue warning rerenders
  }, [error]);

  useEffect(() => {
    if (!coordinates) return;

    const url = new URL(areasURL);

    const isBabala = channel?.toLowerCase() === "babala";
    const searchParams = new URLSearchParams(isBabala ? "" : coordinates);

    searchParams.delete("eventType");

    if (channel) searchParams.append("channel", channel);
    if (!isBabala) {
      if (reasoning) searchParams.append("reason", reasoning);
      if (timeStamp) searchParams.append("time_stamp", `${timeStamp}`);
    }
    url.search = searchParams.toString();

    setURL(url);
    setSendRequest(true);
  }, [channel, coordinates, reasoning, timeStamp]);

  const [remainingTime, resetThrottling] = useIncrementalThrottling(
    () => setSendRequest(true),
    REQUEST_THROTTLING_INITIAL_SEC
  );

  const getMarkers = useCallback(
    (_url: string) => {
      if (!sendRequest) return;
      setSendRequest(false);

      return dataFetcher(_url);
    },
    [sendRequest]
  );

  useEffect(() => {
    if (eventType === "moveend" || eventType === "zoomend") {
      resetThrottling();
      return;
    }

    setSendRequest(true);
  }, [eventType, resetThrottling, url.href, sendRequest]);

  const { isLoading, isValidating } = useSWR<DataLite | undefined>(
    sendRequest ? url.href : null,
    getMarkers,
    {
      onLoadingSlow: () => setSlowLoading(true),
      revalidateOnFocus: false,
      onSuccess: async (data) => {
        if (!data) return;
        if (!data.results) {
          setShouldFetchNextOption(true);
        }

        const transformedData = data.results
          ? await dataTransformerLite(data)
          : [];
        setMarkerData(transformedData);
      },
      onError: () => {
        setError(new PartialDataError());
      },
    }
  );

  return {
    resetThrottling,
    remainingTime,
    setSendRequest,
    shouldFetchNextOption,
    slowLoading,
    resetShouldFetchNextOption: () => setShouldFetchNextOption(false),
    error,
    isLoading,
    isValidating,
  };
}
