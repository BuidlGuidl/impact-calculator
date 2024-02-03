// ImpactVectorTable.tsx
import React from "react";
import { BsCheck } from "react-icons/bs";
import { FiArrowDown, FiArrowUp, FiEdit2, FiTrash2 } from "react-icons/fi";

const ImpactVectorTable = () => {
  // this will be changed to the actual data from the API and tanstack table will be used
  const change = -4;
  const isChecked = true;

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <tr>
            <th scope="col" className=" w-8 py-3 px-2 md:px-4 ">
              <div className="flex items-center h-5"></div>
            </th>
            <th scope="col" className=" py-3 w-[20%]  text-start text-xs font-medium  ">
              Impact Vector
            </th>

            <th scope="col" className="px-3 lg:px-6  py-3 w-[58%]  text-start text-xs font-medium  ">
              Percentage
            </th>
            <th scope="col" className="pl-6 py-3 w-[20%]  text-start  text-xs font-medium  ">
              6 month
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          <tr>
            <td className="px-2 md:px-4 py-2 sm:py-3 ">
              <div className="flex items-center cursor-pointer w-5 h-5 border   border-[#7F56D9] rounded-lg">
                {isChecked && <BsCheck size={24} className="text-[#7F56D9]" />}
              </div>
            </td>

            <td className="  py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm  ">
              <div className="flex flex-col  ">
                <span className="font-semibold">Ecosystem Users</span>
                <span>vectorname</span>
              </div>
            </td>
            <td className="  px-3 lg:px-6  py-2 sm:py-4 whitespace-nowrap text-sm ">
              <div className="flex items-center justify-between gap-2">
                <progress className="progress custom__progress  max-w-[90%] w-full" value={40} max={100}></progress>
                <span className="">40%</span>
              </div>
            </td>
            <td className=" pr-2 lg:pr-6  py-2 sm:py-4  whitespace-nowrap ">
              <div className="  grid gap-2 items-center justify-between grid-flow-col">
                <div className=" ">
                  <p
                    className={`px-1 py-[2px] lg:px-2 lg:py-1 rounded-2xl gap-1 text-xs flex items-center font-medium ${
                      change >= 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                    }`}
                  >
                    {change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
                    {Math.abs(change)}%
                  </p>
                </div>
                <div className="flex gap-1 sm:gap-3 ">
                  <button className="   w-[20px]">
                    <FiTrash2 size={20} />
                  </button>
                  <button className="">
                    <FiEdit2 size={20} />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ImpactVectorTable;
