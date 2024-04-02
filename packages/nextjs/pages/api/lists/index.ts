import type { NextApiRequest, NextApiResponse } from "next";
import { getVectorLists, insertVectorList } from "~~/utils/impactCalculator/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await insertVectorList(req.body);
      return res.status(201).json(req.body);
    } catch (err) {
      console.log("Error inserting a vector list into db:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  if (req.method === "GET") {
    try {
      const vectorLists = await getVectorLists();
      return res.status(200).json(vectorLists);
    } catch (err) {
      console.log("Error retrieving vector lists from db:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  return res.status(403).json({ message: "Method not allowed." });
}
