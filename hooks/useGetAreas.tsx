import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { DataLite } from "@/mocks/TypesAreasEndpoint";
import { dataFetcher } from "@/services/dataFetcher";
import {
  useEventType,
  setMarkerData,
} from "@/stores/mapStore";
import { useURL } from "@/stores/urlStore";
import { REQUEST_THROTTLING_INITIAL_SEC } from "@/utils/constants";
import { dataTransformerLite } from "@/utils/dataTransformer";
import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";

export function useGetAreas() {
  const [sendRequest, setSendRequest] = useState(false);
  const [shouldFetchNextOption, setShouldFetchNextOption] =
    useState<boolean>(false);
  const [slowLoading, setSlowLoading] = useState(false)

  const eventType = useEventType();
  const url = useURL();

  const [remainingTime, resetThrottling] = useIncrementalThrottling(
    () => setSendRequest(true),
    REQUEST_THROTTLING_INITIAL_SEC
  );

  const getMarkers = useCallback(
    (_url: string) => {
      if (!sendRequest || !url.search) return;
      setSendRequest(false);

      return dataFetcher(_url);
    },
    [sendRequest, url.search]
  );

  useEffect(() => {
    if (eventType === "moveend" || eventType === "zoomend") {
      resetThrottling();
      return;
    }

    setSendRequest(true);
  }, [eventType, resetThrottling, url.href, sendRequest]);

  const { error, isLoading, isValidating } = useSWR<DataLite | undefined>(
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

