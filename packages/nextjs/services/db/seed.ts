import clientPromise from "./mongodb";
import { impactVectors } from "~~/components/impact-vector/ImpactVectors";

const seedDb = async () => {
  const client = await clientPromise;
  const db = client.db("impact_calculator");
  const collection = db.collection("impactVectors");
  const collectionSize = await collection.countDocuments();
  const collectionExists = collectionSize > 0;

  if (!collectionExists) {
    console.log("Seeding db with impact vector data...");
    const result = await collection.insertMany(impactVectors);
    console.log(`${result.insertedCount} vectors inserted.`);
  } else {
    console.log("Vectors already exists. Skipping seeding.");
  }
  process.exit();
};

seedDb();
