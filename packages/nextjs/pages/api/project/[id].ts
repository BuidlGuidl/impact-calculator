import csv from "csv-parser";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const projectsFilePath = path.join(process.cwd(), "public", "data/RetroPGF3Results.csv");

interface Project {
  Project_ID: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { id } = req.query;

  try {
    const project = await getProjectById(String(id));

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getProjectById(id: string) {
  return new Promise((resolve, reject) => {
    const projects: Project[] = [];

    fs.createReadStream(projectsFilePath)
      .pipe(csv())
      .on("data", row => {
        projects.push(row);
      })
      .on("end", () => {
        const project = projects.find(p => p.Project_ID === id);
        if (project) {
          resolve(project);
        } else {
          resolve(null);
        }
      })
      .on("error", error => {
        reject(error);
      });
  });
}
