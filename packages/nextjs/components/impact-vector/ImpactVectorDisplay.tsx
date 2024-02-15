import ImpactVectorCard from "./ImpactVectorCard";
import { impactVectors } from "./ImpactVectors";

const ImpactVectorDisplay = () => {
  return (
    <div
      className="max-h-[700px] overflow-y-auto
scrollbar-none pb-60"
    >
      {/* this is hard coded for now */}
      {impactVectors.map((vector, index) => (
        <ImpactVectorCard
          key={index}
          name={vector.name}
          description={vector.description}
          username={vector.sourceName}
        />
      ))}
    </div>
  );
};

export default ImpactVectorDisplay;
