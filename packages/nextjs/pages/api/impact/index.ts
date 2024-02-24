import csv from "csv-parser";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { DataSet, ImpactVectors, RetroPGF3Results } from "~~/app/types/data";

const dataFilePath = path.join(process.cwd(), "public", "data/RPGF3Results.csv");

// Protocol Guild contains metrics for many different projects that are included individually
const excludedProjects = ["Protocol Guild"];

interface VectorWeight {
  vector: keyof ImpactVectors;
  weight: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { vector, weight } = req.query;
  if (!vector || !weight) {
    return res.status(400).json({ message: "No vectors received" });
  }

  // Make sure they are both arrays
  const vectors = [vector].flat() as string[];
  const weights = [weight].flat() as string[];

  if (vectors.length !== weights.length) {
    return res.status(400).json({ message: "You must pass the same quantity of vectors and weights." });
  }

  const vectorWeights: VectorWeight[] = [];

  for (let i = 0; i < vectors.length; i++) {
    vectorWeights.push({ vector: vectors[i] as keyof ImpactVectors, weight: Number(weights[i]) });
  }

  try {
    const impact = await getImpact(vectorWeights);

    if (impact) {
      res.status(200).json(impact);
    } else {
      res.status(404).json({ message: "Vectors not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getImpact(vectorWeights: VectorWeight[]) {
  const projectData = (await new Promise((resolve, reject) => {
    const data: RetroPGF3Results[] = [];
    fs.createReadStream(dataFilePath)
      .pipe(csv())
      .on("data", row => {
        if (!excludedProjects.includes(row["Meta: Project Name"])) {
          data.push(row);
        }
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", error => {
        reject(error);
      });
  })) as unknown as RetroPGF3Results[];

  // Find the largest value for each vector and find multiple to make it 100
  const multipliers: { [key in keyof ImpactVectors]: number } = {} as { [key in keyof ImpactVectors]: number };
  for (const { vector } of vectorWeights) {
    const max = Math.max(...projectData.map(data => transformField(data[vector] as keyof ImpactVectors))); // TODO: Deal with date strings here
    multipliers[vector] = max !== 0 ? 100 / max : 0;
  }

  const relevantData = [] as DataSet[];
  // Apply that multiple to each value in the vector and apply the weight
  for (const data of projectData) {
    const relevant: DataSet = {
      data: {} as { [key in keyof ImpactVectors]: { normalized: number; actual: string | number | undefined } },
      score: 0,
<<<<<<< HEAD
      opAllocation: 0,
=======
      opAllocated: 0,
>>>>>>> adc9232 (add `opAllocated` field to return data)
      metadata: {
        "Meta: Project Name": data["Meta: Project Name"],
        "Meta: Project Image": data["Meta: Project Image"],
        "Meta: Applicant Type": data["Meta: Applicant Type"],
        "Meta: Website": data["Meta: Website"],
        "Meta: Bio": data["Meta: Bio"],
        "Meta: Payout Address": data["Meta: Payout Address"],
        "Category: Collective Governance": data["Category: Collective Governance"],
        "Category: Developer Ecosystem": data["Category: Developer Ecosystem"],
        "Category: End User Experience and Adoption": data["Category: End User Experience and Adoption"],
        "Category: OP Stack": data["Category: OP Stack"],
      },
    };
    for (const { vector, weight } of vectorWeights) {
      const actualValue = data[vector];
      const currentValue = transformField(data[vector]);
      const multiplier = multipliers[vector];

      // Apply the multiplier to equalize the vectors
      const scaledValue = currentValue && multiplier ? currentValue * multiplier : 0;
      // Apply the weight
      relevant.data[vector] = {
        normalized: scaledValue && weight ? scaledValue * weight : 0,
        actual: actualValue,
      };
      // Add to the score
      relevant.score += relevant.data[vector]?.normalized || 0;
    }
    relevantData.push(relevant);
  }

  const nonZeroProjects = relevantData.filter(data => data.score > 0);
  // Calculate total OP allocated to each project
  const totalScore = nonZeroProjects.reduce((total, curr) => total + curr.score, 0);
  const projectsWithOPAllocated = nonZeroProjects.map(project => ({
    ...project,
<<<<<<< HEAD
    opAllocation: (project.score / totalScore) * 10000000,
=======
    opAllocated: (project.score / totalScore) * 10000000,
>>>>>>> adc9232 (add `opAllocated` field to return data)
  }));
  // Remove projects with no impact
  return projectsWithOPAllocated;
}

function transformField(field: string | number | boolean | undefined): number {
  if (field === undefined) {
    return 0;
  }
  // First try to parse as a number
  const value = Number(field);
  if (!isNaN(value)) {
    return value;
  }
  // Then try to parse as a date
  const date = new Date(field as string);
  if (!isNaN(date.getTime())) {
    return new Date().getTime() - date.getTime();
  }
  // If all else fails, return 0
  return 0;
}
