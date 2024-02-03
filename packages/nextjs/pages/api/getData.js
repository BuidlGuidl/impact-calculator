import fs from "fs";
import csv from "csv-parser";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    const project = await getProjectById(id);

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

async function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const projects = [];

    fs.createReadStream(projectsFilePath)
      .pipe(csv())
      .on("data", row => {
        projects.push(row);
      })
      .on("end", () => {
        const project = projects.find(p => p.id === id);

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
