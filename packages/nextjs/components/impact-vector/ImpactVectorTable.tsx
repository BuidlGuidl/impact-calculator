// ImpactVectorTable.tsx
import React from "react";
import { BsCheck } from "react-icons/bs";
import { FiArrowDown, FiArrowUp, FiEdit2, FiTrash2 } from "react-icons/fi";

const ImpactVectorTable = () => {
  const change = -4;

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead className="">
          <tr>
            <th scope="col" className=" w-8 py-3 px-4 ">
              <div className="flex items-center h-5"></div>
            </th>
            <th scope="col" className=" py-3 w-[20%]  text-start text-xs font-medium  ">
              Impact Vector
            </th>

            <th scope="col" className="px-6 py-3 w-[58%]  text-start text-xs font-medium  ">
              Percentage
            </th>
            <th scope="col" className=" py-3 w-[20%]  text-start  text-xs font-medium  ">
              6 mon
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 ">
          <tr>
            <td className="py-3 ">
              <div className="flex items-center cursor-pointer w-5 h-5 border   border-[#7F56D9] rounded-lg">
                <BsCheck size={24} className="text-[#7F56D9]" />
              </div>
            </td>

            <td className=" py-4 whitespace-nowrap text-sm flex flex-col   ">
              <span className="font-bold">Ecosystem Users</span>
              <span>vectorname</span>
            </td>
            <td className="bg-red-400  px-6  py-4 whitespace-nowrap text-sm ">
              <progress className="progress custom__progress  w-full" value={40} max={100}></progress>
              <span>40%</span>
            </td>
            <td className=" px-6 py-4 bg-slate-500 whitespace-nowrap text-end flex ">
              <div className=" ">
                <span
                  className={`text-sm p-1 rounded-xl gap-1 flex items-center font-semibold ${
                    change >= 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                  }`}
                >
                  {change >= 0 ? <FiArrowUp /> : <FiArrowDown />}
                  {Math.abs(change)}%
                </span>
              </div>
              <div className="flex gap-2 ">
                <button className=" ml-2">
                  <FiTrash2 />
                </button>
                <button className="">
                  <FiEdit2 />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ImpactVectorTable;
