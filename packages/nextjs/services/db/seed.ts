import dbConnect from "./dbConnect";
import ImpactVector from "./models/ImpactVector";
import { impactVectors } from "~~/components/impact-vector/ImpactVectors";

const seedDb = async () => {
  await dbConnect();
  const numVectors = await ImpactVector.countDocuments();
  const collectionExists = numVectors > 0;

  if (!collectionExists) {
    console.log("Seeding db with impact vector data...");
    const result = await ImpactVector.insertMany(impactVectors);
    console.log(`${result.length} vectors inserted.`);
  } else {
    console.log("Vectors already exists. Skipping seeding.");
  }
  process.exit();
};

seedDb();
