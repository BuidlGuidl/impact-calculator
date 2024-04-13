import { useState } from "react";
import ImpactVectorListCard from "./ImpactVectorListCard";
import { SearchBar } from "./SearchBar";
import { useFetch } from "usehooks-ts";
import { VectorList } from "~~/app/types/data";

const ImpactvectorLists = () => {
  const { data: vectorLists } = useFetch<VectorList[]>("/api/lists");
  const [searchValue, setSearchValue] = useState("");
  const filteredVectors = vectorLists?.filter(it => it.title.includes(searchValue)) ?? [];
  return (
    <>
      <SearchBar value={searchValue} placeholder="Search Impact Vectors" onChange={txt => setSearchValue(txt)} />
      <div
        className="max-h-[700px] min-h-[70vh] overflow-y-auto
          scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
      >
        {filteredVectors.map((vectorList, index) => (
          <ImpactVectorListCard
            key={index}
            title={vectorList.title}
            description={vectorList.description}
            vectors={vectorList.vectors}
            creator={vectorList.creator}
          />
        ))}
        {filteredVectors?.length == 0 ? <h2 className="text-center">No results</h2> : <></>}
      </div>
    </>
  );
};

export default ImpactvectorLists;
