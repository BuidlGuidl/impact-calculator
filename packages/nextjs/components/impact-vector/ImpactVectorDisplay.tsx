import ImpactVectorCard from "./ImpactVectorCard";
import { impactVectors } from "./ImpactVectors";

const ImpactVectorDisplay = () => {
  return (
    <div
      className="max-h-[700px] overflow-y-auto
      scrollbar-w-2 scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full pb-6"
    >
      {/* this is hard coded for now */}
      {impactVectors.map((vector, index) => (
        <ImpactVectorCard
          key={index}
          name={vector.name}
          description={vector.description}
          sourceName={vector.sourceName}
        />
      ))}
    </div>
  );
};

export default ImpactVectorDisplay;
