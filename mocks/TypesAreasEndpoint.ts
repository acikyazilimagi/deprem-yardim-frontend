import { Channel } from "@/components/UI/Drawer/components/types";

export type Data = {
    id: number;
    full_text: string;
    formatted_address: string;
    extra_parameters?: string,
    timestamp: string;
    is_resolved: boolean;
    channel: Channel;
};

export type Raw = {
  tweet_id: string;
  user_id: string;
  name?: string;
  screen_name?: string;
  full_text: string;
};

export type DataLite = {
  count: number;
  results: {
    id: number;
    entry_id: number;
    loc: [number, number]
  }[]
}