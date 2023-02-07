// implement a next api request

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  console.log("DEBUG 1");
  const url =
    "https://api.afetharita.com/tweets/areas?" +
    new URLSearchParams(req.query as any);

  const response = await fetch(url);

  const { count, results } = await response.json();

  res.status(200).json({
    count,
    results: results.map((item: any) => ({
      id: item.id,
    })),
  });
};

export default handler;
