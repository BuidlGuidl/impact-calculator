"use client";

import { useEffect, useState } from "react";
import { DataSet, SelectedVector } from "./types/data";
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
  const [fullGraph, setFullGraph] = useState<boolean>(false);

  useEffect(() => {
    // Initialize selected vector
    setSelectedVectors([{ name: "Total Onchain Users", weight: 100 }]);
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
          (vector: SelectedVector) => vector.name.trim() !== "" && !isNaN(vector.weight),
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
    <main className={`w-full flex flex-col gap-6 sm:gap-10 p-3 ${!fullGraph && "lg:mb-[22rem]"} relative`}>
      <div
        className={`${
          fullGraph ? "w-full" : "lg:w-[50%] xl:w-[58%] 2xl:w-[64%] 3xl:w-[70%]"
        } duration-500 ease-in-out h-[60vh] transition-all`}
      >
        <div className="flex w-full h-[60vh]">
          {impactData.length > 0 && (
            <ImpactVectorGraph data={impactData} fullGraph={fullGraph} setFullGraph={setFullGraph} />
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div
          className={`lg:mx-5 ${
            fullGraph ? "flex-1" : "lg:w-[50%] xl:w-[58%] 2xl:w-[64%] 3xl:w-[70%]"
          } w-full lg:mt-0 mt-6`}
        >
          <ImpactVectorTable />
        </div>
        <div
          className={`b-md:w-[34rem] w-full ${
            fullGraph ? "lg:relative mt-0" : "lg:absolute lg:top-0 lg:right-0"
          } transition-all overflow-hidden h-auto b-md:max-w-[34rem] rounded-3xl p-6 border grid gap-6 mx-auto duration-1000 ease-in-out`}
        >
          <div className="rounded-xl grid grid-cols-2 bg-base-300 p-1">
            <button className={` bg-base-100 font-semibold  py-3 text- rounded-xl text-center w-full`}>
              Impact Vectors
            </button>
            <button className={`py-3 text-customGray rounded-xl text-center w-full bg-[#f2f4f9]`}>Lists</button>
          </div>
          <SearchBar />
          <ImpactVectorDisplay />
        </div>
      </div>
    </main>
  );
};

export default Home;
