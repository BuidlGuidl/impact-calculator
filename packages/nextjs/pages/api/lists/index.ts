import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/db/dbConnect";
import VectorList from "~~/services/db/models/VectorList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const newVectorList = await new VectorList(req.body).save();
      return res.status(201).json(newVectorList);
    } catch (err) {
      console.log("Error inserting a vector list into db:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  if (req.method === "GET") {
    try {
      const vectorLists = await VectorList.find();
      return res.status(200).json(vectorLists);
    } catch (err) {
      console.log("Error retrieving vector lists from db:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  return res.status(403).json({ message: "Method not allowed." });
}
