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

type FetchAreasOptions = {
  reasons: string;
  bound?: Bounds;
};

type ApiClientProps = {
  url: string;
};

export class ApiClient {
  url: string;

  constructor(props: ApiClientProps) {
    this.url = props.url;
  }

  async fetchAreas(options: FetchAreasOptions) {
    const url = new URL(this.url + "/feeds/areas");
    const searchParams = new URLSearchParams({
      reason: options.reasons,
      ...options.bound,
      extraParams: "true",
    });

    url.search = decodeURIComponent(searchParams.toString());

    const response = await dataFetcher<{ results: APIResponse[] }>(url);

    const data = (response.results ?? [])
      .map((item) => {
        const transformResponse = transformers[item.channel] ?? null;
        // @ts-ignore
        if (transformResponse) {
          return parseChannelData(item, { transformResponse });
        }
      })
      .filter(Boolean) as ChannelData[];

    return data;
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

export type Reason = (typeof reasons)[number];
