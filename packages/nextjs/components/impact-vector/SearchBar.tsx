import React from "react";

export const SearchBar = () => {
  return (
    <div className="relative">
      <input
        className="input input-info input-bordered bg-secondary focus:outline-none border pl-10 border-neutral hover:border-gray-400  rounded-xl w-full p-3 text-neutral-500 leading-tight  "
        id="username"
        type="text"
        placeholder="Search Impact Vectors"
      />

      <div className="absolute left-0 inset-y-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-3 text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};
