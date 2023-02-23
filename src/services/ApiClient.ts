import { parseChannelData } from "@/hooks/useLocation";
import { transformers } from "@/hooks/useVerifiedLocations";
import { APIChannel, APIResponse, ChannelData, ClientChannel } from "@/types";
import { dataFetcher } from "./dataFetcher";

export type Bounds = {
  ne_lat: string;
  ne_lng: string;
  sw_lat: string;
  sw_lng: string;
};

export type FetchAreasOptions = {
  reasons: string;
  channels?: string;
  bound?: Bounds;
  timestamp?: string;
};

type ApiClientProps = {
  url: string;
};

const parseResults = (results: APIResponse[]) => {
  const data = (results ?? [])
    .map((item) => {
      const transformResponse = transformers[item.channel] ?? null;
      // @ts-ignore
      if (transformResponse) {
        return parseChannelData(item, { transformResponse });
      }
    })
    .filter(Boolean) as ChannelData[];

  return data;
};

export class ApiClient {
  url: string;

  constructor(props: ApiClientProps) {
    this.url = props.url;
  }
  // dvf_t, hrf_t, hrf_c, sf_c
  async fetchAreas(options: FetchAreasOptions) {
    const url = new URL(this.url + "/feeds/areas");
    // TODO: refactor out into a util function (maybe take a function that returns the params and call it below)
    const searchParams = new URLSearchParams({
      reason: options.reasons,
      ...options.bound,
      extraParams: "true",
    });
    if (options.channels && options.channels.length > 0) {
      searchParams.set("channel", options.channels);
    }

    if (options.timestamp && parseInt(options.timestamp) > 0) {
      searchParams.set("time_stamp", options.timestamp);
    }

    url.search = decodeURIComponent(searchParams.toString());

    const response = await dataFetcher<{ results: APIResponse[] }>(url);

    return parseResults(response.results);
  }

  async fetchReasons() {
    return reasons;
    // const response = (await dataFetcher(this.url + "/reasons")) as {
    //   reasons: string[];
    // };
    //
    // return response.reasons;
  }

  async fetchLocationByID(id: number) {
    const response = await dataFetcher<APIResponse>(`${this.url}/feeds/${id}`);

    let channel: ChannelData | undefined = undefined;
    if (response.channel) {
      channel = parseChannelData(response, {
        transformResponse:
          transformers[response.channel.toLowerCase() as APIChannel],
      });
    }

    return { channel: channel ?? null, _raw: response ?? null };
  }
}

const categories = [
  "afetzede",
  "barinma",
  "elektronik",
  "yiyecek",
  "saglik",
  "lojistik",
  "giyecek",
  "genel",
  "guvenlik",
] as const;

export type DataCategory = (typeof categories)[number];

export interface DataCategoryValues {
  type: DataCategory;
  reasons: Reason[];
  channels: ClientChannel[];
}

const reasons = [
  "barinma",
  "elektronik",
  "enkaz",
  "erzak",
  "genel",
  "giysi",
  "guvenli-noktalar",
  "hayvanlar-icin-tedavi",
  "konaklama",
  "kurtarma",
  "lojistik",
  "saglik",
  "su",
  "yardim",
  "yemek",
] as const;

type Reason = (typeof reasons)[number];

export const apiServiceChannels = [
  "ahbap_location",
  "sicak_yemek",
  "hastahane_locations",
  "teleteyit",
  "uydu",
  "sahra_mutfak",
  "turk_eczane",
  "eczane_excel",
  "guvenli_yerler_oteller",
  "teyit_enkaz",
  "adana_yemek",
  "malatya_yemek",
  "depremio",
  "teyit_yardim",
] as const;
