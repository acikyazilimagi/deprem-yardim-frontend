// implement a next api request

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const { id } = req.query;
  const url =
    "https://api.afetharita.com/tweets/areas?" +
    new URLSearchParams(req.query as any);

  const response = await fetch(url);

  const { results } = await response.json();

  res
    .status(200)
    .json(results.find((item: any) => item.id.toString() === id?.toString()));
};

export default handler;
