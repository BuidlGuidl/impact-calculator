import ImpactVectorCard from "./ImpactVectorCard";
import { useFetch } from "usehooks-ts";
import { Vector } from "~~/app/types/data";

const ImpactVectorDisplay = () => {
  const { data: vectors } = useFetch<Vector[]>("/api/vectors");

  return (
    <div
      className="max-h-[700px] overflow-y-auto
      scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
    >
      {vectors &&
        vectors.map((vector, index) => (
          <ImpactVectorCard
            key={index}
            name={vector.name}
            description={vector.description}
            sourceName={vector.sourceName}
            parent={vector.parent}
            fieldName={vector.fieldName}
          />
        ))}
    </div>
  );
};

export default ImpactVectorDisplay;
