"use client";

import { useEffect, useState } from "react";
import { DataSet } from "./types/data";
import { debounce } from "lodash";
import type { NextPage } from "next";
import ImpactVectorDisplay from "~~/components/impact-vector/ImpactVectorDisplay";
import ImpactVectorGraph from "~~/components/impact-vector/ImpactVectorGraph";
import ImpactVectorTable from "~~/components/impact-vector/ImpactVectorTable";
import { SearchBar } from "~~/components/impact-vector/SearchBar";
import { useGlobalState } from "~~/services/store/store";

const Home: NextPage = () => {
  const { selectedVectors, setSelectedVectors } = useGlobalState();
  const [impactData, setImpactData] = useState<DataSet[]>([]);

  useEffect(() => {
    // Initialize selected vector
    setSelectedVectors([{ name: "OSO: Total Onchain Users", weight: 100 }]);
  }, [setSelectedVectors]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there are any selected vectors
        if (selectedVectors.length === 0) {
          return;
        }

        // Check if all selected vectors have valid names and weights
        const isValidSelection = selectedVectors.every(
          (vector: { name: string; weight: number }) => vector.name.trim() !== "" && !isNaN(vector.weight),
        );

        if (!isValidSelection) {
          return;
        }

        const queryString = selectedVectors
          .map(vector => `vector=${encodeURIComponent(vector.name)}&weight=${vector.weight}`)
          .join("&");

        const apiUrl = `/api/impact?${queryString}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: DataSet[] = await response.json();
        setImpactData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const debouncedFetchData = debounce(fetchData, 300);
    debouncedFetchData();
  }, [selectedVectors]);

  return (
    <main className="max-w-[1700px] mx-0 w-full flex flex-col b-md:flex-row p-3">
      <div className="w-full b-md:w-[60rem]">
        <h2 className="text-center">Impact Calculator 🌱</h2>
        <div className="flex w-full h-1/2">{impactData.length > 0 && <ImpactVectorGraph data={impactData} />}</div>
        {/* still a work in progress */}
        <div className="m-auto lg:mr-6">
          <ImpactVectorTable />
        </div>
      </div>

      <div className="max-h-[100dvh] overflow-hidden b-md:max-w-[28rem] w-full rounded-3xl border grid gap-2 mx-auto">
        <div className="rounded-xl grid text-base grid-cols-2 bg-base-300 p-1">
          <button className={` bg-base-100 py-1 rounded-xl text-center w-full`}>Impact Vectors</button>
          <button className={`py-1 text-customGray rounded-xl text-center w-full bg-[#f2f4f9]`}>Lists</button>
        </div>
        <SearchBar />
        <ImpactVectorDisplay />
      </div>
    </main>
  );
};

export default Home;
