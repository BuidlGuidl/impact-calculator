"use client";

import React, { useState } from "react";
import CustomXAxis from "./CustomXAxis";
import { scaleSymlog } from "d3-scale";
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataSet, ImpactVectors } from "~~/app/types/data";

const logScale = scaleSymlog();

const NON_VECTOR_KEYS = ["image", "name", "profile", "opAllocation"];

const COLOR_CLASS_BY_VECTOR: { [key in keyof ImpactVectors]: string } = {
  "OSO: # GitHub Repos": "text-[#ff0000]",
  "OSO: Date First Commit": "text-[#00ff00]",
  "OSO: Total Stars": "text-[#0000ff]",
  "OSO: Total Forks": "text-[#ffff00]",
  "OSO: Total Contributors": "text-[#ff00ff]",
  "OSO: Contributors Last 6 Months": "text-[#00ffff]",
  "OSO: Avg Monthly Active Devs Last 6 Months": "text-[#ff8000]",
  "OSO: # OP Contracts": "text-[#8000ff]",
  "OSO: Date First Txn": "text-[#00ff80]",
  "OSO: Total Onchain Users": "text-[#ff0080]",
  "OSO: Onchain Users Last 6 Months": "text-[#80ff00]",
  "OSO: Total Txns": "text-[#0080ff]",
  "OSO: Total Txn Fees (ETH)": "text-[#ff0080]",
  "OSO: Txn Fees Last 6 Months (ETH)": "text-[#ff80ff]",
  "OSO: # NPM Packages": "text-[#80ff80]",
  "OSO: Date First Download": "text-[#8080ff]",
  "OSO: Total Downloads": "text-[#ffff80]",
  "OSO: Downloads Last 6 Months": "text-[#80ffff]",
};
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

export default function ImpactVectorGraph({ data }: { data: DataSet[] }) {
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

  console.log({ transformedData });
  return (
    <div className="flex flex-col w-full">
      {transformedData.length > 0 && (
        <div className="items-center text-xs justify-end flex">
          <button onClick={() => setShowVectors(!showVectors)}>{showVectors ? "Hide Vectors" : "Show Vectors"}</button>
          <button className="px-3" onClick={() => setIsLogarithmic(!isLogarithmic)}>
            {isLogarithmic ? "Linear" : "Logarithmic"}
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
                    <p>
                      <span className=" text-red-500 font-semibold">OP Allocation:</span> {data.opAllocation}
                    </p>
                    {Object.keys(data)
                      .filter(key => key.endsWith("_actual"))
                      .map(key => {
                        const value = data[key];
                        const formattedValue = !isNaN(value || "string")
                          ? Math.floor(parseFloat(value)) || "none"
                          : value || "none";
                        const label = key.replace(/^OSO:/, "").replace("_actual", "");
                        return (
                          <p key={key}>
                            <span className={COLOR_CLASS_BY_VECTOR[key.replace("_actual", "") as keyof ImpactVectors]}>
                              {label}:{" "}
                            </span>
                            {`${formattedValue}`}
                          </p>
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
              .map(key => {
                console.log({ key });
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={COLOR_CLASS_BY_VECTOR[key as keyof ImpactVectors]?.match(/#[0-9A-Fa-f]{6}/)?.[0]}
                    stackId={1}
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
