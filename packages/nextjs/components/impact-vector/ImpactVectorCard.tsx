"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ImpactVectorCard = () => {
  //the route is hard coded for now
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/impact/1")}
      className="cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 flex flex-col justify-between gap-4"
    >
      <h2 className="pl-2  m-0 font-bold">Ecosystem users</h2>
      <div className="flex items-center">
        <div className="max-w-[19.18rem] text-base-content-100   ">
          <p className="m-0 p-0">
            This impact vector measures the growth and activity levels of users within the optimism ecosystem
          </p>
        </div>
        <div className=" w-full text-center">
          <button
            onClick={e => {
              e.stopPropagation();
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
      <p className=" text-base-content-100  m-0">@chatgpt</p>
    </div>
  );
};

export default ImpactVectorCard;
