import { Vector, VectorList } from "~~/app/types/data";
import clientPromise from "~~/services/db/mongodb";

export const getVectors = async () => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const vectors = await db.collection<Vector>("impactVectors").find({}).toArray();
  return vectors;
};

export const insertVectorList = async (newList: VectorList) => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const collection = db.collection<VectorList>("vectorLists");
  await collection.insertOne(newList);
};

export const getVectorLists = async () => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const lists = await db.collection<VectorList>("vectorLists").find({}).toArray();
  return lists;
};
