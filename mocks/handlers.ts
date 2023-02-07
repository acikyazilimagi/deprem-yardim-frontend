import { rest } from "msw";
import { Data } from "./TypesAreasEndpoint";

import areasJson from "./areasResponse.json";

export const handlers = [
  // URL değişecek
  rest.get("https://jsonplaceholder.typicode.com/posts", (_req, res, ctx) => {
    return res(ctx.json<Data>(areasJson as Data));
  }),
];
