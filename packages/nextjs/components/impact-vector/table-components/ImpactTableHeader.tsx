import React from "react";

const ImpactTableHeader = () => {
  return (
    <>
      <tr>
        <th scope="col" className=" w-8 py-3 px-2 md:px-4 ">
          <div className="flex items-center h-5"></div>
        </th>
        <th scope="col" className=" py-3 w-[20%]  text-start text-xs font-medium  ">
          Impact Vector
        </th>

        <th scope="col" className="px-3 lg:px-6  py-3 w-[75%]  text-start text-xs font-medium  ">
          Percentage
        </th>
        <th scope="col" className="pl-6 py-3 w-[10%]  text-start  text-xs font-medium  "></th>
      </tr>
    </>
  );
};

export default ImpactTableHeader;
