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
  const [showVectors, setShowVectors] = useState(false);
  const transformedData = transformData(sortByTotalDescending(data));

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
        >
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomXAxis x={0} y={0} />} interval={0} />
          <Tooltip />

          <Line type="monotone" dataKey="total" stroke="red" dot={false} strokeWidth={3} />

          {showVectors &&
            transformedData[0] &&
            Object.keys(transformedData[0]).map(key => {
              if (key !== "image" && key !== "name" && key !== "total") {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
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
