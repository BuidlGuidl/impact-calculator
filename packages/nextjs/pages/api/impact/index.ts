import type { NextApiRequest, NextApiResponse } from "next";
import { CodeMetricsByProject, OSOResponse, OSOResponseProps, OnchainMetricsByProject } from "~~/app/types/OSO";
import { DataSet, ImpactVectors } from "~~/app/types/data";
import dbConnect from "~~/services/db/dbConnect";
import ImpactVector from "~~/services/db/models/ImpactVector";

interface VectorWeight {
  vector: keyof ImpactVectors;
  weight: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  dbConnect();

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
  const allProjects = await getProjects();
  const scoredProjects = await scoreProjectsByVectorWeight({ allProjects, vectorWeights });

  // Calculate total OP allocated to each project
  const totalScore = scoredProjects.reduce((total, curr) => total + curr.score, 0);
  const projectsWithOPAllocated = scoredProjects
    .map(project => ({
      ...project,
      opAllocation: (project.score / totalScore) * 10000000,
    }))
    .filter(project => project.opAllocation >= 1);
  return projectsWithOPAllocated;
}

const getProjects = async () => {
  const projectsByMetricType = await fetchOSOProjectData();

  // For each property in projectsByMetricType, create a object mapping project_id to the object of data for that project
  const projectDataMap = {} as { [metricType in keyof OSOResponse]: { [metricType: string]: OSOResponseProps } };
  for (const metricType in projectsByMetricType) {
    const projects = projectsByMetricType[metricType as keyof OSOResponse];
    for (const project of projects) {
      if (!projectDataMap[metricType as keyof OSOResponse]) {
        projectDataMap[metricType as keyof OSOResponse] = {};
      }
      projectDataMap[metricType as keyof OSOResponse][project.projectId] = project;
    }
  }

  // Combine the data from the two sources by project_id
  const combinedData = [] as (CodeMetricsByProject & OnchainMetricsByProject)[];
  const projectIds = new Array(
    ...new Set(Object.keys(projectDataMap).flatMap(key => Object.keys(projectDataMap[key as keyof OSOResponse]))),
  );
  for (const projectId of projectIds) {
    let combined = {} as CodeMetricsByProject & OnchainMetricsByProject;
    for (const key in projectDataMap) {
      const data = projectDataMap[key as keyof OSOResponse][projectId];
      if (data) {
        combined = Object.assign(combined, data);
      }
    }
    combinedData.push(combined);
  }
  return combinedData;
};

const fetchOSOProjectData = async () => {
  const query = `{
    oso_onchainMetricsByProjectV1 {
      activeContractCount90Days
      addressCount
      addressCount90Days
      daysSinceFirstTransaction
      displayName
      eventSource
      gasFeesSum
      gasFeesSum6Months
      highActivityAddressCount90Days
      lowActivityAddressCount90Days
      mediumActivityAddressCount90Days
      multiProjectAddressCount90Days
      newAddressCount90Days
      projectId
      projectName
      projectNamespace
      projectSource
      returningAddressCount90Days
      transactionCount
      transactionCount6Months
    }
    oso_codeMetricsByProjectV1 {
      activeDeveloperCount6Months
      closedIssueCount6Months
      commitCount6Months
      contributorCount
      contributorCount6Months
      displayName
      eventSource
      firstCommitDate
      forkCount
      fulltimeDeveloperAverage6Months
      lastCommitDate
      mergedPullRequestCount6Months
      newContributorCount6Months
      openedIssueCount6Months
      openedPullRequestCount6Months
      projectId
      projectName
      projectNamespace
      projectSource
      repositoryCount
      starCount
    }
  }`;

  const OSOGraphQLEndpoint = process.env.OSO_GRAPHQL_ENDPOINT as string;

  if (!OSOGraphQLEndpoint) {
    throw new Error("OSO_GRAPHQL_ENDPOINT env var is not defined");
  }

  const OSOApiKey = process.env.OSO_API_KEY as string;

  if (!OSOApiKey) {
    throw new Error("OSO_API_KEY env var is not defined");
  }

  const response = await fetch(OSOGraphQLEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OSOApiKey}`,
    },
    body: JSON.stringify({ query }),
  });

  const { data: projectsByMetricType }: { data: OSOResponse } = await response.json();
  return projectsByMetricType;
};

const scoreProjectsByVectorWeight = async ({
  allProjects,
  vectorWeights,
}: {
  allProjects: (CodeMetricsByProject & OnchainMetricsByProject)[];
  vectorWeights: VectorWeight[];
}) => {
  const allVectors = await ImpactVector.find();

  // Find the largest value for each vector and find multiple to make it 100
  const normalizers: { [key in keyof ImpactVectors]: number } = {} as { [key in keyof ImpactVectors]: number };
  for (const { vector } of vectorWeights) {
    const fullVectorData = allVectors.find(v => v.name === vector);
    if (!fullVectorData) {
      throw new Error(`Vector ${vector} not found`);
    }
    const max = Math.max(
      ...allProjects.map(data => transformField(data[fullVectorData.fieldName as keyof OSOResponseProps])),
    );
    normalizers[vector] = max !== 0 ? 100 / max : 0;
  }

  const relevantData = [] as DataSet[];
  // Apply that multiple to each value in the vector and apply the weight
  for (const data of allProjects) {
    const relevant: DataSet = {
      data: {} as { [key in keyof ImpactVectors]: { normalized: number; actual: string | number | undefined } },
      score: 0,
      opAllocation: 0,
      metadata: {
        project_name: data["displayName"],
        project_image: "",
      },
    };
    for (const { vector, weight } of vectorWeights) {
      const fullVectorData = allVectors.find(v => v.name === vector);
      if (!fullVectorData) {
        throw new Error(`Vector ${vector} not found`);
      }
      const actualValue = transformField(data[fullVectorData.fieldName as keyof OSOResponseProps]);
      const currentValue = transformField(data[fullVectorData.fieldName as keyof OSOResponseProps]);
      const normalizer = normalizers[vector];

      // Apply the normalizer to equalize the vectors
      const scaledValue = currentValue && normalizer ? currentValue * normalizer : 0;
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
  return relevantData;
};

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
