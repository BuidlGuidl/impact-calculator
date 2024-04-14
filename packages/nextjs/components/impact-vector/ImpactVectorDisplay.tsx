import { useState } from "react";
import ImpactVectorCard from "./ImpactVectorCard";
import { SearchBar } from "./SearchBar";
import { useFetch } from "usehooks-ts";
import { Vector } from "~~/app/types/data";

const ImpactVectorDisplay = () => {
  const { data: vectors } = useFetch<Vector[]>("/api/vectors");
  const [searchValue, setSearchValue] = useState("");
  const filteredVectors = vectors?.filter(it => it.name.includes(searchValue)) ?? [];
  return (
    <>
      <SearchBar value={searchValue} placeholder="Search Impact Vectors" onChange={txt => setSearchValue(txt)} />
      <div
        className="max-h-[700px] min-h-[70vh] overflow-y-auto
      scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
      >
        {filteredVectors.map((vector, index) => (
          <ImpactVectorCard key={index} vector={vector} />
        ))}
        {filteredVectors?.length == 0 ? <h2 className="text-center">No results</h2> : <></>}
      </div>
    </>
  );
};

export default ImpactVectorDisplay;
