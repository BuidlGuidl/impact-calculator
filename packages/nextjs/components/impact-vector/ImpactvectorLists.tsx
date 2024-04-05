import ImpactVectorListCard from "./ImpactVectorListCard";
import { useQuery } from "@tanstack/react-query";
import { VectorList } from "~~/app/types/data";

const ImpactvectorLists = () => {
  const { data: vectorLists } = useQuery<VectorList[]>({
    queryKey: ["vectorLists"],
    queryFn: async () => fetch("/api/lists").then(res => res.json()),
  });

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
          />
        ))}
    </div>
  );
};

export default ImpactvectorLists;
