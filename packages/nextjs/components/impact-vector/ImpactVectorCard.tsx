"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { ImpactVectors, Vector } from "~~/app/types/data";
import { useGlobalState } from "~~/services/store/store";

const ImpactVectorCard = ({ name, description, sourceName }: Vector) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isSelected, setIsSelected] = useState(false);
  const { selectedVectors, setSelectedVectors } = useGlobalState();

  // modal for vector info
  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleClose = () => {
    closeModal();
  };

  // Use the enter or escape key to close modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape" || e.key === "Enter") {
      closeModal();
    }
  };

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
      onClick={openModal}
      className="mr-1 cursor-pointer rounded-xl text-sm border-[0.2px] border-secondary-text/50 p-4 bg-base-300 flex flex-col justify-between gap-4 my-2"
    >
      <h2 className=" m-0 font-bold"> {name}</h2>
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

      <>
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="py-2 text-base">{description}</p>
            <div className="modal-action">
              <form method="dialog" className="w-full">
                <button
                  onClick={handleClose}
                  className="btn btn-sm btn-circle focus:border-none btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
                <button onClick={closeModal} className="btn btn-primary flex justify-center mx-auto font-light text-lg">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default ImpactVectorCard;
