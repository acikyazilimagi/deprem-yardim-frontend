import { parseChannelData } from "@/hooks/useLocation";
import { transformers } from "@/hooks/useVerifiedLocations";
import { APIChannel, APIResponse, ChannelData } from "@/types";
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

// in-memory cache for areas responses
const areasCache = new Map<number, ChannelData>();

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

    // TOFIX: cleanup logs
    console.log("sent request");
    const response = (await dataFetcher(url)) as {
      results: APIResponse[];
    };
    console.log("received response");

    const data = (response.results ?? [])
      .map((item) => {
        const transformResponse = transformers[item.channel] ?? null;
        // @ts-ignore
        if (transformResponse) {
          return parseChannelData(item, { transformResponse });
        }
      })
      .filter(Boolean) as ChannelData[];

    data.forEach((item) => {
      if (item.reference) {
        areasCache.set(item.reference, item);
      }
    });

    return Array.from(areasCache.values());
  }

  async fetchReasons() {
    const response = (await dataFetcher(this.url + "/reasons")) as {
      reasons: string[];
    };

    return response.reasons;
  }

  async fetchLocationByID(id: number) {
    const response = (await dataFetcher(
      `${this.url}/feeds/${id}`
    )) as APIResponse;

    let channel: ChannelData | undefined = undefined;
    if (response.channel) {
      channel = parseChannelData(response, {
        transformResponse:
          transformers[response.channel.toLowerCase() as APIChannel],
      });
    }

    return channel ?? null;
  }
}
