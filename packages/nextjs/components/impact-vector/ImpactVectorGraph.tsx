"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import CustomXAxis from "./CustomXAxis";
import { scaleSymlog } from "d3-scale";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataSet, ImpactVectors } from "~~/app/types/data";

const logScale = scaleSymlog();

const NON_VECTOR_KEYS = ["image", "name", "profile", "opAllocation"];
const VECTOR_COLORS = [
  "text-[#ffa500]",
  "text-[#00ff00]",
  "text-[#0000ff]",
  "text-[#ffff00]",
  "text-[#00ffff]",
  "text-[#008000]",
  "text-[#ff00ff]",
  "text-[#800080]",
  "text-[#000080]",
];
const shouldRenderAsVector = (key: string) =>
  !key.includes("_actual") && !key.includes("_normalized") && !NON_VECTOR_KEYS.includes(key);

const transformData = (impactData: DataSet[]): any[] => {
  return impactData.map(vectorDataSet => {
    const dataKeys = Object.keys(vectorDataSet.data) as (keyof ImpactVectors)[];
    const transformedItem: any = {
      image: vectorDataSet.metadata["Meta: Project Image"],
      name: vectorDataSet.metadata["Meta: Project Name"],
      profile: `${vectorDataSet.metadata["Meta: Project Name"]}===${vectorDataSet.metadata["Meta: Project Image"]}`,
      opAllocation: Math.floor(vectorDataSet.opAllocation),
    };

    // calculate each vectors portion of total OP allocated
    const totalNormalized = dataKeys.reduce((total, key) => total + (vectorDataSet.data[key]?.normalized || 0), 0);

    dataKeys.forEach(key => {
      const normalizedValue = vectorDataSet.data[key]?.normalized;
      if (normalizedValue) {
        const percentageOfOp = normalizedValue / totalNormalized;
        const amountOPDueToVector = vectorDataSet.opAllocation * percentageOfOp;

        transformedItem[`${key}_normalized`] = normalizedValue;
        transformedItem[`${key}_actual`] = vectorDataSet.data[key]?.actual;
        transformedItem[`${key}`] = amountOPDueToVector;
      }
    });

    return transformedItem;
  });
};

// Function to sort array in descending order based on opAllocation
const sortByTotalDescending = (dataSetArray: any[]) => {
  return dataSetArray.slice().sort((a, b) => b.opAllocation - a.opAllocation);
};

export default function ImpactVectorGraph({
  data,
  fullGraph,
  setFullGraph,
}: {
  data: DataSet[];
  fullGraph: boolean;
  setFullGraph: Dispatch<SetStateAction<boolean>>;
}) {
  const [showVectors, setShowVectors] = useState(false);
  const [isLogarithmic, setIsLogarithmic] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const transformedData = transformData(sortByTotalDescending(data));

  const handleMouseMove = (e: any) => {
    const { value } = e;
    if (hoveredProject !== value) {
      setHoveredProject(value);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {transformedData.length > 0 && (
        <div className="items-center text-xs justify-end flex">
          <button onClick={() => setShowVectors(!showVectors)}>{showVectors ? "Hide Vectors" : "Show Vectors"}</button>
          <button className="px-3" onClick={() => setIsLogarithmic(!isLogarithmic)}>
            {isLogarithmic ? "Linear" : "Logarithmic"}
          </button>
          <button onClick={() => setFullGraph(!fullGraph)} className="hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="5-4 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </button>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text-xs opacity-50"
            tickMargin={10}
            scale={isLogarithmic ? logScale : "linear"}
            domain={["auto", "auto"]}
            allowDataOverflow
          />
          <XAxis
            dataKey="profile"
            onMouseMove={handleMouseMove}
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxis x={0} y={0} hovered={hoveredProject} />}
            interval={0}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="w-fit h-fit space-y-2 p-4 pt-1 text-sm bg-base-100">
                    <p>{`${data.name}`}</p>
                    <p className=" text-red-500 font-semibold">{`OP Allocation: ${data.opAllocation}`}</p>
                    {Object.keys(data)
                      .filter(key => key.endsWith("_actual"))
                      .map((key, i) => {
                        const value = data[key];
                        const formattedValue = !isNaN(value || "string")
                          ? Math.floor(parseFloat(value)) || "none"
                          : value || "none";
                        return (
                          <p className={VECTOR_COLORS[i]} key={key}>{`${key
                            .replace(/^OSO:/, "")
                            .replace("_actual", "")}: ${formattedValue}`}</p>
                        );
                      })}
                  </div>
                );
              }
              return null;
            }}
          />

          {showVectors &&
            transformedData[0] &&
            Object.keys(transformedData[0])
              .filter(shouldRenderAsVector)
              .map((key, index) => {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={VECTOR_COLORS[index].match(/#[0-9A-Fa-f]{6}/)?.[0]}
                    dot={false}
                    strokeWidth={1}
                  />
                );
              })}
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="1" x2="0" y2="0">
              <stop offset="5%" stopColor="rgba(20, 124, 73, 0.1)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FBDD5D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid y={3000000} strokeDasharray="2" />
          <Area
            type="monotone"
            dataKey="opAllocation"
            stroke="#F00420"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="OP Allocation"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
