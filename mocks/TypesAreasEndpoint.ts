import { Point } from "./types";

export type Data = {
    id: number;
    full_text: string;
    formatted_address: string;
    loc: [number, number];
    viewport: {
      northeast: Point;
      southwest: Point;
    };
    raw: Raw;
    resolution: {
      address?: string | null;
      city?: string | null;
      distinct?: string | null;
      neighbourhood?: string | null;
      street?: string | null;
      no?: string | null;
      name_surname?: string | null;
      tel?: string | null;
    };
};

export type Raw = {
  tweet_id: string;
  user_id: string;
  name?: string;
  screen_name?: string;
};

export type DataLite = {
  count: number;
  results: {
    id: number;
    entry_id: number;
    loc: [number, number]
  }[]
}