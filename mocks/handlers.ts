import { rest } from "msw";
import { DataLite } from "./TypesAreasEndpoint";

import areasJson from "./areasResponse.json";
import { BASE_URL } from "@/utils/constants";
import { areasURL } from "@/utils/urls";

//"https://api.afetharita.com/tweets/areas?ne_lat=100&ne_lng=0&sw_lat=100&sw_lng=0",
const url = BASE_URL;

export const handlers = [

  rest.get(
    `${areasURL}/*`,
    (_req, res, ctx) => {
      return res(ctx.json<DataLite>(areasJson as DataLite));
    }
  ),
];
