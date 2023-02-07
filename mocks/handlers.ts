import { rest } from "msw";
import { Data } from "./TypesAreasEndpoint";

import areasJson from "./areasResponse.json";

export const handlers = [
  // URL değişecek
  rest.get(
    "https://api.afetharita.com/tweets/areas?ne_lat=100&ne_lng=0&sw_lat=100&sw_lng=0",
    (_req, res, ctx) => {
      return res(ctx.json<Data>(areasJson as Data));
    }
  ),
];
