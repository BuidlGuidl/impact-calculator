"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trim } from "lodash";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { ImpactVectors, Vector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorCard = ({ name, description, sourceName }: Vector) => {
  //the route is hard coded for now
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { selectedVectors, setSelectedVectors } = useGlobalState();

  const handleAddVector = (vectorName: keyof ImpactVectors) => {
    // Check if the vector is not already selected
    if (!selectedVectors.find(vector => vector.name === vectorName)) {
      const newSelectedVectors = [...selectedVectors, { name: vectorName, weight: 100 }];
      setSelectedVectors(newSelectedVectors);
    }
  };
  useEffect(() => {
    const selected = selectedVectors.find(vector => vector.name === name);
    setIsSelected(selected ? true : false);
  }, [selectedVectors, name]);

  return (
    <div
      onClick={() => router.push("/impact/1")}
      className="mr-1 cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 flex flex-col justify-between gap-4 my-2"
    >
      <h2 className=" m-0 font-bold"> {trim(name.split(":")[1])}</h2>
      <div className="flex items-center justify-between">
        <div className=" text-base-content-100 max-w-sm pr-4">
          <p className="m-0 p-0">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
        </div>
        {isSelected ? (
          <button onClick={e => e.stopPropagation()} className=" p-4 border-2 border-gray-300 rounded-lg">
            <HiMiniCheckBadge size={24} className="text-OPred w-5 h-5" />
          </button>
        ) : (
          <div className="">
            <button
              disabled={isSelected}
              onClick={e => {
                e.stopPropagation();
                handleAddVector(name);
              }}
              className="rounded-xl border-2 border-primary bg-primary hover:bg-red-600 p-4"
            >
              <Image
                className="w-5 h-5"
                src="assets/svg/folderPlusIcon.svg"
                alt="folder plus icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        )}
      </div>
      <p className=" text-base-content-100  m-0">@{sourceName}</p>
    </div>
  );
};

export default ImpactVectorCard;
