import { localForageKeys } from "@/components/UI/Map/utils";
import { parseChannelData } from "@/hooks/useLocation";
import { ChannelData, DataLite, MarkerVisited } from "@/types";
import localForage from "localforage";

export const dataTransformerLite = async (
  data: DataLite
): Promise<ChannelData[]> => {
  const markerVisitedMap: MarkerVisited | null = await localForage.getItem(
    localForageKeys.markersVisited
  );

  return data.results.map((item) =>
    parseChannelData(item, {
      transformResponse: (res) => ({
        channel: res.channel as "twitter" | "babala",
        geometry: {
          location: {
            lat: res.loc[0],
            lng: res.loc[1],
          },
        },
        reference: res.entry_id,
        isVisited: markerVisitedMap ? markerVisitedMap[res.entry_id] : false,
      }),
    })
  );
};
