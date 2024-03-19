import type { NextApiRequest, NextApiResponse } from "next";
import { Vector } from "~~/app/types/data";
import { getVectors } from "~~/utils/impactCalculator/data";

type ResponseData = Vector[] | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    const vectors = await getVectors();
    res.status(200).json(vectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
