import React from "react";
import FilterModal from "../FilterModal";
import { IoArrowDownSharp } from "react-icons/io5";
import { IoArrowUpSharp } from "react-icons/io5";
import { SelectedVector } from "~~/app/types/data";

interface Props {
  sortBy?: string;
  sortDesc: boolean;
  setSortBy: (newSortBy?: keyof SelectedVector) => void;
  setSortDesc: (newSortDesc: boolean) => void;
}

const ImpactTableHeader = ({ sortDesc, setSortDesc, sortBy, setSortBy }: Props) => {
  const getClickHandler = (headerKey: keyof SelectedVector) => () => {
    if (sortBy !== headerKey) setSortBy(headerKey);
    else setSortDesc(!sortDesc);
  };

  return (
    <>
      <tr>
        <th scope="col" className="pb-1 w-[20%] text-start text-xs font-medium">
          <div className="flex items-center gap-1">
            <span className="cursor-pointer" onClick={getClickHandler("name")}>
              Impact Vector
            </span>
            {sortBy === "name" && (sortDesc ? <IoArrowDownSharp /> : <IoArrowUpSharp />)}
          </div>
        </th>

        <th scope="col" className="px-3 lg:px-6 pb-1 w-[75%] text-start text-xs font-medium">
          <div className="flex items-center gap-1">
            <span className="cursor-pointer" onClick={getClickHandler("weight")}>
              Weight
            </span>
            {sortBy === "weight" && (sortDesc ? <IoArrowDownSharp /> : <IoArrowUpSharp />)}
          </div>
        </th>
        <th className="pb-1">
          <FilterModal />
        </th>
      </tr>
    </>
  );
};

export default ImpactTableHeader;
