import {
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
} from "@/components/UI/Drawer/components/types";
import { MarkerData, MarkerVisited } from "@/mocks/types";
import { DataLite, Data } from "@/mocks/TypesAreasEndpoint";
import localForage from "localforage";
import { localForageKeys } from "@/components/UI/Map/utils";
import dJSON from "dirty-json";

export const dataTransformerLite = async (
  data: DataLite
): Promise<MarkerData[]> => {
  const markerVisitedMap: MarkerVisited | null = await localForage.getItem(
    localForageKeys.markersVisited
  );

  return data.results.map((result) => ({
    reference: result.entry_id,
    geometry: {
      location: {
        lat: result.loc?.[0] || 0,
        lng: result.loc?.[1] || 0,
      },
    },
    isVisited: markerVisitedMap ? markerVisitedMap[result.entry_id] : false,
  }));
};

export const dataTransformer = (
  data?: Data
): FeedChannelTwitterProps | FeedChannelBabalaProps | undefined => {
  if (!data) {
    return;
  }

  let extra_params = {};
  try {
    extra_params = dJSON.parse(data?.extra_parameters);
  } catch (error) {
    console.error(error);
  }

  return {
    full_text: data?.full_text,
    formatted_address: data?.formatted_address,
    id: data?.id,
    extra_parameters: extra_params as any, // TODO: Burası şimdilik any olarak bırakıldı, sonrasında type güncellemesi yapılacak
    channel: data?.channel,
    is_resolved: data?.is_resolved,
    timestamp: data?.timestamp,
    reason: data?.reason,
  };
};
