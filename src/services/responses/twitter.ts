import { createGeometry } from "@/utils/geometry";
import { APIResponseObject, RT, Geometry } from "@/types";

export type TwitterAPIExtraParams = {
  tweet_id: string;
  screen_name: string;
  name?: string;
};

export type TwitterResponse = APIResponseObject<
  "twitter",
  TwitterAPIExtraParams
>;

export type TwitterDataProperties = {
  tweet_id: string | null;
  screen_name: string | null;
  name: string | null;
  reason: string | null;
  full_text: string;
  timestamp: string | null;
  formatted_address: string;
  description: string | null;
};

export type TwitterData = {
  channel: "twitter";
  properties: TwitterDataProperties;
  geometry: Geometry;
};
export const transformTwitterResponse: RT<TwitterResponse, TwitterData> = (
  res
) => {
  return {
    channel: "twitter",
    properties: {
      icon: "images/icon-twitter.png",
      full_text: res.full_text ?? "",
      reason: res.reason ?? null,
      screen_name: res.extraParams?.screen_name ?? null,
      name: res.extraParams?.name ?? null,
      tweet_id: res.extraParams?.tweet_id ?? null,
      formatted_address: res.formatted_address,
      timestamp: res.timestamp ?? null,
      description: null,
    },
    geometry: createGeometry(res),
    reference: res.entry_id ?? null,
  };
};
