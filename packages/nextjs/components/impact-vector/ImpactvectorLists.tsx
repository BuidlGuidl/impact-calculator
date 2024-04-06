import ImpactVectorListCard from "./ImpactVectorListCard";
import { useFetch } from "usehooks-ts";
import { VectorList } from "~~/app/types/data";

const ImpactvectorLists = () => {
  const { data: vectorLists } = useFetch<VectorList[]>("/api/lists");

  return (
    <div
      className="max-h-[700px] overflow-y-auto
  scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6 "
    >
      {vectorLists &&
        vectorLists.map((vectorList, index) => (
          <ImpactVectorListCard
            key={index}
            title={vectorList.title}
            description={vectorList.description}
            vectors={vectorList.vectors}
            creator={vectorList.creator}
          />
        ))}
    </div>
  );
};

export default ImpactvectorLists;
