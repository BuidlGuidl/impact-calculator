"use client";

import { useEffect, useState } from "react";
import { DataSet, SelectedVector } from "./types/data";
import { debounce } from "lodash";
import type { NextPage } from "next";
import ImpactVectorDisplay from "~~/components/impact-vector/ImpactVectorDisplay";
import ImpactVectorGraph from "~~/components/impact-vector/ImpactVectorGraph";
import ImpactVectorLists from "~~/components/impact-vector/ImpactVectorLists";
import ImpactVectorTable from "~~/components/impact-vector/ImpactVectorTable";
import { useGlobalState } from "~~/services/store/store";

const Home: NextPage = () => {
  const { selectedVectors, setSelectedVectors } = useGlobalState();
  const { hardCapPct, setHardCapPct } = useGlobalState();
  const [impactData, setImpactData] = useState<DataSet[]>([]);
  const [isVectors, setIsVectors] = useState<boolean>(true);
  const [fullGraph, setFullGraph] = useState<boolean>(false);
  const [projectsShown, setProjectsShown] = useState(20);
  useEffect(() => {
    // Initialize selected vector
    setSelectedVectors([{ name: "Total Onchain Users", weight: 100, dataType: "number", filters: [] }]);
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

        let queryString = selectedVectors
          .map(vector => `vector=${encodeURIComponent(vector.name)}&weight=${vector.weight}`)
          .join("&");

        if (hardCapPct) {
          queryString += `&hardCapPct=${hardCapPct}`;
        }

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
  }, [selectedVectors, hardCapPct]);

  return (
    <main className={`w-full flex flex-col relative`}>
      <div
        className={`${
          fullGraph ? "w-full" : "lg:w-[50%] xl:w-[58%] 2xl:w-[64%] 3xl:w-[70%]"
        } duration-500 ease-in-out transition-all`}
      >
        <div
          className="flex w-full h-[50vh] overflow"
          onWheel={e => {
            const isDown = e.deltaY < 0;
            if ((isDown && projectsShown <= 10) || (!isDown && projectsShown >= impactData.length)) {
              return;
            }
            setProjectsShown(current => current + (isDown ? -10 : 10));
          }}
        >
          {impactData.length > 0 && (
            <ImpactVectorGraph
              data={impactData}
              projectsShown={projectsShown}
              fullGraph={fullGraph}
              setFullGraph={setFullGraph}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <span>
          Cap allocation at{" "}
          <input
            className="w-10 text-right"
            type="number"
            min="3"
            max="15"
            step="0.25"
            value={hardCapPct}
            onChange={event => {
              setHardCapPct(Number(event.target.value));
            }}
          />
          % of total
        </span>
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
          } transition-all overflow-hidden b-md:max-w-[34rem] rounded-3xl p-6 border grid gap-6 mx-auto duration-1000 ease-in-out h-[90vh]`}
        >
          <div className="rounded-xl grid grid-cols-2 bg-base-300 p-1">
            <button
              onClick={() => setIsVectors(true)}
              className={` ${
                isVectors ? "bg-base-100" : "bg-[#f2f4f9]"
              } font-semibold  py-3 text- rounded-xl text-center w-full`}
            >
              Impact Vectors
            </button>
            <button
              onClick={() => setIsVectors(false)}
              className={`${
                !isVectors ? "bg-base-100" : "bg-[#f2f4f9]"
              } py-3 text-customGray rounded-xl text-center w-full `}
            >
              Lists
            </button>
          </div>
          {isVectors ? <ImpactVectorDisplay /> : <ImpactVectorLists />}
        </div>
      </div>
    </main>
  );
};

export default Home;
