import { rest } from "msw";
import { DataLite } from "./TypesAreasEndpoint";

import areasJson from "./areasResponse.json";
import { areasURL } from "@/utils/urls";

export const handlers = [

  rest.get(
    `${areasURL}/*`,
    (_req, res, ctx) => {
      return res(ctx.json<DataLite>(areasJson as DataLite));
    }
  ),
];
