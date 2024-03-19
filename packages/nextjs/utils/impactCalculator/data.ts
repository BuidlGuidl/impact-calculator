import { Vector } from "~~/app/types/data";
import clientPromise from "~~/services/db/mongodb";

export const getVectors = async () => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const vectors = await db.collection<Vector>("impactVectors").find({}).toArray();
  return vectors;
};
