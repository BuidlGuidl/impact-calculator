import { useState } from "react";
import ImpactVectorCard from "./ImpactVectorCard";
import { SearchBar } from "./SearchBar";
import { useFetch } from "usehooks-ts";
import { Vector } from "~~/app/types/data";

const ImpactVectorDisplay = () => {
  const { data: vectors } = useFetch<Vector[]>("/api/vectors");
  const [searchValue, setSearchValue] = useState("");
  const filteredVectors = vectors?.filter(it => it.name.toLowerCase().includes(searchValue.toLowerCase())) ?? [];
  const filteredOnDescription =
    vectors?.filter(it => it.description.toLowerCase().includes(searchValue.toLowerCase())) ?? [];
  const filteredVectorsWithoutDuplicates = [...new Set([...filteredVectors, ...filteredOnDescription])];
  return (
    <>
      <SearchBar value={searchValue} placeholder="Search Impact Vectors" onChange={txt => setSearchValue(txt)} />
      <div
        className="max-h-[700px] min-h-[70vh] overflow-y-auto
      scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
      >
        {filteredVectorsWithoutDuplicates.map((vector, index) => (
          <ImpactVectorCard key={index} vector={vector} />
        ))}
        {filteredVectorsWithoutDuplicates?.length == 0 ? <h2 className="text-center">No results</h2> : <></>}
      </div>
    </>
  );
};

export default ImpactVectorDisplay;
