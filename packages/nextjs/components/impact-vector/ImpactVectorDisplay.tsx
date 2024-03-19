import { useEffect, useState } from "react";
import ImpactVectorCard from "./ImpactVectorCard";
import { Vector } from "~~/app/types/data";

const ImpactVectorDisplay = () => {
  const [vectors, setVectors] = useState<Vector[]>([]);
  useEffect(() => {
    const fetchVectors = async () => {
      const res = await fetch("/api/vectors");
      const data = await res.json();
      setVectors(data);
    };
    fetchVectors();
  }, []);
  return (
    <div
      className="max-h-[700px] overflow-y-auto
      scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
    >
      {vectors.map((vector, index) => (
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
