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
      total: Math.floor(item.total),
    };

    dataKeys.forEach(key => {
      transformedItem[key] = item.data[key];
    });

    return transformedItem;
  });
};

// Function to sort array in descending order based on 'total'
const sortByTotalDescending = (dataSetArray: any[]) => {
  return dataSetArray.slice().sort((a, b) => b.total - a.total);
};

export default function ImpactVectorGraph({ data }: { data: DataSet[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [showVectors, setShowVectors] = useState(false);
  const projectsPerPage = 10;

  const transformedData = transformData(sortByTotalDescending(data));

  const totalProjects = transformedData.length;

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const visibleData = transformedData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={visibleData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxis payload x={0} y={0} />}
            interval={0}
          />
          <Tooltip />
          {/* <Legend /> */}

          {/* Total line */}
          <Line type="monotone" dataKey="total" stroke="red" dot={false} strokeWidth={3} />

          {/* Lines for other vectors */}
          {showVectors &&
            visibleData[0] &&
            Object.keys(visibleData[0]).map(key => {
              if (key !== "image" && key !== "name" && key !== "total") {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
                    dot={false}
                    strokeWidth={1}
                  />
                );
              }
              return null;
            })}
        </LineChart>
      </ResponsiveContainer>

      {/* controls */}
      {visibleData.length > 0 && (
        <div className="items-center justify-end flex">
          {/* Toggle button to show all vectors */}
          <button onClick={() => setShowVectors(!showVectors)}>{showVectors ? "Hide Vectors" : "Show Vectors"}</button>
          {/* Pagination */}
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
