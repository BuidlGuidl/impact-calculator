import type { NextPage } from "next";
import ImpactVectorCard from "~~/components/impact-vector/ImpactVectorCard";
import ImpactVectorGraph from "~~/components/impact-vector/ImpactVectorGraph";
import { SearchBar } from "~~/components/impact-vector/SearchBar";

const Home: NextPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto w-full flex flex-col b-md:flex-row p-2">
      <div className="w-full min-w-[55%]">
        <h2 className="text-center">Impact Calculator 🌱</h2>
        <div className="">
          <ImpactVectorGraph />
        </div>
        {/* still a work in progress */}
        {/* <div className="mt-4">
          <ImpactVectorTable />
        </div> */}
      </div>

      <div className="max-h-[100dvh] overflow-hidden b-md:max-w-[34rem] w-full rounded-3xl p-6 border grid gap-6 ">
        <div className="rounded-xl grid grid-cols-2 bg-base-300 p-1">
          <button className={` bg-base-100 font-bold  py-3 text- rounded-xl text-center w-full`}>Impact Vectors</button>
          <button className={`py-3 text-customGray rounded-xl text-center w-full`}>List</button>
        </div>
        <SearchBar />
        <div
          className="max-h-[700px] overflow-y-auto
    scrollbar-none "
        >
          {/* this is hard coded for now */}
          <ImpactVectorCard />
          <ImpactVectorCard />
          <ImpactVectorCard />
          <ImpactVectorCard />
        </div>
      </div>
    </main>
  );
};

export default Home;
