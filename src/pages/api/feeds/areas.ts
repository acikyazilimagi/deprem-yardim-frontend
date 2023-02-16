import type { NextApiRequest, NextApiResponse } from "next";
import areasResponse from "@/samples/areasResponse.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  if (method === "GET") {
    return res.status(200).json(areasResponse);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
