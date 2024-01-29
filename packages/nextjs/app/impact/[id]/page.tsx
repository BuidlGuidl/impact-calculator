"use client";

import React from "react";
import Image from "next/image";
import { FaFile } from "react-icons/fa6";
import { IoMdOpen } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import * as solid from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon, HeartIcon } from "@heroicons/react/24/outline";
import ImpactVectorGraph from "~~/components/impact-vector/ImpactVectorGraph";

const ImpactDetailPage = () => {
  const [openLikedModal, setOpenLikedModal] = React.useState(false);
  const isLiked = true;
  return (
    <section className="max-w-[1500px] mx-auto p-5 flex flex-col b-md:flex-row gap-10">
      <div className="grid gap-4 ">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl leading-8 ">Impact Vector</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-6 h-6">
                <Image src="/assets/image/Img.png" className="w-full" alt="impact vector" width={24} height={24} />
              </div>
              <p className="font-semibold text-sm">vercoolperson</p>
            </div>
          </div>
          <div className=" grid grid-flow-col gap-4 w-fit  sm:justify-end relative">
            <div className=" flex items-center gap-1 rounded-xl p-4 border-[1px] border-[#CBD5E0]">
              <span>2</span>
              {isLiked ? (
                <solid.HeartIcon className="w-6 h-6 text-[#ff0000] " />
              ) : (
                <HeartIcon className="w-6 h-6  text-[#68778D]" />
              )}
            </div>
            <button
              onClick={() => {
                setOpenLikedModal(!openLikedModal);
              }}
              className={` ${
                openLikedModal && "bg-gray-200"
              }  flex items-center rounded-xl p-4 border-[1px] border-[#CBD5E0]`}
            >
              <solid.EllipsisHorizontalIcon className="w-6 h-6 " />
            </button>
            {openLikedModal && (
              <div className="absolute  bg-secondary rounded-xl top-16 -right-16 sm:right-0 w-[200px] py-3 px-8  border-[1px] border-[#e5e8ed]">
                <button className="flex gap-4 items-center">
                  {isLiked ? (
                    <solid.HeartIcon className="w-6 h-6 text-[#ff0000] " />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-[#68778D]" />
                  )}
                  <p>{isLiked ? "Unlike" : "Like"}</p>
                </button>
                <button className="flex gap-4 items-center">
                  <solid.ArrowUturnRightIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Share</p>
                </button>
                <button className="flex gap-4 items-center">
                  <solid.FlagIcon className="w-6 h-6 text-[#68778D]" />
                  <p>Report</p>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-bold text-2xl leading-8 ">About</h2>
          <div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd.
            </p>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-bold text-2xl leading-8 ">Impact Evaluation</h2>
          <div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequasssd.
            </p>
          </div>

          <button className="flex items-center rounded-full  border border-neutral pr-3 pl-2 py-2 space-x-2">
            <span className="bg-gray-300 rounded-full p-1">
              <FaFile className="text-black" />
            </span>
            <span className="text-based ">Impact Evaluation</span>
            <IoMdOpen />
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-end">
          <IoCloseOutline className="cursor-pointer" size={30} />
        </div>
        <div className="mt-11 ">
          <ImpactVectorGraph />
        </div>
        <div className="mt-4 rounded-xl border py-[1.1rem] px-6">
          <div className="flex items-center justify-between">
            <div className=" flex-1 grid place-content-center ">
              <div>
                <p className="font-bold m-0 ">Impact Vector</p>
                <p className="text-sm m-0">@lattice</p>
              </div>
            </div>
            <div className="flex-1 text-end">
              <p>5,416 %</p>
            </div>
          </div>
          <div className="sm:min-w-[345px] flex mt-6 gap-3 justify-between">
            <button className="w-fit rounded-xl flex p-2 gap-2 items-center border">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span>Edit distribution</span>
            </button>
            <button className=" text-white w-fit rounded-xl flex gap-2 bg-primary hover:bg-red-600 p-4">
              <Image
                className="w-5 h-5"
                src="/assets/svg/folderPlusIcon.svg"
                alt="folder plus icon"
                width={24}
                height={24}
              />
              <span> Add to ballot</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactDetailPage;
