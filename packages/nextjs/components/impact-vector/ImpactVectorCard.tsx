"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trim } from "lodash";
import { useGlobalState } from "~~/services/store/store";

interface ImpactVectorCardProps {
  name: string;
  description: string;
  username: string;
}
const ImpactVectorCard = ({ name, description, username }: ImpactVectorCardProps) => {
  //the route is hard coded for now
  const router = useRouter();
  const { selectedVectors, setSelectedVectors } = useGlobalState();

  const handleAddVector = (vectorName: string) => {
    // Check if the vector is not already selected
    if (!selectedVectors.find(vector => vector.name === vectorName)) {
      const newSelectedVectors = [...selectedVectors, { name: vectorName, weight: 100 }];
      setSelectedVectors(newSelectedVectors);
    }
  };

  return (
    <div
      onClick={() => router.push("/impact/1")}
      className="cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 flex flex-col justify-between gap-4 my-2"
    >
      <h2 className=" m-0 font-bold"> {trim(name.split(":")[1])}</h2>
      <div className="flex items-center justify-between">
        <div className=" text-base-content-100   ">
          <p className="m-0 p-0">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
        </div>
        <div className="">
          <button
            onClick={e => {
              e.stopPropagation();
              handleAddVector(name);
            }}
            className="rounded-xl bg-primary hover:bg-red-600 p-4"
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
      </div>
      <p className=" text-base-content-100  m-0">@{username}</p>
    </div>
  );
};

export default ImpactVectorCard;
