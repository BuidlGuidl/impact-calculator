import React from "react";
import { HeaderKey } from "../ImpactVectorTable";
import { IoArrowDownSharp } from "react-icons/io5";
import { IoArrowUpSharp } from "react-icons/io5";

interface Props {
  sortBy?: string;
  sortDesc: boolean;
  setSortBy: (newSortBy?: HeaderKey) => void;
  setSortDesc: (newSortDesc: boolean) => void;
}

const ImpactTableHeader = ({ sortDesc, setSortDesc, sortBy, setSortBy }: Props) => {
  const getClickHandler = (headerKey: HeaderKey) => () => {
    if (sortBy !== headerKey) setSortBy(headerKey);
    else setSortDesc(!sortDesc);
  };

  return (
    <>
      <tr>
        <th scope="col" className=" py-3  w-[20%]  text-start text-xs font-medium  ">
          <div className="flex items-center gap-1">
            <span className="cursor-pointer" onClick={getClickHandler("name")}>
              Impact Vector
            </span>
            {sortBy === "name" && (sortDesc ? <IoArrowDownSharp /> : <IoArrowUpSharp />)}
          </div>
        </th>

        <th scope="col" className=" px-3 lg:px-6  py-3 w-[75%]  text-start text-xs font-medium  ">
          <div className="flex items-center gap-1">
            <span className="cursor-pointer" onClick={getClickHandler("weight")}>
              Percentage
            </span>
            {sortBy === "weight" && (sortDesc ? <IoArrowDownSharp /> : <IoArrowUpSharp />)}
          </div>
        </th>
        <th scope="col" className="pl-6 py-3 w-[10%]  text-start  text-xs font-medium  "></th>
      </tr>
    </>
  );
};

export default ImpactTableHeader;
