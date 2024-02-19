"use client";

import React, { useState } from "react";
import CustomXAxis from "./CustomXAxis";
import {
  Line,
  LineChart, // Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { DataSet, ImpactVectors } from "~~/app/types/data";

const transformData = (impactData: DataSet[]): any[] => {
  return impactData.map(item => {
    const dataKeys = Object.keys(item.data) as (keyof ImpactVectors)[];
    const transformedItem: any = {
      image: item.metadata["Meta: Project Image"],
      name: item.metadata["Meta: Project Name"],
      Rank: Math.floor(item.rank),
    };

    dataKeys.forEach(key => {
      transformedItem[`${key}_normalized`] = item.data[key]?.normalized;
      transformedItem[`${key}_actual`] = item.data[key]?.actual;
    });

    return transformedItem;
  });
};

// Function to sort array in descending order based on rank
const sortByTotalDescending = (dataSetArray: any[]) => {
  return dataSetArray.slice().sort((a, b) => b.rank - a.rank);
};

export default function ImpactVectorGraph({ data }: { data: DataSet[] }) {
  const [showVectors, setShowVectors] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const transformedData = transformData(sortByTotalDescending(data));

  const handleMouseMove = (e: any) => {
    const { value } = e;
    if (hoveredProject !== value) {
      setHoveredProject(value);
    }
  };

  // color array for vector lines
  const vectorColors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#ffa500",
    "#008000",
    "#800080",
    "#000080",
  ];

  return (
    <div className="flex flex-col w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={transformedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 40,
          }}
          onMouseMove={e => {
            const { activePayload } = e;
            if (activePayload && activePayload.length > 0) {
              const hoveredProjectName = activePayload[0].payload.name;
              if (hoveredProject !== hoveredProjectName) {
                setHoveredProject(hoveredProjectName);
              }
            } else {
              setHoveredProject(null);
            }
          }}
        >
          <XAxis
            dataKey="name"
            onMouseMove={handleMouseMove}
            axisLine={false}
            tickLine={false}
            tick={
              <CustomXAxis
                payload
                image={hoveredProject ? transformedData.find(item => item.name === hoveredProject)?.image : null}
                hovered={hoveredProject && hoveredProject}
                x={0}
                y={0}
              />
            }
            interval={0}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="w-fit h-fit space-y-2 p-4 pt-1 text-sm bg-base-100">
                    <p>{`Name: ${data.name}`}</p>
                    <p className=" text-red-500 font-semibold">{`Rank: ${data.Rank}`}</p>
                    {Object.keys(data)
                      .filter(key => key.endsWith("_actual"))
                      .map(key => {
                        const value = data[key];
                        const formattedValue = !isNaN(value) ? Math.floor(parseFloat(value)) : value;
                        return (
                          <p key={key}>{`${key.replace(/^OSO:/, "").replace("_actual", "")}: ${formattedValue}`}</p>
                        );
                      })}
                  </div>
                );
              }
              return null;
            }}
          />

          <Line type="monotone" dataKey="Rank" stroke="red" dot={false} strokeWidth={3} />

          {showVectors &&
            transformedData[0] &&
            Object.keys(transformedData[0]).map((key, index) => {
              if (key !== "image" && key !== "name" && key !== "Rank" && !key.includes("_actual")) {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={vectorColors[index % vectorColors.length]}
                    dot={false}
                    strokeWidth={1}
                  />
                );
              }
              return null;
            })}
        </LineChart>
      </ResponsiveContainer>

      {transformedData.length > 0 && (
        <div className="items-center text-xs justify-end flex">
          <button onClick={() => setShowVectors(!showVectors)}>{showVectors ? "Hide Vectors" : "Show Vectors"}</button>
        </div>
      )}
    </div>
  );
}
