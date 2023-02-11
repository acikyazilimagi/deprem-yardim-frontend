import {
  FeedChannelBabalaProps,
  FeedChannelTwitterProps,
} from "@/components/UI/Drawer/components/types";
import { MarkerData } from "@/mocks/types";
import { DataLite, Data } from "@/mocks/TypesAreasEndpoint";

export const dataTransformerLite = (data: DataLite): MarkerData[] =>
  data.results.map((result) => ({
    reference: result.entry_id,
    geometry: {
      location: {
        lat: result.loc?.[0] || 0,
        lng: result.loc?.[1] || 0,
      },
    },
    isVisited: false,
  }));

export const dataTransformer = (
  data?: Data
): FeedChannelTwitterProps | FeedChannelBabalaProps => {
  let rawExtraParams = `{ tweet_id: "", name: "", full_text: "", user_id: "" }`;

  try {
    rawExtraParams = JSON.parse(data?.extra_parameters || rawExtraParams);
  } catch (e) {
    //   // I don't that trust that extraParameters JSON string, so it is better
    //   // to not to crash the UI.
    //   console.error(e);
  }

  return {
    full_text: data?.full_text,
    formatted_address: data?.formatted_address,
    id: data?.id,
    extra_parameters: rawExtraParams as any, // TODO: Burası şimdilik any olarak bırakıldı, sonrasında type güncellemesi yapılacak
    channel: data?.channel,
    is_resolved: data?.is_resolved,
    timestamp: data?.timestamp,
  };
};
